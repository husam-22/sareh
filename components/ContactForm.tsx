"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpLeft, Check, Clipboard, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

const serviceOptions = [
  { value: "real-estate-consulting", label: "استشارة عقارية" },
  { value: "engineering-design", label: "تصميم هندسي" },
  { value: "construction-management", label: "إشراف وإدارة بناء" },
  { value: "property-inspection", label: "فحص عقار" },
  { value: "site-visit", label: "طلب زيارة موقع" },
];

type Fields = { name: string; phone: string; service: string; property: string; area: string; areaUnknown: boolean; location: string; details: string; consent: boolean; website: string };
type Errors = Partial<Record<keyof Fields, string>>;

export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("service") ?? "";
  const initialService = serviceOptions.some((item) => item.value === requested) ? requested : "";
  const [fields, setFields] = useState<Fields>({ name: "", phone: "", service: initialService, property: "", area: "", areaUnknown: false, location: "", details: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "preview" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const validate = () => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "يرجى كتابة الاسم الكامل.";
    if (fields.phone.replace(/\D/g, "").length < 7) next.phone = "يرجى إدخال رقم هاتف صحيح مع رمز الدولة.";
    if (!fields.service) next.service = "اختر نوع الخدمة المطلوبة.";
    if (!fields.location.trim()) next.location = "يرجى كتابة المدينة والحي.";
    if (!fields.areaUnknown && fields.area && (Number(fields.area) <= 0 || Number.isNaN(Number(fields.area)))) next.area = "أدخل مساحة موجبة أو اختر «غير محددة».";
    if (!fields.consent) next.consent = "نحتاج موافقتك لنتمكن من التواصل بشأن الطلب.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const requestText = useMemo(() => {
    const service = serviceOptions.find((item) => item.value === fields.service)?.label ?? fields.service;
    return `طلب استشارة من موقع صَرْح\nالاسم: ${fields.name}\nالهاتف: ${fields.phone}\nالخدمة: ${service}\nنوع العقار: ${fields.property || "غير محدد"}\nالمساحة: ${fields.areaUnknown ? "غير محددة" : fields.area ? `${fields.area} م²` : "غير محددة"}\nالموقع: ${fields.location}\nتفاصيل: ${fields.details || "لا توجد"}`;
  }, [fields]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate() || status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      const data = await response.json();
      if (response.ok && data.delivered) setStatus("success");
      else if (data.code === "NOT_CONFIGURED") setStatus("preview");
      else { setStatus("error"); if (data.errors) setErrors(data.errors); }
    } catch { setStatus("error"); }
  };
  const copy = async () => {
    await navigator.clipboard.writeText(requestText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  const whatsappUrl = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(requestText)}` : "";

  if (status === "success") return <div className="form-success" role="status"><Check /><h2>تم استلام طلبك.</h2><p>شكراً لك. وصل الطلب إلى جهة الاستقبال، وسيتم التواصل معك وفق آلية المتابعة المعتمدة.</p><Link href="/" className="button button-primary">العودة للرئيسية <ArrowUpLeft size={18} /></Link></div>;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="preview-notice"><span>وضع المعاينة</span><p>{site.whatsapp || process.env.NEXT_PUBLIC_CONTACT_EMAIL ? "سيظهر نجاح الإرسال فقط بعد قبول الطلب من جهة الاستقبال." : "النموذج غير موصول بجهة استقبال بعد. يمكنك تجربته، ثم نسخ الطلب دون ادعاء وصوله."}</p></div>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">الاسم الكامل <b>*</b></label><input id="name" autoComplete="name" value={fields.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="كيف نناديك؟" />{errors.name && <small className="field-error" id="name-error">{errors.name}</small>}</div>
      <div className="field"><label htmlFor="phone">رقم الهاتف أو واتساب <b>*</b></label><input id="phone" type="tel" dir="ltr" autoComplete="tel" value={fields.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="+000 000 000 000" />{errors.phone && <small className="field-error" id="phone-error">{errors.phone}</small>}</div>
      <div className="field"><label htmlFor="service">نوع الخدمة المطلوبة <b>*</b></label><select id="service" value={fields.service} onChange={(e) => update("service", e.target.value)} aria-invalid={!!errors.service}><option value="">اختر الخدمة</option>{serviceOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>{errors.service && <small className="field-error">{errors.service}</small>}</div>
      <div className="field"><label htmlFor="property">نوع العقار</label><select id="property" value={fields.property} onChange={(e) => update("property", e.target.value)}><option value="">اختر نوع العقار</option><option>سكني</option><option>تجاري</option><option>إداري</option><option>أرض خالية</option></select></div>
      <div className="field"><label htmlFor="area">مساحة المشروع <span>(م²)</span></label><input id="area" type="number" min="1" step="any" inputMode="decimal" disabled={fields.areaUnknown} value={fields.area} onChange={(e) => update("area", e.target.value)} placeholder="مثال: 450" />{errors.area && <small className="field-error">{errors.area}</small>}<label className="inline-check"><input type="checkbox" checked={fields.areaUnknown} onChange={(e) => update("areaUnknown", e.target.checked)} />المساحة غير محددة</label></div>
      <div className="field"><label htmlFor="location">المدينة والحي <b>*</b></label><input id="location" autoComplete="address-level2" value={fields.location} onChange={(e) => update("location", e.target.value)} aria-invalid={!!errors.location} placeholder="المدينة، الحي" />{errors.location && <small className="field-error">{errors.location}</small>}</div>
      <div className="field field-full"><label htmlFor="details">تفاصيل إضافية عن المشروع</label><textarea id="details" rows={4} value={fields.details} onChange={(e) => update("details", e.target.value)} placeholder="حدّثنا عن الفكرة، المرحلة الحالية، وما تحتاج إليه..." /></div>
      <div className="hp-field" aria-hidden="true"><label htmlFor="website">الموقع</label><input id="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => update("website", e.target.value)} /></div>
    </div>
    <label className="consent"><input type="checkbox" checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} /><span>أوافق على استخدام بياناتي للتواصل بشأن هذا الطلب وفق <Link href="/privacy" target="_blank">سياسة الخصوصية</Link>.</span></label>{errors.consent && <small className="field-error">{errors.consent}</small>}
    {status === "preview" && <div className="form-message" role="status"><strong>الطلب صالح، لكنه لم يُرسل.</strong><p>لم تُربط جهة استقبال بعد، ولم نحفظ بياناتك. انسخ التفاصيل للاحتفاظ بها أو مشاركتها عند إضافة قناة التواصل الرسمية.</p><button type="button" className="button button-outline" onClick={copy}>{copied ? <Check size={17} /> : <Clipboard size={17} />}{copied ? "تم نسخ الطلب" : "نسخ تفاصيل الطلب"}</button>{whatsappUrl && <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">فتح مسودة واتساب <ArrowUpLeft size={17} /></a>}</div>}
    {status === "error" && <div className="form-message error" role="alert"><strong>تعذّر إرسال الطلب.</strong><p>راجع الحقول وحاول مرة أخرى. لم نعرض نجاحاً لأن جهة الاستقبال لم تقبل الطلب.</p></div>}
    <button className="button button-primary submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? <Loader2 className="spin" size={18} /> : <ArrowUpLeft size={18} />}{status === "sending" ? "جارٍ التحقق..." : "أرسل طلب الاستشارة"}</button>
    <p className="form-footnote">الحقول المعلّمة بـ * مطلوبة. فتح واتساب — عند توفره — لا يعني إرسال الطلب؛ يلزم الضغط على إرسال داخل التطبيق.</p>
  </form>;
}
