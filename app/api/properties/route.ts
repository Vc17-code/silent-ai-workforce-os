import { NextRequest, NextResponse } from "next/server";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const includeHidden = request.nextUrl.searchParams.get("all") === "true";
  const authenticated = await isOwnerAuthenticated();

  if (includeHidden && !authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const properties = await getProperties(includeHidden && authenticated);
  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const property = await createProperty(body);
    return NextResponse.json(property, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: "Property ID required" }, { status: 400 });
    }
    const property = await updateProperty(id, data);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 });
  }

  const deleted = await deleteProperty(id);
  if (!deleted) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
