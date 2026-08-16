import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";

export default function TextHoverEffectSection() {
  return (
    <div className="pointer-events-auto my-4 flex h-12 w-full items-center justify-center md:h-16">
      <TextHoverEffect text="Ayush Upadhyay" />
    </div>
  );
}
