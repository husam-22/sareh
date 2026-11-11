"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { useState } from "react";
import { categories, projects } from "@/data/projects";

export function ProjectsGrid({ limit, filter = false }: { limit?: number; filter?: boolean }) {
  const [active, setActive] = useState(categories[0]);
  const shown = (active === categories[0] ? projects : projects.filter((project) => project.category === active)).slice(0, limit ?? projects.length);
  return <>
    {filter && <div className="project-filters" role="group" aria-label="تصفية المشاريع">{categories.map((category) => <button type="button" key={category} className={active === category ? "active" : ""} aria-pressed={active === category} onClick={() => setActive(category)}>{category}</button>)}</div>}
    <div className="projects-grid" aria-live="polite">{shown.map((project, index) => <Link href={`/projects/${project.slug}`} className={`project-card ${index === 0 ? "featured" : ""}`} key={project.slug}>
      <div className="project-image"><Image src={project.image} alt={`${project.title} — ${project.location}`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 65vw" : "(max-width: 800px) 100vw, 35vw"} /><span>تصور معماري توضيحي</span><i><ArrowUpLeft /></i></div>
      <div className="project-meta"><div><span>{project.category}</span><h3>{project.title}</h3></div><small>0{projects.indexOf(project) + 1}</small></div>
    </Link>)}</div>
    {shown.length === 0 && <p className="empty-state">لا توجد تصورات في هذا التصنيف حالياً.</p>}
  </>;
}
