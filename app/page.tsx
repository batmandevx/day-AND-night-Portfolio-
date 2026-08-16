'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import CanvasLoader from "./components/common/CanvasLoader";
import IntroVideo from "./components/IntroVideo";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import PhotoWall from "./components/PhotoWall";
import { getMode, PortfolioMode } from "./mode";

const DarkExperience = dynamic(() => import("./dark/DarkExperience"), { ssr: false });

const Home = () => {
  const [mode, setMode] = useState<PortfolioMode | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Reading the persisted theme from localStorage after hydration avoids
    // a server/client mismatch while still rendering the intro video first.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(getMode());
  }, []);

  if (mode === null) return null;

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
