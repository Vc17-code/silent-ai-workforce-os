import { NextRequest, NextResponse } from "next/server";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery,
} from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(await getGallery());
}

export async function POST(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const item = await createGalleryItem(body);
  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const ok = await deleteGalleryItem(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
