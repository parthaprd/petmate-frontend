import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
    const pets = await db.collection("pets")
      .find({ status: "available" })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    return NextResponse.json(pets);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
