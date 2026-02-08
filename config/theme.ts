/**
 * Theme Configuration System
 * Easily manage light and dark theme colors
 */

export const lightTheme = {
  // Primary - Modern Blue/Cyan (Pantone 2026 trend)
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
    950: "#001529",
  },

  // Secondary - Warm Coral/Peach (Pantone 2026 trend)
  secondary: {
    50: "#fff2e8",
    100: "#ffd8bf",
    200: "#ffbf96",
    300: "#ffa66d",
    400: "#ff8c44",
    500: "#ff7222",
    600: "#d95a00",
    700: "#b34200",
    800: "#8c2a00",
    900: "#661200",
    950: "#400a00",
  },

  // Accent - Vibrant Purple/Magenta (Pantone 2026 trend)
  accent: {
    50: "#f9f0ff",
    100: "#efdbff",
    200: "#d3adf7",
    300: "#b37feb",
    400: "#9254de",
    500: "#722ed1",
    600: "#531dab",
    700: "#391085",
    800: "#22075e",
    900: "#120338",
    950: "#0a0120",
  },

  // Neutral - Modern Grays
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e8e8e8",
    300: "#d9d9d9",
    400: "#bfbfbf",
    500: "#8c8c8c",
    600: "#595959",
    700: "#434343",
    800: "#262626",
    900: "#1f1f1f",
    950: "#141414",
  },

  // Background
  background: {
    primary: "linear-gradient(135deg, #fafafa 0%, #e6f7ff 100%)",
    secondary: "#ffffff",
  },

  // Text
  text: {
    primary: "#1f1f1f",
    secondary: "#434343",
    tertiary: "#595959",
  },
} as const;

export const darkTheme = {
  // Primary - Darker Blue/Cyan
  primary: {
    50: "#001529",
    100: "#002766",
    200: "#003a8c",
    300: "#0050b3",
    400: "#096dd9",
    500: "#1890ff",
    600: "#40a9ff",
    700: "#69c0ff",
    800: "#91d5ff",
    900: "#bae7ff",
    950: "#e6f7ff",
  },

  // Secondary - Darker Coral/Peach
  secondary: {
    50: "#400a00",
    100: "#661200",
    200: "#8c2a00",
    300: "#b34200",
    400: "#d95a00",
    500: "#ff7222",
    600: "#ff8c44",
    700: "#ffa66d",
    800: "#ffbf96",
    900: "#ffd8bf",
    950: "#fff2e8",
  },

  // Accent - Darker Purple/Magenta
  accent: {
    50: "#0a0120",
    100: "#120338",
    200: "#22075e",
    300: "#391085",
    400: "#531dab",
    500: "#722ed1",
    600: "#9254de",
    700: "#b37feb",
    800: "#d3adf7",
    900: "#efdbff",
    950: "#f9f0ff",
  },

  // Neutral - Inverted Grays for Dark Mode
  neutral: {
    50: "#141414",
    100: "#1f1f1f",
    200: "#262626",
    300: "#434343",
    400: "#595959",
    500: "#8c8c8c",
    600: "#bfbfbf",
    700: "#d9d9d9",
    800: "#e8e8e8",
    900: "#f5f5f5",
    950: "#fafafa",
  },

  // Background
  background: {
    primary: "linear-gradient(135deg, #141414 0%, #001529 100%)",
    secondary: "#1f1f1f",
  },

  // Text
  text: {
    primary: "#f5f5f5",
    secondary: "#d9d9d9",
    tertiary: "#bfbfbf",
  },
} as const;

/**
 * Generate CSS variables for a theme
 */
export const generateThemeVariables = (theme: typeof lightTheme | typeof darkTheme) => {
  const variables: Record<string, string> = {};

  Object.entries(theme).forEach(([category, values]) => {
    if (category === "background" || category === "text") {
      Object.entries(values).forEach(([key, value]) => {
        variables[`--theme-${category}-${key}`] = value as string;
      });
    } else {
      Object.entries(values).forEach(([shade, value]) => {
        variables[`--color-${category}-${shade}`] = value as string;
      });
    }
  });

  return variables;
};

