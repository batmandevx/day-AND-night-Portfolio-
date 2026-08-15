export type PortfolioMode = 'light' | 'dark';

export const MODE_STORAGE_KEY = 'ayush-portfolio-theme';

export const getMode = (): PortfolioMode => {
  if (typeof window === 'undefined') return 'light';
  return window.localStorage.getItem(MODE_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
};

export const switchMode = (mode: PortfolioMode) => {
  window.localStorage.setItem(MODE_STORAGE_KEY, mode);

  // Fade into the next world's background color before reloading, so the
  // mode switch reads as a dissolve instead of a hard page flash.
  const overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999', 'pointer-events:none',
    'opacity:0', 'transition:opacity .4s ease',
    `background:${mode === 'dark' ? '#000' : '#0690d4'}`,
  ].join(';');
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
  window.setTimeout(() => window.location.reload(), 450);
};
