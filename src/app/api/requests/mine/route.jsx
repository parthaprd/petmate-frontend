import { getDb } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function toStringId(val) {
  if (typeof val === 'string') return val;
  if (val instanceof ObjectId) return val.toHexString();
  if (val && val.$oid) return val.$oid;
  if (val && typeof val.toHexString === 'function') return val.toHexString();
  if (val && typeof val.toString === 'function' && val.toString() !== '[object Object]') return val.toString();
  return String(val);
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const requests = await db.collection("requests")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const sanitized = requests.map((r) => ({
      ...r,
      _id: toStringId(r._id),
      petId: toStringId(r.petId),
    }));

    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
