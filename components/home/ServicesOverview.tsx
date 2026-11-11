import Link from "next/link";
import { ArrowUpLeft, Building2, Compass, HardHat } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  { number: "01", icon: Building2, title: "استشارات وتقييم عقاري", text: "تحليل الفرص الاستثمارية، دراسات الجدوى للأراضي، واختيار الموقع الأنسب لمشروعك السكني أو التجاري.", link: "استكشف الاستشارات العقارية", href: "/services/real-estate-consulting" },
  { number: "02", icon: Compass, title: "تصميم معماري وهندسي", text: "مخططات معمارية وإنشائية مبتكرة تجمع بين الجمال، كفاءة المساحات، ومراعاة كود البناء ومعايير الجودة.", link: "تعرّف على الحلول الهندسية", href: "/services/engineering-design" },
  { number: "03", icon: HardHat, title: "إدارة البناء والإشراف", text: "إدارة المقاولات، الإشراف الهندسي المباشر، ضبط الجودة، ومتابعة الجدول الزمني والميزانية حتى تسليم المبنى.", link: "اكتشف خدمات التنفيذ", href: "/services/construction-management" },
];

export function ServicesOverview() {
  return <section className="services-overview"><div className="container service-card-grid">{cards.map((card, index) => <Reveal key={card.number} delay={index * 90}><article className="service-card"><div className="service-card-top"><card.icon strokeWidth={1.35} /><span>{card.number}</span></div><h2>{card.title}</h2><p>{card.text}</p><Link href={card.href} className="text-link">{card.link}<ArrowUpLeft size={17} /></Link></article></Reveal>)}</div></section>;
}
