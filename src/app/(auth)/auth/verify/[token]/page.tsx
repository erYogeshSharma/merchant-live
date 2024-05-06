import dbConnect from "@/lib/connect_db";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
async function verifyToken(token: string) {
  try {
    await dbConnect();
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET) as {
      _id: string;
    };
    const user = await User.findById(decoded?._id as string);

    if (!user) {
      return "Invalid token";
    }
    if (user.emailVerifyToken === token) {
      user.verified = true;
      user.emailVerifyToken = "";
      await user.save();
      return "Email verified";
    } else {
      return "Invalid Token";
    }
  } catch (error) {}
}

const Page = ({ params }: { params: { token: string } }) => {
  const message = verifyToken(params.token);

  return <div>{message} </div>;
};

export default Page;
