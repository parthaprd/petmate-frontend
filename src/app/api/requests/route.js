import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { petId, petName, userName, pickupDate, message } = body;

    if (!ObjectId.isValid(petId)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const db = await getDb();
    const pet = await db.collection("pets").findOne({ _id: new ObjectId(petId) });

    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    if (pet.owner === session.user.email) {
      return NextResponse.json({ message: "You cannot adopt your own pet" }, { status: 403 });
    }

    if (pet.status === "adopted") {
      return NextResponse.json({ message: "This pet is already adopted" }, { status: 400 });
    }

    // Check if there is already a pending request by this user
    const existingRequest = await db.collection("requests").findOne({
      petId,
      userEmail: session.user.email,
      status: "pending",
    });

    if (existingRequest) {
      return NextResponse.json({ message: "You already have a pending request for this pet" }, { status: 409 });
    }

    const newRequest = {
      petId,
      petName,
      userName,
      userEmail: session.user.email,
      pickupDate,
      message,
      status: "pending",
      ownerEmail: pet.owner,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("requests").insertOne(newRequest);
    return NextResponse.json({ ...newRequest, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
