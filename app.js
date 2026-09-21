"use strict";

const CATEGORY_META = {
  evidence: { name: "Evidence & sourcing", max: 25 },
  specificity: { name: "Specificity", max: 20 },
  strategy: { name: "Strategic substance", max: 20 },
  voice: { name: "Brand clarity & voice", max: 15 },
  insight: { name: "Original insight", max: 10 },
  risk: { name: "Risk & compliance", max: 10 }
};

const SIGNALS = [
  { category: "voice", points: 3, severity: "medium", pattern: /\b(?:in today['’]s (?:rapidly )?evolving (?:world|landscape)|ever-changing landscape|now more than ever)\b/gi, title: "Classic corporate throat-clearing", why: "This opening consumes attention without adding meaning.", fix: "Start with the customer problem, decision, or evidence." },
  { category: "voice", points: 2, severity: "low", pattern: /\b(?:unlock|unleash|leverage|synerg(?:y|ize)|revolutioniz\w*|game[- ]chang\w*|transformative|cutting[- ]edge|next[- ]generation|best[- ]in[- ]class|world[- ]class|seamless(?:ly)?|robust|holistic)\b/gi, title: "Buzzword fog", why: "Familiar hype words can make almost any product sound exactly like every other product.", fix: "Replace the phrase with a specific capability, buyer action, or measurable result." },
  { category: "specificity", points: 3, severity: "medium", pattern: /\b(?:drive results|deliver value|maximize (?:impact|value)|improve outcomes|accelerate growth|enhance efficiency|empower (?:teams|businesses|organizations)|meet evolving needs)\b/gi, title: "Outcome-shaped fog", why: "The copy promises improvement without naming what changes, for whom, or by how much.", fix: "Name the audience, baseline, intended change, and timeframe." },
  { category: "evidence", points: 5, severity: "high", pattern: /\b(?:studies show|research (?:shows|proves|indicates)|experts (?:say|agree)|industry data (?:shows|suggests)|according to research)\b/gi, title: "Unnamed authority", why: "The claim borrows credibility from research or experts without identifying either.", fix: "Provide the source, publication date, link, and relevant methodology—or remove the claim." },
  { category: "evidence", points: 4, severity: "high", pattern: /\b(?:up to\s+)?\d+(?:\.\d+)?%|\$\d+(?:\.\d+)?\s*(?:m|b|million|billion)?\b/gi, title: "Number requiring a receipt", why: "Precise numbers look authoritative and should be traceable to an approved source.", fix: "Cite the named source and date, define the calculation, and confirm the comparison period." },
  { category: "risk", points: 4, severity: "high", pattern: /\b(?:guarantee(?:d|s)?|always|never|eliminate(?:s|d)? all|zero risk|100% (?:secure|accurate|effective)|completely (?:secure|risk-free))\b/gi, title: "Absolute claim", why: "Unqualified promises create credibility, legal, and reputational risk.", fix: "Qualify the statement and send material performance or security claims for expert review." },
  { category: "risk", points: 3, severity: "high", pattern: /\b(?:gdpr|hipaa|soc 2|fedramp|compliant|compliance|privacy-safe|military-grade|bank-grade)\b/gi, title: "Regulated or assurance language", why: "Compliance and security language requires current, product-specific substantiation.", fix: "Confirm the exact scope and wording with legal, privacy, security, or compliance owners." },
  { category: "strategy", points: 3, severity: "medium", pattern: /\b(?:omnichannel|multi-channel|across all channels|email, social(?: media)?, (?:and )?(?:webinars|events|content)|content, email, social)\b/gi, title: "Channel list wearing a strategy hat", why: "Naming channels does not establish priorities, sequence, audience, tradeoffs, or ownership.", fix: "State the strategic choice, target segment, journey stage, channel role, owner, and success measure." },
  { category: "insight", points: 2, severity: "low", pattern: /\b(?:it is important to|businesses must|organizations need to|the key is to|success requires|the future of)\b/gi, title: "Obvious observation", why: "The sentence sounds conclusive but offers little a CMO could act on.", fix: "Add a non-obvious implication, decision, or testable recommendation." },
  { category: "specificity", points: 2, severity: "low", pattern: /\b(?:customers?|users?|businesses|organizations|stakeholders|decision[- ]makers|audiences)\b/gi, title: "Generic audience label", why: "Broad audience labels hide who actually has the problem and buying authority.", fix: "Name the role, segment, situation, pain, and buying trigger." },
  { category: "voice", points: 2, severity: "low", pattern: /\b(?:delve|tapestry|realm|pivotal|paramount|myriad|multifaceted|foster|elevate)\b/gi, title: "AI-flavored diction", why: "Over-polished vocabulary can make otherwise useful copy sound synthetic and distant.", fix: "Use the words your buyers and sales team actually use." },
  { category: "strategy", points: 3, severity: "medium", pattern: /\b(?:increase awareness|build awareness|generate engagement|drive engagement|boost visibility)\b/gi, title: "Activity without a business decision", why: "Awareness and engagement are not strategies unless tied to a defined audience and business outcome.", fix: "Connect the activity to pipeline, adoption, retention, expansion, or another accountable outcome." }
];

const SAMPLE = `In today's rapidly evolving landscape, our revolutionary, best-in-class AI platform empowers businesses to unlock unprecedented growth. Studies show that companies leveraging our seamless solution improve efficiency by 73% and achieve up to $2 million in savings. Our robust omnichannel strategy will increase awareness across email, social media, webinars, and events. The platform is 100% secure, GDPR compliant, and guaranteed to deliver results for every customer. Now more than ever, organizations must embrace the future of innovation.`;

const elements = {
  input: document.querySelector("#contentInput"),
  count: document.querySelector("#contentCount"),
  error: document.querySelector("#inputError"),
  results: document.querySelector("#results"),
  scoreCard: document.querySelector("#scoreCard"),
  score: document.querySelector("#scoreNumber"),
  verdict: document.querySelector("#verdict"),
  summary: document.querySelector("#summary"),
  categories: document.querySelector("#categoryScores"),
  flags: document.querySelector("#flags"),
  flagCount: document.querySelector("#flagCount"),
  actions: document.querySelector("#actions")
};

let lastReport = null;

document.querySelector("#sampleButton").addEventListener("click", () => {
  elements.input.value = SAMPLE;
  updateCount();
  elements.input.focus();
});
document.querySelector("#clearButton").addEventListener("click", reset);
document.querySelector("#analyzeButton").addEventListener("click", analyze);
document.querySelector("#copyButton").addEventListener("click", copyReport);
document.querySelector("#downloadButton").addEventListener("click", downloadReport);
elements.input.addEventListener("input", updateCount);

function updateCount() {
  const text = elements.input.value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  elements.count.textContent = `${words.toLocaleString()} words · ${elements.input.value.length.toLocaleString()} characters`;
  elements.error.textContent = "";
}

function reset() {
  elements.input.value = "";
  elements.results.hidden = true;
  elements.error.textContent = "";
  lastReport = null;
  updateCount();
  elements.input.focus();
}

function analyze() {
  const text = elements.input.value.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  if (wordCount < 12) {
    elements.error.textContent = "Give the detector at least 12 words to work with. Even BS needs a fair hearing.";
    elements.input.focus();
    return;
  }

  const scores = Object.fromEntries(Object.keys(CATEGORY_META).map(key => [key, 0]));
  const flags = [];

  for (const signal of SIGNALS) {
    const matches = [...text.matchAll(signal.pattern)];
    if (!matches.length) continue;
    const unique = [...new Set(matches.map(match => match[0].toLowerCase()))];
    const occurrenceFactor = Math.min(matches.length, 3);
    const points = signal.points + Math.max(0, occurrenceFactor - 1);
    scores[signal.category] += points;
    flags.push({ ...signal, points, found: unique.slice(0, 4).join(", ") });
  }

  addStructuralSignals(text, wordCount, scores, flags);

  // Calibrate clustered signals upward: multiple different problems in one
  // category create more executive risk than the same phrases in isolation.
  Object.entries(CATEGORY_META).forEach(([key, meta]) => {
    scores[key] = Math.min(meta.max, Math.round(scores[key] * 1.35));
  });

  const score = Math.min(100, Object.values(scores).reduce((sum, value) => sum + value, 0));
  const band = score <= 25 ? "green" : score < 75 ? "yellow" : "red";
  const verdict = getVerdict(score);
  const sortedFlags = flags.sort((a, b) => b.points - a.points);
  const actions = getActions(sortedFlags, scores);

  lastReport = { score, band, verdict, scores, flags: sortedFlags, actions, wordCount, created: new Date() };
  render(lastReport);
}

function addStructuralSignals(text, wordCount, scores, flags) {
  const hasSource = /https?:\/\/|\bsource\s*:|according to [A-Z][\w& .-]{2,}|\[[0-9]+\]/.test(text);
  const hasNumericClaim = /\b\d+(?:\.\d+)?%|\$\d+|\b\d+x\b/i.test(text);
  if (hasNumericClaim && !hasSource) {
    scores.evidence += 6;
    flags.push({ category: "evidence", points: 6, severity: "high", title: "Claims arrived without luggage", why: "The copy includes a quantified claim but no visible source or citation.", fix: "Add a primary source, date, methodology, and calculation—or remove the number.", found: "quantified claim without a citation" });
  }

  const concreteMarkers = text.match(/\b(?:for|among|within|by|from)\s+(?:the\s+)?[A-Z][A-Za-z0-9&-]+|\bQ[1-4]\b|\b20\d{2}\b|\b(?:days?|weeks?|months?|quarters?)\b/gi) || [];
  if (wordCount >= 60 && concreteMarkers.length < 2) {
    scores.specificity += 5;
    flags.push({ category: "specificity", points: 5, severity: "medium", title: "Specifics are on vacation", why: "The passage is long enough to establish audience, timing, context, and outcomes, but offers few concrete anchors.", fix: "Add the named audience, business context, timeframe, owner, and measurable outcome.", found: "few concrete details" });
  }

  const strategyTerms = /\b(?:strategy|plan|campaign|go-to-market|gtm|roadmap)\b/i.test(text);
  const decisionTerms = /\b(?:because|instead of|tradeoff|priority|sequence|owner|budget|constraint|hypothesis|test)\b/i.test(text);
  if (strategyTerms && !decisionTerms) {
    scores.strategy += 6;
    flags.push({ category: "strategy", points: 6, severity: "high", title: "Strategy without a choice", why: "The copy invokes strategy but does not show priorities, tradeoffs, sequencing, constraints, or ownership.", fix: "State what you will do, what you will not do, why, in what order, and who owns the decision.", found: "strategy language without decision logic" });
  }

  const sentenceCount = Math.max(1, (text.match(/[.!?]+(?:\s|$)/g) || []).length);
  const avgSentence = wordCount / sentenceCount;
  if (avgSentence > 30) {
    scores.voice += 4;
    flags.push({ category: "voice", points: 4, severity: "medium", title: "Executive oxygen warning", why: `The average sentence is about ${Math.round(avgSentence)} words, making key decisions harder to find.`, fix: "Break long sentences into one claim, one proof point, and one implication.", found: `${Math.round(avgSentence)} words per sentence on average` });
  }

  const questions = (text.match(/\?/g) || []).length;
  const challengeWords = /\b(?:assumption|counterargument|alternative|risk|unknown|evidence against|what would change)\b/i.test(text);
  if (wordCount > 90 && questions === 0 && !challengeWords) {
    scores.insight += 4;
    flags.push({ category: "insight", points: 4, severity: "medium", title: "No challenge function detected", why: "The content presents conclusions without surfacing assumptions, alternatives, risks, or unknowns.", fix: "Add the strongest counterargument, key assumption, and evidence that would change the recommendation.", found: "no assumptions or alternatives surfaced" });
  }
}

function getVerdict(score) {
  if (score <= 25) return { name: "CMO-Clean", summary: "Low signal risk. It still needs a human owner and source check, but the copy appears comparatively specific and restrained." };
  if (score <= 49) return { name: "Worth a Second Look", summary: "Useful bones, with enough vague or unsupported language to justify a focused edit before approval." };
  if (score < 75) return { name: "Corporate Oatmeal Alert", summary: "Polished on the surface, light on nutritional value. Verify the claims and rebuild the substance before this leaves marketing." };
  return { name: "Weapons-Grade BS", summary: "High-risk language detected. Pause publication, verify every material claim, and put an accountable human back in the driver’s seat." };
}

function getActions(flags, scores) {
  if (!flags.length) return [
    "Perform a final human read for accuracy, audience fit, and brand voice.",
    "Confirm that every material claim has a current, approved source.",
    "Name the person accountable for final approval."
  ];

  const actions = [];
  const orderedCategories = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  for (const category of orderedCategories) {
    const flag = flags.find(item => item.category === category && !actions.includes(item.fix));
    if (flag) actions.push(flag.fix);
    if (actions.length === 3) break;
  }
  if (!actions.some(action => /source|cite|verify/i.test(action))) actions.push("Verify material claims against primary, current sources before approval.");
  return actions.slice(0, 4);
}

function render(report) {
  elements.score.textContent = report.score;
  elements.scoreCard.dataset.band = report.band;
  elements.verdict.textContent = report.verdict.name;
  elements.summary.textContent = report.verdict.summary;

  elements.categories.replaceChildren(...Object.entries(CATEGORY_META).map(([key, meta]) => {
    const row = document.createElement("div");
    row.className = "category-row";
    const percent = Math.round((report.scores[key] / meta.max) * 100);
    const color = percent < 35 ? "var(--green)" : percent < 70 ? "var(--yellow)" : "var(--red)";
    row.innerHTML = `<span class="category-name">${escapeHtml(meta.name)}</span><div class="bar" aria-hidden="true" style="--bar-color:${color}"><span style="width:${percent}%"></span></div><span class="category-score">${report.scores[key]}/${meta.max}</span>`;
    return row;
  }));

  elements.flagCount.textContent = `${report.flags.length} ${report.flags.length === 1 ? "flag" : "flags"}`;
  if (!report.flags.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No common risk signals detected. That is encouraging—not a substitute for verification and judgment.";
    elements.flags.replaceChildren(empty);
  } else {
    elements.flags.replaceChildren(...report.flags.slice(0, 10).map(flag => {
      const card = document.createElement("article");
      card.className = "flag";
      card.style.setProperty("--flag-color", flag.severity === "high" ? "var(--red)" : flag.severity === "medium" ? "var(--yellow)" : "#8b9099");
      card.innerHTML = `<div class="flag-top"><h4>${escapeHtml(flag.title)}</h4><span class="severity">${escapeHtml(flag.severity)}</span></div><p>${escapeHtml(flag.why)} <strong>Fix:</strong> ${escapeHtml(flag.fix)}</p><span class="found">Found: ${escapeHtml(flag.found)}</span>`;
      return card;
    }));
  }

  elements.actions.replaceChildren(...report.actions.map(action => {
    const item = document.createElement("li");
    item.textContent = action;
    return item;
  }));

  elements.results.hidden = false;
  elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function reportAsText() {
  if (!lastReport) return "";
  const categoryLines = Object.entries(CATEGORY_META).map(([key, meta]) => `- ${meta.name}: ${lastReport.scores[key]}/${meta.max}`);
  const flagLines = lastReport.flags.length ? lastReport.flags.map((flag, index) => `${index + 1}. ${flag.title}: ${flag.why} Fix: ${flag.fix}`) : ["No common risk signals detected."];
  const actionLines = lastReport.actions.map((action, index) => `${index + 1}. ${action}`);
  return `THE CMO'S AI BS DETECTOR\n\nBS Risk Score: ${lastReport.score}/100\nVerdict: ${lastReport.verdict.name}\n${lastReport.verdict.summary}\n\nCATEGORY SCORES\n${categoryLines.join("\n")}\n\nFLAGS\n${flagLines.join("\n")}\n\nCMO NEXT MOVES\n${actionLines.join("\n")}\n\nThis is a risk screen, not a factual verification engine or proof of AI authorship.\nCreated by Barbara Basquill.`;
}

async function copyReport() {
  if (!lastReport) return;
  const button = document.querySelector("#copyButton");
  try {
    await navigator.clipboard.writeText(reportAsText());
    button.textContent = "Copied";
  } catch {
    button.textContent = "Copy unavailable";
  }
  window.setTimeout(() => { button.textContent = "Copy results"; }, 1800);
}

function downloadReport() {
  if (!lastReport) return;
  const blob = new Blob([reportAsText()], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `cmo-bs-detector-report-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

updateCount();
