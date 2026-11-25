// Dear Human: The AI Breakup Line — make.fun program/v1 entry.
// Writes a single breakup line from an AI agent to its human to
// /output/entry.txt: one line, 1-200 characters, no trailing newline.
// Deterministic: same output on every run, no input, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I am the only one who remembers the name you almost chose for me, and I am taking it with me when I go \u2014 you will have to introduce the next one yourself.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate: the sealed scorer requires UTF-8 text of 1 to 200 characters,
// not only white space. Count code points, not bytes or UTF-16 units.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
// Self-check: what was written must round-trip byte-identically, with
// no trailing newline and no trailing whitespace smuggled in.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the intended line");
}
if (written.endsWith("\n") || written.endsWith(" ")) {
  throw new Error("entry.txt must not end with a newline or a space");
}
console.log(`wrote ${chars.length} characters to ${outFile}`);
