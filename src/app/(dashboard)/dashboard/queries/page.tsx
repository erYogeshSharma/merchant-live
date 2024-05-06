"use client";

import React, { useState } from "react";

const inputs = [
  {
    type: "text",
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
    required: true,
    width: 1,
  },
  {
    type: "text",
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    required: true,
    width: 1 / 2,
  },
  {
    type: "text",
    name: "state",
    label: "State",
    placeholder: "Enter your state",
    required: true,
    width: 1 / 2,
  },
  {
    type: "text",
    name: "country",
    label: "Country",
    placeholder: "Enter your country",
    required: true,
    width: 1 / 2,
  },
  {
    type: "text",
    name: "zipcode",
    label: "Zipcode",
    placeholder: "Enter your zipcode",
    required: true,
    width: 1 / 2,
  },
  {
    type: "text",
    name: "googleMapLink",
    label: "Google Map Link",
    placeholder: "Enter Google Map link",
    required: false,
    width: 1,
  },
];

const Queries = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [imageLink, setImageLink] = useState("https://picsum.photos/200/300");
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    //save the image url url in the imageLink to render in a image tag
    setImageLink(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      console.log(data.status);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className=" col-span-2">
        {/* <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit" disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form> */}
        <form>
          <div className="relative h-62 w-full h-32">
            <img
              src={imageLink}
              className="h-32 w-full object-cover rounded-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4  align-middle justify-center ">
            <div className={`col-span-1`}>
              <div className="w-32 h-32">
                <img src={imageLink} className="h-32 w-full object-cover" />
              </div>
            </div>
            <div className={`col-span-1`}>
              <div className="grid gap-4">
                <div className="gap-2">
                  <label htmlFor="email">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jack Biks"
                    required
                  />
                </div>
                <div className="gap-2">
                  <label htmlFor="email">Unique Id</label>
                  <input
                    id="unique Id"
                    type="text"
                    name="uniqueId"
                    placeholder="james123"
                    required
                  />
                </div>
              </div>
            </div>
            {inputs.map((input) => (
              <div className={`col-span-${input.width * 2}`}>
                <div key={input.name} className="gap-2">
                  <label htmlFor="email">{input.label}</label>
                  <input
                    id={input.name}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="md:col-span-1 sm:col-span-2">
        <form>
          <div className="grid grid-cols-2 gap-4">
            {inputs.map((input) => (
              <div className={`col-span-${input.width * 2}`}>
                <div key={input.name} className="gap-2">
                  <label htmlFor="email">{input.label}</label>
                  <input
                    id={input.name}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    required={input.required}
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Queries;
