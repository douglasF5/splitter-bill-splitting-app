import { $, camelToKebabCase } from "./utils.js";

//STORE COLOR SCHEME PREFERENCE
let colorScheme = getColorScheme();

function getColorScheme() {
  return localStorage.getItem("splitter:color-scheme");
}

function setColorScheme(colorScheme) {
  localStorage.setItem("splitter:color-scheme", colorScheme);
}

//SET COLOR SCHEME
const documentRoot = document.documentElement;
const colorSchemeController = $("[data-color-theme-button]");
let currentScheme = "";

const colorSlots = {
  accent: {
    dark: "rgba(82, 244, 222, 1)",
    light: "rgba(1, 101, 88, 1)",
  },
  accentContainer: {
    dark: "rgba(82, 244, 222, 1)",
    light: "rgba(42, 57, 60, 1)",
  },
  onAccentContainer: {
    dark: "rgba(42, 57, 60, 1)",
    light: "rgba(82, 244, 222, 1)",
  },
  overAccentContainer: {
    dark: "rgba(54, 74, 71, 1)",
    light: "rgba(117, 249, 231, 1)",
  },
  accentHighlight: {
    dark: "rgba(82, 244, 222, 0.1)",
    light: "rgba(82, 244, 222, 0.24)",
  }, //------
  surfacePrimary: {
    dark: "rgba(26, 34, 36, 1)",
    light: "rgba(239, 246, 245, 1)",
  },
  surfaceSecondary: {
    dark: "rgba(33, 46, 49, 1)",
    light: "rgba(255, 255, 255, 1)",
  },
  surfaceTertiary: {
    dark: "rgba(42, 57, 60, 1)",
    light: "rgba(221, 234, 232, 1)",
  }, //------
  overSurfacePrimary: {
    dark: "rgba(194, 254, 246, 0.06)",
    light: "rgba(1, 101, 88, 0.08)",
  },
  overSurfaceSecondary: {
    dark: "rgba(194, 254, 246, 0.06)",
    light: "rgba(1, 101, 88, 0.12)",
  },
  modalOverlay: {
    dark: "rgba(26, 34, 36, 0.68)",
    light: "rgba(239, 246, 245, 0.68)",
  }, //------
  onSurfacePrimary: {
    dark: "rgba(255, 255, 255, 1)",
    light: "rgba(42, 60, 58, 1)",
  },
  onSurfaceSecondary: {
    dark: "rgba(235, 255, 252, 0.73)",
    light: "rgba(0, 46, 40, 0.73)",
  },
  onSurfaceTertiary: {
    dark: "rgba(235, 255, 252, 0.6)",
    light: "rgba(0, 46, 40, 0.56)",
  },
  onSurfaceQuaternary: {
    dark: "rgba(235, 255, 252, 0.48)",
    light: "rgba(0, 46, 40, 0.32)",
  }, //------
  outlinePrimary: {
    dark: "rgba(194, 254, 246, 0.24)",
    light: "rgba(1, 101, 88, 0.48)",
  },
};

colorSchemeController.onclick = () => {
  if (currentScheme === "light") {
    currentScheme = "dark";
  } else {
    currentScheme = "light";
  }

  toggleColorScheme(currentScheme);
};

function toggleColorScheme(theme) {
  for (let slot in colorSlots) {
    documentRoot.style.setProperty(
      `--c-${camelToKebabCase(slot)}`,
      colorSlots[slot][theme]
    );
  }
}

if (colorScheme === null) {
  currentScheme = "light";
} else {
  currentScheme = colorScheme;
}

toggleColorScheme(currentScheme);

window.addEventListener("beforeunload", () => {
  setColorScheme(currentScheme);
});
