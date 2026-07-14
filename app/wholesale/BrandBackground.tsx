// Ported from feasina-admin's components/admin/BrandBackground.tsx --
// same four fruit emoji + radial gradient mesh, shared by both wholesale
// route groups ((auth) and (portal)) so every wholesale screen carries the
// same background admin screens do. Kept scoped to app/wholesale/* rather
// than added site-wide, since the rest of the website (retail pages) never
// had this treatment and shouldn't suddenly gain it.
const FRUITS: { emoji: string; className: string }[] = [
  { emoji: "\u{1F96D}", className: "-left-10 -top-10 text-[13rem] rotate-[-12deg]" }, // mango
  { emoji: "\u{1F34A}", className: "-right-12 top-16 text-[11rem] rotate-[15deg]" }, // orange
  { emoji: "\u{1F351}", className: "-left-16 bottom-0 text-[12rem] rotate-[8deg]" }, // peach
  { emoji: "\u{1F34B}", className: "-right-8 -bottom-12 text-[10rem] rotate-[-10deg]" }, // lemon
];

export function BrandBackground({ fixed = false }: { fixed?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none inset-0 z-0 overflow-hidden ${fixed ? "fixed" : "absolute"}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, oklch(90% 0.09 47 / 55%), transparent), " +
            "radial-gradient(50% 45% at 100% 20%, oklch(94% 0.06 47 / 45%), transparent), " +
            "radial-gradient(70% 60% at 50% 110%, oklch(96% 0.03 47 / 60%), transparent), " +
            "oklch(99.2% 0.006 60)",
        }}
      />
      {FRUITS.map((fruit, i) => (
        <span
          key={i}
          className={`absolute leading-none opacity-[0.14] grayscale-[0.3] blur-[1px] select-none ${fruit.className}`}
        >
          {fruit.emoji}
        </span>
      ))}
    </div>
  );
}
