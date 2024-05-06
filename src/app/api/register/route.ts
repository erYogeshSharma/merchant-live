import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/connect_db";

// import sendmail from "@/lib/sendgrid";
// import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const userData = body;

    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    userData.authType = "credentials";

    await User.create(userData);

    //For Email verification
    // const emailVerifyToken = jwt.sign(
    //   { _id: newUser._id, iss: "NODEAPI" },
    //   process.env.EMAIL_VERIFY_SECRET
    // );

    // newUser.emailVerifyToken = emailVerifyToken;
    // await newUser.save();
    // const emailData = {
    //   from: { email: process.env.MAIL_FROM, name: "Team Zapminds" },
    //   to: userData.email,
    //   subject: `${userData.name}  Welcone to Merchant Live: Verify your mail`,
    //   text: "veriy your email here",
    //   html: `<strong>Verify your email at <a href="${process.env.APP_URL}/auth/verify/${emailVerifyToken}" target="_blank" > ${process.env.APP_URL}/auth/verify/${emailVerifyToken}</a>  </strong> `,
    // };

    // await sendmail(emailData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while signing up" },
      { status: 400 }
    );
  }
}
