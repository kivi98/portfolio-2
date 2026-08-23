/**
 * Pixel data for the kiwi guide.
 *
 * Every frame is a 28x20 grid of characters, one character per pixel. Keeping
 * the art as text (rather than a PNG spritesheet) means the bird is recoloured
 * from the live theme palette — it prints in ink on paper in light mode and in
 * warm bronze on ink in dark mode — with no extra network requests.
 *
 * Legend:
 *   .  transparent      o  outline / eye      b  body        s  body shadow
 *   h  body highlight   k  beak (rust)        f  feet (rust) w  eye glint
 */

export const SPRITE_W = 28;
export const SPRITE_H = 20;

/** Rows 0-14: the body. Rows 15-19 come from LEGS so poses can share a torso. */
const BODY_STAND = [
  "............................",
  "...........oooooo...........",
  "......ooooohhhhhhoo.........",
  "....oohhhhhhhhhhhhho........",
  "...ohhhhhhhhhhhhhhhho.......",
  "..ohhhhhhhhhhhheehhho.......",
  "..obbhhhhhhhhhheehhhho......",
  ".obbbbbbhhhhhhhhhhhhoo......",
  ".obbbbbbbbbhhhhhhhboookk....",
  ".obbbbbbbbbbbbbbbbbookkkkk..",
  ".obbbbbbbbbbbbbbbbbo...kkkkk",
  "..osbbbbbbbbbbbbbbo......kkk",
  "..ossssbbbbbbbbbbo..........",
  "...oossssssbbbboo...........",
  ".....oooooooooo.............",
];

/** Same torso, lid drawn shut over the eye. */
const BODY_BLINK = [
  "............................",
  "...........oooooo...........",
  "......ooooohhhhhhoo.........",
  "....oohhhhhhhhhhhhho........",
  "...ohhhhhhhhhhhhhhhho.......",
  "..ohhhhhhhhhhhhhhhhho.......",
  "..obbhhhhhhhhhoooohhho......",
  ".obbbbbbhhhhhhhhhhhhoo......",
  ".obbbbbbbbbhhhhhhhboookk....",
  ".obbbbbbbbbbbbbbbbbookkkkk..",
  ".obbbbbbbbbbbbbbbbbo...kkkkk",
  "..osbbbbbbbbbbbbbbo......kkk",
  "..ossssbbbbbbbbbbo..........",
  "...oossssssbbbboo...........",
  ".....oooooooooo.............",
];

/** Rows 15-19. */
const LEGS = {
  stand: [
    "......ff...ff...............",
    "......ff...ff...............",
    "......ff...ff...............",
    ".....ffff.ffff..............",
    "............................",
  ],
  // Mid-stride, legs splayed.
  stepA: [
    ".....ff.....ff..............",
    "....ff.......ff.............",
    "....ff.......ff.............",
    "...ffff.....ffff............",
    "............................",
  ],
  // Mid-stride, legs gathered.
  stepB: [
    ".......ff..ff...............",
    "......ff....ff..............",
    "......ff....ff..............",
    ".....ffff..ffff.............",
    "............................",
  ],
  // Both feet off the ground.
  air: [
    "....ff.......ff.............",
    "...ff.........ff............",
    "..fff.........fff...........",
    "............................",
    "............................",
  ],
};

/** Head down, beak driven into the baseline — what a real kiwi does all night. */
const PECK = [
  "............................",
  "............................",
  ".......oooooooo.............",
  "....oooohhhhhhhhoo..........",
  "...ohhhhhhhhhhhhhhho........",
  "..ohhhhhhhhhhhhhhhhho.......",
  "..obbhhhhhhhhhheehhhoo......",
  ".obbbbbbhhhhhhheehhhhoo.....",
  ".obbbbbbbbbhhhhhhhhboo......",
  ".obbbbbbbbbbbbbbbbbboo......",
  ".obbbbbbbbbbbbbbbbbbo.kk....",
  "..osbbbbbbbbbbbbbbbo..kk....",
  "..ossssbbbbbbbbbbbo....kk...",
  "...oossssssbbbbboo.....kk...",
  ".....oooooooooo.........kk..",
  "......ff...ff...........kk..",
  "......ff...ff............kk.",
  "......ff...ff............kk.",
  ".....ffff.ffff...........kk.",
  "............................",
];

/** Head up, beak level, eye wide — used when it has something to say. */
const ALERT = [
  "............................",
  "..........oooooo............",
  ".....ooooohhhhhhoo..........",
  "...oohhhhhhhhhhhhho.........",
  "..ohhhhhhhhhhhhwehhho.......",
  "..ohhhhhhhhhhhheehhhho......",
  ".obbbhhhhhhhhhhhhhhhookkkk..",
  ".obbbbbbhhhhhhhhhhhhookkkkkk",
  ".obbbbbbbbbhhhhhhhbboo......",
  ".obbbbbbbbbbbbbbbbbbo.......",
  ".obbbbbbbbbbbbbbbbbo........",
  "..osbbbbbbbbbbbbbbo.........",
  "..ossssbbbbbbbbbbo..........",
  "...oossssssbbbboo...........",
  ".....oooooooooo.............",
  "......ff...ff...............",
  "......ff...ff...............",
  "......ff...ff...............",
  ".....ffff.ffff..............",
  "............................",
];

