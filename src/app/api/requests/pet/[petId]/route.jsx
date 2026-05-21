import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { petId } = await params;
    if (!ObjectId.isValid(petId)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const db = await getDb();

    
    const pet = await db.collection("pets").findOne({ _id: new ObjectId(petId) });
    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    if (pet.owner !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const requests = await db.collection("requests")
      .find({ petId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
