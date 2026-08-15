"use client";

import { PixelatedCanvas } from "./ui/pixelated-canvas";

export default function PixelatedPortrait() {
  return (
    <div className="pointer-events-auto my-10 flex w-full flex-col items-center justify-center">
      <h3 className="mb-4 text-center font-[Urbanist] text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Interactive Portrait
      </h3>
      <PixelatedCanvas
        src="/ayush-pic.jpeg"
        width={240}
        height={320}
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
      <p className="mt-4 max-w-md text-center text-xs text-white/40">
        Move your cursor over the portrait.
      </p>
    </div>
  );
}
