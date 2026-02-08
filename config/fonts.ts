/**
 * Font Configuration System
 * Easily update fonts by modifying this file
 * Supports Poppins and Raleway fonts
 */

export const fontConfig = {
  primary: {
    name: "Poppins",
    weights: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    className: "font-poppins",
  },
  secondary: {
    name: "Raleway",
    weights: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-raleway",
    className: "font-raleway",
  },
} as const;

/**
 * Get font configuration by name
 */
export const getFont = (fontName: keyof typeof fontConfig) => {
  return fontConfig[fontName];
};

/**
 * Get all font names
 */
export const getFontNames = () => {
  return Object.keys(fontConfig) as Array<keyof typeof fontConfig>;
};

