const fs = require("fs");
const path = require("path");

// Path to coverage-summary.json (same for backend + frontend)
const summary = path.resolve(__dirname, "../coverage/coverage-summary.json");

if (!fs.existsSync(summary)) {
  console.error("Coverage summary not found");
  process.exit(0);  
}

const data = JSON.parse(fs.readFileSync(summary, "utf8"));
const pct = data.total.lines.pct;

console.log("Coverage = " + pct + "%");

process.exit(0);
