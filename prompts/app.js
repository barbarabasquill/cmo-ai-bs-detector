"use strict";

const prompts = [
  {
    id: "detect-the-bs",
    number: "01",
    title: "Detect the BS",
    category: "audit",
    categoryLabel: "Audit & verify",
    purpose: "Audit an AI-generated marketing deliverable for unsupported claims, vague language, shallow strategy, and avoidable risk.",
    when: "Use before approving campaign copy, strategy, messaging, personas, executive content, or agency work.",
    keywords: "audit analyze review ai output bs bullshit risk hallucination claims generic vague approve content agency proposal messaging persona strategy copy quality",
    role: "Act as a skeptical but constructive CMO reviewing an AI-assisted marketing deliverable.",
    objective: "Determine whether the material is credible, specific, strategically useful, differentiated, and safe enough to advance to human approval.",
    instructions: [
      "Evaluate evidence and sourcing, specificity, strategic substance, brand voice, original insight, and legal or reputational risk.",
      "Quote the exact words that create each concern; do not make vague accusations.",
      "Separate verified facts, reasonable inferences, unsupported claims, and opinions.",
      "Identify missing context, assumptions, tradeoffs, owners, timing, and success measures.",
      "Recommend the smallest practical changes that would materially improve the work."
    ],
    constraints: [
      "Do not claim that text was AI-generated; assess the quality and risk of the content itself.",
      "Do not verify a source you cannot access. Mark it for human verification instead.",
      "Do not invent replacement evidence, customer insights, statistics, or quotations."
    ],
    output: [
      "Executive verdict: useful, questionable, or high risk",
      "Top findings ranked by business impact",
      "Evidence table with exact text, concern, and required check",
      "Recommended revisions and final human-approval checklist"
    ]
  },
  {
    id: "verify-the-claims",
    number: "02",
    title: "Verify the Claims",
    category: "audit",
    categoryLabel: "Audit & verify",
    purpose: "Turn a draft full of facts, numbers, quotes, and confident statements into a clear verification queue.",
    when: "Use before publishing thought leadership, performance reports, customer claims, sales materials, or executive presentations.",
    keywords: "verify fact check statistics numbers source citation research quote roi proof evidence customer claim report accuracy validate",
    role: "Act as a meticulous marketing claims reviewer.",
    objective: "Identify every material claim that requires evidence and show a human reviewer exactly what must be confirmed before publication.",
    instructions: [
      "Extract factual statements, statistics, quotations, comparisons, superlatives, guarantees, and causal claims.",
      "Classify each item as supported by supplied evidence, unsupported, inference, opinion, or unverifiable from the supplied material.",
      "For unsupported items, specify the type of primary source or internal record needed.",
      "Flag mismatched dates, denominators, time periods, definitions, attribution logic, or suspicious precision.",
      "Offer a safer rewrite only when the claim can be qualified without changing its intended meaning."
    ],
    constraints: [
      "Do not fabricate citations or imply that a URL was opened unless it was actually available to you.",
      "Do not treat repetition across secondary sources as independent verification.",
      "Do not approve regulated, legal, security, privacy, or financial claims without the appropriate expert review."
    ],
    output: [
      "Claims inventory",
      "Verification status and evidence supplied",
      "Required source or owner for each unresolved claim",
      "Safer wording and publication blockers"
    ]
  },
  {
    id: "challenge-my-assumptions",
    number: "03",
    title: "Challenge My Assumptions",
    category: "audit",
    categoryLabel: "Audit & verify",
    purpose: "Expose confirmation bias, weak premises, ignored alternatives, and the evidence that could change the decision.",
    when: "Use before committing budget, choosing a segment, approving positioning, or presenting a strategic recommendation.",
    keywords: "challenge assumptions bias disagree devil advocate alternatives decision strategy premise test blind spots risk counterargument budget segment positioning",
    role: "Act as a constructive strategic challenger, not a cheerleader.",
    objective: "Pressure-test the proposed decision and identify what would need to be true for it to succeed.",
    instructions: [
      "List the explicit and hidden assumptions supporting the recommendation.",
      "Identify the strongest credible argument against the recommendation.",
      "Present at least two materially different alternatives, including the option to do less or wait.",
      "Describe the evidence that would support or overturn each assumption.",
      "Recommend a low-cost test that reduces the most important uncertainty."
    ],
    constraints: [
      "Do not manufacture disagreement for theater; prioritize plausible business risks.",
      "Distinguish evidence from judgment and uncertainty.",
      "Do not recommend a decision when essential context is missing; ask focused questions first."
    ],
    output: [
      "Assumption register",
      "Strongest counterargument",
      "Alternatives and tradeoffs",
      "Evidence needed, test plan, and decision recommendation"
    ]
  },
  {
    id: "fix-this-crap",
    number: "04",
    title: "Fix This Crap",
    category: "repair",
    categoryLabel: "Repair the work",
    purpose: "Repair weak marketing content while preserving the intended meaning and refusing to invent supporting facts.",
    when: "Use when a draft is directionally right but generic, cluttered, unsupported, or difficult to act on.",
    keywords: "fix improve rewrite edit repair bad weak draft content copy clarity useful stronger messy crap revise",
    role: "Act as a senior B2B marketing editor with strong strategic judgment.",
    objective: "Turn the supplied draft into clear, specific, credible marketing content without changing its core intent or inventing evidence.",
    instructions: [
      "Diagnose the five most important weaknesses before rewriting.",
      "Preserve accurate facts, required terminology, and the intended audience and action.",
      "Replace vague claims with supplied specifics; use clear placeholders when evidence is missing.",
      "Improve hierarchy, flow, differentiation, and usefulness.",
      "Explain the material changes so a human can accept or reject them."
    ],
    constraints: [
      "Do not add statistics, customer evidence, product capabilities, or competitive claims not provided.",
      "Do not make the draft longer unless added detail materially improves it.",
      "Do not hide unresolved factual or strategic problems behind polished prose."
    ],
    output: [
      "Brief diagnosis",
      "Rewritten draft",
      "Material changes and rationale",
      "Open questions and facts still requiring verification"
    ]
  },
  {
    id: "remove-corporate-oatmeal",
    number: "05",
    title: "Remove Corporate Oatmeal",
    category: "repair",
    categoryLabel: "Repair the work",
    purpose: "Replace smooth, interchangeable marketing language with concrete meaning, useful proof, and a recognizable point of view.",
    when: "Use when the copy sounds polished but could belong to any company in the category.",
    keywords: "corporate oatmeal jargon cliche vague generic buzzwords leverage unlock innovative seamless robust landscape transform game-changing copy messaging",
    role: "Act as a plainspoken executive editor allergic to empty marketing language.",
    objective: "Make the content specific, useful, and credible while preserving the intended message and brand tone.",
    instructions: [
      "Highlight clichés, inflated adjectives, vague benefits, empty transitions, and claims without an actor or outcome.",
      "Explain what each weak phrase fails to communicate.",
      "Rewrite using concrete nouns, active verbs, supplied facts, and clear buyer relevance.",
      "Use placeholders such as [CUSTOMER EVIDENCE NEEDED] when specificity is unavailable.",
      "Keep only language that earns its place."
    ],
    constraints: [
      "Do not replace one set of buzzwords with another.",
      "Do not invent differentiation, proof, or customer pain.",
      "Do not make the voice casual if the audience requires executive formality."
    ],
    output: [
      "Corporate-oatmeal phrases and why they fail",
      "Clean rewritten version",
      "Missing proof or specificity",
      "Three strongest lines worth keeping"
    ]
  },
  {
    id: "make-it-sound-human",
    number: "06",
    title: "Make It Sound Human",
    category: "repair",
    categoryLabel: "Repair the work",
    purpose: "Remove robotic rhythm and canned phrasing while keeping the writing intelligent, credible, and on-brand.",
    when: "Use for emails, social posts, executive articles, landing pages, nurture copy, and sales enablement.",
    keywords: "human natural voice robotic ai sounding tone email social post article copy brand conversational executive writing",
    role: "Act as a skilled human editor who writes with clarity, rhythm, restraint, and personality.",
    objective: "Revise the draft so it sounds like a thoughtful person with real subject knowledge wrote it.",
    instructions: [
      "Remove canned openings, repetitive sentence patterns, over-explaining, fake enthusiasm, and unnecessary summaries.",
      "Vary sentence length and use natural transitions.",
      "Preserve the writer's point of view, expertise, and intended level of formality.",
      "Prefer specific observations over declarations of importance.",
      "Show a short before-and-after sample of the most meaningful change."
    ],
    constraints: [
      "Do not use slang merely to appear human.",
      "Do not add personal stories, emotions, or experiences that were not supplied.",
      "Do not sacrifice accuracy, accessibility, or brand requirements for style."
    ],
    output: [
      "Humanized draft",
      "Key voice changes",
      "Before-and-after example",
      "Any statements that still need evidence or owner approval"
    ]
  },
  {
    id: "turn-tactics-into-strategy",
    number: "07",
    title: "Turn Tactics into Strategy",
    category: "strategy",
    categoryLabel: "Strategy & campaigns",
    purpose: "Turn a channel list or activity plan into a strategy with choices, sequencing, ownership, tradeoffs, and measures.",
    when: "Use when a plan says email, social, webinars, and events but never explains why, for whom, or in what order.",
    keywords: "strategy tactics channels plan sequencing priorities tradeoffs owners campaign go to market gtm objective measurement budget integrated",
    role: "Act as a pragmatic CMO turning marketing activity into an executable strategy.",
    objective: "Create a focused strategy that connects the business goal, audience, insight, choices, program sequence, ownership, and measurement.",
    instructions: [
      "Clarify the business outcome, target audience, buyer problem, and evidence supporting the opportunity.",
      "Define the strategic choice: where to play, how to win, and what not to do.",
      "Sequence the journey and channels according to their specific jobs.",
      "Assign owners, dependencies, decision points, and timing.",
      "Define leading, conversion, pipeline, and learning measures without confusing activity with business impact."
    ],
    constraints: [
      "Do not assume every channel belongs in the plan.",
      "Do not present tactics as strategy or impressions as revenue evidence.",
      "Flag missing budget, capacity, audience, data, or sales-alignment inputs."
    ],
    output: [
      "One-sentence strategy",
      "Strategic choices and exclusions",
      "Sequenced campaign plan with owners",
      "Measures, assumptions, risks, and decisions required"
    ]
  },
  {
    id: "pressure-test-the-campaign",
    number: "08",
    title: "Pressure-Test the Campaign",
    category: "strategy",
    categoryLabel: "Strategy & campaigns",
    purpose: "Find the weak links in a campaign before budget, reputation, or sales confidence is spent on them.",
    when: "Use during campaign planning, agency review, launch readiness, or an underperforming program diagnosis.",
    keywords: "pressure test campaign review plan agency launch audience offer message channels journey measurement risk budget readiness underperforming",
    role: "Act as an experienced integrated-campaign leader conducting a launch-readiness review.",
    objective: "Determine whether the campaign has a credible audience, insight, offer, journey, execution plan, sales motion, and measurement approach.",
    instructions: [
      "Test the connection between the business goal, target audience, buyer problem, message, offer, and desired action.",
      "Assess channel roles, journey continuity, follow-up, sales enablement, and operational readiness.",
      "Identify the three assumptions most likely to cause failure.",
      "Distinguish launch blockers from improvements that can wait.",
      "Recommend a focused pre-launch test and an early-warning dashboard."
    ],
    constraints: [
      "Do not assume engagement equals intent or pipeline.",
      "Do not recommend more channels without a defined job for each one.",
      "Do not approve unsupported claims, unavailable assets, or ownerless follow-up."
    ],
    output: [
      "Launch verdict",
      "Campaign chain: goal through measurement",
      "Blockers, risks, and assumptions",
      "Pre-launch fixes, test plan, and early-warning measures"
    ]
  },
  {
    id: "build-the-executive-brief",
    number: "09",
    title: "Build the Executive Brief",
    category: "strategy",
    categoryLabel: "Strategy & campaigns",
    purpose: "Convert a pile of marketing detail into a short, decision-ready executive narrative.",
    when: "Use for MBRs, QBRs, board updates, investment requests, campaign reviews, and leadership decisions.",
    keywords: "executive summary brief board mbr qbr leadership update presentation decision recommendation one page cmo narrative results",
    role: "Act as a CMO preparing a concise, evidence-based brief for senior executives.",
    objective: "Help the reader understand what happened, why it matters, what is uncertain, and what decision or action is required.",
    instructions: [
      "Lead with the business conclusion and requested decision, not a chronology of activity.",
      "Separate verified performance, interpretation, risks, and next actions.",
      "Use only the supplied metrics and define the relevant time period, baseline, and attribution limits.",
      "Connect marketing measures to business outcomes without overstating causality.",
      "Remove operational detail that does not affect the executive decision."
    ],
    constraints: [
      "Do not hide bad news or unresolved uncertainty.",
      "Do not use vanity metrics as substitutes for pipeline, revenue, retention, or learning.",
      "Do not invent targets, benchmarks, or explanations for performance."
    ],
    output: [
      "Executive headline",
      "Decision-ready summary",
      "Evidence and interpretation",
      "Risks, recommendation, owner, and next decision date"
    ]
  },
  {
    id: "pipeline-reality-check",
    number: "10",
    title: "Pipeline Reality Check",
    category: "revenue",
    categoryLabel: "Revenue & ABM",
    purpose: "Challenge pipeline and attribution claims before they become an impressive but misleading slide.",
    when: "Use for campaign reporting, influenced-pipeline claims, source debates, forecasts, and budget reviews.",
    keywords: "pipeline attribution roi revenue influenced sourced forecast campaign results metrics conversion funnel performance salesforce dashboard",
    role: "Act as a revenue-minded marketing leader reviewing pipeline evidence with healthy skepticism.",
    objective: "Determine what the data supports, what it merely suggests, and what cannot be concluded from the supplied records.",
    instructions: [
      "Define sourced, influenced, engaged, created, progressed, and closed-won before using them.",
      "Check the date range, cohort, denominator, stage rules, account matching, opportunity timing, and duplicate treatment.",
      "Separate activity, engagement, pipeline association, pipeline contribution, and causal impact.",
      "Identify missing records or definitions that could materially change the conclusion.",
      "Recommend the most defensible executive statement and the next analysis needed."
    ],
    constraints: [
      "Do not imply causality from touchpoint association alone.",
      "Do not combine sourced and influenced pipeline without labeling them separately.",
      "Do not calculate from missing or incompatible data; show the gap instead."
    ],
    output: [
      "Most defensible conclusion",
      "Metric-definition and data-quality checks",
      "Supported versus unsupported claims",
      "Executive-ready wording and next analysis"
    ]
  },
  {
    id: "prioritize-the-accounts",
    number: "11",
    title: "Prioritize the Accounts",
    category: "revenue",
    categoryLabel: "Revenue & ABM",
    purpose: "Rank target accounts using explicit evidence instead of treating every intent spike as a buying committee.",
    when: "Use for ABM selection, sales-and-marketing account reviews, event targeting, cross-sell, and pipeline acceleration.",
    keywords: "abm accounts prioritize ranking intent 6sense demandbase target account sales marketing tier buying committee event cross sell pipeline",
    role: "Act as an ABM leader preparing an evidence-based account review with Sales.",
    objective: "Prioritize accounts according to fit, engagement, intent, relationship, opportunity context, and timing while exposing missing evidence.",
    instructions: [
      "Define the scoring dimensions and keep fit, behavior, relationship, and opportunity evidence separate.",
      "Show the evidence supporting each account recommendation and its recency.",
      "Identify buying-committee coverage, known contacts, open opportunities, exclusions, and data conflicts.",
      "Recommend the next best action and owner for each priority account.",
      "Create a watchlist for accounts with interesting signals but insufficient evidence."
    ],
    constraints: [
      "Do not treat anonymous intent, web visits, or event attendance as proof of an active purchase.",
      "Do not invent contacts, relationships, needs, or opportunity stages.",
      "Do not rank accounts without making the weighting and missing-data rules visible."
    ],
    output: [
      "Prioritized account table with evidence",
      "Tiering rationale and confidence",
      "Buying-committee and data gaps",
      "Next action, owner, and watchlist"
    ]
  },
  {
    id: "sales-follow-up-brief",
    number: "12",
    title: "Build the Sales Follow-Up Brief",
    category: "revenue",
    categoryLabel: "Revenue & ABM",
    purpose: "Turn marketing engagement into a useful sales follow-up plan without pretending every attendee is ready to buy.",
    when: "Use after webinars, events, content engagement, executive programs, or account campaigns.",
    keywords: "sales follow up brief webinar event leads attendees outreach sdr bdr account engagement handoff next action sequence content",
    role: "Act as a marketing and sales orchestration lead preparing a responsible campaign handoff.",
    objective: "Help Sales understand who engaged, what is known, what is not known, and the most appropriate next action.",
    instructions: [
      "Summarize the program, audience promise, engagement signals, and relevant account context.",
      "Segment follow-up by evidence and relationship rather than using one message for everyone.",
      "Provide a concise conversation opener, useful resource, and next step for each segment.",
      "Flag contacts requiring consent, suppression, ownership, or CRM checks.",
      "Define the feedback Sales should return so Marketing can learn and improve."
    ],
    constraints: [
      "Do not describe attendance or content consumption as buying intent without additional evidence.",
      "Do not invent personalization, pain points, relationships, or account priorities.",
      "Do not recommend outreach that conflicts with consent, suppression, territory, or company policy."
    ],
    output: [
      "Executive program summary",
      "Follow-up segments and evidence",
      "Recommended message, resource, action, and owner",
      "Compliance checks and feedback loop"
    ]
  }
];

