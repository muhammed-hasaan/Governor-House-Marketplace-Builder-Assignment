import { NextResponse } from "next/server";
import { client } from "@/lib/client";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await client.fetch(
      `*[_type == "admin" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await client.create({
      _type: "admin",
      name,
      email,
      password, // Note: This is not secure for real applications
      isAdmin: false,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup:", error);
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
