import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "Placeholder";
const MAX_CHARS = 24;

function validate(entry: string): void {
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (!entry.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(entry)) {
    throw new Error("entry must be exactly one word");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
  const roundTrip = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("round-trip mismatch: entry.txt does not match ENTRY");
  }
}

main();