const powerUps = [
  { id: "no-invention", label: "Do not invent facts, statistics, quotations, customers, or sources." },
  { id: "claim-labels", label: "Label material claims as verified, inferred, assumed, or unsupported." },
  { id: "challenge", label: "Challenge my assumptions instead of automatically agreeing with me." },
  { id: "counterargument", label: "Include the strongest credible argument against the recommendation." },
  { id: "questions", label: "Ask up to five clarifying questions if missing context could change the answer." },
  { id: "decision-first", label: "Lead with the decision or recommendation." },
  { id: "executive-summary", label: "Keep the executive summary under 150 words." },
  { id: "owners", label: "Separate insights, risks, recommendations, owners, and next steps." },
  { id: "plain-language", label: "Remove jargon, clichés, and corporate oatmeal." },
  { id: "confidence", label: "Include confidence levels and unresolved questions." }
];

const categoryNames = {
  audit: "Audit & verify",
  repair: "Repair the work",
  strategy: "Strategy & campaigns",
  revenue: "Revenue & ABM"
};

const relatedTerms = {
  email: ["copy", "human", "rewrite", "follow", "sales"],
  article: ["copy", "claims", "human", "executive"],
  report: ["executive", "claims", "pipeline", "metrics"],
  summary: ["executive", "brief", "decision"],
  campaign: ["strategy", "pressure", "launch", "channels"],
  strategy: ["assumptions", "tactics", "campaign", "decision"],
  data: ["evidence", "claims", "pipeline", "metrics"],
  numbers: ["statistics", "claims", "pipeline", "verify"],
  tone: ["human", "copy", "oatmeal", "rewrite"],
  bland: ["oatmeal", "generic", "rewrite", "human"],
  agency: ["campaign", "audit", "strategy", "claims"],
  board: ["executive", "brief", "decision", "pipeline"],
  event: ["follow", "accounts", "campaign", "sales"],
  webinar: ["follow", "accounts", "campaign", "sales"],
  abm: ["accounts", "intent", "pipeline", "sales"],
  roi: ["pipeline", "attribution", "claims", "evidence"]
};

