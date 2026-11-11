import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft, Check } from "lucide-react";
import { allServices, getService, serviceGroups } from "@/data/services";

export function generateStaticParams() { return serviceGroups.map((service) => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  return service ? { title: service.title, description: service.description } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = allServices.filter((item) => item.group === service.slug);
  return <main id="main-content" className="inner-page service-detail-page">
    <section className="detail-hero"><div className="container detail-hero-grid"><div><nav className="breadcrumbs" aria-label="مسار الصفحة"><Link href="/services">خدماتنا</Link><span>/</span><span>{service.shortTitle}</span></nav><span className="eyebrow"><span />{service.eyebrow}</span><h1>{service.headline}</h1><p>{service.description}</p><Link href={`/contact?service=${service.slug}`} className="button button-primary">اطلب هذه الخدمة <ArrowUpLeft size={18} /></Link></div><div className="detail-hero-image"><Image src={service.image} alt={`تصور توضيحي — ${service.title}`} fill priority sizes="(max-width: 800px) 100vw, 48vw" /><span>تصور معماري توضيحي</span></div></div></section>
    <section className="section"><div className="container service-detail-grid"><div><span className="eyebrow"><span />نطاق العمل</span><h2>ما الذي يشمله<br /><em>هذا المحور؟</em></h2><p>يُحدد النطاق النهائي والمخرجات والمدة بعد فهم مشروعك ومتطلباته والاشتراطات المعمول بها في بلد المشروع.</p></div><ul className="detail-checklist">{service.details.map((detail, index) => <li key={detail}><span>0{index + 1}</span><Check />{detail}</li>)}</ul></div></section>
    <section className="section related-services"><div className="container"><div className="section-heading"><span className="eyebrow"><span />خدمات مترابطة</span><h2>ضمن نفس المسار.</h2></div><div className="related-service-list">{related.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="simple-cta"><div className="container"><h2>لديك سؤال عن {service.shortTitle}؟</h2><p>أرسل تفاصيل مشروعك لنبدأ بفهم الاحتياج ونطاق العمل المناسب.</p><Link href={`/contact?service=${service.slug}`} className="button button-primary">ابدأ الاستشارة <ArrowUpLeft size={18} /></Link></div></section>
  </main>;
}
