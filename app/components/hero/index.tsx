'use client';

import { Html, useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CloudContainer from "../models/Cloud";
import FloatingShapes from "../models/FloatingShapes";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import ShinyText from "../ui/shiny-text";

const Hero = () => {
  const titleRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  return (
    <>
      <group position={[0, 2, -10]} ref={titleRef}>
        <Html
          center
          style={{
            fontFamily: 'var(--font-soria), Arial, sans-serif',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <ShinyText
            text="Hi, I am Ayush Upadhyay."
            color="#ffffff"
            shineColor="#ffd700"
            speed={2.5}
            spread={120}
            direction="left"
            pauseOnHover={false}
            className="text-5xl font-bold md:text-7xl"
          />
        </Html>
      </group>
      <StarsContainer />
      <CloudContainer/>
      <FloatingShapes/>
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10}/>
        <WindowModel receiveShadow/>
      </group>
    </>
  );
};

export default Hero;
