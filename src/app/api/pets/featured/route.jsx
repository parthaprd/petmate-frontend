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

    const sanitized = pets.map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
