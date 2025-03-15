import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { user, message } = await req.json();
  await connectDB();
  const newMessage = await Message.create({ user, message });
  return NextResponse.json(newMessage);
}
