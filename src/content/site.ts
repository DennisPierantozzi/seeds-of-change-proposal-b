// All page copy lives here so it can later move to a CMS without touching components.

export const site = {
  name: "The Seeds of Change Initiative",
  email: "info@theseedsofchangeinitiative.org",
  volunteerFormUrl: "https://ee.kobotoolbox.org/x/MpfqLY2S",
  // Flip to true once the bank account is live.
  donationsOpen: false,
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#journey" },
  { label: "What we do", href: "#what-we-do" },
  { label: "Community", href: "#community" },
  { label: "Get involved", href: "#get-involved" },
];

export const hero = {
  kicker: "hi, we're Seeds of Change",
  title: "Helping communities to help themselves.",
  // Index of the first word that gets the marker highlight
  markFrom: 3,
  lede: "We team up with local changemakers who are already doing amazing work, and help them build organisations strong enough to keep growing.",
  caption: "community · perspective · expertise",
};

export const intro = {
  context:
    "All around the world there are people working within their local communities to make change. They identify issues that matter to them and build solutions that make sense in their local context. They educate, they provide care, they respond to the climate emergency, they solve local problems.",
  statement:
    "There are already lots of people working to better their communities: who already know more than us; who have the ideas; who are putting them into action. But perhaps they are just missing something that would help them support themselves and each other. This is where we can help.",
};

export const journey = [
  {
    title: "Collaborator",
    line: "Grounded in local knowledge",
    body: "It starts with people already rooted in their community. They know the context, they have the ideas, and they are already doing the work.",
  },
  {
    title: "Collaboration",
    line: "Working together to understand and create change",
    body: "We bring community, perspective and expertise. Together we understand their strengths and challenges, and co-create solutions.",
  },
  {
    title: "Organisation resilience",
    line: "Stronger growth and further development",
    body: "Better systems, stronger teams and clearer strategy help the organisation stand on its own and keep growing.",
  },
  {
    title: "Community impact",
    line: "Long-lasting change",
    body: "A resilient organisation reaches further into its community, and the change keeps spreading long after we step back.",
  },
];

export const about = {
  title: "The Seeds of Change Initiative",
  lede: "A team of staff, trustees, volunteers and advisors with diverse experience in development and beyond. People who share our goals and our passion.",
  experience: [
    "built schools.",
    "taught children and adults.",
    "trained teachers.",
    "installed clean water systems and developed WaSH programmes.",
    "worked in, and alongside, community kitchens.",
    "responded to natural disasters.",
    "written grant applications and developed financial tracking systems.",
    "supported volunteers.",
    "helped develop stronger community leaders who advocate for their own communities.",
    "advised social enterprises and non-profits on how to manage their teams and focus on what they do best.",
  ],
};

export const steps = [
  { label: "Research", body: "We do background research to understand our collaborators." },
  { label: "Agree", body: "We work with them to understand their strengths and what they need. We agree a strategy." },
  { label: "Co-create", body: "We collaborate with them to develop solutions, and to improve their systems and services." },
  { label: "Review", body: "We review every few months to make sure our collaboration still works for both of us." },
];

export const stepsNote =
  "We aim to work with our collaborators for several years, but we'll happily step back when we both feel it's time.";

export type Piece = { label: string; body: string[]; tone: "light" | "dark" };

// Order = the order the pieces snap into the drop.
export const pieces: Piece[] = [
  { label: "People", tone: "light", body: ["Designing and supporting staff training", "Selecting, training and supporting volunteers"] },
  { label: "Strategy", tone: "dark", body: ["Supporting senior teams with strategy, prioritisation and planning"] },
  { label: "Connection", tone: "light", body: ["Building connections with other organisations: local, national, international"] },
  { label: "Administration", tone: "dark", body: ["Streamlining organisational systems: administration and finance"] },
  { label: "Community", tone: "light", body: ["Expanding our collaborators' community reach and effectiveness"] },
  { label: "Revenue", tone: "dark", body: ["Supporting local fundraising and grant applications"] },
];

export const whatWeDo = {
  title: "What we do",
  lede: "Each of our collaborators does different work in different ways, so the help we give is different too.",
  outro: "Every organisation needs a different mix. Put together, the pieces make it stronger.",
};

export const principles = {
  lede: "Our work respects our collaborators and prioritises the communities they work in. We keep ourselves informed about international development, including the localisation agenda and the decolonisation of aid.",
  items: [
    { title: "They decide", body: "Our collaborators and their communities are the main decision makers. We provide support." },
    { title: "We co-design", body: "We work with our collaborators to co-design the work we do." },
    { title: "We build trust", body: "We build strong relationships that let both of us work well together and share our expertise." },
    { title: "We connect", body: "We create connections and strengthen community wherever possible." },
  ],
};

export const community = {
  title: "Our community",
  lede: "We don't just work with the communities where our collaborators are based. We also create our own: staff, trustees, volunteers, collaborators and supporters.",
  nodes: [
    { role: "Collaborator", place: "Asia" },
    { role: "Volunteer", place: "USA" },
    { role: "Trustee", place: "UK" },
  ],
  pillars: [
    {
      title: "Share ideas",
      body: "A space where a collaborator in Asia, a volunteer in the USA and a trustee in the UK can work out a social media strategy together.",
    },
    {
      title: "Learn together",
      body: "Training across a wide range of topics, from spreadsheet tips and practical skills to the Sustainable Development Goals and humanitarian practice.",
    },
    {
      title: "Look after each other",
      body: "Open conversations on personal resilience, burnout and healthy boundaries, to keep the compassion and grounding this work needs.",
    },
  ],
};

export const involved = {
  title: "If you want to be part of the change, we'd like to hear from you.",
  paths: {
    partner: {
      title: "Let's work together",
      body: "Lead an organisation or a volunteer team? Tell us about your work and where you could use support. We find collaborators where they are.",
      cta: "Start a conversation",
    },
    volunteer: {
      title: "Offer your skills",
      body: "If you have skills that could help the organisations we work with, or The Seeds of Change Initiative itself, we're always looking for enthusiastic, competent people.",
      cta: "Fill in the volunteer form",
    },
    donate: {
      title: "Fund the work",
      body: "Keeping this work going takes money. We pay our staff to provide their expertise, and we keep our running costs as low as we can.",
      pending: "We're completing our registration and opening a bank account. Donations open here as soon as that's done.",
    },
  },
};
