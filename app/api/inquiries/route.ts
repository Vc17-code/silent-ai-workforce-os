import { NextRequest, NextResponse } from "next/server";
import { getInquiries, createInquiry, markInquiryRead } from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const inquiry = await createInquiry(body);
    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 });
  }

  const success = await markInquiryRead(id);
  if (!success) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
