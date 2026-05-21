import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId } = await params;
    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json({ message: "Invalid request ID" }, { status: 400 });
    }

    const db = await getDb();
    const adoptionRequest = await db.collection("requests").findOne({ _id: new ObjectId(requestId) });

    if (!adoptionRequest) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    if (adoptionRequest.ownerEmail !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
    }

    if (status === "approved") {
      
      await db.collection("requests").updateOne(
        { _id: new ObjectId(requestId) },
        { $set: { status: "approved" } }
      );

      
      await db.collection("requests").updateMany(
        {
          petId: adoptionRequest.petId,
          _id: { $ne: new ObjectId(requestId) },
          status: "pending"
        },
        { $set: { status: "rejected" } }
      );

      
      if (ObjectId.isValid(adoptionRequest.petId)) {
        await db.collection("pets").updateOne(
          { _id: new ObjectId(adoptionRequest.petId) },
          { $set: { status: "adopted" } }
        );
      }
    } else {
      
      await db.collection("requests").updateOne(
        { _id: new ObjectId(requestId) },
        { $set: { status: "rejected" } }
      );
    }

    return NextResponse.json({ message: "Adoption request updated successfully" });
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

    const { requestId } = await params;
    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json({ message: "Invalid request ID" }, { status: 400 });
    }

    const db = await getDb();
    const adoptionRequest = await db.collection("requests").findOne({ _id: new ObjectId(requestId) });

    if (!adoptionRequest) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    if (adoptionRequest.userEmail !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.collection("requests").deleteOne({ _id: new ObjectId(requestId) });
    return NextResponse.json({ message: "Request cancelled successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