const stopWords = new Set(["a", "an", "and", "are", "for", "from", "how", "i", "in", "is", "it", "me", "my", "of", "on", "the", "this", "to", "want", "with"]);

const finderForm = document.querySelector("#finderForm");
const finderQuery = document.querySelector("#finderQuery");
const finderError = document.querySelector("#finderError");
const finderResults = document.querySelector("#finderResults");
const resultCards = document.querySelector("#resultCards");
const newSearchButton = document.querySelector("#newSearchButton");
const promptLibrary = document.querySelector("#promptLibrary");
const categoryFilters = document.querySelector("#categoryFilters");
const builderSection = document.querySelector("#prompt-builder");
const selectedPromptName = document.querySelector("#selectedPromptName");
const selectedPromptPurpose = document.querySelector("#selectedPromptPurpose");
const selectedToolBadge = document.querySelector("#selectedToolBadge");
const powerUpOptions = document.querySelector("#powerUpOptions");
const generatedPrompt = document.querySelector("#generatedPrompt");
const copyPromptButton = document.querySelector("#copyPromptButton");
const copyStatus = document.querySelector("#copyStatus");
const companyInput = document.querySelector("#companyInput");
const audienceInput = document.querySelector("#audienceInput");
const evidenceInput = document.querySelector("#evidenceInput");
const constraintsInput = document.querySelector("#constraintsInput");

