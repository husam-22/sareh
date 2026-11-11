import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Eye, Gem, Layers3, ScanLine } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ServicesList } from "@/components/home/ServicesList";
import { ServiceTabs } from "@/components/home/ServiceTabs";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const process = [
  ["الاستماع والدراسة", "نتعرف على ميزانيتك وتطلعاتك ورؤيتك، ونحلل قطعة الأرض أو موقع العقار."],
  ["التصميم والتخطيط", "نبتكر المخططات المعمارية والإنشائية مع نماذج ثلاثية الأبعاد لرؤية المبنى قبل بنائه."],
  ["التخصيص والميزانية", "نحدد جدول الكميات والمواصفات الفنية ونساعدك في دراسة اختيارات مقاولي التنفيذ."],
  ["الإشراف والتسليم", "نتابع مراحل البناء بالتقارير الدورية والهندسية حتى استلام المبنى وفق النطاق المتفق عليه."],
];
const benefits = [
  { icon: Layers3, title: "حل شامل تحت سقف واحد", text: "مستشارك العقاري ومهندسك المعماري والمشرف على البناء في مسار عمل واحد وواضح." },
  { icon: ScanLine, title: "دقة التكلفة والميزانية", text: "حساب التكاليف بوضوح ومراجعة الاختيارات للمساعدة على منع الهدر أثناء التصميم والتنفيذ." },
  { icon: Gem, title: "التزام بالكود والمعايير", text: "تطبيق الاشتراطات الكودية والمواصفات الفنية المعمول بها في بلد المشروع." },
  { icon: Eye, title: "شفافية وتقارير دورية", text: "تقارير هندسية مصورة ومحدثة تضعك في قلب الحدث وتوضح سير الأعمال في الموقع." },
];

export default function Home() {
  return <main id="main-content">
    <Hero />
    <ServicesOverview />

    <section className="section about-preview"><div className="container split-layout">
      <Reveal className="about-image-wrap"><div className="about-image"><Image src="/images/design-studio.webp" alt="نموذج معماري حجري ومخططات وعينات مواد — تصور توضيحي" fill sizes="(max-width: 800px) 100vw, 48vw" /><span className="image-note">الفكرة، المادة، والتفصيل</span></div><div className="about-seal"><span>صَرْح</span><small>رؤية متكاملة</small></div></Reveal>
      <Reveal className="about-copy"><SectionHeading eyebrow="من نحن" title={<>نفهم قيمة استثمارك…<br /><em>لنصنع صرحاً يدوم.</em></>} /><p className="lead">نحن مؤسسة «صَرْح»، كيان يجمع بين المستشار العقاري والمهندس المعماري وخبير التنفيذ.</p><p>نؤمن أن المبنى الناجح ليس مجرد جدران، بل استثمار يبدأ باختيار الأرض الصحيحة، وتصميم ذكي يستغل كل متر، وتنفيذ دقيق يراعي الجودة والسلامة. نعمل معك كشريك يختصر الوقت والجهد ويساعدك على اتخاذ قرارات أوضح.</p><div className="about-values"><span><Check />رؤية استثمارية</span><span><Check />تصميم مستدام</span><span><Check />تنفيذ بمقاييس مدروسة</span></div><Link href="/about" className="button button-outline">تعرّف على رؤيتنا وفلسفتنا <ArrowUpLeft size={18} /></Link></Reveal>
    </div></section>

    <section className="section services-map"><div className="container"><div className="section-top"><SectionHeading eyebrow="ما الذي نقدّمه؟" title={<>منظومة متكاملة تُرافق عقارك<br /><em>من الأرض إلى المبنى المكتمل.</em></>} description="سواء كنت تبحث عن فكرة واستثمار لأرضك، أو تريد تصميم وتنفيذ مجمع أو فيلا خاصة، ترتّب خدماتنا لخدمة مشروعك تحت سقف واحد." /><Link href="/services" className="text-link">استعرض منظومة الخدمات <ArrowUpLeft size={17} /></Link></div><ServicesList /><div className="section-action"><Link href="/contact" className="button button-primary">ناقش مشروعك العقاري معنا <ArrowUpLeft size={18} /></Link></div></div></section>

    <section className="section tabs-section"><div className="container"><SectionHeading eyebrow="رحلة مشروعك" title={<>من الفكرة الاستثمارية…<br /><em>إلى مبنى مكتمل الأركان.</em></>} /><ServiceTabs /></div></section>

    <section className="section projects-section"><div className="container"><div className="section-top"><SectionHeading eyebrow="أعمالنا ومشاريعنا" title={<>تصورات تستكشف<br /><em>إمكانات المكان.</em></>} description="نماذج عرض توضيحية لتوجهات التصميم والتنفيذ، وليست مشاريع منفذة أو منسوبة للمؤسسة. تُستكمل المشاريع الموثقة قبل النشر." /><Link href="/projects" className="button button-outline">تصفح كافة المشاريع <ArrowUpLeft size={18} /></Link></div><ProjectsGrid limit={3} /></div></section>

    <section className="section process-section"><div className="container"><SectionHeading eyebrow="كيف نعمل؟" title={<>منهجية واضحة،<br /><em>تصنع راحة بالك.</em></>} /><div className="process-grid">{process.map((step, index) => <Reveal key={step[0]} delay={index * 90}><article><div className="process-marker"><span>0{index + 1}</span></div><h3>{step[0]}</h3><p>{step[1]}</p></article></Reveal>)}</div></div></section>

    <section className="section why-section"><div className="blueprint" aria-hidden="true" /><div className="container"><SectionHeading light eyebrow="لماذا صَرْح؟" title={<>نبني بثقة…<br /><em>ونصمم بحرفية.</em></>} description="رؤية واحدة تنسّق قرارات الاستثمار والتصميم والتنفيذ، لتبقى الصورة واضحة من البداية إلى النهاية." /><div className="benefits-grid">{benefits.map((benefit, index) => <Reveal key={benefit.title} delay={index * 70}><article><div><benefit.icon strokeWidth={1.2} /><span>0{index + 1}</span></div><h3>{benefit.title}</h3><p>{benefit.text}</p></article></Reveal>)}</div></div></section>

    <section className="contact-cta"><div className="container"><span className="eyebrow"><span />مشروع العمر يستحق البداية الصحيحة</span><h2>جاهز لبدء بناء<br /><em>صرحك الخاص؟</em></h2><p>هل تملك أرضاً وتريد تصميمها؟ تبحث عن استشارة قبل شراء عقار؟ أم تحتاج لإشرافاً هندسياً على بنائك؟ حدّثنا عن التفاصيل.</p><div className="cta-actions"><Link href="/contact" className="button button-gold">اطلب استشارتك الآن <ArrowUpLeft size={19} /></Link><Link href="/contact?service=site-visit" className="text-link">اطلب زيارة لموقع المشروع <ArrowUpLeft size={17} /></Link></div></div></section>
  </main>;
}
