import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export const metadata: Metadata = { title: "المشاريع والتصورات", description: "معرض تصورات معمارية توضيحية لصَرْح في الفلل والمجمعات والتصميم الداخلي ومتابعة التنفيذ." };

export default function ProjectsPage() {
  return <main id="main-content" className="inner-page"><section className="page-hero projects-page-hero"><div className="container"><span className="eyebrow"><span />معرض التصورات</span><h1>كل مساحة تحمل<br /><em>أكثر من احتمال.</em></h1><p>استكشف نماذج بصرية توضيحية تُظهر طريقة تفكيرنا في الكتلة والمادة والفراغ. هذه التصورات ليست توثيقاً لمشاريع منفذة للمؤسسة.</p></div></section><section className="section projects-index"><div className="container"><div className="demo-disclosure"><strong>ملاحظة تحريرية</strong><p>جميع المواد الحالية موسومة «تصور معماري توضيحي». تُضاف المشاريع الحقيقية بعد توفير بياناتها والموافقة على نشرها.</p></div><ProjectsGrid filter /></div></section></main>;
}
