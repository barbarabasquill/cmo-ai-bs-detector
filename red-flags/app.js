"use strict";

const flags = {
  oatmeal: {
    number: "01",
    title: "Corporate Oatmeal",
    short: "Smooth, warm, and nutritionally empty.",
    description: "The language sounds polished and professional but could describe almost any company, product, or campaign.",
    risk: "Meaning and differentiation risk",
    why: "Generic language hides whether the team understands the buyer, the product advantage, or the decision it wants the audience to make.",
    questions: [
      "What does this claim mean in concrete terms?",
      "Which buyer problem, capability, or outcome makes it true?",
      "Could a competitor publish this exact sentence unchanged?"
    ],
    evidence: "Specific product capability, customer proof, buyer language, a measurable outcome, or a clear point of view.",
    fix: "Replace abstract benefits and inflated adjectives with one specific buyer problem, one concrete capability, and one defensible outcome. If proof is missing, mark the gap instead of decorating it.",
    prompt: "Remove Corporate Oatmeal",
    promptHref: "../prompts/#remove-corporate-oatmeal",
    symptoms: ["vague"],
    text: ["best-in-class", "innovative", "seamless", "unlock", "empower", "transform", "game-changing", "robust", "cutting-edge", "leading", "revolutionary", "landscape", "next-generation"]
  },
  liar: {
    number: "02",
    title: "Confident Liar",
    short: "Precise, persuasive—and possibly invented.",
    description: "The work presents statistics, quotations, research, customer claims, or capabilities with more confidence than the supplied evidence supports.",
    risk: "Credibility, legal, and reputational risk",
    why: "A polished unsupported claim can reach customers, Sales, executives, or regulators before anyone asks where it came from.",
    questions: [
      "What is the primary source, owner, date, and methodology?",
      "Was this number calculated from the same population and time period described here?",
      "Can the appropriate product, legal, customer, or data owner approve it?"
    ],
    evidence: "A primary source, approved internal record, customer authorization, calculation details, and a named human owner.",
    fix: "Create a verification queue. Remove, qualify, or clearly label every material claim that cannot be traced to an approved source.",
    prompt: "Verify the Claims",
    promptHref: "../prompts/#verify-the-claims",
    symptoms: ["unsupported", "vanity-metrics"],
    text: ["percent", "%", "study", "research shows", "customers see", "guarantee", "proven", "according to", "industry-leading", "roi", "reduce costs", "increase revenue", "quoted"]
  },
  yesman: {
    number: "03",
    title: "Executive Yes-Man",
    short: "Applause dressed as analysis.",
    description: "The response validates the proposed direction without testing assumptions, presenting alternatives, or identifying what could change the recommendation.",
    risk: "Decision-quality and confirmation-bias risk",
    why: "Leaders need useful challenge, not synthetic agreement. Unquestioned premises can turn a flawed direction into an expensive plan.",
    questions: [
      "What is the strongest credible argument against this recommendation?",
      "Which assumption is most likely to be wrong?",
      "What evidence would cause us to change course?"
    ],
    evidence: "Assumptions, counterarguments, alternatives, tradeoffs, decision criteria, and a low-cost test.",
    fix: "Require the reviewer or AI tool to challenge the premise, show at least two alternatives, and state what would overturn the recommendation.",
    prompt: "Challenge My Assumptions",
    promptHref: "../prompts/#challenge-my-assumptions",
    symptoms: ["agreement", "missing-decision"],
    text: ["excellent strategy", "great idea", "strong plan", "absolutely", "you are right", "perfect", "no changes", "well-positioned", "certain to", "will succeed"]
  },
  persona: {
    number: "04",
    title: "Fake Persona Syndrome",
    short: "A fictional buyer wearing a research badge.",
    description: "Buyer motivations, objections, preferences, or behaviors are stated as facts without customer evidence or a clearly labeled hypothesis.",
    risk: "Audience, messaging, and investment risk",
    why: "Invented buyer truth can misdirect positioning, content, channels, budget, and Sales conversations while looking reassuringly specific.",
    questions: [
      "Which interviews, win-loss records, behavior data, or sales evidence support this?",
      "Is this an observed pattern, an inference, or a hypothesis?",
      "What segment, role, buying stage, and sample does it actually describe?"
    ],
    evidence: "Customer interviews, win-loss analysis, CRM or product behavior, validated research, and segment-specific context.",
    fix: "Separate known evidence from inference. Label the proposed persona insight as a hypothesis and define the fastest way to test it with real customers or data.",
    prompt: "Challenge My Assumptions",
    promptHref: "../prompts/#challenge-my-assumptions",
    symptoms: ["invented-customer", "audience-gap"],
    text: ["buyers want", "customers prefer", "always prefer", "ciso", "cmos", "decision-makers", "care most", "typically choose", "primary concern", "persona", "pain point"]
  },
  strategy: {
    number: "06",
    title: "Strategy-Shaped Content",
    short: "A channel list in a strategy costume.",
    description: "The plan contains tactics, assets, and activity but never makes a strategic choice about audience, insight, offer, sequence, tradeoffs, ownership, or measurement.",
    risk: "Execution, budget, and accountability risk",
    why: "Busy teams can execute a long activity list perfectly and still fail because the plan never connected the business goal to a buyer decision.",
    questions: [
      "What business outcome and buyer decision are we trying to change?",
      "What are we choosing to do—and explicitly not do?",
      "Why this sequence, who owns each handoff, and what would trigger a change?"
    ],
    evidence: "Business goal, audience insight, strategic choice, offer, journey, channel roles, owners, timing, tradeoffs, and success measures.",
    fix: "Rewrite the plan around one audience, one evidence-based problem, one strategic choice, and a sequenced journey. Give every tactic a job, owner, measure, and reason to exist.",
    prompt: "Turn Tactics into Strategy",
    promptHref: "../prompts/#turn-tactics-into-strategy",
    symptoms: ["tactic-list", "missing-decision", "audience-gap", "vanity-metrics"],
    text: ["email", "paid social", "webinar", "blog", "channels", "tactics", "content calendar", "campaign plan", "activities", "events", "syndication", "launch across"]
  },
  leadgap: {
    number: "05",
    title: "Sales-Ready Lead Mirage",
    short: "A name in the database is not automatically a buyer.",
    description: "A campaign built to create awareness, capture names, or warm interest is being presented as if it will deliver qualified, high-intent prospects who are ready for a Sales conversation.",
    risk: "Sales trust, conversion, and pipeline risk",
    why: "When Marketing and Sales expect different outcomes, good awareness or lead-generation work can look like failure—and Sales receives people who are not ready to buy.",
    questions: [
      "What exact job is this campaign meant to do: create awareness, capture leads, nurture interest, or produce sales-ready opportunities?",
      "What actions, buying-intent signals, fit, and engagement score make a lead ready for Sales?",
      "Who owns nurture, qualification, handoff, follow-up, and feedback when a lead is not ready?"
    ],
    evidence: "A clearly stated campaign goal, ideal-customer fit, buying-intent signals, meaningful engagement, lead-scoring rules, a Sales handoff agreement, and historical conversion data.",
    fix: "Name the real campaign goal. Do not promise sales-ready leads unless the program includes agreed qualification rules, strong intent or engagement signals, a nurture path, and a clear Sales handoff.",
    prompt: "Pipeline Reality Check",
    promptHref: "../prompts/#pipeline-reality-check",
    symptoms: ["lead-quality-gap", "vanity-metrics"],
    text: ["sales-ready", "sales ready", "mql", "qualified lead", "form fill", "form-fill", "leads for sales", "lead volume", "lead generation", "high intent", "high-intent", "engagement score", "lead score", "handoff", "nurture", "pipeline"]
  }
};

