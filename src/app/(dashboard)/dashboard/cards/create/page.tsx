"use client";
import AddLink from "@/components/dialogs/add-link-dialog";
import FormSelect from "@/components/form/form-select";
import FormTextArea from "@/components/form/form-text-area";
import TextFormFeild from "@/components/form/form-text-feild";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UploadImage from "@/components/upload-image";
import { Industries } from "@/constants/industry";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { link } from "fs";
import { Delete } from "lucide-react";

import React, { useEffect, useState } from "react";
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
    name: z.string().min(10, "Name should be atleast 10 characters"),
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
  _id: string;
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

  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  async function getLinks() {
    try {
      const response = await fetch("/api/link", {
        method: "GET",
      });
      const data = await response.json();
      setLinks(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLinks();
  }, []);

  function selectLink(id: string) {
    const links = form.getValues().links;
    console.log(links);
    if (links?.map((l) => l.type).includes(id)) {
      form.setValue(
        "links",
        links.filter((l) => l.type !== id)
      );
    } else {
      form.setValue("links", links?.concat({ type: id, link: "" }));
    }
  }

  function handleLinkInput(e: any) {
    const type = e.target.name;
    const links = form.getValues().links;
    form.setValue(
      "links",
      links?.map((l) => (l.type === type ? { ...l, link: e.target.value } : l))
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="container">
        <div>
          <Card style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
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
                      <div className="mt-8">
                        <div className="space-y-1 mt-3">
                          <h4 className="text-md font-medium leading-none">
                            Address
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Add the address for your business
                          </p>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <TextFormFeild
                            name="address"
                            type="text"
                            label="Address"
                            placeholder="Kormangala 8th block"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="country"
                            type="text"
                            label="Country"
                            placeholder="India"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="city"
                            type="text"
                            label="City"
                            placeholder="Bangalore"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="state"
                            type="text"
                            label="State"
                            placeholder="Karnataka"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="zipCode"
                            type="number"
                            label="Zip Code"
                            placeholder="560068"
                            control={form.control}
                          />
                          <TextFormFeild
                            name="googleMapLink"
                            type="string"
                            label="Google Map Link"
                            placeholder="g.co/maps/xyz"
                            control={form.control}
                          />
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="space-y-1 mt-3">
                          <h4 className="text-md font-medium leading-none">
                            Links
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Add links for your business
                          </p>
                        </div>
                        <Separator className="my-4" />
                      </div>
                      <div className="flex gap-4 ">
                        {links.map((link) => (
                          <div
                            className={clsx(
                              "transition-opacity ease-linear rounded-full",
                              form
                                .watch("links")
                                ?.map((l) => l.type)
                                .includes(link._id)
                                ? "border-2 border-primary-200"
                                : "border-2 border-background "
                            )}
                          >
                            <Avatar
                              className="w-[60px] h-[60px] p-2"
                              onClick={() => selectLink(link._id)}
                            >
                              <AvatarImage src={link.icon} />
                              <AvatarFallback>{link.title}</AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                        <AddLink />
                      </div>
                      <div className=" grid my-3 gap-4">
                        {form.watch("links")?.map((link) => (
                          <div className="flex  gap-4 ">
                            <Avatar>
                              <AvatarImage
                                src={
                                  links.find((l) => l._id === link.type)?.icon
                                }
                              />
                            </Avatar>
                            <div className="flex-1">
                              <Input
                                name={link.type}
                                value={link.link}
                                onChange={handleLinkInput}
                              />
                            </div>
                            <Button
                              onClick={() => selectLink(link.type)}
                              variant="outline"
                            >
                              <Delete className="w-[20px] h-[20px]" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button type="submit">submit</Button>
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
