import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div className="not-found-plan" aria-hidden="true">404</div><div><span className="eyebrow"><span />خارج المخطط</span><h1>هذه الصفحة<br /><em>ليست ضمن التصميم.</em></h1><p>ربما تغيّر الرابط أو كُتب العنوان بصورة غير صحيحة. يمكنك العودة إلى البداية أو استكشاف خدماتنا.</p><div><Link href="/" className="button button-primary">العودة للرئيسية <ArrowUpLeft size={18} /></Link><Link href="/services" className="text-link">استكشف الخدمات <ArrowUpLeft size={17} /></Link></div></div></main>;
}
