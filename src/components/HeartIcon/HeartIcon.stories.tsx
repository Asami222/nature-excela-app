import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeartButton from "./HeartIcon";
import { useState } from "react";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof HeartButton> = {
  title: "Components/HeartButton",
  component: HeartButton,
};
export default meta;

type Story = StoryObj<typeof HeartButton>;

// ログイン済みケース
export const LoggedIn: Story = {
  render: () => {
    const HeartWrapper = () => {
      const [isFavorite, setIsFavorite] = useState(false);

      const handleToggle = () => {
        setIsFavorite((prev) => !prev); // 状態切り替え
      };

      return <HeartButton isFavorite={isFavorite} onToggle={handleToggle} />;
    };
    return <HeartWrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button); // お気に入りON
    await userEvent.click(button); // お気に入りOFF
  },
};

// 未ログインケース（モックでログインページ遷移）
export const LoggedOut: Story = {
  render: () => {
    const HeartWrapper = () => {
      const [isFavorite] = useState(false);

      const handleToggle = () => {
        alert("ログインしてください"); // 未ログイン時の挙動モック
      };

      return <HeartButton isFavorite={isFavorite} onToggle={handleToggle} />;
    };
    return <HeartWrapper />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button); // アラート表示確認
  },
};