const deliverableWeights = {
  campaign: { strategy: 2, oatmeal: 1, yesman: 1, leadgap: 1 },
  strategy: { strategy: 2, yesman: 2 },
  messaging: { oatmeal: 2, liar: 1 },
  persona: { persona: 3, liar: 1 },
  report: { liar: 2, yesman: 1, strategy: 1 },
  leadgen: { leadgap: 5, strategy: 1, liar: 1 }
};

const deliverableLabels = {
  campaign: "Campaign review",
  strategy: "Strategy review",
  messaging: "Messaging or copy review",
  persona: "Persona or research review",
  report: "Report or executive brief review",
  leadgen: "Lead generation and Sales handoff review"
};

const sampleScenarios = {
  oatmeal: {
    deliverable: "messaging",
    symptoms: ["vague"],
    text: "Our innovative, best-in-class platform empowers organizations to unlock seamless transformation and thrive in a rapidly evolving landscape."
  },
  liar: {
    deliverable: "report",
    symptoms: ["unsupported"],
    text: "Customers using our platform reduce costs by 47% and achieve industry-leading ROI within 90 days. No source, study, or calculation is included."
  },
  yesman: {
    deliverable: "strategy",
    symptoms: ["agreement"],
    text: "Your campaign strategy is excellent and well-positioned for success. The recommendation does not question the audience, budget, offer, or measurement assumptions."
  },
  persona: {
    deliverable: "persona",
    symptoms: ["invented-customer"],
    text: "CISOs always prefer technical content and make purchasing decisions based primarily on product features. No interviews or customer data are cited."
  },
  strategy: {
    deliverable: "campaign",
    symptoms: ["tactic-list", "missing-decision"],
    text: "Our strategy is to run email, paid social, webinars, blogs, and events. The plan does not define the audience insight, offer, sequence, tradeoffs, owners, or business outcome."
  },
  leadgap: {
    deliverable: "leadgen",
    symptoms: ["lead-quality-gap"],
    text: "The campaign goal is to collect 2,000 form fills, and every response is described as a sales-ready lead. No fit, buying-intent, engagement, qualification, nurture, or Sales handoff rules are defined."
  }
};

