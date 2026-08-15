import { create } from "zustand";

interface Theme {
  type: string;
  color: string;
}

const LightTheme: Theme = {
  type: 'light',
  color: '#0690d4'
};

interface ThemeStore {
  themes: Theme[];
  theme: Theme;
}

// The light site always uses the light canvas theme; switching to dark mode
// loads the dark experience instead (see app/mode.ts).
export const useThemeStore = create<ThemeStore>()(() => ({
  themes: [LightTheme],
  theme: LightTheme,
}));
