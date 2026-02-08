/**
 * Color Configuration System
 * Easily update colors by modifying this file
 * Based on Pantone 2026 Color Trends
 */

export const colorPalette = {
  // Primary - Modern Blue/Cyan (Pantone 2026 trend)
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff", // Main primary
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
    500: "#ff7222", // Main secondary
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
    500: "#722ed1", // Main accent
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
} as const;

/**
 * Generate CSS variables for colors
 */
export const generateColorVariables = () => {
  const variables: Record<string, string> = {};
  
  Object.entries(colorPalette).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      variables[`--color-${colorName}-${shade}`] = value;
    });
  });
  
  return variables;
};

/**
 * Get color value by name and shade
 */
export const getColor = (colorName: keyof typeof colorPalette, shade: string | number) => {
  return colorPalette[colorName][shade as keyof typeof colorPalette[typeof colorName]];
};

