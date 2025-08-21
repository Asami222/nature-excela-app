import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; 

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