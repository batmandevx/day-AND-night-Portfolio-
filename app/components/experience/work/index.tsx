import { ScrollControls, useScroll } from "@react-three/drei";
import { usePortalStore, useScrollStore } from "@stores";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Memory } from "../../models/Memory";
import Timeline from "./Timeline";

const Work = () => {
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const { scrollProgress, setScrollProgress } = useScrollStore();
  const portalScroll = useScroll();
  const progressRef = useRef(scrollProgress);

  progressRef.current = scrollProgress;

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setScrollProgress(progress);
  }

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY;
    const step = delta / 500;
    const next = Math.min(Math.max(progressRef.current + step, 0), 1);
    setScrollProgress(next);
  }

  useEffect(() => {
    if (!isActive) {
      setScrollProgress(0);
      return;
    }

    setScrollProgress(0);

    // Try the portal ScrollControls wrapper first.
    const portalWrapper = portalScroll?.el ?? null;
    if (portalWrapper) {
      portalWrapper.addEventListener('scroll', handleScroll);
      portalWrapper.style.zIndex = '1';
    }

    // Wheel fallback so the timeline is always scrollable, even if the
    // ScrollControls wrapper can't be targeted.
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (portalWrapper) {
        portalWrapper.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isActive, portalScroll]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1}} pages={2} maxSpeed={0.4}>
        <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
        <Timeline progress={isActive ? scrollProgress : 0} />
      </ScrollControls>
    </group>
  );
};

export default Work;