const examples = [
  {
    type: "Landing-page copy",
    quote: "Our innovative, best-in-class solution empowers organizations to unlock seamless transformation at scale.",
    flag: "Corporate Oatmeal",
    why: "The sentence is made almost entirely of interchangeable abstractions. It identifies no buyer problem, capability, proof, or concrete outcome.",
    fix: "Name the specific operational problem, explain what the product does differently, and support the promised outcome."
  },
  {
    type: "Executive results slide",
    quote: "The campaign influenced $18.4 million in pipeline and increased buyer intent by 63%.",
    flag: "Confident Liar",
    why: "Those precise numbers may be valid, but the slide supplies no date range, definition, attribution rule, denominator, or source owner.",
    fix: "Add the calculation, cohort, time period, attribution definition, source system, and responsible data owner."
  },
  {
    type: "AI strategy review",
    quote: "This is a strong campaign strategy that effectively addresses your goals. The multichannel approach should deliver excellent results.",
    flag: "Executive Yes-Man",
    why: "The response praises the recommendation without examining assumptions, alternatives, execution risks, or evidence.",
    fix: "Ask for the strongest counterargument, the weakest assumption, two alternatives, and a low-cost test."
  },
  {
    type: "Buyer persona",
    quote: "Enterprise CISOs are risk-averse buyers who prefer analyst reports and rarely engage with product-led content.",
    flag: "Fake Persona Syndrome",
    why: "The statement treats a broad group as uniform and presents behavior as fact without segment, research method, sample, or evidence.",
    fix: "Label it as a hypothesis and validate it with interviews, behavior data, win-loss evidence, or Sales observations."
  },
  {
    type: "Campaign plan",
    quote: "Strategy: launch paid social, three webinars, an email nurture, two ebooks, an event, and weekly executive posts.",
    flag: "Strategy-Shaped Content",
    why: "This is an activity inventory. It makes no choice about audience, insight, offer, journey, tradeoffs, ownership, or measurement.",
    fix: "Connect the business goal to one buyer problem and strategic choice, then give every selected channel a specific job."
  },
  {
    type: "Lead-generation promise",
    quote: "This content-syndication campaign will deliver 1,500 sales-ready leads to the Sales team this quarter.",
    flag: "Sales-Ready Lead Mirage",
    why: "A content download may show awareness or early interest. It does not prove account fit, buying intent, meaningful engagement, or readiness for a Sales conversation.",
    fix: "Call these responses what they are, define the signals required for Sales readiness, and add nurture, qualification, handoff, and feedback steps."
  }
];

const radarForm = document.querySelector("#radarForm");
const radarResults = document.querySelector("#radarResults");
const primaryResult = document.querySelector("#primaryResult");
const secondaryResults = document.querySelector("#secondaryResults");
const reviewContext = document.querySelector("#reviewContext");
const radarError = document.querySelector("#radarError");
const observation = document.querySelector("#observation");

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function scoreFlags(deliverable, symptoms, text) {
  const scores = Object.fromEntries(Object.keys(flags).map(id => [id, 0]));
  const normalizedText = text.toLowerCase();

  Object.entries(deliverableWeights[deliverable] || {}).forEach(([id, points]) => { scores[id] += points; });
  Object.entries(flags).forEach(([id, flag]) => {
    symptoms.forEach(symptom => {
      if (flag.symptoms.includes(symptom)) scores[id] += 6;
    });
    flag.text.forEach(keyword => {
      if (normalizedText.includes(keyword)) scores[id] += 2;
    });
  });

  return Object.entries(scores)
    .map(([id, score]) => ({ id, score, ...flags[id] }))
    .sort((a, b) => b.score - a.score || a.number.localeCompare(b.number));
}

