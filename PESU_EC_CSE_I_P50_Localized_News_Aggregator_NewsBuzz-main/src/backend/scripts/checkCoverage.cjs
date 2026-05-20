const fs = require("fs");
const path = require("path");

const summary = path.resolve(__dirname, "../coverage/coverage-summary.json");

if (!fs.existsSync(summary)) {
  console.error("Coverage summary not found");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(summary, "utf8"));
const pct = data.total.lines.pct;

console.log("Coverage = " + pct + "%");

if (pct < 75) {
  console.error("Coverage below threshold");
  process.exit(1);
}

process.exit(0);
