const docInput = document.getElementById("docInput");
const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

function findAnswer(doc, question) {
  const q = question.trim();

  if (!doc.trim()) {
    return "请先输入文档内容。";
  }

  if (!q) {
    return "请先输入问题。";
  }

  if (q.includes("目标用户") || q.includes("用户是谁")) {
    return extractSection(doc, "目标用户") || "文档中没有明确说明目标用户。";
  }

  if (q.includes("核心功能") || q.includes("功能")) {
    return extractSection(doc, "核心功能") || "文档中没有明确说明核心功能。";
  }

  if (q.includes("约束") || q.includes("不能做什么")) {
    return extractSection(doc, "约束条件") || "文档中没有明确说明约束条件。";
  }

  if (q.includes("后续") || q.includes("计划")) {
    return extractSection(doc, "后续计划") || "文档中没有明确说明后续计划。";
  }

  if (q.includes("解决什么问题") || q.includes("背景")) {
    return extractSection(doc, "项目背景") || "文档中没有明确说明项目背景。";
  }

  return "当前 Demo 仅做基础关键词匹配。真实评测中将由 MiMo 等模型基于完整文档进行回答。";
}

function extractSection(doc, title) {
  const lines = doc.split("\n");
  const startIndex = lines.findIndex(line => line.includes(title));

  if (startIndex === -1) return "";

  const result = [];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ") && result.length > 0) {
      break;
    }

    if (line.trim()) {
      result.push(line);
    }
  }

  return result.join("\n").trim();
}

askBtn.addEventListener("click", () => {
  answer.textContent = findAnswer(docInput.value, questionInput.value);
});
