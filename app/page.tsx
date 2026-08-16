'use client';

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

import CanvasLoader from "./components/common/CanvasLoader";
import IntroVideo from "./components/IntroVideo";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import PhotoWall from "./components/PhotoWall";
import { getMode, PortfolioMode } from "./mode";

const DarkExperience = dynamic(() => import("./dark/DarkExperience"), { ssr: false });

const useMode = () =>
  useSyncExternalStore<PortfolioMode>(
    () => () => {},
    getMode,
    () => 'light'
  );

const Home = () => {
  const mode = useMode();
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return <IntroVideo mode={mode} onComplete={() => setIntroDone(true)} />;
  }

  if (mode === 'dark') {
    return <DarkExperience />;
  }

  return (
    <>
      <CanvasLoader>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
      <PhotoWall />
    </>
  );
};
export default Home;
