import type { KiwiPalette } from "./sprites";

/**
 * Paints a character grid onto a canvas at 1 canvas-pixel per art-pixel. The
 * canvas is then blown up by CSS with `image-rendering: pixelated`, which keeps
 * the pixels crisp and square at any scale.
 *
 * Same-coloured runs inside a row are drawn as a single fillRect so a repaint
 * costs a few dozen draw calls rather than 560.
 */
export function paintPixels(
  canvas: HTMLCanvasElement,
  rows: readonly string[],
  palette: KiwiPalette,
  flip = false,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  if (flip) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    let runStart = 0;
    let runChar = row[0];
    for (let x = 1; x <= row.length; x++) {
      const ch = row[x];
      if (ch === runChar) continue;
      const color = palette[runChar];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(runStart, y, x - runStart, 1);
      }
      runStart = x;
      runChar = ch;
    }
  }

  ctx.restore();
}
