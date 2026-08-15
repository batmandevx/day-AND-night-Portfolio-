import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function TextHoverEffectSection() {
  return (
    <div className="pointer-events-auto z-[10001] flex h-[24rem] w-full items-center justify-center md:h-[32rem]">
      <TextHoverEffect text="Ayush Upadhyay" />
    </div>
  );
}
