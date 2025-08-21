// src/components/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Blue: Story = {
  args: { label: "Blue Button", color: "blue" },
};

export const Green: Story = {
  args: { label: "Green Button", color: "green" },
};

export const WithInteraction: Story = {
  args: { label: "Click me", color: "blue" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
  },
};