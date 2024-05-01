import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/connect_db";
import Email from "next-auth/providers/email";
import sendmail from "@/lib/sendgrid";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const userData = body;

    console.log({ userData });
    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await UserModel.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await UserModel.create(userData);

    const emailData = {
      from: { email: process.env.MAIL_FROM, name: "Team Zapminds" },
      to: userData.email,
      subject: "Welcone to Merchant Live: Verify your mail",
      text: "veriy your email here",
      html: `<strong>verify lik</strong>`,
    };

    await sendmail(emailData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {}
}
