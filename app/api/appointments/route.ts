import { NextRequest, NextResponse } from "next/server";
import { createAppointment, getAppointments, updateAppointment } from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const appointments = await getAppointments();
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();

    if (name.length < 2 || phone.length < 10) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Basic rate-limit style guard: reject obviously spammy payloads
    if (String(body.message || "").length > 2000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const appointment = await createAppointment({
      name,
      phone,
      email: body.email || undefined,
      preferredDate: body.preferredDate || undefined,
      preferredTime: body.preferredTime || undefined,
      treatment: body.treatment || undefined,
      message: body.message || undefined,
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const updated = await updateAppointment(body.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