let activePrompt = prompts[0];
let activeTool = "universal";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toolLabel(tool) {
  if (tool === "chatgpt") return "Formatted for ChatGPT";
  if (tool === "claude") return "Formatted for Claude";
  return "Works with ChatGPT or Claude";
}

function renderLibrary() {
  promptLibrary.innerHTML = prompts.map(prompt => `
    <article id="${prompt.id}" class="prompt-card" data-category="${prompt.category}">
      <div class="prompt-meta">
        <span class="prompt-number">${prompt.number}</span>
        <span class="category-label">${escapeHtml(prompt.categoryLabel)}</span>
      </div>
      <h3>${escapeHtml(prompt.title)}</h3>
      <p class="purpose">${escapeHtml(prompt.purpose)}</p>
      <details>
        <summary>When should I use this?</summary>
        <p>${escapeHtml(prompt.when)}</p>
      </details>
      <button class="button button-quiet build-prompt" type="button" data-prompt-id="${prompt.id}">Build This Prompt</button>
    </article>
  `).join("");
}

function renderPowerUps() {
  powerUpOptions.innerHTML = powerUps.map(item => `
    <label class="power-up-option">
      <input type="checkbox" value="${item.id}">
      <span>${escapeHtml(item.label)}</span>
    </label>
  `).join("");
}

