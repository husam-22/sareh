import { NextResponse } from "next/server";

const attempts = new Map<string, { count: number; reset: number }>();
const allowedServices = new Set(["real-estate-consulting", "engineering-design", "construction-management", "property-inspection", "site-visit"]);

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.length > 120) errors.name = "يرجى كتابة اسم صحيح.";
  if (typeof body.phone !== "string" || body.phone.replace(/\D/g, "").length < 7 || body.phone.length > 30) errors.phone = "يرجى إدخال رقم هاتف صحيح.";
  if (typeof body.service !== "string" || !allowedServices.has(body.service)) errors.service = "يرجى اختيار خدمة صحيحة.";
  if (typeof body.location !== "string" || !body.location.trim() || body.location.length > 180) errors.location = "يرجى كتابة المدينة والحي.";
  if (!body.areaUnknown && body.area && (!Number.isFinite(Number(body.area)) || Number(body.area) <= 0 || Number(body.area) > 100000000)) errors.area = "يرجى إدخال مساحة صحيحة.";
  if (body.consent !== true) errors.consent = "الموافقة على التواصل مطلوبة.";
  if (typeof body.details === "string" && body.details.length > 3000) errors.details = "التفاصيل أطول من الحد المسموح.";
  return errors;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.reset > now && record.count >= 5) return NextResponse.json({ message: "محاولات كثيرة. حاول بعد قليل." }, { status: 429 });
  attempts.set(ip, record && record.reset > now ? { count: record.count + 1, reset: record.reset } : { count: 1, reset: now + 10 * 60 * 1000 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "صيغة الطلب غير صحيحة." }, { status: 400 }); }
  if (body.website) return NextResponse.json({ message: "تعذّر قبول الطلب." }, { status: 400 });
  const errors = validate(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });
  const webhook = process.env.CONTACT_DELIVERY_WEBHOOK;
  if (!webhook) return NextResponse.json({ code: "NOT_CONFIGURED", delivered: false }, { status: 503 });
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: body.name, phone: body.phone, service: body.service, property: body.property, area: body.areaUnknown ? "غير محددة" : body.area, location: body.location, details: body.details, source: "sarh-website", receivedAt: new Date().toISOString() }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) return NextResponse.json({ delivered: false, message: "لم تقبل جهة الاستقبال الطلب." }, { status: 502 });
    return NextResponse.json({ delivered: true });
  } catch { return NextResponse.json({ delivered: false, message: "تعذّر الاتصال بجهة الاستقبال." }, { status: 502 }); }
}
