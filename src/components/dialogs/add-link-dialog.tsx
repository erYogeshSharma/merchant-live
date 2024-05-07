import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFormFeild from "../form/form-text-feild";
import FormSelect from "../form/form-select";
import { Industries } from "@/constants/industry";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import { Separator } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";

const linkZodSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  // category: z.string().min(1, "Please select a category"),
  icon: z.string(),
});
const AddLink = () => {
  const form = useForm<z.infer<typeof linkZodSchema>>({
    resolver: zodResolver(linkZodSchema),
    defaultValues: {
      title: "",
      icon: "",
    },
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageSubmit = async (file: any) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("directory", "link-icons");

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      form.setValue("icon", data.fileURL);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const handleFileChange = (e: any) => {
    handleImageSubmit(e.target.files[0]);
    e.target.files = null;
  };

  const onSubmit = async (values: z.infer<typeof linkZodSchema>) => {
    try {
      setSaving(true);
      const response = await fetch("/api/link", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      const closeButton = document.getElementById("close-button");
      closeButton?.click();
      setSaving(false);
    } catch (error) {
      console.log(error);

      setSaving(false);
    }
  };

  useEffect(() => {
    form.reset();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src="" />
          <AvatarFallback>Add Link</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom link</DialogTitle>
          <DialogDescription>
            Add a custom link to your dashboard
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-[80px] h-[80px] ">
                  <AvatarImage src={form.getValues().icon} />
                  <AvatarFallback>{"IC"}</AvatarFallback>
                </Avatar>
                <div className="flex-1   gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    disabled={uploading}
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {uploading && <p className="text-xs">Uploading...</p>}
                </div>
              </div>
              <TextFormFeild
                name="title"
                type="text"
                label="Link Title"
                placeholder="Amazon"
                control={form.control}
              />
              {/* <FormSelect
                name="category"
                label="Link Category"
                placeholder="Restaruant"
                control={form.control}
                options={Industries.map((i) => ({
                  name: i,
                  value: i,
                }))}
              /> */}
              <DialogFooter className="sm:justify-between gap-3">
                <DialogClose asChild>
                  <Button id="close-button" type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLink;
