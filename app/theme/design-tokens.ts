export const behavioralThemePresets = {
  default: {
    brandName: "SaaS Client",
    logoText: "SC",
    ui: {
      primary: "emerald",
      secondary: "sky",
      success: "green",
      info: "blue",
      warning: "amber",
      error: "rose",
      neutral: "slate",
    },
    colors: {
      core: {
        background: "#0f172a",
        surface: "#111827",
        surfaceElevated: "#1f2937",
        foreground: "#f8fafc",
        muted: "#94a3b8",
        border: "#334155",
      },
      primary: {
        base: "#10b981",
        hover: "#34d399",
        active: "#059669",
      },
      secondary: {
        base: "#0ea5e9",
        hover: "#38bdf8",
      },
      status: {
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#f43f5e",
        info: "#3b82f6",
      },
      behavioral: {
        reward: "#22c55e",
        focus: "#38bdf8",
        urgency: "#f59e0b",
        loss: "#fb7185",
      },
      priority: {
        low: "#38bdf8",
        medium: "#f59e0b",
        high: "#ef4444",
      },
    },
    radius: {
      base: "0.75rem",
      large: "1rem",
    },
    effects: {
      focusRing: "0 0 0 3px rgba(56, 189, 248, 0.35)",
      shadowSoft: "0 8px 24px rgba(2, 6, 23, 0.18)",
      shadowElevated: "0 20px 45px rgba(2, 6, 23, 0.35)",
    },
  },
  focus: {
    brandName: "FocusFlow",
    logoText: "FF",
    ui: {
      primary: "emerald",
      secondary: "sky",
      success: "green",
      info: "blue",
      warning: "amber",
      error: "rose",
      neutral: "slate",
    },
    colors: {
      core: {
        background: "#0f172a",
        surface: "#111827",
        surfaceElevated: "#1f2937",
        foreground: "#f8fafc",
        muted: "#94a3b8",
        border: "#334155",
      },
      primary: {
        base: "#10b981",
        hover: "#34d399",
        active: "#059669",
      },
      secondary: {
        base: "#0ea5e9",
        hover: "#38bdf8",
      },
      status: {
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#f43f5e",
        info: "#3b82f6",
      },
      behavioral: {
        reward: "#22c55e",
        focus: "#38bdf8",
        urgency: "#f59e0b",
        loss: "#fb7185",
      },
      priority: {
        low: "#38bdf8",
        medium: "#f59e0b",
        high: "#ef4444",
      },
    },
    radius: {
      base: "0.75rem",
      large: "1rem",
    },
    effects: {
      focusRing: "0 0 0 3px rgba(56, 189, 248, 0.35)",
      shadowSoft: "0 8px 24px rgba(2, 6, 23, 0.18)",
      shadowElevated: "0 20px 45px rgba(2, 6, 23, 0.35)",
    },
  },
} as const

export type ThemePresetName = keyof typeof behavioralThemePresets
export type ThemePreset = (typeof behavioralThemePresets)[ThemePresetName]

const fallbackPreset: ThemePresetName = "default"

export const resolveThemePresetName = (input?: string): ThemePresetName => {
  if (!input) {
    return fallbackPreset
  }

  if (input in behavioralThemePresets) {
    return input as ThemePresetName
  }

  return fallbackPreset
}

