'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { switchMode } from '../mode';
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

        // Mount React enhancements into placeholders inside the scroll flow.
        const mountEnhancements = () => {
            const nameHost = document.getElementById('react-contact-name');
            const portraitHost = document.getElementById('react-contact-portrait');
            if (nameHost && !nameHost.dataset.mounted) {
                nameHost.dataset.mounted = 'true';
                createRoot(nameHost).render(<TextHoverEffectSection />);
            }
            if (portraitHost && !portraitHost.dataset.mounted) {
                portraitHost.dataset.mounted = 'true';
                createRoot(portraitHost).render(<PixelatedPortrait />);
            }
        };

        // Mount after the dark world boots and the loading screen is gone.
        bootPromise?.then(() => {
            setTimeout(mountEnhancements, 1200);
        });
    }, []);

    return (
        <div
            id="dark-experience"
            dangerouslySetInnerHTML={{ __html: `<style>${criticalCss}</style>${skeletonHtml}` }}
        />
    );
};

export default DarkExperience;
