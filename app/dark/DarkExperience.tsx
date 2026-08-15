'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { switchMode } from '../mode';
import OptionWheel from './components/OptionWheel/OptionWheel';
import criticalCss from './critical-css.txt';
import skeletonHtml from './skeleton.html';

const TextHoverEffectSection = dynamic(() => import('../components/TextHoverEffectSection'), { ssr: false });
const PixelatedPortrait = dynamic(() => import('../components/PixelatedPortrait'), { ssr: false });

// Module-level guard: the dark experience boots exactly once per page load,
// even if the component remounts (StrictMode double-effects, HMR, etc.).
let bootPromise: Promise<unknown> | undefined;

// Loading-cursor tracker from the original inline <script> in index.html —
// follows the pointer until the Three.js cursor takes over.
const initLoadingCursor = (): void => {
    const cursor = document.getElementById('html-loading-cursor');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!cursor || !finePointer) {
        cursor?.remove();
        return;
    }

    const setPosition = (x: number, y: number): void => {
        cursor.dataset.pointerX = String(x);
        cursor.dataset.pointerY = String(y);
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
    };
    const loadingMotionBounds = document
        .querySelector('.loading-screen__motion')
        ?.getBoundingClientRect();

    setPosition(
        loadingMotionBounds
            ? loadingMotionBounds.left + loadingMotionBounds.width * 0.5
            : document.documentElement.clientWidth * 0.5,
        loadingMotionBounds
            ? loadingMotionBounds.top + loadingMotionBounds.height * 0.5
            : document.documentElement.clientHeight * 0.5,
    );

    const move = (event: PointerEvent): void => setPosition(event.clientX, event.clientY);
    const remove = (): void => {
        window.removeEventListener('pointermove', move);
        cursor.remove();
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('three-cursor-ready', remove, { once: true });
};

// Simplified startup watchdog from the original index.html: surfaces a
// reloadable error state on the loading screen if boot() fails.
const initStartupWatchdog = (): void => {
    let startupComplete = false;

    const renderStartupError = (): void => {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) {
            return;
        }

        document.documentElement.classList.add('startup-error');
        document.getElementById('html-loading-cursor')?.remove();
        const cursorLabel = document.querySelector('.cursor-sound-label');
        if (cursorLabel instanceof HTMLElement) {
            cursorLabel.hidden = true;
        }
        loadingScreen.classList.add('loading-screen--error');

        const errorPanel = loadingScreen.querySelector('.loading-screen__error');
        const announcement = loadingScreen.querySelector('.loading-screen__announcement');
        const retryButton = loadingScreen.querySelector('[data-loading-retry]');

        if (errorPanel instanceof HTMLElement) {
            errorPanel.hidden = false;
        }
        if (announcement instanceof HTMLElement) {
            announcement.textContent =
                'The experience could not be loaded. Reload the page to try again.';
        }
        if (retryButton instanceof HTMLButtonElement) {
            retryButton.addEventListener('click', () => window.location.reload(), { once: true });
        }
    };

    window.__portfolioStartup = {
        fail: () => {
            if (!startupComplete) {
                renderStartupError();
            }
        },
        succeed: () => {
            startupComplete = true;
        },
    };
};

const DarkExperience = () => {
    useEffect(() => {
        document.title = 'Ayush Upadhyay — AI & Full-Stack Engineer';
        document.body.style.backgroundColor = 'black';
        document.body.style.overflow = 'hidden';

        initStartupWatchdog();
        initLoadingCursor();
        document
            .getElementById('theme-toggle')
            ?.addEventListener('click', () => switchMode('light'));

        bootPromise ??= import('./main').then(({ boot }) => boot());
        bootPromise.catch((error) => {
            console.error('Dark experience failed to boot', error);
            window.__portfolioStartup?.fail();
        });
    }, []);

    return (
        <>
            <div
                id="dark-experience"
                dangerouslySetInnerHTML={{ __html: `<style>${criticalCss}</style>${skeletonHtml}` }}
            />
            <div
                className="pointer-events-auto fixed bottom-[38vh] left-0 z-[10001] h-[32vh] w-full"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)'
                }}
            >
                <TextHoverEffectSection />
            </div>
            <div
                aria-label="Project selector"
                className="pointer-events-auto fixed bottom-0 left-0 z-[10000] h-[38vh] w-full"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
                }}
            >
                <div className="pointer-events-none absolute left-6 top-4 z-10 text-white/70 md:left-10 md:top-6">
                    <span className="block font-[Urbanist] text-xs font-semibold uppercase tracking-[0.2em]">
                        Explore my work
                    </span>
                    <span className="mt-1 block font-[Urbanist] text-[10px] uppercase tracking-wider text-white/40">
                        scroll / drag / click to select
                    </span>
                </div>
                <OptionWheel
                    items={[
                        'CrispRoots',
                        'AuraTwin',
                        'VITGROWW',
                        'Packet Analyzer',
                        'LOLA',
                        'EcoMed AI',
                        'AdaptXFit',
                        'SustainLabs',
                        'Gyan Grow',
                        'IntelliTrace',
                        'Treasure',
                        'Portfolio V1'
                    ]}
                    defaultSelected={6}
                    side="left"
                    textColor="#6b7280"
                    activeColor="#ffffff"
                    fontSize={2.2}
                    spacing={1.35}
                    curve={0.9}
                    tilt={7}
                    blur={1.5}
                    fade={0.22}
                    minOpacity={0.08}
                    smoothing={220}
                    inset={40}
                    loop={false}
                    draggable
                    soundUrl=""
                    onChange={(index, item) => {
                        const routes: Record<string, string> = {
                            CrispRoots: 'https://github.com/batmandevx/CrispRoots',
                            AuraTwin: 'https://github.com/batmandevx/AuraTwin',
                            VITGROWW: 'https://github.com/batmandevx/VITGROWW',
                            'Packet Analyzer': 'https://github.com/batmandevx/Packet_analyzer',
                            LOLA: 'https://github.com/batmandevx/LOLA',
                            'EcoMed AI': 'https://github.com/batmandevx/EcoMedAi-',
                            AdaptXFit: 'https://adaptxfit.netlify.app',
                            SustainLabs: 'https://sustainlabs.netlify.app',
                            'Gyan Grow': 'https://gyan-grow.vercel.app',
                            IntelliTrace: 'https://intellitrace-hackathon.vercel.app',
                            Treasure: 'https://github.com/Shivam2005Goel/Treasure.git',
                            'Portfolio V1': 'https://ayushxupadhyay.netlify.app'
                        };
                        const url = routes[item];
                        if (url) window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                />
            </div>
            <div className="pointer-events-auto fixed bottom-0 right-0 z-[10002] w-full md:w-[28rem]">
                <PixelatedPortrait />
            </div>
        </>
    );
};

export default DarkExperience;
