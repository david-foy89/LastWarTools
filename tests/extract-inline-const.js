const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function extractInlineConstArray(relativeFilePath, constName) {
  const fullPath = path.resolve(process.cwd(), relativeFilePath);
  const source = fs.readFileSync(fullPath, "utf8");
  const pattern = new RegExp(
    `const\\s+${constName}\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);`,
  );
  const match = source.match(pattern);

  if (!match) {
    throw new Error(`Could not find const array "${constName}" in ${relativeFilePath}`);
  }

  const literal = match[1];
  return vm.runInNewContext(`(${literal})`, {}, { timeout: 1000 });
}

module.exports = {
  extractInlineConstArray,
};
