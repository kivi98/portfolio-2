export { default as KiwiProvider, useKiwi } from "./KiwiContext";
export { default as KiwiGuide } from "./KiwiGuide";
export { default as KiwiToggle } from "./KiwiToggle";

/**
 * Hands the guide a line from anywhere in the app.
 *
 * Fire-and-forget: if the visitor has the guide switched off nothing listens,
 * so callers never need to check first. Lines sent this way are always shown,
 * including in quiet mode — they are direct responses to something the visitor
 * just did, not ambient chatter.
 */
export function sayKiwi(text: string, options?: { celebrate?: boolean }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("kiwi:say", {
      detail: { text, celebrate: options?.celebrate === true },
    }),
  );
}