function renderPrimary(flag) {
  primaryResult.innerHTML = `
    <article class="action-card">
      <div class="action-summary">
        <span class="flag-number">RED FLAG ${escapeHtml(flag.number)}</span>
        <h4>${escapeHtml(flag.title)}</h4>
        <p><strong>${escapeHtml(flag.short)}</strong></p>
        <p>${escapeHtml(flag.description)}</p>
        <span class="risk-label">${escapeHtml(flag.risk)}</span>
      </div>
      <div class="action-details">
        <div class="detail-block">
          <h5>Why a marketer should care</h5>
          <p>${escapeHtml(flag.why)}</p>
        </div>
        <div class="detail-block">
          <h5>Ask these questions</h5>
          <ul>${flag.questions.map(question => `<li>${escapeHtml(question)}</li>`).join("")}</ul>
        </div>
        <div class="detail-block">
          <h5>Evidence to request</h5>
          <p>${escapeHtml(flag.evidence)}</p>
        </div>
        <div class="detail-block quick-fix">
          <h5>Quick fix suggestion</h5>
          <p>${escapeHtml(flag.fix)}</p>
        </div>
        <div class="action-links">
          <a href="${flag.promptHref}">Use “${escapeHtml(flag.prompt)}” ↗</a>
          <a class="secondary" href="../">Run the revised work through the BS Detector ↗</a>
        </div>
      </div>
    </article>`;
}

function renderSecondary(matches) {
  const relevant = matches.filter(match => match.score > 0).slice(1, 3);
  secondaryResults.innerHTML = relevant.length ? relevant.map(match => `
    <article class="secondary-card">
      <span>ALSO CHECK</span>
      <h4>${escapeHtml(match.title)}</h4>
      <p>${escapeHtml(match.short)} ${escapeHtml(match.description)}</p>
    </article>`).join("") : "";
}

radarForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(radarForm);
  const deliverable = data.get("deliverable");
  const symptoms = data.getAll("symptom");
  const text = observation.value.trim();

  if (!symptoms.length && !text) {
    radarError.textContent = "Choose at least one clue or describe what feels off.";
    radarResults.hidden = true;
    return;
  }

  radarError.textContent = "";
  const matches = scoreFlags(deliverable, symptoms, text);
  renderPrimary(matches[0]);
  renderSecondary(matches);
  reviewContext.textContent = deliverableLabels[deliverable];
  radarResults.hidden = false;
  radarResults.scrollIntoView({ behavior: "smooth", block: "start" });
});

radarForm.addEventListener("reset", () => {
  observation.value = "";
  radarError.textContent = "";
  radarResults.hidden = true;
});

document.querySelectorAll("[data-sample]").forEach(button => {
  button.addEventListener("click", () => {
    const sample = sampleScenarios[button.dataset.sample];
    radarForm.reset();
    document.querySelector(`input[name="deliverable"][value="${sample.deliverable}"]`).checked = true;
    sample.symptoms.forEach(value => {
      document.querySelector(`input[name="symptom"][value="${value}"]`).checked = true;
    });
    observation.value = sample.text;
    radarError.textContent = "Sample loaded. Select “Show My Red Flags” to see the action card.";
    observation.focus();
  });
});

function renderExamples() {
  document.querySelector("#exampleGrid").innerHTML = examples.map((example, index) => `
    <article class="example-card">
      <div class="example-meta"><span>SAMPLE ${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(example.type)}</span></div>
      <blockquote>“${escapeHtml(example.quote)}”</blockquote>
      <button class="reveal-button" type="button" aria-expanded="false" aria-controls="answer-${index}">Reveal the Red Flag</button>
      <div id="answer-${index}" class="example-answer" hidden>
        <h4>${escapeHtml(example.flag)}</h4>
        <p><strong>Why it is a problem:</strong> ${escapeHtml(example.why)}</p>
        <p><strong>Make the fix:</strong> ${escapeHtml(example.fix)}</p>
      </div>
    </article>`).join("");

  document.querySelectorAll(".reveal-button").forEach(button => {
    button.addEventListener("click", () => {
      const answer = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      button.textContent = isOpen ? "Reveal the Red Flag" : "Hide the Answer";
      answer.hidden = isOpen;
    });
  });
}

renderExamples();
