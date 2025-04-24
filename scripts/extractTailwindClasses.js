import fs from "fs";
import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getViteConfig() {
  const configPath = path.join(__dirname, "../vite.config.ts");
  const configContent = fs.readFileSync(configPath, "utf-8");
  // Simple regex to extract prefix value
  const prefixMatch = configContent.match(/prefix:\s*['"]([^'"]+)['"]/);
  return prefixMatch ? prefixMatch[1] : "pf"; // Default to 'pf' if not found
}

function isValidString(str) {
  const forbiddenStrings = [
    "import",
    "@",
    "react",
    "root element",
    "return",
    "#",
    "className",
    "./",
    "..",
  ];
  console.log("Checking string:", str);
  // Check if the string contains any forbidden characters or patterns
  const match = forbiddenStrings.some((forbidden) =>
    str.toLowerCase().includes(forbidden)
  );
  if (match) return false; // Forbidden string found
  return true;
}

function extractStringsFromContent(content, prefixName) {
  const strings = new Set();
  const stringPattern = /(["'`])(?:(?=(\\?))\2.)*?\1/g; // Matches both single double quoted strings and escaped strings
  const matches = [...content.matchAll(stringPattern)];

  matches.forEach((match) => {
    if (isValidString(match[0])) {
      // Check if the string starts with the prefix
      match[0].split(" ").forEach((str) => {
        if (
          !str.startsWith(prefixName) &&
          str.length > 0 &&
          str[0] !== "#" &&
          str[0] !== "/" &&
          str !== "true" &&
          str !== "false" &&
          str !== "as" &&
          str !== "className" &&
          str !== "/" &&
          str !== "for" &&
          isNaN(Number(str))
        ) {
          strings.add(
            `${prefixName}:${str
              .replace(/"/g, "")
              .replace(/'/g, "")
              .replace("--color-", "--pf-color-")}`
          ); // Use the split string instead of the whole match
        }
      });
    }
  });

  return new Set(Array.from(strings));
}

function processFiles() {
  const prefixName = getViteConfig();
  const files = glob.sync(`src/**/*.{jsx,tsx,js,ts}`);
  const allStrings = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const strings = extractStringsFromContent(content, prefixName);
    strings.forEach((str) => allStrings.add(str));
  });

  const outputPath = path.join(__dirname, "../src/tailwind-classes.txt");
  fs.writeFileSync(outputPath, Array.from(allStrings).join("\n"));
}

processFiles();
