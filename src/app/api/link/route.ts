import { authConfig } from "@/lib/auth";
import dbConnect from "@/lib/connect_db";
import { LinkModel } from "@/models/link";
import { verify } from "crypto";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authConfig);

  try {
    await dbConnect();
    const body = await request.json();
    const { category, icon, title } = body;
    if (!icon || !title) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const newLink = await LinkModel.create({
      icon,
      title,
      createdBy: session?.user.id as string,
      isMaster: true,
    });
    return NextResponse.json(
      {
        message: "Link created successfully",
        data: newLink,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function GET(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authConfig);
  try {
    await dbConnect();
    const links = await LinkModel.find({
      $or: [{ createdBy: session?.user.id }, { isMaster: true }],
    });
    return NextResponse.json(
      {
        message: "Link created successfully",
        data: links,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