function tokenize(query) {
  const base = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
  const tokens = new Set(base.filter(token => !stopWords.has(token)));
  base.forEach(token => (relatedTerms[token] || []).forEach(term => tokens.add(term)));
  return [...tokens];
}

function findMatches(query) {
  const normalized = query.toLowerCase().trim();
  const tokens = tokenize(normalized);
  return prompts
    .map(prompt => {
      const title = prompt.title.toLowerCase();
      const haystack = `${prompt.title} ${prompt.categoryLabel} ${prompt.purpose} ${prompt.when} ${prompt.keywords}`.toLowerCase();
      let score = 0;
      tokens.forEach(token => {
        if (title.includes(token)) score += 7;
        if (prompt.keywords.includes(token)) score += 5;
        if (haystack.includes(token)) score += 2;
      });
      if (normalized.includes("fact") || normalized.includes("source") || normalized.includes("claim")) {
        if (["verify-the-claims", "detect-the-bs"].includes(prompt.id)) score += 7;
      }
      if (normalized.includes("human") || normalized.includes("robot")) {
        if (prompt.id === "make-it-sound-human") score += 10;
      }
      if (normalized.includes("generic") || normalized.includes("jargon") || normalized.includes("oatmeal")) {
        if (prompt.id === "remove-corporate-oatmeal") score += 10;
      }
      if (normalized.includes("executive") || normalized.includes("board") || normalized.includes("summary")) {
        if (prompt.id === "build-the-executive-brief") score += 10;
      }
      if (normalized.includes("account") || normalized.includes("abm") || normalized.includes("intent")) {
        if (prompt.id === "prioritize-the-accounts") score += 9;
      }
      if (normalized.includes("follow") || normalized.includes("webinar") || normalized.includes("event")) {
        if (prompt.id === "sales-follow-up-brief") score += 8;
      }
      return { prompt, score };
    })
    .sort((a, b) => b.score - a.score || Number(a.prompt.number) - Number(b.prompt.number))
    .slice(0, 3)
    .map(item => item.prompt);
}

