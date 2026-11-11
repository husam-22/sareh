"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpLeft, Pause, Play } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneBoundary } from "@/components/three/SceneBoundary";

const BuildingScene = dynamic(() => import("@/components/three/BuildingScene"), { ssr: false });
const stages = [
  { eyebrow: "01 / الأرض", text: "كل صرح يبدأ بقرار مدروس." },
  { eyebrow: "02 / المخطط", text: "نحوّل الرؤية إلى تصميم." },
  { eyebrow: "03 / التنفيذ", text: "ونتابع التفاصيل حتى التنفيذ." },
];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);
  const [sceneActive, setSceneActive] = useState(false);
  const [stage, setStage] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 769px)", mobile: "(max-width: 768px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions as { reduce: boolean; mobile: boolean };
      if (conditions.reduce || reduced) {
        progress.current = 1;
        setReduced(true);
        setSceneActive(true);
        setStage(2);
        return;
      }
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: conditions.mobile ? "+=160%" : "+=180%",
        pin: ".hero-sticky",
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          progress.current = self.progress;
          setSceneActive(self.progress > 0.025);
          const next = self.progress < 0.2 ? -1 : self.progress < 0.48 ? 0 : self.progress < 0.73 ? 1 : 2;
          setStage((current) => current === next ? current : next);
          section.current?.style.setProperty("--story-progress", self.progress.toFixed(3));
        },
      });
      return () => trigger.kill();
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section ref={section} className={`hero-story ${reduced ? "motion-reduced" : ""}`} aria-label="من الأرض إلى الصرح">
      <div className="hero-sticky">
        <Image className={`hero-poster ${ready && sceneActive ? "is-hidden" : ""}`} src="/images/limestone-courtyard.webp" alt="تصور معماري لمبنى معاصر من الحجر الجيري يتحول من مخطط هندسي إلى مبنى مكتمل" fill priority loading="eager" sizes="100vw" />
        <SceneBoundary onError={() => { setReady(false); setSceneActive(false); }}><BuildingScene progress={progress} reduced={reduced} visible={ready && sceneActive} onReady={() => setReady(true)} /></SceneBoundary>
        <div className={`hero-content container ${stage >= 0 ? "story-active" : ""}`}>
          <div className="hero-copy">
            <span className="eyebrow"><span />صَرْح للاستشارات العقارية والهندسية وإدارة البناء</span>
            <h1>لرؤيتك أرض.<br /><em>ولاستثمارك صَرْح.</em></h1>
            <p>نرافقك من الفكرة الأولى وحتى تسليم المفتاح، بخبرة عقارية وتصميم هندسي وإشراف دقيق يصنع قيمة مستدامة.</p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-primary">ابدأ استشارتك الآن <ArrowUpLeft size={19} /></Link>
              <Link href="/projects" className="text-link">استكشف مشاريعنا <ArrowUpLeft size={17} /></Link>
            </div>
          </div>
          {stage >= 0 && <div className="story-caption" key={stage}><span>{stages[stage].eyebrow}</span><h2>{stages[stage].text}</h2></div>}
        </div>
        <div className="hero-bottom container">
          <div className="scroll-hint"><ArrowDown size={16} /><span>مرّر لترى الحكاية</span></div>
          <div className="story-progress" aria-hidden="true"><span>الأرض</span><i><b style={{ width: `${stage < 0 ? 4 : (stage + 1) * 33.33}%` }} /></i><span>الصرح</span></div>
          <button className="motion-toggle" onClick={() => setReduced(!reduced)} aria-pressed={reduced}>{reduced ? <Play size={14} /> : <Pause size={14} />}{reduced ? "تشغيل الحركة" : "تقليل الحركة"}</button>
        </div>
      </div>
    </section>
  );
}
