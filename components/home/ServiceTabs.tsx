"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import { serviceGroups } from "@/data/services";

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = serviceGroups[active];
  const onKeyDown = (event: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = active;
    if (event.key === "ArrowLeft") next = (active + 1) % serviceGroups.length;
    if (event.key === "ArrowRight") next = (active - 1 + serviceGroups.length) % serviceGroups.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = serviceGroups.length - 1;
    setActive(next);
    refs.current[next]?.focus();
  };
  return <div className="service-tabs">
    <div className="tab-list" role="tablist" aria-label="محاور الخدمات" onKeyDown={onKeyDown}>{serviceGroups.map((item, index) => <button ref={(el) => { refs.current[index] = el; }} key={item.slug} role="tab" id={`tab-${item.slug}`} aria-selected={active === index} aria-controls={`panel-${item.slug}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.shortTitle}</button>)}</div>
    <div className="tab-panel" key={service.slug} role="tabpanel" id={`panel-${service.slug}`} aria-labelledby={`tab-${service.slug}`}>
      <div className="tab-image"><Image src={service.image} alt={`تصور توضيحي لمحور ${service.shortTitle}`} fill sizes="(max-width: 800px) 100vw, 44vw" /><span>تصور توضيحي</span></div>
      <div className="tab-copy"><span className="eyebrow">{service.eyebrow}</span><h3>{service.headline}</h3><p>{service.description}</p><ul>{service.details.map((detail) => <li key={detail}><Check size={16} />{detail}</li>)}</ul><Link href={`/services/${service.slug}`} className="button button-outline">اكتشف الخدمة <ArrowUpLeft size={18} /></Link></div>
    </div>
  </div>;
}
