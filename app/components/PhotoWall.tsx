'use client';

import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DriftWall = dynamic(() => import('./DriftWall/DriftWall'), { ssr: false });

const PHOTOS = Array.from({ length: 51 }, (_, i) =>
  `/my-pics/pic-${String(i + 1).padStart(2, '0')}.jpg`
);

const items = PHOTOS.map((src, i) => ({
  image: src,
  title: `Moment ${i + 1}`,
}));

function AnimatedHeading() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { y: 60, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.04,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;

    const chars = ref.current.querySelectorAll('.char');
    chars.forEach((char, i) => {
      const depth = (i - chars.length / 2) * 4;
      gsap.to(char, {
        x: dx * (20 + depth * 0.3),
        y: dy * (15 + depth * 0.2),
        rotateX: -dy * 18,
        rotateY: dx * 18,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.char');
    gsap.to(chars, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      stagger: 0.02,
    });
  };

  const text = 'Moments & Memories';
  return (
    <h2
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="font-soria cursor-default text-4xl text-white drop-shadow-sm md:text-6xl"
      style={{ perspective: '800px' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  );
}

function InteractiveSubtext() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: ref });

  return (
    <p
      ref={ref}
      className="mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base"
    >
      A drifting 3D wall of snapshots. Hover to lift a moment out of the flow.
    </p>
  );
}

export default function PhotoWall() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0690d4] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 pb-8 text-center">
        <AnimatedHeading />
        <InteractiveSubtext />
      </div>
      <div className="mx-auto h-[420px] w-full max-w-7xl px-4 md:h-[600px]">
        <DriftWall
          items={items}
          columns={5}
          tileWidth={220}
          tileHeight={150}
          gap={18}
          tilt={18}
          turn={-10}
          perspective={1200}
          depth={140}
          speed={28}
          direction="up"
          variance={0.5}
          parallax={0.5}
          pauseOnHover={false}
          lift={72}
          fade={0.55}
          dim={0.65}
          grayscale={false}
          overlayColor="#022b40"
        />
      </div>
    </section>
  );
}
