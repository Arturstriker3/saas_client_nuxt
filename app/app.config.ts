const themePresets = {
  default: {
    brandName: "SaaS Client",
    logoText: "SC",
    radius: "0.5rem",
    ui: {
      primary: "emerald",
      neutral: "slate",
    },
    palette: {
      background: "#020617",
      foreground: "#e2e8f0",
      muted: "#94a3b8",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
    },
  },
  growth: {
    brandName: "Growth Pilot",
    logoText: "GP",
    radius: "0.75rem",
    ui: {
      primary: "blue",
      neutral: "zinc",
    },
    palette: {
      background: "#020617",
      foreground: "#e4e4e7",
      muted: "#a1a1aa",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#f43f5e",
    },
  },
} as const;

const activePreset = "default" as const;
const activeTheme = themePresets[activePreset];

export default defineAppConfig({
  ui: {
    colors: {
      primary: activeTheme.ui.primary,
      neutral: activeTheme.ui.neutral,
    },
  },
  theme: {
    activePreset,
    brandName: activeTheme.brandName,
    logoText: activeTheme.logoText,
    radius: activeTheme.radius,
    palette: activeTheme.palette,
    presets: themePresets,
  },
});
