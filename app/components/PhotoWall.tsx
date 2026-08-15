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

const PHOTOS = [
  '/my-pics/pic-01.jpg',
  '/my-pics/pic-02.jpg',
  '/my-pics/pic-03.jpg',
  '/my-pics/pic-04.jpg',
  '/my-pics/pic-05.jpg',
  '/my-pics/pic-06.jpg',
  '/my-pics/pic-07.jpg',
  '/my-pics/pic-08.jpg',
  '/my-pics/pic-09.jpg',
  '/my-pics/pic-10.jpg',
  '/my-pics/pic-11.jpg',
  '/my-pics/pic-12.jpg',
  '/my-pics/pic-13.jpg',
  '/my-pics/pic-14.jpg',
  '/my-pics/pic-15.jpg',
  '/my-pics/pic-16.jpg',
];

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

  const text = 'Moments & Memories';
  return (
    <h2
      ref={ref}
      className="font-soria text-4xl text-white drop-shadow-sm md:text-6xl"
      style={{ perspective: '800px' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
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
