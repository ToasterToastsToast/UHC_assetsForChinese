// extract-ps.js
const fs = require("fs");

const inputFile = "D:/homestuck/assets/Asset_Pack/mods/CN-PS.js";
const outputFile = "ps_translations.json";

const content = fs.readFileSync(inputFile, "utf8");

// 匹配形如 archive.mspa.story['000219'].title = '...'
const regex = /archive\.mspa\.story\['(\d+)'\]\.(title|content)\s*=\s*'([^']*)'/g;

let result = {};
let match;

while ((match = regex.exec(content)) !== null) {
  const [_, id, field, text] = match;

  if (!result[id]) {
    result[id] = {};
  }
  result[id][field] = text;
}

// 包装成带 meta 的结构
const output = {
  meta: {
    project: "Problem Sleuth 中文翻译",
    source_language: "en",
    target_language: "zh-cn"
  },
  entries: result
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), "utf8");
console.log(`提取完成，已输出到 ${outputFile}`);
