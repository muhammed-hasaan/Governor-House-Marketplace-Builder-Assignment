import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();

  if (session) {
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "No active session found" },
    { status: 400 }
  );
}
