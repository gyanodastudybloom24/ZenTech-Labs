export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body: { heading?: string; text: string; quote?: boolean }[];
};

export const posts: BlogPost[] = [
  {
    slug: "does-your-business-need-custom-ai",
    title: "Does your business actually need a custom AI system?",
    category: "AI & Machine Learning",
    excerpt: "Before you commission a model, work out whether the problem is a data problem, a workflow problem, or genuinely an AI problem.",
    date: "2026-01-14",
    readTime: "6 min read",
    image: "/blog/ai-decision.jpg",
    body: [
      { text: "Every few years a technology arrives that every roadmap suddenly needs a slide for. Right now, that technology is AI. The pressure to \"add AI\" to a product is real, but it is worth separating that pressure from an actual, specific problem worth solving." },
      { quote: true, text: "The most useful question isn't where can we use AI, but which decision would benefit from being faster, cheaper or more consistent." },
      { heading: "Start with the decision, not the model", text: "The most useful question is not \"where can we use AI\" but \"which decision, made repeatedly by a person today, would benefit from being faster, cheaper or more consistent.\" Underwriting a loan, triaging a support ticket, and forecasting demand are decisions. A dashboard is not a decision — it's a place decisions get made, and that distinction changes what you should build." },
      { heading: "Three questions before you write a spec", text: "First: is the data that would train or ground the system actually available, and is it trustworthy? Second: what does the business do today when the automated answer is wrong — is there a human in the loop, and is that loop cheap enough to run at scale? Third: what is the cost of a wrong answer, and is it recoverable? A wrong product recommendation is cheap. A wrong medical or financial decision is not, and that changes the entire architecture, from model choice to how much a human needs to review." },
      { heading: "Where a simpler system wins", text: "A surprising number of \"AI problems\" turn out to be rules-engine problems, search problems, or plain data-quality problems wearing an AI costume. If your support tickets are hard to route, the fix might be better tagging at the point of submission, not a classifier bolted on afterwards. We've shipped both — the honest answer is usually cheaper than the impressive one." },
      { heading: "When it's genuinely worth it", text: "Custom AI earns its cost when the pattern is too complex or too fast-moving for hand-written rules, when you have enough real examples to ground it, and when a wrong answer is cheap enough to review. Generative AI in particular is a strong fit for drafting, summarising and searching unstructured information — tasks with a human reviewing the output — and a weaker fit for anything that needs to be right every single time with no one checking." },
      { text: "If you're weighing this decision for your own product, bring us the actual workflow, not the pitch deck. We'll tell you honestly whether it's an AI problem." },
    ],
  },
  {
    slug: "cloud-migration-without-downtime",
    title: "Cloud migration without the 2am downtime call",
    category: "Cloud & Data",
    excerpt: "A practical, boring checklist for moving production workloads without the drama — because the drama is always avoidable.",
    date: "2026-02-03",
    readTime: "7 min read",
    image: "/blog/cloud-migration.jpg",
    body: [
      { text: "Most cloud migrations that go wrong don't go wrong because of the cloud. They go wrong because of assumptions nobody wrote down: about DNS propagation time, about a cron job nobody remembered, about the one service still hardcoded to an internal IP address from 2019." },
      { quote: true, text: "A migration plan without a tested rollback is a bet, not a plan." },
      { heading: "Inventory before you touch anything", text: "Before any migration plan, write down every system that talks to the one you're moving — not just the ones you remember, but the ones a grep of the codebase and the load balancer logs actually reveal. We've found forgotten webhooks, monitoring agents and backup scripts on more than one \"simple\" migration. The inventory is unglamorous work and it's where most of the real risk gets found." },
      { heading: "Migrate data before you migrate traffic", text: "Get replication running well before cutover, and prove it under real load rather than trusting a dashboard that says \"synced.\" A read-only replica that has been serving real read traffic for two weeks tells you far more than a green checkmark. Cutover should be the boring last step, not the first test of whether replication actually works." },
      { heading: "Cut over in slices, not one weekend", text: "Where the architecture allows it, move by service or by customer segment rather than flipping everything on one migration weekend. A canary of 5% of traffic on the new infrastructure for 48 hours will surface the problems that a full cutover hides until Monday morning. Keep the old environment warm and reversible until the new one has handled a full business cycle — including your busiest day, not your quietest one." },
      { heading: "Rehearse the rollback, not just the migration", text: "A migration plan without a tested rollback is a bet, not a plan. We rehearse the rollback path as carefully as the forward path, including how DNS TTLs affect how fast you can actually reverse a decision — which is usually slower than people assume, and worth knowing before you need it." },
      { text: "None of this is exotic. It's the difference between a migration that's a non-event and one that becomes an incident report. We plan for the former." },
    ],
  },
  {
    slug: "why-mvps-fail-before-real-users",
    title: "Why most MVPs fail before they ever reach real users",
    category: "Software Engineering",
    excerpt: "The minimum viable product usually dies from scope creep in the wrong direction — too much building, not enough deciding.",
    date: "2026-03-11",
    readTime: "5 min read",
    image: "/blog/mvp-code.jpg",
    body: [
      { text: "\"MVP\" has become a synonym for \"smaller version of the full product\" — which misses the point entirely. A minimum viable product is meant to answer one question as fast and cheaply as possible: will someone use this. Most MVPs we're brought in to rescue never got the chance to answer that question, because they weren't actually minimum." },
      { quote: true, text: "If a feature could be removed without changing whether the hypothesis gets tested, it doesn't belong in the first release." },
      { heading: "The feature that answers nothing", text: "If a feature could be removed without changing whether the core hypothesis gets tested, it doesn't belong in the first release. User accounts, admin dashboards, and configurable settings are frequently built before a single outside user has tried the thing the product is actually for. They feel like progress. They are usually a way of avoiding the harder, scarier work of putting something imperfect in front of a stranger." },
      { heading: "Build the part that's actually uncertain", text: "Every product has one or two genuinely uncertain parts — will people pay for this, does the matching algorithm produce good results, is the workflow actually faster than what people do today — surrounded by parts that are simply engineering. Spend your first weeks on the uncertain part, even if it means the rest is held together with manual work and spreadsheets behind the scenes. It is far cheaper to learn the core hypothesis is wrong in month one than after the polished version ships." },
      { heading: "Ship to people who can tell you the truth", text: "An MVP tested only on friends and colleagues will get polite feedback. Find the smallest group of people with the actual problem you're solving, even if it's five people, and watch what they do rather than what they say. Usage data from five real, motivated users outweighs opinions from fifty people doing you a favour." },
      { text: "We build MVPs to be thrown away in parts — the throwaway bits should be obvious to everyone from day one, so nobody's precious about deleting them once they've done their job of teaching you something." },
    ],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs fine-tuning: choosing the right approach for your LLM product",
    category: "AI & Machine Learning",
    excerpt: "They solve different problems. Picking the wrong one is the most common — and most expensive — mistake we see in AI product teams.",
    date: "2026-04-22",
    readTime: "8 min read",
    image: "/blog/rag-brain.jpg",
    body: [
      { text: "Retrieval-augmented generation and fine-tuning both make a large language model more useful for a specific job, and teams frequently reach for the wrong one because both get pitched as \"customising the model.\" They're solving different problems, and the choice has real cost and maintenance consequences." },
      { quote: true, text: "RAG teaches a model what it doesn't know yet. Fine-tuning teaches it how to behave." },
      { heading: "RAG teaches the model what it doesn't know yet", text: "Retrieval-augmented generation gives the model access to information at the moment it's asked a question — your documentation, your product catalogue, this week's data — without retraining anything. It's the right tool when the underlying facts change often, when you need to cite a source, and when you want to add or remove information without touching the model itself. Most \"chat with your documents\" and internal knowledge-base products are RAG problems, full stop." },
      { heading: "Fine-tuning teaches the model how to behave", text: "Fine-tuning changes the model's weights so it reliably produces a certain style, format or reasoning pattern — matching your brand voice, following a strict output schema, or getting better at a narrow task with lots of labelled examples. It's the right tool when the facts aren't the issue but the behaviour is: the model knows the right information but phrases it wrong, skips steps, or ignores your format every third response." },
      { heading: "The expensive mistake", text: "The costly error is fine-tuning to \"teach\" a model facts that change weekly — you'll be retraining constantly and still serving stale answers between runs. The second most common error is the reverse: trying to fix a formatting or tone problem with better retrieval, when the fix actually belongs in the prompt or a light fine-tune, not in a bigger, more expensive retrieval pipeline." },
      { heading: "Most production systems need both, in stages", text: "A pragmatic path is usually: ship with strong retrieval and prompt engineering first, since it's faster to iterate and has no training cost. Only reach for fine-tuning once you have real production examples showing exactly where prompting hits its ceiling — then fine-tune narrowly for that specific behaviour gap, keeping retrieval doing the job of staying current." },
      { text: "If you're mid-argument internally about which one to build, send us the actual failure cases from your current prototype. That's usually enough to settle it in an afternoon." },
    ],
  },
  {
    slug: "founders-guide-technology-partner",
    title: "A founder's guide to picking a technology partner",
    category: "Digital Strategy",
    excerpt: "The questions that actually predict whether an engineering partnership will still be working a year from now.",
    date: "2026-05-30",
    readTime: "6 min read",
    image: "/blog/strategy-planning.jpg",
    body: [
      { text: "Choosing who builds your product is a bigger decision than most founders treat it as, and the usual filters — a nice portfolio site, a low hourly rate, a friendly first call — predict almost nothing about whether the partnership survives contact with a real deadline." },
      { quote: true, text: "A partner confident in the value they provide will answer hard questions without flinching, because they aren't relying on lock-in to keep you." },
      { heading: "Ask what they'd cut first", text: "Describe your roadmap and ask which two features they'd cut if the timeline halved tomorrow. A partner who can answer immediately and specifically understands your product, not just your ticket list. A partner who says \"we'd need to discuss that with you\" for everything isn't wrong to say so, but it tells you they haven't yet formed an opinion about what actually matters to your users." },
      { heading: "Ask to see something that didn't go well", text: "Every team that's shipped real software has a project that slipped, a launch that had a rough week, or a technical decision they'd reverse. How a partner talks about that — specifically, honestly, with what changed afterward — tells you far more than another polished case study. Vague deflection here is a real signal." },
      { heading: "Look at who actually writes the code", text: "A compelling pitch is sometimes delivered by people who will never touch your codebase, with the real work handed to a rotating, less senior team afterward. Ask directly who will be doing the engineering day to day, and ask to speak to them before you sign anything, not after." },
      { heading: "Check what happens when you want to leave", text: "Ask, before you start, how you'd take your codebase and your data elsewhere if the relationship ended — cleanly, without a ransom negotiation. A partner confident in the value they provide will answer this without flinching, because they're not relying on lock-in to keep you." },
      { text: "We'd rather answer these four questions well in a first call than win you over with a slide deck. If you're evaluating partners right now, ask us the same questions you're asking everyone else." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find(p => p.slug === slug);
}
