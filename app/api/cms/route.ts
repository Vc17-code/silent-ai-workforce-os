import { NextRequest, NextResponse } from "next/server";
import {
  getDoctor,
  getFaqs,
  getMediaAssets,
  getOffers,
  getSiteContent,
  saveDoctor,
  saveFaqs,
  saveMediaAssets,
  saveOffers,
  saveSiteContent,
} from "@/lib/db";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "media";
  switch (type) {
    case "media":
      return NextResponse.json(await getMediaAssets());
    case "content":
      return NextResponse.json(await getSiteContent());
    case "doctor":
      return NextResponse.json(await getDoctor());
    case "faqs":
      return NextResponse.json(await getFaqs());
    case "offers":
      return NextResponse.json(await getOffers());
    default:
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await isOwnerAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { type, data } = body;
  switch (type) {
    case "media":
      await saveMediaAssets(data);
      break;
    case "content":
      await saveSiteContent(data);
      break;
    case "doctor":
      await saveDoctor(data);
      break;
    case "faqs":
      await saveFaqs(data);
      break;
    case "offers":
      await saveOffers(data);
      break;
    default:
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
