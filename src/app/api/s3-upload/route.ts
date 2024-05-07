import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.MEDIA_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file: Buffer, fileName: String) {
  const fileBuffer = file;

  console.log({ fileName });
  const params = {
    Bucket: process.env.MEDIA_S3_BUCKET,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    await s3Client.send(command);
    return fileName;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const directory = formData.get("directory") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, `${directory}/${file.name}`);
    const fileURL = `${process.env.MEDIA_CLOUDFRNT_URL}/${fileName}`;
    return NextResponse.json({ success: true, fileURL });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
