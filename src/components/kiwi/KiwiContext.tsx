"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "kiwiGuide";
const SEEN_KEY = "kiwiGuideSeen";

interface KiwiContextValue {
  /** Whether the guide should be on screen. */
  enabled: boolean;
  /** False until the stored preference has been read — avoids an SSR flash. */
  ready: boolean;
  /** True when the visitor has never met the bird, so it introduces itself. */
  firstRun: boolean;
  reducedMotion: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
  /** Marks the introduction as delivered so it only ever plays once. */
  markSeen: () => void;
}

const KiwiContext = createContext<KiwiContextValue>({
  enabled: false,
  ready: false,
  firstRun: false,
  reducedMotion: false,
  setEnabled: () => {},
  toggle: () => {},
  markSeen: () => {},
});

export const useKiwi = () => useContext(KiwiContext);

/** Ignore the hotkey while the visitor is typing. */
function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export default function KiwiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);
  const [firstRun, setFirstRun] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = motionQuery.matches;
    setReducedMotion(prefersReduced);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on" || stored === "off") {
      setEnabledState(stored === "on");
    } else {
      // No preference yet: greet most visitors, but stay out of the way for
      // anyone who has asked their system for less motion.
      setEnabledState(!prefersReduced);
    }
    setFirstRun(window.localStorage.getItem(SEEN_KEY) !== "1");
    setReady(true);

    const onMotionChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    motionQuery.addEventListener("change", onMotionChange);
    return () => motionQuery.removeEventListener("change", onMotionChange);
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  }, []);

  const toggle = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  const markSeen = useCallback(() => {
    window.localStorage.setItem(SEEN_KEY, "1");
    setFirstRun(false);
  }, []);

  // "K" is the escape hatch — it works whether the bird is on screen or not,
  // so a visitor who finds it distracting never has to hunt for a control.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" && event.key !== "K") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const value = useMemo(
    () => ({
      enabled,
      ready,
      firstRun,
      reducedMotion,
      setEnabled,
      toggle,
      markSeen,
    }),
    [enabled, ready, firstRun, reducedMotion, setEnabled, toggle, markSeen],
  );

  return <KiwiContext.Provider value={value}>{children}</KiwiContext.Provider>;
}
