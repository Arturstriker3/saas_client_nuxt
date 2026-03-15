import {
  behavioralThemePresets,
  resolveThemePresetName,
} from "./theme/design-tokens";

const activePreset = resolveThemePresetName(
  process.env.NUXT_PUBLIC_THEME_PRESET,
);
const activeTheme = behavioralThemePresets[activePreset];

export default defineAppConfig({
  ui: {
    colors: {
      primary: activeTheme.ui.primary,
      secondary: activeTheme.ui.secondary,
      success: activeTheme.ui.success,
      info: activeTheme.ui.info,
      warning: activeTheme.ui.warning,
      error: activeTheme.ui.error,
      neutral: activeTheme.ui.neutral,
    },
  },
  theme: {
    activePreset,
    brandName: activeTheme.brandName,
    logoText: activeTheme.logoText,
    tokens: activeTheme,
    presets: behavioralThemePresets,
    notifications: {
      radius: activeTheme.radius.large,
      shadow: activeTheme.effects.shadowElevated,
      focusRing: activeTheme.effects.focusRing,
    },
  },
});