/** Settled onto the ground, legs tucked away, eye shut. */
const SLEEP = [
  "............................",
  "............................",
  "...........oooooo...........",
  "......ooooohhhhhhoo.........",
  "....oohhhhhhhhhhhhho........",
  "...ohhhhhhhhhhhhhhhho.......",
  "..ohhhhhhhhhhooohhhho.......",
  "..obbbbhhhhhhhhhhhhhoo......",
  ".obbbbbbbbbhhhhhhhboookk....",
  ".obbbbbbbbbbbbbbbbbookkkkk..",
  ".obbbbbbbbbbbbbbbbbo...kkkkk",
  ".obbbbbbbbbbbbbbbbbo.....kkk",
  "..ossssbbbbbbbbbbbo.........",
  "..oosssssssbbbbbboo.........",
  "....oooooooooooooo..........",
  "............................",
  "............................",
  "............................",
  "............................",
  "............................",
];

/** Both feet off the ground. */
const HOP = [...BODY_STAND, ...LEGS.air];

/** Lifted off the rule by the visitor: legs hang limp, eye wide. */
const HELD = [
  "............................",
  "...........oooooo...........",
  "......ooooohhhhhhoo.........",
  "....oohhhhhhhhhhhhho........",
  "...ohhhhhhhhhhhwehhho.......",
  "..ohhhhhhhhhhhheehhhho......",
  "..obbhhhhhhhhhhhhhhhhoo.....",
  ".obbbbbbhhhhhhhhhhhhbookk...",
  ".obbbbbbbbbhhhhhhhbboo.kkk..",
  ".obbbbbbbbbbbbbbbbbo....kkk.",
  "..osbbbbbbbbbbbbbbo......kk.",
  "..ossssbbbbbbbbbbo..........",
  "...oossssssbbbboo...........",
  ".....oooooooooo.............",
  "......f.....f...............",
  "......f.....f...............",
  ".......f.....f..............",
  ".......f.....f..............",
  "......ff.....ff.............",
  "............................",
];

/** Leaning into a sprint, legs at full stretch. */
const RUN_1 = [
  "............................",
  "............oooooo..........",
  ".......ooooohhhhhhoo........",
  ".....oohhhhhhhhhhhhho.......",
  "....ohhhhhhhhhhhhhhhho......",
  "...ohhhhhhhhhhhheehhho......",
  "..obbhhhhhhhhhhheehhhho.....",
  ".obbbbbbhhhhhhhhhhhhoo......",
  ".obbbbbbbbbhhhhhhhboookkkk..",
  ".obbbbbbbbbbbbbbbbbookkkkkkk",
  ".obbbbbbbbbbbbbbbbbo........",
  "..osbbbbbbbbbbbbbbo.........",
  "..ossssbbbbbbbbbbo..........",
  "...oossssssbbbboo...........",
  ".....oooooooooo.............",
  "...ff........ff.............",
  "..ff..........ff............",
  ".ff............ff...........",
  "fff............fff..........",
  "............................",
];

/** The gathered half of the sprint — body dips, legs tuck under. */
const RUN_2 = [
  "............................",
  "............................",
  "............oooooo..........",
  ".......ooooohhhhhhoo........",
  ".....oohhhhhhhhhhhhho.......",
  "....ohhhhhhhhhhhhhhhho......",
  "...ohhhhhhhhhhhheehhho......",
  "..obbhhhhhhhhhhheehhhho.....",
  ".obbbbbbhhhhhhhhhhhhookkkk..",
  ".obbbbbbbbbhhhhhhhboookkkkkk",
  ".obbbbbbbbbbbbbbbbbbo.......",
  ".obbbbbbbbbbbbbbbbbo........",
  "..ossssbbbbbbbbbbbo.........",
  "..oossssssbbbbbboo..........",
  "....oooooooooooo............",
  "......ff...ff...............",
  ".....ff.....ff..............",
  "....fff.....fff.............",
  "............................",
  "............................",
];

/** Beak buried in the baseline, throwing up dirt. */
const DIG_1 = [
  "............................",
  "............................",
  ".......oooooooo.............",
  "....oooohhhhhhhhoo..........",
  "...ohhhhhhhhhhhhhhho........",
  "..ohhhhhhhhhhhhhhhhho.......",
  "..obbhhhhhhhhhheehhhoo......",
  ".obbbbbbhhhhhhheehhhhoo.....",
  ".obbbbbbbbbhhhhhhhhboo......",
  ".obbbbbbbbbbbbbbbbbboo......",
  ".obbbbbbbbbbbbbbbbbbo.kk....",
  "..osbbbbbbbbbbbbbbbo..kk..d.",
  "..ossssbbbbbbbbbbbo....kk...",
  "...oossssssbbbbboo.....kk.d.",
  ".....oooooooooo.........kk..",
  "......ff...ff...........kk.d",
  "......ff...ff............kk.",
  "......ff...ff...........dkk.",
  ".....ffff.ffff...........kk.",
  "............................",
];

