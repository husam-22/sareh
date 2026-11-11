import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { ServicesList } from "@/components/home/ServicesList";
import { serviceGroups } from "@/data/services";

export const metadata: Metadata = { title: "خدماتنا", description: "منظومة صَرْح المتكاملة: استشارات عقارية، تصميم معماري وهندسي، إدارة تنفيذ، وفحص وتقييم العقار." };

export default function ServicesPage() {
  return <main id="main-content" className="inner-page">
    <section className="page-hero"><div className="container"><span className="eyebrow"><span />خدماتنا</span><h1>خبرة متكاملة.<br /><em>لكل مرحلة هدف واضح.</em></h1><p>من قرار شراء الأرض إلى آخر تفصيلة في التنفيذ، ننسّق المعرفة العقارية والهندسية لتبقى قرارات مشروعك مترابطة.</p></div></section>
    <section className="section"><div className="container"><div className="service-groups-grid">{serviceGroups.map((group, index) => <Link href={`/services/${group.slug}`} className="service-group-card" key={group.slug}><div className="service-group-image"><Image src={group.image} alt={`تصور توضيحي — ${group.title}`} fill sizes="(max-width: 700px) 100vw, 50vw" /><span>0{index + 1}</span></div><div><span className="eyebrow">{group.eyebrow}</span><h2>{group.title}</h2><p>{group.description}</p><span className="text-link">اكتشف هذا المحور <ArrowUpLeft size={17} /></span></div></Link>)}</div></div></section>
    <section className="section services-map"><div className="container"><div className="section-heading"><span className="eyebrow"><span />خريطة الخدمات</span><h2>عشر خدمات،<br /><em>ومسار واحد لمشروعك.</em></h2><p>افتح كل خدمة لقراءة ملخصها، ثم انتقل إلى المحور المناسب لمعرفة التفاصيل وطلب الاستشارة.</p></div><ServicesList detailed /></div></section>
    <section className="simple-cta"><div className="container"><h2>لست متأكداً من الخدمة التي تحتاجها؟</h2><p>ابدأ بوصف مشروعك، ودعنا نساعدك في تحديد نقطة البداية.</p><Link href="/contact" className="button button-primary">ناقش مشروعك معنا <ArrowUpLeft size={18} /></Link></div></section>
  </main>;
}
