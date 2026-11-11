import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { serviceGroups } from "@/data/services";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link href="/" className="brand brand-light">صَرْح<span className="brand-line" /></Link>
          <h2>من الأرض،<br />نصنع قيمة تدوم.</h2>
          <p>نحوّل المساحات والأراضي إلى مشاريع استثمارية ومبانٍ معمارية تنبض بالحياة والجودة.</p>
        </div>
        <div className="footer-column">
          <h3>روابط سريعة</h3>
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-column">
          <h3>خدماتنا</h3>
          {serviceGroups.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}
          <Link href="/services">جميع الخدمات</Link>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">لديك مشروع في ذهنك؟</span>
          <h3>لنبدأ بحديث واضح.</h3>
          <Link href="/contact" className="circle-link" aria-label="انتقل إلى نموذج التواصل"><ArrowUpLeft /></Link>
          {!site.email && !site.whatsapp && <small>تُستكمل بيانات التواصل الرسمية قبل النشر.</small>}
          {site.email && <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.legalName}. جميع الحقوق محفوظة.</p>
        <Link href="/privacy">سياسة الخصوصية</Link>
        <a href="#top">العودة إلى الأعلى ↑</a>
      </div>
    </footer>
  );
}
