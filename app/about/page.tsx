import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Eye, Send } from "lucide-react";

export const metadata: Metadata = { title: "من نحن", description: "رؤية صَرْح ورسالته ومنهجيته في الجمع بين الاستشارة العقارية والتصميم الهندسي وإدارة التنفيذ." };

export default function AboutPage() {
  return <main id="main-content" className="inner-page about-page">
    <section className="page-hero"><div className="container"><span className="eyebrow"><span />من نحن</span><h1>نرى المبنى قبل أن يُبنى.<br /><em>ونرى قيمته بعد أن يكتمل.</em></h1><p>«صَرْح» مساحة تجمع الفكر العقاري والرؤية المعمارية ودقة التنفيذ، لأن القرار الجيد في كل مرحلة يصنع فرقاً في المرحلة التالية.</p></div></section>
    <section className="container about-main-image"><Image src="/images/design-studio.webp" alt="نموذج معماري حجري على طاولة دراسة — تصور توضيحي" fill priority sizes="100vw" /><span>من الفكرة إلى التفصيل — تصور توضيحي</span></section>
    <section className="section"><div className="container about-story"><div><span className="eyebrow"><span />فلسفتنا</span><h2>لسنا طرفاً إضافياً.<br /><em>نحن حلقة الوصل.</em></h2></div><div><p className="lead">نؤمن أن المبنى الناجح ليس مجرد جدران، بل منظومة قرارات مترابطة تبدأ باختيار الأرض الصحيحة.</p><p>لذلك نعمل مع مالك الأرض والمستثمر وصاحب المنزل والمطور التجاري كشريك يوازن بين الطموح والميزانية، وبين الصورة المعمارية ومتطلبات التنفيذ. لا نفصل قيمة الاستثمار عن جودة التصميم، ولا نفصل جمال الفكرة عن دقة تفاصيلها.</p><p>هدفنا أن تمتلك في كل مرحلة معلومة أوضح، وخياراً مفهوماً، وخطوة تالية محسوبة.</p></div></div></section>
    <section className="vision-mission"><div className="container"><article><Eye strokeWidth={1.2} /><span>رؤيتنا</span><h2>أن نكون مرجعاً للحلول المتكاملة التي تجمع بين الذكاء العقاري والتميز الهندسي في تطوير المباني.</h2></article><article><Send strokeWidth={1.2} /><span>رسالتنا</span><h2>تقديم استشارات هندسية وعقارية وحلول بناء شفافة ومبتكرة، تساعد أصحاب العقارات على تحقيق قيمة أفضل وجودة معمارية أرقى.</h2></article></div></section>
    <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow"><span />منهجيتنا</span><h2>الوضوح قبل السرعة.<br /><em>والدليل قبل الافتراض.</em></h2></div><div className="principles-grid"><article><span>01</span><h3>نفهم السياق</h3><p>الموقع، الاحتياج، الميزانية، والاشتراطات المعمول بها هي نقطة البداية لكل قرار.</p></article><article><span>02</span><h3>ننسّق التخصصات</h3><p>نقرأ الاستثمار والعمارة والإنشاء والتنفيذ كصورة واحدة، لا كجزر منفصلة.</p></article><article><span>03</span><h3>نوثّق التقدم</h3><p>مخرجات واضحة ومراجعة مستمرة وتقارير مفهومة تساعدك على متابعة المشروع.</p></article></div></div></section>
    <section className="simple-cta"><div className="container"><h2>شريك واحد، من أول سؤال.</h2><p>احكِ لنا عن مشروعك، ولنحدد معاً أفضل نقطة للبدء.</p><Link href="/contact" className="button button-primary">تواصل معنا <ArrowUpLeft size={18} /></Link></div></section>
  </main>;
}
