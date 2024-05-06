"use client";
import TextEditor from "@/components/text-editor/text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/upload-image";
import { Industries } from "@/constants/industry";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Edit, Grid, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import * as z from "zod";

type Inputs = {
  name: string;
  category: string;
  title: string;
  description: string;
  logo: string;
  coverImage: string;

  email: string;
  phone: number;
  alternatePhone: number;

  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: number;
  googleMapLink: string;

  industry: string;
  isActive: boolean;
  enableEnquiryForm: boolean;
  enableAppointmentForm: boolean;
  links: {
    type: string;
    link: string;
  }[];
  products: {
    title: string;
    image: string;
  };
};

const formSchema = z
  .object({
    name: z.string(),
    linkId: z.string(),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    logo: z.string(),
    coverImage: z.string(),
    email: z.string(),
    phone: z.number(),
    alternatePhone: z.number().optional(),
    address: z.string(),
    country: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.number(),
    googleMapLink: z.string(),
    isActive: z.boolean(),
    enableEnquiryForm: z.boolean(),
    enableAppointmentForm: z.boolean(),
    links: z
      .array(
        z.object({
          type: z.string(),
          link: z.string(),
        })
      )
      .optional(),
    products: z
      .array(
        z.object({
          title: z.string(),
          image: z.string(),
        })
      )
      .optional(),
    gallery: z.array(z.string()).optional(),
  })
  .refine((data) => data.phone !== data.alternatePhone, {
    message: "Phone and Alternate Phone cannot be the same",
    path: ["alertnatePhone"],
  });

type Link = {
  title: string;
  category: string;
  createdBy: string;
  icon: string;
  isActive: boolean;
  isMaster: boolean;
};

const form: Inputs = {
  name: "Yogesh CO",
  category: "developer",
  title: "This is a sample title",
  description: "This is a sample description",
  logo: "",
  coverImage: "",
  email: "er.yoges505@gmail.com",
  phone: 9968130758,
  alternatePhone: 9986574565,
  address: "Kormangala 8th block",
  country: "India",
  city: "Bangalore",
  state: "Karnatka",
  zipCode: 650068,
  googleMapLink: "",
  industry: "",
  isActive: false,
  enableEnquiryForm: false,
  enableAppointmentForm: false,
  links: [],
  products: {
    title: "",
    image: "",
  },
};

const TextFormFeild = ({
  control,
  name,
  label = "",
  type,
  placeholder = "",
}: {
  control: any;
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel> {label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} type={type} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

const FormSelect = ({
  control,
  name,
  label = "",
  placeholder = "",
  options,
}: {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: { name: string | number; value: string }[];
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem value={option.value} key={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
const FormTextArea = ({
  control,
  name,
  label = "",
  placeholder = "",
}: {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const Dashboard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Yogesh CO",
      category: "Fashion",
      title: "This is a sample title",
      description: "This is a sample description",
      logo: "",
      coverImage: "",
      email: "yoges@fmail.com",
      phone: 4524352435,
      alternatePhone: 3452345232345,
      address: "sdfsd",
      country: "india",
      city: "bengaluru",
      state: "karnataka",
      zipCode: 560068,
      googleMapLink: "sample link",
      linkId: "sample-unique-id",
      isActive: false,
      enableEnquiryForm: false,
      enableAppointmentForm: false,
      links: [],
      products: [],
      gallery: [],
    },
  });
  const {
    register,
    watch,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: form,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex ali">
        <h1 className="text-lg font-semibold md:text-2xl">Create Card</h1>
      </div>
      <div className="grid">
        <div className="max-width-md">
          <Card>
            <CardContent className="py-4">
              <div className="space-y-1">
                <h4 className="text-md font-medium leading-none">Add Photos</h4>
                <p className="text-xs text-muted-foreground">
                  Add your logo and cover image
                </p>
              </div>
              <Separator className="my-4" />
              <div>
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                      <div className="flex mb-4 gap-3">
                        <div className="w-40 h-40">
                          <UploadImage
                            height={40}
                            mediaLink={imageLink}
                            onUploaded={(link) => setImageLink(link)}
                          />
                        </div>
                        <div className="flex-1">
                          <UploadImage
                            height={40}
                            mediaLink={imageLink}
                            onUploaded={(link) => setImageLink(link)}
                          />
                        </div>
                      </div>

                      {/* NAME CATEGORY ID */}

                      <div className="grid gap-4">
                        <div className="mt-4">
                          <div className="space-y-1">
                            <h4 className="text-md font-medium leading-none">
                              Basic Details
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Add You basic Details
                            </p>
                          </div>
                        </div>
                        <Separator />

                        <TextFormFeild
                          name="name"
                          type="text"
                          label="Business name"
                          placeholder="Raju Enterprises"
                          control={form.control}
                        />
                        <TextFormFeild
                          name="title"
                          type="text"
                          label="Tagline"
                          placeholder="Sample Title"
                          control={form.control}
                        />

                        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                          <FormSelect
                            name="category"
                            label="Category"
                            placeholder="Manufacturing"
                            control={form.control}
                            options={Industries.map((i) => ({
                              name: i,
                              value: i,
                            }))}
                          />

                          <TextFormFeild
                            name="linkId"
                            type="text"
                            label="Unqiue Id"
                            placeholder="raju-enterprises"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="email"
                            type="text"
                            label="email"
                            placeholder="anc@zyx.com"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="phone"
                            type="number"
                            label="Phone"
                            placeholder="9999999999"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="alternatePhone"
                            type="number"
                            label="Alternate Phone"
                            placeholder="8888888888"
                            control={form.control}
                          />
                        </div>
                        <TextFormFeild
                          name="googleMapLink"
                          type="text"
                          label="Google Map Link"
                          placeholder="Google Map Link URL"
                          control={form.control}
                        />
                        <FormTextArea
                          name="description"
                          label="Description"
                          placeholder="Type your message here."
                          control={form.control}
                        />
                      </div>

                      <div className="space-y-1 mt-3">
                        <h4 className="text-md font-medium leading-none">
                          Address
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Add the address for your business
                        </p>
                      </div>
                      <Separator className="my-4" />
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
