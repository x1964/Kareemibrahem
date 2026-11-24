// Generates public/resume.pdf — a minimal single-page PDF resume.
// Run: node scripts/make-resume.mjs
import { writeFileSync } from "node:fs";

const lines = [
  [24, "Kareem Ibrahem"],
  [14, "Full-Stack Developer"],
  [11, "Egypt | kareemelsha3sha3y@gmail.com | linkedin.com/in/kereemibrahem | github.com/x1964"],
  [],
  [12, "PROFILE"],
  [10, "Self-taught full-stack developer building modern web applications, SaaS products, and"],
  [10, "AI-powered experiences since 2020."],
  [],
  [12, "SELECTED PROJECTS"],
  [10, "Narqa Academy - bilingual educational platform. Next.js, React, TypeScript, Supabase. Live."],
  [10, "EduMind - AI-powered study platform from your own materials. Next.js, Supabase, Gemini API. Beta."],
  [10, "Tribblly - interest-based community platform. Next.js, React, Supabase, PostgreSQL. Early Access."],
  [],
  [12, "SKILLS"],
  [10, "Frontend: JavaScript, TypeScript, React, Next.js, HTML, CSS, Tailwind CSS"],
  [10, "Backend: Node.js (via Next.js), PHP, REST APIs, Authentication"],
  [10, "Database: Supabase, PostgreSQL, MySQL, SQL"],
  [10, "Tools: Git, GitHub, Vercel, VS Code | AI API integration, application security, testing"],
  [],
  [12, "EDUCATION"],
  [10, "General Secondary Education, Egypt - expected graduation 2028"],
  [],
  [12, "LANGUAGES"],
  [10, "Arabic - native | English - B2 (self-assessed)"],
];

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

let content = "BT\n/F1 24 Tf\n";
let y = 800;
for (const [size, text] of lines) {
  if (size === null || text === undefined) {
    y -= 8;
    continue;
  }
  content += `/F${size === 24 ? 1 : size === 14 ? 2 : size === 12 ? 3 : 4} ${size} Tf\n1 0 0 1 50 ${y} Tm\n(${esc(text)}) Tj\n`;
  y -= size === 24 ? 30 : size === 14 ? 20 : size === 12 ? 18 : 14;
}
content += "ET\n";

const objects = [];
objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
objects[3] =
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] " +
  "/Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R /F4 7 0 R >> >> " +
  "/Contents 8 0 R >>";
objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
objects[6] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
objects[7] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objects[8] = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}endstream`;

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let i = 1; i <= 8; i++) {
  offsets[i] = Buffer.byteLength(pdf, "latin1");
  pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefStart = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 9\n0000000000 65535 f \n`;
for (let i = 1; i <= 8; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

writeFileSync("public/resume.pdf", Buffer.from(pdf, "latin1"));
console.log("wrote public/resume.pdf", Buffer.byteLength(pdf), "bytes");
