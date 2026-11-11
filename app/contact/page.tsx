import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "تواصل معنا", description: "أرسل تفاصيل أرضك أو مشروعك واطلب استشارة عقارية أو هندسية أو زيارة موقع من صَرْح." };

export default function ContactPage() {
  return <main id="main-content" className="inner-page contact-page"><section className="contact-intro"><div className="container contact-layout"><div className="contact-copy"><span className="eyebrow"><span />مشروع العمر يستحق البداية الصحيحة</span><h1>جاهز لبدء بناء<br /><em>صرحك الخاص؟</em></h1><p>حدّثنا عن الأرض أو العقار وما تريد تحقيقه. كلما كانت التفاصيل أوضح، كانت بداية النقاش أكثر فائدة.</p><div className="contact-aside"><span>قبل أن تبدأ</span><ul><li>لا تحتاج إلى مخططات مكتملة للتواصل.</li><li>يمكنك ترك المساحة غير محددة إن لم تعرفها.</li><li>طلب الزيارة لا يعني تأكيد موعد قبل التنسيق.</li></ul></div><div className="contact-data"><h2>بيانات التواصل</h2>{site.email || site.whatsapp || site.address ? <>{site.whatsapp && <p dir="ltr">{site.whatsapp}</p>}{site.email && <p dir="ltr">{site.email}</p>}{site.address && <p>{site.address}</p>}</> : <p>تُضاف بيانات الهاتف والبريد والعنوان الرسمية قبل إطلاق الموقع.</p>}</div></div><Suspense fallback={<div className="form-loading">جارٍ تجهيز النموذج…</div>}><ContactForm /></Suspense></div></section></main>;
}
