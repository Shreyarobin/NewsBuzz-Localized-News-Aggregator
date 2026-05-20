const fs = require("fs");

const file = process.argv[2];

if (!file) {
  console.error("❌ No ESLint JSON file provided.");
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.error("❌ ESLint report file not found:", file);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file));

let errors = 0;
let warnings = 0;

data.forEach((r) => {
  errors += r.errorCount;
  warnings += r.warningCount;
});

// Score formula (0–10)
let score = 10 - Math.floor(errors / 4) - Math.floor(warnings / 8);
if (score < 0) score = 0;

console.log("Frontend Lint Score:", score);

if (score < 7) {
  console.error("❌ Frontend lint score below required threshold!");
  process.exit(1);
}
