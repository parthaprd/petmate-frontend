import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const pets = await db.collection("pets")
      .find({ owner: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const sanitized = pets.map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
