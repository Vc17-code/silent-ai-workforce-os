import { NextRequest, NextResponse } from "next/server";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
} from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const item = await createTestimonial(body);
  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const ok = await deleteTestimonial(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
