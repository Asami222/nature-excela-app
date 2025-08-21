// .storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer"

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  docs: { defaultName: "Docs" },
  viteFinal: async (config) => {
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    };
    return {
      ...config,
      plugins: [...(config.plugins ?? []), tsconfigPaths()], // ← ここで安全に追加
    };
  },
};

export default config;