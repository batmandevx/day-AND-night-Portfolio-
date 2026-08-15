'use client';

import gsap from "gsap";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

/**
 * Decorative custom cursor for the light experience: a small dot with a
 * trailing ring that grows over interactive elements. Desktop only.
 */
const CustomCursor = () => {
  useEffect(() => {
    if (isMobile || !window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest('a, button, [role="button"]');
      gsap.to(ring, {
        scale: interactive ? 1.9 : 1,
        opacity: interactive ? 0.9 : 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div id="cursor-dot" style={{
        position: 'fixed', top: 0, left: 0, width: 6, height: 6, borderRadius: '50%',
        background: 'white', mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 60,
      }} />
      <div id="cursor-ring" style={{
        position: 'fixed', top: 0, left: 0, width: 34, height: 34, borderRadius: '50%',
        border: '1.5px solid white', mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 60,
      }} />
    </>
  );
};

export default CustomCursor;
