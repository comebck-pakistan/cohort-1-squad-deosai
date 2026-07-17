import { Logo } from "@/components/ui/Logo";

/**
 * Hero "presence" illustration, rebuilt from the Docushield Workspace Design:
 * concentric rings radiating from a central hub, with member avatars sitting on
 * the rings and floating chat bubbles (tagged with a collaboration cursor).
 * For Deosai the bubbles are the real questions customers ask, orbiting the
 * shop's hub that answers them. Purely decorative.
 */

const rings = [420, 356, 292, 248, 205, 162];

type Avatar = { initial: string; top: string; left: string };
const avatars: Avatar[] = [
  { initial: "K", top: "18%", left: "13%" },
  { initial: "M", top: "20%", left: "64%" },
  { initial: "S", top: "67%", left: "66%" },
  { initial: "A", top: "69%", left: "15%" },
];

type Bubble = { text: string; top: string; left: string; rotate: string; corner: "tl" | "tr" | "bl" | "br" };
const bubbles: Bubble[] = [
  { text: "Do you deliver?", top: "22%", left: "-18%", rotate: "-2.5deg", corner: "tr" },
  { text: "What's the price?", top: "27%", left: "64%", rotate: "4.6deg", corner: "tl" },
  { text: "Still in stock?", top: "62%", left: "-3%", rotate: "2.3deg", corner: "br" },
  { text: "COD to Lahore?", top: "56%", left: "66%", rotate: "-6.9deg", corner: "bl" },
];

const cornerRadius: Record<Bubble["corner"], string> = {
  tl: "rounded-2xl rounded-tl-sm",
  tr: "rounded-2xl rounded-tr-sm",
  bl: "rounded-2xl rounded-bl-sm",
  br: "rounded-2xl rounded-br-sm",
};

function Cursor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M2 1.5 13 7l-4.6 1.3L6.9 13 2 1.5Z"
        fill="#0b110f"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroOrbit() {
  return (
    <div
      aria-hidden
      className="relative aspect-square w-full max-w-[510px]"
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-primary-300/30 blur-3xl" />

      {/* concentric rings */}
      <div className="absolute inset-0 grid place-items-center">
        {rings.map((size, i) => (
          <span
            key={size}
            className="absolute rounded-full border border-white/15"
            style={{
              width: `${(size / 510) * 100}%`,
              height: `${(size / 510) * 100}%`,
              opacity: 1 - i * 0.11,
            }}
          />
        ))}
      </div>

      {/* center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-18px_rgba(11,17,15,0.6)]">
        <Logo showText={false} className="scale-[1.15]" />
      </div>

      {/* avatars on the rings */}
      {avatars.map((a) => (
        <span
          key={a.initial}
          className="absolute grid h-[15%] w-[15%] place-items-center rounded-full border-2 border-white bg-primary-100 font-display text-lg font-bold text-forest shadow-[0_10px_24px_-12px_rgba(11,17,15,0.7)]"
          style={{ top: a.top, left: a.left }}
        >
          {a.initial}
        </span>
      ))}

      {/* floating chat bubbles with cursors */}
      {bubbles.map((b) => (
        <div
          key={b.text}
          className="absolute"
          style={{ top: b.top, left: b.left, transform: `rotate(${b.rotate})` }}
        >
          <div className="relative">
            <Cursor
              className={
                "absolute h-4 w-4 " +
                (b.corner === "tl" || b.corner === "bl"
                  ? "-left-1 " + (b.corner === "tl" ? "-top-2" : "-bottom-2")
                  : "-right-1 " + (b.corner === "tr" ? "-top-2" : "-bottom-2"))
              }
            />
            <span
              className={`inline-block whitespace-nowrap border border-primary-300 bg-primary-400 px-3 py-1.5 text-[13px] font-medium text-white shadow-[0_6px_14px_-6px_rgba(17,17,17,0.5)] ${cornerRadius[b.corner]}`}
            >
              {b.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
