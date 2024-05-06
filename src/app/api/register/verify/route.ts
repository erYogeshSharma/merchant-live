import dbConnect from "@/lib/connect_db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { message: "Verify email in required!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: body.email });

    if (user?.verified) {
      return NextResponse.json(
        { message: "Email  verified!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Not Vefified" }, { status: 400 });
    }
  } catch (error) {}
}
