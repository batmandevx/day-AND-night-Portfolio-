"use client";

import { PixelatedCanvas } from "./ui/pixelated-canvas";

export default function PixelatedPortrait() {
  return (
    <div className="pointer-events-auto flex w-full items-center justify-center">
      <PixelatedCanvas
        src="/ayush-pic.jpeg"
        width={320}
        height={400}
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
    </div>
  );
}
