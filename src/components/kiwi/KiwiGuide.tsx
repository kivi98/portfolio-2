"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { useKiwi } from "./KiwiContext";
import { paintPixels } from "./paint";
import KiwiMenu, { type KiwiSection } from "./KiwiMenu";
import {
  DIG_CYCLE,
  DUST_FRAMES,
  DUST_H,
  DUST_W,
  EGG_FRAMES,
  EGG_H,
  EGG_W,
  FRAMES,
  getKiwiPalette,
  RUN_CYCLE,
  SPRITE_H,
  SPRITE_W,
  WALK_CYCLE,
  type EggStage,
  type KiwiPalette,
  type PoseName,
} from "./sprites";
import {
  COPY_LINE,
  DEPART_LINE,
  EGG_LINE,
  FAST_SCROLL,
  HATCH_LINE,
  INTRO,
  isLateNight,
  LANDED,
  MODE_LINES,
  MUSINGS,
  NIGHT_LINE,
  PICKED_UP,
  pickArrival,
  pickLine,
  readingTime,
  RETURN_LINE,
  scriptFor,
  THEME_LINES,
  WAKE,
} from "./dialogue";

/** Keeps the bird clear of the viewport edges. */
const MARGIN = 20;
/** How long the visitor must be still before the bird nods off. */
const SLEEP_AFTER = 45_000;
/** Pixels per frame at a walk, and when it has to sprint to catch up. */
const WALK_SPEED = 3.4;
const RUN_SPEED = 9;
/** Distance at which walking becomes running. */
const RUN_THRESHOLD = 170;
/** Art-pixels of travel per leg frame. */
const STRIDE = 5;
/** Pointer travel before a press on the bird counts as a drag, not a click. */
const DRAG_THRESHOLD = 6;
/** How far off the rule the bird can be carried, and how hard it comes down. */
const MAX_LIFT = 280;
const GRAVITY = 1.6;
/** Autoread pace — roughly 65px a second, a comfortable reading speed. */
const AUTOREAD_PX = 1.1;
/**
 * Leading the visitor to a page is a flourish, not a toll gate: the bird
 * accelerates off the edge, and navigates anyway once the deadline passes so a
 * wide screen can never hold the route change up.
 */
const EXIT_SPEED = 13;
const EXIT_ACCEL = 1.14;
const EXIT_DEADLINE = 620;
/** Quiet is a comfort setting, so it outlives the visit. */
const QUIET_KEY = "kiwiQuiet";
/** How long the egg sits before it does something unexpected. */
const HATCH_DELAY = 14_000;
const CRACK_DURATION = 1400;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Collects the page's kiwi-annotated sections for the panel's jump list. */
function collectSections(): KiwiSection[] {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-kiwi-hint]"),
  );
  const sections: KiwiSection[] = [];
  for (const node of nodes) {
    const heading = node.querySelector("h1, h2, h3");
    const label = (heading?.textContent ?? "").trim();
    if (!label) continue;
    sections.push({
      label,
      // Leave room for the fixed header above the section's own heading.
      top: Math.max(0, node.getBoundingClientRect().top + window.scrollY - 110),
    });
    if (sections.length === 8) break;
  }
  return sections;
}

/** A two-frame puff of dirt, thrown up wherever the bird lands. */
function DustPuff({
  x,
  scale,
  palette,
}: {
  x: number;
  scale: number;
  palette: KiwiPalette;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    paintPixels(canvas, DUST_FRAMES[0], palette);
    const timer = setTimeout(() => {
      if (ref.current) paintPixels(ref.current, DUST_FRAMES[1], palette);
    }, 170);
    return () => clearTimeout(timer);
  }, [palette]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        bottom: "1px",
        left: 0,
        transform: `translateX(${x}px)`,
      }}
    >
      <canvas
        ref={ref}
        width={DUST_W}
        height={DUST_H}
        style={{
          display: "block",
          width: DUST_W * scale,
          height: DUST_H * scale,
          imageRendering: "pixelated",
        }}
      />
    </Box>
  );
}

/**
 * The guide itself. Split from the provider so that switching it off unmounts
 * every listener and the animation frame rather than leaving them idling.
 */