/** The second beat of the dig — body drops, dirt flies higher. */
const DIG_2 = [
  "............................",
  "............................",
  "............................",
  ".......oooooooo.............",
  "....oooohhhhhhhhoo..........",
  "...ohhhhhhhhhhhhhhho........",
  "..ohhhhhhhhhhhhhhhhho.......",
  "..obbhhhhhhhhhheehhhoo..d...",
  ".obbbbbbhhhhhhheehhhhoo.....",
  ".obbbbbbbbbhhhhhhhhboo....d.",
  ".obbbbbbbbbbbbbbbbbboo......",
  ".obbbbbbbbbbbbbbbbbbo.kk.d..",
  "..osbbbbbbbbbbbbbbbo..kk....",
  "..ossssbbbbbbbbbbbo....kk.d.",
  "...oossssssbbbbboo.....kk...",
  ".....oooooooooo.........kk..",
  "......ff...ff...........kk..",
  "......ff...ff............kk.",
  ".....ffff.ffff...........kk.",
  "............................",
];

export type PoseName =
  | "idle"
  | "blink"
  | "walk1"
  | "walk2"
  | "walk3"
  | "walk4"
  | "run1"
  | "run2"
  | "peck"
  | "dig1"
  | "dig2"
  | "alert"
  | "sleep"
  | "hop"
  | "flap"
  | "held";

export const FRAMES: Record<PoseName, readonly string[]> = {
  idle: [...BODY_STAND, ...LEGS.stand],
  blink: [...BODY_BLINK, ...LEGS.stand],
  // A four-beat gait: contact, pass, contact, pass — so the feet read as
  // alternating rather than hopping in place.
  walk1: [...BODY_STAND, ...LEGS.stepA],
  walk2: [...BODY_STAND, ...LEGS.stand],
  walk3: [...BODY_STAND, ...LEGS.stepB],
  walk4: [...BODY_STAND, ...LEGS.stand],
  run1: RUN_1,
  run2: RUN_2,
  peck: PECK,
  dig1: DIG_1,
  dig2: DIG_2,
  alert: ALERT,
  sleep: SLEEP,
  hop: HOP,
  // Celebrating: head up, both feet off the ground.
  flap: [...ALERT.slice(0, 15), ...LEGS.air],
  held: HELD,
};

export const WALK_CYCLE: PoseName[] = ["walk1", "walk2", "walk3", "walk4"];
export const RUN_CYCLE: PoseName[] = ["run1", "run2"];
export const DIG_CYCLE: PoseName[] = ["dig1", "dig2"];

/** A pixel egg — laid by the easter egg, and what becomes of it. */
export const EGG_W = 9;
export const EGG_H = 9;

export type EggStage = "whole" | "crack" | "open";

export const EGG_FRAMES: Record<EggStage, readonly string[]> = {
  whole: [
    "..ooo....",
    ".ohhho...",
    "ohhhhho..",
    "ohhhhbo..",
    "ohhhbbo..",
    "ohhbbbo..",
    "ohbbbbo..",
    ".obbbo...",
    "..ooo....",
  ],
  crack: [
    "..ooo....",
    ".ohhho...",
    "ohhohho..",
    "ohoohbo..",
    "ohhohbo..",
    "ohhobbo..",
    "ohbobbo..",
    ".obobo...",
    "..ooo....",
  ],
  open: [
    "...d.....",
    "..o..o...",
    ".o.o..o..",
    "o...o...o",
    "oo...o..o",
    "ohho.hhoo",
    "ohhbbhho.",
    ".ooooooo.",
    ".........",
  ],
};

/** A two-beat puff of dirt, thrown up on landing. */
export const DUST_W = 9;
export const DUST_H = 4;
export const DUST_FRAMES = [
  [".........", "..d...d..", ".d.....d.", "d.......d"],
  [".........", "...d.d...", "..d...d..", ".d.....d."],
];

export type KiwiPalette = Record<string, string | null>;

/**
 * The bird keeps its own warm palette rather than borrowing the UI's greys —
 * only the beak and feet track the theme's rust accent, so it stays part of
 * the same print job.
 */
export function getKiwiPalette(
  mode: "light" | "dark",
  accent: string,
  accentDeep: string,
): KiwiPalette {
  return mode === "light"
    ? {
        ".": null,
        o: "#1B1712",
        b: "#A67C52",
        s: "#7A5636",
        h: "#C79A6B",
        k: accent,
        f: accentDeep,
        w: "#FCFAF5",
        d: "#B5AA9B",
      }
    : {
        ".": null,
        // A touch lighter than the ink background so the silhouette still
        // separates without resorting to a bright cartoon outline.
        o: "#2E2117",
        b: "#B08558",
        s: "#86603C",
        h: "#D2A876",
        k: accent,
        f: accentDeep,
        w: "#F4EFE7",
        d: "#6E655B",
      };
}
