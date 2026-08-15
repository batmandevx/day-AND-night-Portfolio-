import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function TextHoverEffectSection() {
  return (
    <div className="pointer-events-auto my-8 flex h-32 w-full items-center justify-center md:h-40">
      <TextHoverEffect text="Ayush Upadhyay" />
    </div>
  );
}
