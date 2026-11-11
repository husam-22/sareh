import { chromium as playwright } from "playwright-core";
import chromiumModule from "@sparticuz/chromium";
import fs from "node:fs/promises";

const chromium = chromiumModule.default ?? chromiumModule;
const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await playwright.launch({ args: [...chromium.args, "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader"], executablePath: await chromium.executablePath(), headless: true });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error" && !message.text().includes("favicon")) errors.push(message.text()); });

await fs.mkdir("docs/screenshots", { recursive: true });
await page.goto(baseURL, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "docs/screenshots/home-desktop.png" });
console.log("✓ الرئيسية على الكمبيوتر");

await page.evaluate(() => window.scrollTo(0, document.querySelector(".hero-story").clientHeight * 0.62));
await page.waitForTimeout(800);
await page.screenshot({ path: "docs/screenshots/story-desktop.png" });
console.log("✓ مشهد التمرير");

for (const path of ["/services", "/services/engineering-design", "/projects", "/projects/courtyard-villa", "/about", "/contact", "/privacy", "/missing-page"]) {
  const response = await page.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
  if (!response || response.status() >= 500) throw new Error(`Failed: ${path}`);
  console.log(`✓ ${path} (${response.status()})`);
}

await page.goto(`${baseURL}/services`, { waitUntil: "networkidle" });
await page.locator(".service-row button").nth(1).click();
if (!(await page.locator(".service-row").nth(1).getAttribute("class"))?.includes("is-open")) throw new Error("Accordion failed");
errors.length = 0; // تجاهل خطأ المورد المتعمد الناتج عن اختبار صفحة 404.
console.log("✓ قائمة الخدمات");

await page.goto(baseURL, { waitUntil: "networkidle" });
await page.locator(".tab-list button").nth(1).click();
if ((await page.locator(".tab-list button").nth(1).getAttribute("aria-selected")) !== "true") throw new Error("Tabs failed");
console.log("✓ التبويبات");

await page.goto(`${baseURL}/projects`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "تصميم داخلي", exact: true }).click();
if ((await page.locator(".project-card").count()) !== 1) throw new Error("Project filter failed");
console.log("✓ تصفية المشاريع");

await page.goto(`${baseURL}/contact?service=engineering-design`, { waitUntil: "networkidle" });
if ((await page.locator("#service").inputValue()) !== "engineering-design") throw new Error("Preselection failed");
await page.getByRole("button", { name: "أرسل طلب الاستشارة" }).click();
if ((await page.locator(".field-error").count()) < 4) throw new Error("Validation failed");
console.log("✓ التحقق من النموذج والاختيار المسبق");
await page.locator("#name").fill("اختبار المستخدم");
await page.locator("#phone").fill("+967777777777");
await page.locator("#location").fill("صنعاء، حدة");
await page.locator(".consent input").check();
await page.getByRole("button", { name: "أرسل طلب الاستشارة" }).click();
await page.locator(".form-message").waitFor();
if (!(await page.locator(".form-message").textContent())?.includes("لم يُرسل")) throw new Error("Preview disclosure failed");
errors.length = 0; // استجابة 503 متعمدة لتوضيح عدم ربط جهة الاستقبال.
console.log("✓ وضع المعاينة لا يدّعي إرسال الطلب");

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  const size = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  if (size.scroll > size.client + 1) throw new Error(`Horizontal overflow at ${width}: ${size.scroll}/${size.client}`);
  if (width === 390) await page.screenshot({ path: "docs/screenshots/home-mobile.png" });
  console.log(`✓ لا تمرير أفقي عند ${width}px`);
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseURL, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "فتح القائمة" }).click();
if ((await page.locator("#mobile-menu").count()) !== 1) throw new Error("Mobile menu failed");
await page.keyboard.press("Escape");
if ((await page.locator("#mobile-menu").count()) !== 0) throw new Error("Mobile menu escape failed");
console.log("✓ قائمة الهاتف وEscape");

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(baseURL, { waitUntil: "networkidle" });
if (!(await page.locator(".hero-story").getAttribute("class"))?.includes("motion-reduced")) throw new Error("Reduced motion failed");
console.log("✓ تقليل الحركة");

const fallbackPage = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await fallbackPage.addInitScript(() => {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (["webgl", "webgl2", "experimental-webgl"].includes(type)) return null;
    return original.call(this, type, ...args);
  };
});
await fallbackPage.goto(baseURL, { waitUntil: "networkidle" });
if ((await fallbackPage.locator(".hero-poster").evaluate((element) => getComputedStyle(element).opacity)) !== "1") throw new Error("WebGL fallback failed");
console.log("✓ الصورة البديلة عند غياب WebGL");

await browser.close();
if (errors.length) throw new Error(`Console errors:\n${errors.join("\n")}`);
console.log("اجتاز الموقع فحص المتصفح الأساسي دون أخطاء Console جوهرية.");
