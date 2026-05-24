import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const species = searchParams.get("species");
    const sort = searchParams.get("sort");

    const db = await getDb();
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
      ];
    }

    if (species) {
      query.species = species;
    }

    let cursor = db.collection("pets").find(query);

    if (sort === "low-to-high") {
      cursor = cursor.sort({ adoptionFee: 1 });
    } else if (sort === "high-to-low") {
      cursor = cursor.sort({ adoptionFee: -1 });
    } else if (sort === "newest") {
      cursor = cursor.sort({ createdAt: -1 });
    }

    const pets = await cursor.toArray();
    const sanitized = pets.map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
    } = body;

    const db = await getDb();
    const newPet = {
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
      status: "available",
      owner: session.user.email,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("pets").insertOne(newPet);
    return NextResponse.json({ ...newPet, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
