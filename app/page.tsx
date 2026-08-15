'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import PhotoWall from "./components/PhotoWall";
import { getMode, PortfolioMode } from "./mode";

const DarkExperience = dynamic(() => import("./dark/DarkExperience"), { ssr: false });

const Home = () => {
  const [mode, setMode] = useState<PortfolioMode | null>(null);

  useEffect(() => {
    setMode(getMode());
  }, []);

  if (mode === null) return null;

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
