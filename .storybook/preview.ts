import type { Preview } from "@storybook/react";
import "../src/styles/variables.css";
import "../src/styles/globals.css"; 

const preview: Preview = {
  parameters: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
  },
};

export default preview;