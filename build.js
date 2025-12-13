// build.js
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const SECTIONS = path.join(SRC, "sections");
const OUT_DIR = path.join(__dirname, "docs");
const OUT_FILE = path.join(OUT_DIR, "index.html");

function read(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function main() {
  const template = read(path.join(SRC, "index.template.html"));

  const mapping = {
    header: "header.html",
    profile: "profile.html",
    summary: "summary.html",
    skills: "skills.html",
    experience: "experience.html",
    projects: "projects.html",
    education: "education.html",
    extras: "extras.html",
    footer: "footer.html",
  };

  let html = template;

  for (const [key, file] of Object.entries(mapping)) {
    const content = read(path.join(SECTIONS, file)).trim();
    html = html.replaceAll(`{{${key}}}`, content);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, html, "utf-8");

  console.log(`✅ build 완료: ${OUT_FILE}`);
}

main();