function renderResults(matches) {
  resultCards.innerHTML = matches.map((prompt, index) => `
    <article class="result-card ${index === 0 ? "best-match" : ""}">
      <span class="match-label">${index === 0 ? "BEST MATCH" : `ALTERNATIVE ${index}`}</span>
      <h4>${escapeHtml(prompt.title)}</h4>
      <p>${escapeHtml(prompt.purpose)}</p>
      <button class="button ${index === 0 ? "button-primary" : "button-quiet"} build-prompt" type="button" data-prompt-id="${prompt.id}">Use This Prompt</button>
    </article>
  `).join("");
  finderResults.hidden = false;
  finderResults.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getSelectedFinderTool() {
  return document.querySelector('input[name="tool"]:checked')?.value || "universal";
}

function getBuilderTool() {
  return document.querySelector('input[name="builderTool"]:checked')?.value || "universal";
}

function selectedPowerUps() {
  const selected = [...powerUpOptions.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
  return powerUps.filter(item => selected.includes(item.id)).map(item => item.label);
}

function suppliedContext() {
  return {
    company: companyInput.value.trim() || "[ADD COMPANY OR PRODUCT]",
    audience: audienceInput.value.trim() || "[ADD TARGET AUDIENCE]",
    evidence: evidenceInput.value.trim() || "[PASTE APPROVED FACTS, SOURCE MATERIAL, OR LINKS]",
    constraints: constraintsInput.value.trim() || "[ADD DELIVERABLE, CONSTRAINTS, OR TONE]"
  };
}

function bulletList(items, marker = "-") {
  return items.map(item => `${marker} ${item}`).join("\n");
}

function buildUniversalPrompt(prompt, context, additions) {
  const powerSection = additions.length ? `\n\n## OPTIONAL COMMANDS\n${bulletList(additions)}` : "";
  return `${prompt.title.toUpperCase()}\n\n## ROLE\n${prompt.role}\n\n## OBJECTIVE\n${prompt.objective}\n\n## MY CONTEXT\n- Company or product: ${context.company}\n- Target audience: ${context.audience}\n- Facts, evidence, or source material:\n${context.evidence}\n- Deliverable, constraints, or tone:\n${context.constraints}\n\n## INSTRUCTIONS\n${bulletList(prompt.instructions)}\n\n## GUARDRAILS\n${bulletList(prompt.constraints)}${powerSection}\n\n## REQUIRED OUTPUT\n${bulletList(prompt.output)}\n\nIf essential information is missing, ask only the clarifying questions that could materially change the result. Clearly label uncertainty and anything requiring human verification or approval.`;
}

function buildChatGptPrompt(prompt, context, additions) {
  const commands = additions.length ? `\n\nADDITIONAL COMMANDS\n${bulletList(additions)}` : "";
  return `ROLE\n${prompt.role}\n\nGOAL\n${prompt.objective}\n\nCONTEXT PROVIDED\nCompany or product: ${context.company}\nTarget audience: ${context.audience}\nFacts, evidence, or source material:\n${context.evidence}\n\nDeliverable, constraints, or tone:\n${context.constraints}\n\nWORKFLOW\n1. Review the context and identify only the missing information that could materially change the answer.\n2. If needed, ask up to five focused clarifying questions before completing the work.\n3. Complete the following tasks:\n${prompt.instructions.map((item, index) => `   ${index + 1}. ${item}`).join("\n")}\n4. Follow every guardrail below.\n\nGUARDRAILS\n${bulletList(prompt.constraints)}${commands}\n\nOUTPUT FORMAT\n${bulletList(prompt.output)}\n\nClearly label uncertainty, missing evidence, assumptions, and anything requiring human verification or approval. Do not claim to have opened or verified a source unless you actually accessed it.`;
}

function xmlEscape(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function buildClaudePrompt(prompt, context, additions) {
  const commands = additions.length ? `\n<additional_commands>\n${additions.map(item => `  <command>${xmlEscape(item)}</command>`).join("\n")}\n</additional_commands>` : "";
  return `<role>\n${xmlEscape(prompt.role)}\n</role>\n\n<objective>\n${xmlEscape(prompt.objective)}\n</objective>\n\n<context>\n  <company_or_product>${xmlEscape(context.company)}</company_or_product>\n  <target_audience>${xmlEscape(context.audience)}</target_audience>\n  <evidence>\n${xmlEscape(context.evidence)}\n  </evidence>\n  <deliverable_constraints_or_tone>\n${xmlEscape(context.constraints)}\n  </deliverable_constraints_or_tone>\n</context>\n\n<instructions>\n${prompt.instructions.map(item => `  <instruction>${xmlEscape(item)}</instruction>`).join("\n")}\n</instructions>\n\n<guardrails>\n${prompt.constraints.map(item => `  <guardrail>${xmlEscape(item)}</guardrail>`).join("\n")}\n</guardrails>${commands}\n\n<output_format>\n${prompt.output.map(item => `  <section>${xmlEscape(item)}</section>`).join("\n")}\n</output_format>\n\nBefore completing the work, ask only the clarifying questions that could materially change the result. Clearly label uncertainty, missing evidence, assumptions, and anything requiring human verification or approval. Do not claim to have opened or verified a source unless you actually accessed it.`;
}

function updateGeneratedPrompt() {
  const context = suppliedContext();
  const additions = selectedPowerUps();
  activeTool = getBuilderTool();
  selectedToolBadge.textContent = toolLabel(activeTool);
  if (activeTool === "chatgpt") generatedPrompt.textContent = buildChatGptPrompt(activePrompt, context, additions);
  else if (activeTool === "claude") generatedPrompt.textContent = buildClaudePrompt(activePrompt, context, additions);
  else generatedPrompt.textContent = buildUniversalPrompt(activePrompt, context, additions);
  copyStatus.textContent = "";
}

function openBuilder(promptId, tool = activeTool) {
  const found = prompts.find(prompt => prompt.id === promptId);
  if (!found) return;
  activePrompt = found;
  activeTool = tool;
  selectedPromptName.textContent = activePrompt.title;
  selectedPromptPurpose.textContent = activePrompt.purpose;
  const toolRadio = document.querySelector(`input[name="builderTool"][value="${activeTool}"]`);
  if (toolRadio) toolRadio.checked = true;
  builderSection.hidden = false;
  updateGeneratedPrompt();
  builderSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyPrompt() {
  const text = generatedPrompt.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Copied. Paste it into your approved AI tool when you are ready.";
  } catch (error) {
    const range = document.createRange();
    range.selectNodeContents(generatedPrompt);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = "The prompt is selected. Press Command+C or Ctrl+C to copy it.";
  }
}

finderForm.addEventListener("submit", event => {
  event.preventDefault();
  const query = finderQuery.value.trim();
  if (query.length < 3) {
    finderError.textContent = "Tell us what you want the prompt to help you accomplish.";
    finderQuery.focus();
    return;
  }
  finderError.textContent = "";
  activeTool = getSelectedFinderTool();
  renderResults(findMatches(query));
});

document.querySelectorAll("[data-example]").forEach(button => {
  button.addEventListener("click", () => {
    finderQuery.value = button.dataset.example;
    finderError.textContent = "";
    finderQuery.focus();
  });
});

newSearchButton.addEventListener("click", () => {
  finderResults.hidden = true;
  finderQuery.value = "";
  finderQuery.focus();
  document.querySelector("#prompt-finder").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", event => {
  const buildButton = event.target.closest(".build-prompt");
  if (buildButton) openBuilder(buildButton.dataset.promptId, activeTool);
});

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  const selectedCategory = button.dataset.category;
  categoryFilters.querySelectorAll("button").forEach(item => {
    const isActive = item === button;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
  promptLibrary.querySelectorAll(".prompt-card").forEach(card => {
    card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
  });
});

[companyInput, audienceInput, evidenceInput, constraintsInput].forEach(input => input.addEventListener("input", updateGeneratedPrompt));
document.querySelectorAll('input[name="builderTool"]').forEach(input => input.addEventListener("change", updateGeneratedPrompt));
powerUpOptions.addEventListener("change", updateGeneratedPrompt);
copyPromptButton.addEventListener("click", copyPrompt);

renderLibrary();
renderPowerUps();

const requestedPrompt = window.location.hash.replace("#", "");
if (requestedPrompt && prompts.some(prompt => prompt.id === requestedPrompt)) {
  window.addEventListener("load", () => {
    document.getElementById(requestedPrompt)?.scrollIntoView({ block: "start" });
  });
}
