/**
 * What the guide says, and where. Kept apart from the behaviour engine so the
 * copy can be rewritten without touching the animation code.
 *
 * Voice note: dry and brief. The bird is a guide, not a mascot with opinions —
 * every line should either place the visitor or point them somewhere.
 */

export interface RouteScript {
  /** Mono label printed in the bubble's header rule. */
  label: string;
  /** Said on arrival — one picked at random so repeat visits differ. */
  arrival: string[];
  /** Said once the visitor reaches the foot of the page. */
  bottom: string;
}

export const INTRO =
  "Kia ora. I'm Kiwi — I'll walk the rule while you read. Click me for the map, or press K to send me off.";

export const WAKE = "Oh. You're back.";
export const FAST_SCROLL = "Steady on. Short legs.";
export const EGG_LINE = "…you saw nothing.";
export const HATCH_LINE =
  "That was not supposed to happen. Mind the little one.";
export const RETURN_LINE = "You left. I waited.";
export const COPY_LINE = "Taking notes? Go ahead.";
export const DEPART_LINE = "This way.";

/** Late-night arrivals get their own greeting. Kiwis are nocturnal. */
export const NIGHT_LINE =
  "It's late. I'm nocturnal, so I have an excuse — what's yours?";

/** Turned up occasionally after a dig. Half site trivia, half grumbling. */
export const MUSINGS = [
  "Found a worm. Left it. Professional dignity.",
  "There's a stray semicolon down here. Someone was careless.",
  "Nothing under this page but old CSS.",
  "Every pixel of me was placed by hand. No spritesheet.",
  "Kiwis can't fly. Neither can most side projects.",
  "This rule fills up as you read. That's the whole trick.",
  "Drag me somewhere if you like. I'll walk back.",
];

export const PICKED_UP = [
  "Oi.",
  "Put me down.",
  "This is undignified.",
  "Wheee.",
];

export const LANDED = [
  "Right. Thank you.",
  "Solid ground. Better.",
  "I'll pretend that didn't happen.",
];

export const THEME_LINES = {
  light: "Ah — daylight. I'm a night bird, remember.",
  dark: "Better. Much better.",
};

export const MODE_LINES = {
  followOn: "Fine. I'll follow your cursor.",
  followOff: "Back to the rule.",
  quietOn: "Quiet from here. I'll still show you around.",
  quietOff: "Talking again.",
  autoReadOn: "Sit back. I'll pace the page for you.",
  autoReadOff: "Stopped. You take it from here.",
};

const HOME: RouteScript = {
  label: "Front page",
  arrival: [
    "Kivi Amarakoon. Engineer. Everything else on this site hangs off this page.",
    "You're at the top. The work starts a couple of screens down.",
  ],
  bottom: "That's the front page. Projects is the one worth your time.",
};

const ABOUT: RouteScript = {
  label: "About",
  arrival: [
    "The long version — timeline, skills, certificates. The section list up top jumps you around.",
    "Twelve screens of history. Use the section nav rather than scrolling it all.",
  ],
  bottom: "That's the whole record. Contact is one click away.",
};

const BLOG_INDEX: RouteScript = {
  label: "Archive",
  arrival: [
    "The archive. Notes on systems, code, and things that broke.",
    "Writing lives here. Newest first.",
  ],
  bottom: "End of the archive. Older posts sit behind the filters.",
};

const BLOG_POST: RouteScript = {
  label: "Reading",
  arrival: [
    "Long read. I'll keep your place on the rule down here.",
    "Settle in. The rule under me fills as you go.",
  ],
  bottom: "You finished it. Rare. There's more in the archive.",
};

const PROJECTS_INDEX: RouteScript = {
  label: "Work",
  arrival: [
    "Selected work. Each card opens a full write-up.",
    "The shelf. Pick anything — they all have proper notes.",
  ],
  bottom: "That's the shelf. Click me if you'd rather be somewhere else.",
};

const PROJECT_DETAIL: RouteScript = {
  label: "Case study",
  arrival: [
    "Case study. Stack, links and the reasoning are further down.",
    "One project, in full. Keep going for the technical bits.",
  ],
  bottom: "End of the case study. Back to the shelf?",
};

const CONTACT: RouteScript = {
  label: "Contact",
  arrival: [
    "This is the part where you say hello. The form genuinely sends.",
    "Right then. Name, email, message — that's all it wants.",
  ],
  bottom: "Go on. It takes a minute.",
};

const FALLBACK: RouteScript = {
  label: "Elsewhere",
  arrival: ["New page. Give me a moment to catch up."],
  bottom: "Bottom of the page.",
};

export function scriptFor(pathname: string): RouteScript {
  if (pathname === "/") return HOME;
  if (pathname.startsWith("/about")) return ABOUT;
  if (pathname === "/blog") return BLOG_INDEX;
  if (pathname.startsWith("/blog/")) return BLOG_POST;
  if (pathname === "/projects") return PROJECTS_INDEX;
  if (pathname.startsWith("/projects/")) return PROJECT_DETAIL;
  if (pathname.startsWith("/contact")) return CONTACT;
  return FALLBACK;
}

export function pickArrival(script: RouteScript): string {
  return pickLine(script.arrival);
}

export function pickLine(lines: readonly string[]): string {
  return lines[Math.floor(Math.random() * lines.length)];
}

/** Between 11pm and 5am, local time. */
export function isLateNight(): boolean {
  const hour = new Date().getHours();
  return hour >= 23 || hour < 5;
}

/** Roughly how long a line needs to stay up to be read, within sane bounds. */
export function readingTime(text: string): number {
  return Math.min(11000, Math.max(3800, text.length * 62));
}
