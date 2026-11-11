# موقع صَرْح

موقع عربي متكامل لمؤسسة **صَرْح للاستشارات العقارية والهندسية وإدارة البناء**، مبني بـNext.js وTypeScript. يتضمن مشهداً إجرائياً ثلاثي الأبعاد يتحول من الأرض والمخطط إلى الهيكل والواجهات مع التمرير.

## التشغيل

```bash
npm install
npm run dev
```

يفتح الموقع على `http://localhost:3000`. للإنتاج:

```bash
npm run typecheck
npm run build
npm start
```

## الصفحات

- `/` الرئيسية والمشهد التفاعلي ومحاور الخدمات والتصورات والتواصل.
- `/services` و4 صفحات تفصيلية مرتبطة بها.
- `/projects` مع تصفية فعلية و5 قوالب دراسات بصرية موسومة كتصورات توضيحية.
- `/about` و`/contact` و`/privacy` وصفحة 404 عربية.
- `sitemap.xml` و`robots.txt`؛ يظهر رابط الخريطة بعد ضبط `NEXT_PUBLIC_SITE_URL`.

## المشهد والحركة

- `components/three/BuildingScene.tsx`: نموذج Three.js إجرائي مقسم إلى Site وPlan وStructure وEnvelope وLandscape، دون أصل GLB خارجي.
- `components/home/Hero.tsx`: GSAP ScrollTrigger و`matchMedia`، تثبيت مختلف للهاتف والكمبيوتر، وعكس سلس للمراحل عند التمرير للأعلى.
- الصورة المرفقة هي الـposter والبديل الثابت. تظهر أولاً ولا تنتظر WebGL، ويظهر الـCanvas بعد بدء الرحلة.
- يحترم `prefers-reduced-motion`، ويوجد زر «تقليل الحركة»، وحد لـDPR، وإيقاف للرسم خارج المشهد أو عند إخفاء التبويب.

## نموذج التواصل

النموذج يتحقق على العميل والخادم، ويمنع الإرسال المتكرر، ويحتوي على honeypot وحد معدل مؤقت في ذاكرة العملية. **في وضع المعاينة لا يحفظ أو يرسل الطلب**، ويعرض ذلك صراحة مع خيار نسخ التفاصيل.

لربط جهة استقبال فعلية، انسخ `.env.example` إلى `.env.local` واضبط:

```env
CONTACT_DELIVERY_WEBHOOK=https://your-private-endpoint
NEXT_PUBLIC_WHATSAPP_NUMBER=967xxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=info@your-domain
NEXT_PUBLIC_ADDRESS=المدينة، العنوان
NEXT_PUBLIC_SITE_URL=https://your-domain
```

يجب أن تقبل نقطة الاستقبال طلب JSON وتعيد حالة 2xx. لا يظهر نجاح في الواجهة إلا بعد ذلك. مفتاح الربط خادمي ولا يُرسل للمتصفح. عند الإطلاق الموزع يُنقل rate limiting إلى مخزن مشترك مثل Upstart/Redis أو قيد منصة الاستضافة.

## الاختبارات

```bash
npm run typecheck
npm run build
npm run test:smoke
```

اختبار المتصفح يحتاج تشغيل الخادم أولاً، ويمكن توجيهه بـ`TEST_BASE_URL`. يفحص المسارات والتبويبات والتصفية والتحقق والقائمة وتقليل الحركة وعروض 360–1920px، ويحفظ اللقطات في `docs/screenshots`. نتائج البيئة الحالية في `docs/TESTING.md`.

## ملفات مهمة

- `data/services.ts` و`data/projects.ts`: المحتوى القابل للتعديل وطبقة مناسبة لربط CMS لاحقاً.
- `lib/site.ts`: بيانات المؤسسة والتنقل المركزية.
- `docs/ASSETS.md`: مصادر الأصول وتراخيصها.
- `docs/LAUNCH_DATA.md`: ما يلزم استكماله قبل النشر.

> هذه نسخة معاينة قابلة للتطوير، وليست «جاهزة لاستقبال العملاء» قبل إضافة بيانات المؤسسة وربط الاستقبال ومراجعة سياسة الخصوصية والمشاريع الحقيقية.
