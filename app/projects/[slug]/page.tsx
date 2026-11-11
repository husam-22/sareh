import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpLeft, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.title} — تصور توضيحي`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <main id="main-content" className="inner-page project-detail-page">
    <section className="project-detail-head"><div className="container"><nav className="breadcrumbs" aria-label="مسار الصفحة"><Link href="/projects">المشاريع</Link><span>/</span><span>{project.title}</span></nav><div className="project-title-row"><div><span className="eyebrow"><span />{project.category}</span><h1>{project.title}</h1></div><span className="concept-badge">تصور معماري توضيحي</span></div></div></section>
    <div className="container project-main-image"><Image src={project.image} alt={`${project.title} — تصور معماري توضيحي`} fill priority sizes="100vw" /></div>
    <section className="section"><div className="container project-narrative"><div><span className="eyebrow"><span />النبذة</span><h2>فكرة المكان.</h2><p className="lead">{project.summary}</p><div className="project-scope">{project.scope.map((item) => <span key={item}><Check size={15} />{item}</span>)}</div></div><div className="narrative-pair"><article><span>01 / التحدي</span><h3>السؤال التصميمي</h3><p>{project.challenge}</p></article><article><span>02 / المعالجة</span><h3>اتجاه المعالجة</h3><p>{project.approach}</p></article></div></div></section>
    <section className="container project-gallery"><div><Image src={project.image} alt={`زاوية أخرى من ${project.title} — التصور ذاته`} fill sizes="70vw" /></div><div className="gallery-note"><span>ملاحظة</span><p>هذه دراسة بصرية توضيحية لأسلوب العرض، وليست ادعاء تنفيذ أو نسبة عمل للمؤسسة.</p></div></section>
    <section className="simple-cta"><div className="container"><h2>لديك أرض أو فكرة تستحق الدراسة؟</h2><p>لنبدأ من احتياجك، ونستكشف معاً الاحتمالات المناسبة للمكان.</p><Link href="/contact" className="button button-primary">ناقش مشروعك معنا <ArrowUpLeft size={18} /></Link></div></section>
  </main>;
}
