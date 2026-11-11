"use client";

import Link from "next/link";
import { ArrowUpLeft, Plus } from "lucide-react";
import { useState } from "react";
import { allServices } from "@/data/services";

export function ServicesList({ detailed = false }: { detailed?: boolean }) {
  const [open, setOpen] = useState<number | null>(detailed ? 0 : null);
  return <div className={`services-list ${detailed ? "detailed" : ""}`}>{allServices.map((service, index) => {
    const expanded = open === index;
    return <article className={`service-row ${expanded ? "is-open" : ""}`} key={service.number}>
      <button type="button" aria-expanded={expanded} aria-controls={`service-detail-${index}`} onClick={() => setOpen(expanded ? null : index)}><span className="service-number">{service.number}</span><h3>{service.title}</h3><Plus className="service-plus" /></button>
      <div className="service-row-detail" id={`service-detail-${index}`} hidden={!expanded}><p>{service.text}</p><Link href={`/services/${service.group}`} className="text-link">تفاصيل المحور <ArrowUpLeft size={16} /></Link></div>
    </article>;
  })}</div>;
}
