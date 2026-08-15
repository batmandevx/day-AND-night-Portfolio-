"use client";

import { PixelatedCanvas } from "./ui/pixelated-canvas";

export default function PixelatedPortrait() {
  return (
    <section className="pointer-events-auto z-[10001] flex w-full flex-col items-center justify-center bg-black py-16 md:py-24">
      <h3 className="mb-8 text-center font-[Urbanist] text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
        Interactive Portrait
      </h3>
      <PixelatedCanvas
        src="/ayush-pic.jpeg"
        width={420}
        height={560}
        cellSize={4}
        dotScale={0.85}
        shape="square"
        backgroundColor="#000000"
        dropoutStrength={0.35}
        interactive
        distortionStrength={4}
        distortionRadius={90}
        distortionMode="swirl"
        followSpeed={0.18}
        jitterStrength={3}
        jitterSpeed={4}
        sampleAverage
        tintColor="#FFFFFF"
        tintStrength={0.15}
        className="rounded-xl border border-neutral-800 shadow-lg"
      />
      <p className="mt-6 max-w-md text-center text-sm text-white/40">
        Move your cursor over the portrait — the pixels swirl and jitter around your pointer.
      </p>
    </section>
  );
}
