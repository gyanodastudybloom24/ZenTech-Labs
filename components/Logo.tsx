/**
 * ZenTech Labs wordmark. Rendered as CSS/SVG (never a flattened raster image),
 * so it stays crisp at any size and never carries a baked-in white box —
 * it sits directly on the dark header/footer background. The glyph is a
 * simple "Z" monogram rather than a generic icon, so it reads as an actual
 * mark rather than a stock symbol.
 */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className={`logo-mark logo-mark-${size}`}>
      <span className="logo-glyph" aria-hidden="true">Z</span>
      <span className="logo-word">
        ZenTech<span>Labs</span>
      </span>
    </span>
  );
}
