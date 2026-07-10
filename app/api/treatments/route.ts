import { NextRequest, NextResponse } from "next/server";
import {
  deleteTreatment,
  getTreatments,
  upsertTreatment,
} from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  const treatments = await getTreatments(true);
  return NextResponse.json(treatments);
}

export async function POST(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }
  const treatment = await upsertTreatment(body);
  return NextResponse.json(treatment, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const ok = await deleteTreatment(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
