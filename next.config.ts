import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // skip strict mode
  reactStrictMode: false,
  env: {
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  },
  // The dark experience (app/dark) imports raw .glsl shader sources and raw
  // HTML/CSS assets, and spawns a Web Worker via `new Worker(new URL(...))`.
  // Both dev and build run through webpack (see package.json scripts).
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.glsl$/,
        type: 'asset/source',
      },
      {
        // Raw DOM skeleton + critical CSS for the dark experience.
        resource: /(skeleton\.html|critical-css\.txt)$/,
        type: 'asset/source',
      },
    );
    return config;
  },
};

export default nextConfig;
