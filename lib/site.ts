export const site = {
  name: "صَرْح",
  legalName: "مؤسسة صَرْح للاستشارات العقارية والهندسية وإدارة البناء",
  description: "استشارات عقارية وهندسية وإدارة بناء، من دراسة الأرض والفكرة إلى التصميم ومتابعة التنفيذ.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "",
};

export const navigation = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا" },
  { href: "/projects", label: "مشاريعنا" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];
