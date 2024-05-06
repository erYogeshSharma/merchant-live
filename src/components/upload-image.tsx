import { Label } from "@radix-ui/react-label";
import { Edit, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";

const UploadImage = ({
  mediaLink,
  onUploaded,
  height = 40,
}: {
  mediaLink: string;
  height?: number;
  onUploaded: (link: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = async (file: any) => {
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
      onUploaded(data.fileURL);
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

  return (
    <div>
      {mediaLink ? (
        <div className="relative">
          <Label htmlFor="image-upload">
            <div className="p-2 rounded-md bg-background  shadow-xs hover:text-primary  absolute top-5 right-5  ">
              {uploading ? (
                <Loader2 className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
            </div>
          </Label>
          <Input
            id="image-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <img
            src={mediaLink}
            className="w-full h-40 rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="image-upload"
            className={`flex flex-col relative items-center justify-center w-full h-${height} border-2 border-dashed rounded-lg cursor-pointer shadow-xs`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
              {uploading && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Uploading...
                </div>
              )}
            </div>
          </Label>
          <Input
            id="image-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