function KiwiStage({
  scale,
  reducedMotion,
  introPending,
  onIntroDelivered,
  onHide,
}: {
  scale: number;
  reducedMotion: boolean;
  introPending: boolean;
  onIntroDelivered: () => void;
  onHide: () => void;
}) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const spriteW = SPRITE_W * scale;
  const spriteH = SPRITE_H * scale;
  /** The hatchling is drawn a step smaller than its parent. */
  const chickScale = Math.max(1, scale - 1);

  const kiwiRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chickCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chickBoxRef = useRef<HTMLDivElement | null>(null);
  const eggCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inkRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [bubble, setBubble] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [sections, setSections] = useState<KiwiSection[]>([]);
  const [follow, setFollow] = useState(false);
  // Safe to read storage here: the stage only ever renders on the client,
  // after the provider has settled.
  const [quiet, setQuiet] = useState(
    () => window.localStorage.getItem(QUIET_KEY) === "1",
  );
  const [autoRead, setAutoRead] = useState(false);
  // The panel covers the speech bubble, so a mode confirmation has to be shown
  // inside the panel itself — that is the only place the visitor is looking.
  const [note, setNote] = useState<string | null>(null);
  const [egg, setEgg] = useState<{ x: number; stage: EggStage } | null>(null);
  const [chick, setChick] = useState(false);
  const [dust, setDust] = useState<{ x: number; key: number } | null>(null);

  const palette = useMemo(
    () =>
      getKiwiPalette(
        theme.palette.mode,
        theme.palette.secondary.main,
        theme.palette.secondary.dark,
      ),
    [
      theme.palette.mode,
      theme.palette.secondary.main,
      theme.palette.secondary.dark,
    ],
  );

  // Everything the animation loop touches lives in one ref so the loop never
  // needs to re-subscribe when React state changes.
  const anim = useRef({
    x: -SPRITE_W * scale,
    facing: 1,
    legPhase: 0,
    lift: 0,
    vy: 0,
    wander: 0,
    nextWander: 0,
    nextBlink: 0,
    blinkUntil: 0,
    nextPeck: 0,
    peckUntil: 0,
    nextDig: 0,
    digUntil: 0,
    digFind: false,
    hopUntil: 0,
    flapUntil: 0,
    lastInteraction: 0,
    lastPct: -1,
    docRange: 0,
    painted: "",
    saidBottom: false,
    saidFast: 0,
    sleptAt: 0,
    // Drag bookkeeping.
    dragging: false,
    dragPointer: null as number | null,
    dragMoved: false,
    grabX: 0,
    grabY: 0,
    grabOffset: 0,
    dragX: 0,
    dragLift: 0,
    // Where the pointer last was, so the bird can look at it.
    pointerX: -1,
    // Set while the bird is running off screen to lead the visitor somewhere.
    exitHref: null as string | null,
    exitSpeed: EXIT_SPEED,
    exitBy: 0,
    // The hatchling trailing behind.
    chickX: 0,
    chickFacing: 1,
    chickPhase: 0,
    chickPainted: "",
  });

  const bubbleRef = useRef<string | null>(null);
  const menuOpenRef = useRef(false);
  const asleepRef = useRef(false);
  const quietRef = useRef(false);
  const followRef = useRef(false);
  const autoReadRef = useRef(false);
  const chickRef = useRef(false);
  const lastSaidAt = useRef(0);
  const lastCopyAt = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eggTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const dustTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scriptRef = useRef(scriptFor(pathname));
  const routerRef = useRef(router);
  // The introduction is owed to this visit only. Held in a ref so that clearing
  // the stored flag part-way through the session can't make it play twice.
  const introOwed = useRef(introPending);
  const panelWidth = useRef(0);
  const saidHints = useRef<Set<string>>(new Set());
  const clicks = useRef({ count: 0, at: 0 });

  bubbleRef.current = bubble;
  menuOpenRef.current = menuOpen;
  quietRef.current = quiet;
  followRef.current = follow;
  autoReadRef.current = autoRead;
  chickRef.current = chick;
  scriptRef.current = scriptFor(pathname);
  routerRef.current = router;

  /**
   * Shows a line, holding it long enough to be read. Quiet mode swallows
   * everything except `force`d lines, which are only ever direct answers to
   * something the visitor just did.
   */
  const say = useCallback((text: string, options?: { force?: boolean }) => {
    const forced = options?.force === true;
    if (!forced && (menuOpenRef.current || quietRef.current)) return;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    lastSaidAt.current = performance.now();
    setBubble(text);
    hideTimer.current = setTimeout(() => setBubble(null), readingTime(text));
  }, []);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (dustTimer.current) clearTimeout(dustTimer.current);
      eggTimers.current.forEach(clearTimeout);
    },
    [],
  );

  // --- Page geometry -------------------------------------------------------
  // scrollHeight is a layout read, so it is measured on change rather than on
  // every animation frame.
  useEffect(() => {
    const measure = () => {
      anim.current.docRange = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [pathname]);

  // --- Activity tracking ---------------------------------------------------
  useEffect(() => {
    anim.current.lastInteraction = performance.now();
    const wake = (event: Event) => {
      const now = performance.now();
      const wasAsleep = asleepRef.current;
      anim.current.lastInteraction = now;
      if (event.type === "pointermove") {
        anim.current.pointerX = (event as PointerEvent).clientX;
      }
      // A greeting on waking, but only occasionally — every time would grate.
      if (
        wasAsleep &&
        now - anim.current.sleptAt > 12_000 &&
        Math.random() < 0.34
      ) {
        say(WAKE);
      }
    };
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "pointerdown",
      "pointermove",
      "keydown",
      "wheel",
      "touchstart",
    ];
    events.forEach((event) =>
      window.addEventListener(event, wake, { passive: true }),
    );
    return () =>
      events.forEach((event) => window.removeEventListener(event, wake));
  }, [say]);

  // --- The loop ------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const kiwi = kiwiRef.current;
    if (!canvas || !kiwi) return;

    // Force a repaint after a theme or scale change.
    anim.current.painted = "";
    anim.current.chickPainted = "";
    let frame = 0;
    let running = true;
    let hiddenAt = 0;

    const tick = (now: number) => {
      if (!running) return;
      const st = anim.current;
      const vw = window.innerWidth;
      const lane = Math.max(0, vw - MARGIN * 2 - spriteW);
      const progress =
        st.docRange > 0 ? clamp(window.scrollY / st.docRange, 0, 1) : 0;
      // The rule always marks true reading position, even when the bird has
      // been carried off or sent chasing the cursor.
      const ruleAnchor = MARGIN + progress * lane;
      const talking = bubbleRef.current !== null || menuOpenRef.current;

      if (autoReadRef.current && !st.dragging) {
        if (st.docRange - window.scrollY <= 1) {
          autoReadRef.current = false;
          setAutoRead(false);
        } else {
          window.scrollBy(0, AUTOREAD_PX);
        }
      }

      let pose: PoseName;

      if (st.dragging) {
        // Carried: the bird goes exactly where the pointer puts it.
        st.x = clamp(st.dragX, MARGIN, MARGIN + lane);
        st.lift = st.dragLift;
        pose = "held";
      } else if (st.lift > 0) {
        st.vy += GRAVITY;
        st.lift = Math.max(0, st.lift - st.vy);
        pose = "held";
        if (st.lift === 0) {
          st.vy = 0;
          st.hopUntil = now + 260;
          const landedAt = Math.round(st.x / scale) * scale;
          if (dustTimer.current) clearTimeout(dustTimer.current);
          setDust({ x: landedAt + Math.round(spriteW * 0.22), key: now });
          dustTimer.current = setTimeout(() => setDust(null), 420);
          say(pickLine(LANDED));
        }
      } else {
        const anchor = st.exitHref
          ? vw + spriteW
          : followRef.current && st.pointerX >= 0
            ? clamp(st.pointerX - spriteW / 2, MARGIN, MARGIN + lane)
            : ruleAnchor;
        const target = st.exitHref
          ? anchor
          : clamp(
              anchor + (followRef.current ? 0 : st.wander),
              MARGIN,
              MARGIN + lane,
            );
        const dx = target - st.x;
        const distance = Math.abs(dx);

        if (distance > 0.8) {
          if (reducedMotion) {
            // No gait, no easing — the bird simply keeps its place on the rule.
            st.x = target;
            pose = talking ? "alert" : "idle";
          } else {
            const top =
              st.exitHref || distance > RUN_THRESHOLD ? RUN_SPEED : WALK_SPEED;
            let step: number;
            if (st.exitHref) {
              st.exitSpeed *= EXIT_ACCEL;
              step = st.exitSpeed;
            } else {
              step = Math.min(distance * 0.16, top);
            }
            st.x += Math.sign(dx) * step;
            st.facing = dx >= 0 ? 1 : -1;
            st.legPhase += step;
            pose =
              step > WALK_SPEED * 1.15
                ? RUN_CYCLE[Math.floor(st.legPhase / (STRIDE + 1)) % 2]
                : WALK_CYCLE[Math.floor(st.legPhase / STRIDE) % 4];
            // Left far enough behind by a fast scroll to be worth a comment.
            if (
              !st.exitHref &&
              distance > vw * 0.45 &&
              now - st.saidFast > 60_000 &&
              !talking
            ) {
              st.saidFast = now;
              say(FAST_SCROLL);
            }
          }
          // Off the edge — or out of time — hand over to the route.
          if (st.exitHref && (st.x > vw || now > st.exitBy)) {
            const href = st.exitHref;
            st.exitHref = null;
            st.x = -spriteW;
            routerRef.current.push(href);
          }
        } else {
          st.x = target;
          const idleFor = now - st.lastInteraction;
          if (!reducedMotion && idleFor > SLEEP_AFTER && !talking) {
            pose = "sleep";
          } else if (now < st.flapUntil) {
            pose = "flap";
          } else if (now < st.hopUntil) {
            pose = "hop";
          } else if (now < st.digUntil) {
            pose = DIG_CYCLE[Math.floor(now / 180) % 2];
            // Something turned up in the dirt — decided when the dig was
            // scheduled, and said as it finishes rather than as it starts.
            if (st.digFind && now > st.digUntil - 260 && !talking) {
              st.digFind = false;
              say(pickLine(MUSINGS));
            }
          } else if (now < st.peckUntil) {
            pose = "peck";
          } else if (now < st.blinkUntil) {
            pose = "blink";
          } else if (talking) {
            pose = "alert";
          } else {
            pose = "idle";
            // Idle and unbothered: look at the pointer rather than straight
            // ahead. It is the cheapest thing that makes it feel awake.
            if (!reducedMotion && st.pointerX >= 0) {
              const centre = st.x + spriteW / 2;
              if (Math.abs(st.pointerX - centre) > 40) {
                st.facing = st.pointerX > centre ? 1 : -1;
              }
            }
            if (!reducedMotion) {
              if (now > st.nextBlink) {
                st.blinkUntil = now + 150;
                st.nextBlink = now + 2600 + Math.random() * 4200;
              } else if (now > st.nextDig) {
                // Probing the soil: exactly what a kiwi does with that beak.
                st.digUntil = now + 1500;
                st.digFind = Math.random() < 0.4;
                st.nextDig = now + 16_000 + Math.random() * 20_000;
              } else if (now > st.nextPeck) {
                st.peckUntil = now + 640;
                st.nextPeck = now + 7000 + Math.random() * 9000;
              } else if (now > st.nextWander) {
                st.wander = (Math.random() * 2 - 1) * 26;
                st.nextWander = now + 5000 + Math.random() * 7000;
              }
            }
          }
        }
      }

      const sleeping = pose === "sleep";
      if (sleeping !== asleepRef.current) {
        asleepRef.current = sleeping;
        if (sleeping) st.sleptAt = now;
        setAsleep(sleeping);
      }

      // Snap to whole art-pixels so the sprite never lands on a half pixel.
      const snapped = Math.round(st.x / scale) * scale;
      const lifted = Math.round(st.lift / scale) * scale;
      kiwi.style.transform = `translate3d(${snapped}px, ${-lifted}px, 0)`;
      if (inkRef.current) {
        inkRef.current.style.width = `${Math.max(
          0,
          Math.round(ruleAnchor + spriteW * 0.42),
        )}px`;
      }

      const key = `${pose}${st.facing < 0 ? "L" : "R"}`;
      if (key !== st.painted) {
        paintPixels(canvas, FRAMES[pose], palette, st.facing < 0);
        st.painted = key;
      }

      // The hatchling trails a body-length behind its parent.
      if (chickRef.current && chickBoxRef.current && chickCanvasRef.current) {
        const gap = spriteW * 0.85;
        const chickTarget = clamp(
          snapped - st.facing * gap,
          -spriteW,
          vw + spriteW,
        );
        const cdx = chickTarget - st.chickX;
        let chickPose: PoseName = "idle";
        if (Math.abs(cdx) > 1) {
          const cstep = Math.min(Math.abs(cdx) * 0.09, RUN_SPEED);
          st.chickX += Math.sign(cdx) * cstep;
          st.chickFacing = cdx >= 0 ? 1 : -1;
          st.chickPhase += cstep;
          chickPose = WALK_CYCLE[Math.floor(st.chickPhase / STRIDE) % 4];
        }
        const chickSnap = Math.round(st.chickX / chickScale) * chickScale;
        chickBoxRef.current.style.transform = `translate3d(${chickSnap}px, 0, 0)`;
        const chickKey = `${chickPose}${st.chickFacing < 0 ? "L" : "R"}`;
        if (chickKey !== st.chickPainted) {
          paintPixels(
            chickCanvasRef.current,
            FRAMES[chickPose],
            palette,
            st.chickFacing < 0,
          );
          st.chickPainted = chickKey;
        }
      }

      // Keep an open panel inside the viewport as the bird moves under it.
      // The width is measured when the panel appears, never per frame — that
      // would force a layout flush on every tick.
      const panel = panelRef.current;
      const pw = panelWidth.current;
      if (panel && pw) {
        const left = clamp(
          snapped + spriteW / 2 - pw / 2,
          MARGIN,
          Math.max(MARGIN, vw - MARGIN - pw),
        );
        panel.style.transform = `translateX(${Math.round(left - snapped)}px)`;
      }

      if (menuOpenRef.current) {
        const pct = Math.round(progress * 100);
        if (pct !== st.lastPct) {
          st.lastPct = pct;
          setProgressPct(pct);
        }
      }

      if (progress > 0.985 && !st.saidBottom && !talking) {
        st.saidBottom = true;
        say(scriptRef.current.bottom);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    // Don't burn frames in a background tab.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        hiddenAt = performance.now();
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        const away = performance.now() - hiddenAt;
        anim.current.lastInteraction = performance.now();
        if (away > 60_000) say(RETURN_LINE);
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [palette, reducedMotion, scale, chickScale, spriteW, say]);

  // --- Arrival lines -------------------------------------------------------
  useEffect(() => {
    anim.current.saidBottom = false;
    anim.current.lastPct = -1;
    saidHints.current = new Set();
    eggTimers.current.forEach(clearTimeout);
    eggTimers.current = [];
    setEgg(null);
    setChick(false);
    setMenuOpen(false);
    setAutoRead(false);

    const script = scriptFor(pathname);
    const timer = setTimeout(() => {
      if (introOwed.current) {
        introOwed.current = false;
        say(INTRO);
        onIntroDelivered();
      } else if (isLateNight() && Math.random() < 0.5) {
        say(NIGHT_LINE);
      } else {
        say(pickArrival(script));
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [pathname, say, onIntroDelivered]);

  // --- Section hints -------------------------------------------------------
  // Any element carrying data-kiwi-hint gets narrated once per page visit.
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const attach = () => {
      const targets =
        document.querySelectorAll<HTMLElement>("[data-kiwi-hint]");
      if (!targets.length) return;
      observer = new IntersectionObserver(
        (entries) => {
          const now = performance.now();
          // One hint at a time, and never on top of something already said.
          if (bubbleRef.current || menuOpenRef.current || quietRef.current)
            return;
          if (now - lastSaidAt.current < 7000) return;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const hint = entry.target.getAttribute("data-kiwi-hint");
            if (!hint || saidHints.current.has(hint)) continue;
            saidHints.current.add(hint);
            say(hint);
            break;
          }
        },
        { threshold: 0.35 },
      );
      targets.forEach((target) => observer?.observe(target));
    };
    // Give the route's content a beat to render before looking for hints.
    const timer = setTimeout(attach, 600);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname, say]);

  // --- Reactions to what the visitor does elsewhere on the page -------------
  const firstThemeRender = useRef(true);
  useEffect(() => {
    if (firstThemeRender.current) {
      firstThemeRender.current = false;
      return;
    }
    say(THEME_LINES[theme.palette.mode === "dark" ? "dark" : "light"]);
  }, [theme.palette.mode, say]);

  useEffect(() => {
    const onCopy = () => {
      const now = performance.now();
      if (now - lastCopyAt.current < 120_000) return;
      lastCopyAt.current = now;
      say(COPY_LINE);
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, [say]);

  // Anything in the app can hand the bird a line: see sayKiwi() in index.ts.
  useEffect(() => {
    const onExternalSay = (event: Event) => {
      const detail = (event as CustomEvent).detail as
        | { text?: string; celebrate?: boolean }
        | undefined;
      if (detail?.celebrate) {
        anim.current.flapUntil = performance.now() + 1400;
      }
      if (typeof detail?.text === "string" && detail.text) {
        say(detail.text, { force: true });
      }
    };
    window.addEventListener("kiwi:say", onExternalSay);
    return () => window.removeEventListener("kiwi:say", onExternalSay);
  }, [say]);

  // Autoread hands control straight back the moment the visitor scrolls.
  useEffect(() => {
    if (!autoRead) return;
    const cancel = () => setAutoRead(false);
    const events: (keyof WindowEventMap)[] = ["wheel", "touchstart", "keydown"];
    events.forEach((event) =>
      window.addEventListener(event, cancel, { passive: true }),
    );
    return () =>
      events.forEach((event) => window.removeEventListener(event, cancel));
  }, [autoRead]);

  // --- Panel dismissal -----------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (kiwiRef.current && !kiwiRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  // Measure and place the panel the moment it appears, before the next frame.
  useLayoutEffect(() => {
    const place = () => {
      const panel = panelRef.current;
      if (!panel) {
        panelWidth.current = 0;
        return;
      }
      panelWidth.current = panel.offsetWidth;
      const x = Math.round(anim.current.x / scale) * scale;
      const left = clamp(
        x + spriteW / 2 - panelWidth.current / 2,
        MARGIN,
        Math.max(MARGIN, window.innerWidth - MARGIN - panelWidth.current),
      );
      panel.style.transform = `translateX(${Math.round(left - x)}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [bubble, menuOpen, sections, note, scale, spriteW]);

  // --- The egg -------------------------------------------------------------
  useEffect(() => {
    const canvas = eggCanvasRef.current;
    if (!canvas || !egg) return;
    paintPixels(canvas, EGG_FRAMES[egg.stage], palette);
  }, [egg, palette]);

  const layEgg = useCallback(
    (x: number) => {
      eggTimers.current.forEach(clearTimeout);
      setEgg({ x, stage: "whole" });
      eggTimers.current = [
        setTimeout(
          () => setEgg((prev) => (prev ? { ...prev, stage: "crack" } : null)),
          HATCH_DELAY,
        ),
        setTimeout(() => {
          setEgg((prev) => (prev ? { ...prev, stage: "open" } : null));
          anim.current.chickX = x;
          anim.current.chickPainted = "";
          setChick(true);
          say(HATCH_LINE, { force: true });
        }, HATCH_DELAY + CRACK_DURATION),
      ];
    },
    [say],
  );

  // --- Carrying the bird ---------------------------------------------------
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const st = anim.current;
      st.grabX = event.clientX;
      st.grabY = event.clientY;
      st.grabOffset = event.clientX - st.x;
      st.dragMoved = false;
      st.dragPointer = event.pointerId;
      try {
        // Keeps the drag alive when the pointer leaves the sprite. Throws if
        // the pointer is already gone, which is harmless — the drag simply
        // ends when the button stops seeing moves.
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* no capture available; dragging still works over the sprite */
      }
    },
    [reducedMotion],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const st = anim.current;
      if (st.dragPointer !== event.pointerId) return;
      const dx = event.clientX - st.grabX;
      const dy = event.clientY - st.grabY;
      if (!st.dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      if (!st.dragging) {
        st.dragging = true;
        st.dragMoved = true;
        setMenuOpen(false);
        say(pickLine(PICKED_UP));
      }
      st.dragX = event.clientX - st.grabOffset;
      st.dragLift = clamp(st.grabY - event.clientY, 0, MAX_LIFT);
      st.lastInteraction = performance.now();
    },
    [say],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const st = anim.current;
      if (st.dragPointer !== event.pointerId) return;
      st.dragPointer = null;
      // The loop takes it from here: it falls, lands, and kicks up dirt.
      st.dragging = false;
      st.vy = 0;
    },
    [],
  );

  const handleKiwiClick = useCallback(() => {
    const st = anim.current;
    if (st.dragMoved) {
      st.dragMoved = false;
      return;
    }

    const now = performance.now();
    const streak =
      now - clicks.current.at < 2200 ? clicks.current.count + 1 : 1;
    clicks.current = { count: streak, at: now };

    if (streak >= 5) {
      clicks.current = { count: 0, at: 0 };
      st.hopUntil = now + 900;
      setMenuOpen(false);
      layEgg(Math.round(st.x / scale) * scale);
      say(EGG_LINE, { force: true });
      return;
    }

    setBubble(null);
    setNote(null);
    setMenuOpen((prev) => {
      if (!prev) setSections(collectSections());
      return !prev;
    });
  }, [layEgg, say, scale]);

  // --- Panel actions -------------------------------------------------------
  const go = useCallback(
    (href: string) => {
      setMenuOpen(false);
      // The state update is batched, so the ref still reads "open" for the rest
      // of this handler — and say() refuses to talk over an open panel. Close
      // it here too, since it is on its way out either way.
      menuOpenRef.current = false;
      if (href === pathname) return;
      if (reducedMotion) {
        router.push(href);
        return;
      }
      // The bird leads: it runs off the edge, then the route changes.
      say(DEPART_LINE);
      anim.current.exitHref = href;
      anim.current.exitSpeed = EXIT_SPEED;
      anim.current.exitBy = performance.now() + EXIT_DEADLINE;
    },
    [pathname, reducedMotion, router, say],
  );

  const jumpTo = useCallback(
    (top: number) => {
      setMenuOpen(false);
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );

  const toggleFollow = useCallback(() => {
    setFollow((prev) => {
      const next = !prev;
      setNote(MODE_LINES[next ? "followOn" : "followOff"]);
      return next;
    });
  }, []);

  // Quiet is the middle setting between "on" and "gone" — it keeps the bird
  // and the reading rule, and drops only the talking.

  const toggleQuiet = useCallback(() => {
    setQuiet((prev) => {
      const next = !prev;
      window.localStorage.setItem(QUIET_KEY, next ? "1" : "0");
      setNote(MODE_LINES[next ? "quietOn" : "quietOff"]);
      return next;
    });
  }, []);

  const toggleAutoRead = useCallback(() => {
    setAutoRead((prev) => {
      const next = !prev;
      setNote(MODE_LINES[next ? "autoReadOn" : "autoReadOff"]);
      return next;
    });
  }, []);

  const panelSx = {
    position: "absolute" as const,
    bottom: "100%",
    left: 0,
    mb: `${Math.round(spriteH * 0.28)}px`,
    pointerEvents: "auto" as const,
    bgcolor: "background.paper",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "3px",
    // A short viewport must not push the panel off the top of the screen.
    maxHeight: `calc(100vh - ${spriteH + 40}px)`,
    overflowY: "auto" as const,
    boxShadow:
      theme.palette.mode === "light"
        ? "0 8px 28px rgba(27,23,18,0.10)"
        : "0 8px 28px rgba(0,0,0,0.45)",
  };

  return (
    <>
      {/* The rule the bird walks, which doubles as a reading-progress meter. */}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "1px",
          bgcolor: "divider",
          zIndex: 1200,
          pointerEvents: "none",
        }}
      >
        <Box
          ref={inkRef}
          sx={{ height: "100%", width: 0, bgcolor: "secondary.main" }}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: 0,
          zIndex: 1200,
          pointerEvents: "none",
        }}
      >
        {egg && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              bottom: `${1 - scale}px`,
              left: 0,
              transform: `translateX(${egg.x + Math.round(spriteW * 0.1)}px)`,
            }}
          >
            <canvas
              ref={eggCanvasRef}
              width={EGG_W}
              height={EGG_H}
              style={{
                display: "block",
                width: EGG_W * scale,
                height: EGG_H * scale,
                imageRendering: "pixelated",
              }}
            />
          </Box>
        )}

        {dust && (
          <DustPuff
            key={dust.key}
            x={dust.x}
            scale={Math.max(1, scale - 1)}
            palette={palette}
          />
        )}

        {chick && (
          <Box
            ref={chickBoxRef}
            aria-hidden
            sx={{
              position: "absolute",
              bottom: `${1 - chickScale}px`,
              left: 0,
              willChange: "transform",
            }}
          >
            <canvas
              ref={chickCanvasRef}
              width={SPRITE_W}
              height={SPRITE_H}
              style={{
                display: "block",
                width: SPRITE_W * chickScale,
                height: SPRITE_H * chickScale,
                imageRendering: "pixelated",
              }}
            />
          </Box>
        )}

        <Box
          ref={kiwiRef}
          sx={{
            position: "absolute",
            // Drops the sprite's empty bottom row below the fold so the feet
            // land exactly on the rule.
            bottom: `${1 - scale}px`,
            left: 0,
            width: spriteW,
            height: spriteH,
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          {/* Leader line from the bird up to whatever it is saying. */}
          {(bubble || menuOpen) && (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                bottom: "100%",
                left: `${Math.round(spriteW / 2)}px`,
                width: "1px",
                height: `${Math.round(spriteH * 0.28)}px`,
                bgcolor: "divider",
              }}
            />
          )}

          {asleep && (
            <Typography
              aria-hidden
              variant="caption"
              sx={{
                position: "absolute",
                bottom: "100%",
                left: `${Math.round(spriteW * 0.55)}px`,
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                color: "text.disabled",
                animation: "kiwi-drift 3.4s ease-in-out infinite",
                "@keyframes kiwi-drift": {
                  "0%": { opacity: 0, transform: "translateY(4px)" },
                  "40%": { opacity: 0.9 },
                  "100%": { opacity: 0, transform: "translateY(-10px)" },
                },
              }}
            >
              z z z
            </Typography>
          )}

          {menuOpen && (
            <KiwiMenu
              panelRef={panelRef}
              pathname={pathname}
              progressPct={progressPct}
              sections={sections}
              follow={follow}
              quiet={quiet}
              autoRead={autoRead}
              note={note}
              onNavigate={go}
              onJump={jumpTo}
              onToggleFollow={toggleFollow}
              onToggleQuiet={toggleQuiet}
              onToggleAutoRead={toggleAutoRead}
              onTop={() => {
                setMenuOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? "auto" : "smooth",
                });
              }}
              onHide={onHide}
              panelSx={panelSx}
            />
          )}

          {bubble && !menuOpen && (
            <Box
              ref={panelRef}
              role="status"
              aria-live="polite"
              sx={{
                ...panelSx,
                width: { xs: 208, sm: 246 },
                px: 1.5,
                py: 1.25,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 0.75,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "secondary.main",
                  }}
                >
                  {scriptRef.current.label}
                </Typography>
                <Box
                  component="button"
                  aria-label="Dismiss"
                  onClick={() => setBubble(null)}
                  sx={{
                    display: "flex",
                    p: 0,
                    border: 0,
                    background: "none",
                    cursor: "pointer",
                    color: "text.disabled",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 13 }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                  color: "text.primary",
                }}
              >
                {bubble}
              </Typography>
            </Box>
          )}

          <Box
            component="button"
            onClick={handleKiwiClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Kiwi guide — open the navigation map, or drag to move it"
            aria-expanded={menuOpen}
            sx={{
              position: "absolute",
              inset: 0,
              display: "block",
              p: 0,
              border: 0,
              background: "none",
              cursor: "grab",
              touchAction: "none",
              pointerEvents: "auto",
              "&:active": { cursor: "grabbing" },
              "&:focus-visible": {
                outline: `1px solid ${theme.palette.secondary.main}`,
                outlineOffset: "2px",
              },
            }}
          >
            <canvas
              ref={canvasRef}
              width={SPRITE_W}
              height={SPRITE_H}
              style={{
                display: "block",
                width: spriteW,
                height: spriteH,
                imageRendering: "pixelated",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default function KiwiGuide() {
  const { enabled, ready, firstRun, markSeen, reducedMotion, setEnabled } =
    useKiwi();
  const isMobile = useMediaQuery("(max-width:599px)");

  // Captured once: the introduction is owed to this visit, and must not
  // reappear when markSeen flips the flag mid-session.
  const introPending = useRef<boolean | null>(null);
  if (ready && introPending.current === null) introPending.current = firstRun;

  const hide = useCallback(() => setEnabled(false), [setEnabled]);

  if (!ready || !enabled) return null;

  return (
    <KiwiStage
      scale={isMobile ? 2 : 3}
      reducedMotion={reducedMotion}
      introPending={introPending.current === true}
      onIntroDelivered={markSeen}
      onHide={hide}
    />
  );
}
