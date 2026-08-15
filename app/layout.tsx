import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushxupadhyay.netlify.app/'),
  title: "Ayush Upadhyay — AI & Full-Stack Engineer",
  description: "AI & full-stack engineer building intelligent systems end to end — LLM pipelines, distributed backends, and full-stack web apps. Ex-Microsoft, Nokia, IIT Ropar.",
  keywords: "Ayush Upadhyay, AI Engineer, Full Stack Developer, Machine Learning, LLM, React, Next.js, Python, TypeScript, Portfolio",
  authors: [{ name: "Ayush Upadhyay" }],
  creator: "Ayush Upadhyay",
  publisher: "Ayush Upadhyay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Ayush Upadhyay - AI & Full-Stack Engineer",
    description: "AI & full-stack engineer building intelligent systems end to end. Ex-Microsoft, Nokia, IIT Ropar. 17x hackathon winner.",
    siteName: "Ayush Upadhyay's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Upadhyay - AI & Full-Stack Engineer",
    description: "AI & full-stack engineer building intelligent systems end to end. Ex-Microsoft, Nokia, IIT Ropar.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0690d4",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
