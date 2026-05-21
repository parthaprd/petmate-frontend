import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const db = await getDb();
    const pet = await db.collection("pets").findOne({ _id: new ObjectId(id) });

    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const db = await getDb();
    const pet = await db.collection("pets").findOne({ _id: new ObjectId(id) });

    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    if (pet.owner !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      species,
      breed,
      age,
      gender,
      image,
      healthStatus,
      vaccinationStatus,
      location,
      adoptionFee,
      description,
      status, 
    } = body;

    const updateDoc = {
      $set: {
        name,
        species,
        breed,
        age: parseInt(age) || 0,
        gender,
        image,
        healthStatus,
        vaccinationStatus,
        location,
        adoptionFee: parseInt(adoptionFee) || 0,
        description,
      },
    };

    if (status) {
      updateDoc.$set.status = status;
    }

    await db.collection("pets").updateOne(
      { _id: new ObjectId(id) },
      updateDoc
    );

    return NextResponse.json({ message: "Pet updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const db = await getDb();
    const pet = await db.collection("pets").findOne({ _id: new ObjectId(id) });

    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    if (pet.owner !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    
    await db.collection("pets").deleteOne({ _id: new ObjectId(id) });

    
    await db.collection("requests").deleteMany({ petId: id });

    return NextResponse.json({ message: "Pet deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
