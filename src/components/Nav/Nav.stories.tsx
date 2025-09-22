// src/components/Nav.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from "./Nav";
import { within, userEvent } from "@storybook/testing-library";

const meta: Meta<typeof Nav> = {
  title: "Example/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Nav>;

/** フッター用ナビ */
export const FooterNav: Story = {
  args: { isHeader: false, isHome: false },
};

/** ヘッダー用ナビ（ハンバーガーメニューあり） */
export const HeaderNav: Story = {
  args: { isHeader: true, isHome: false },
};

/** Homeページのヘッダーナビ */
export const HomeHeaderNav: Story = {
  args: { isHeader: true, isHome: true },
};

/** ハンバーガーメニューの開閉操作を確認 */
export const HeaderNavWithInteraction: Story = {
  args: { isHeader: true, isHome: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: /menu/i });

    // メニューを開く
    await userEvent.click(button);
    await new Promise((r) => setTimeout(r, 500));

    // メニューを閉じる
    await userEvent.click(button);
  },
};

/** product メニュー hover のサブメニュー展開 */
export const ProductMenuHover: Story = {
  args: { isHeader: true, isHome: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ハンバーガーメニューを開く
    const button = await canvas.findByRole("button", { name: /menu/i });
    await userEvent.click(button);
    await new Promise((r) => setTimeout(r, 500));

    // "product" テキストを hover する
    const productItem = await canvas.getByText(/product/i);
    await userEvent.hover(productItem);

    // 少し待機（サブメニュー展開が見えるように）
    await new Promise((r) => setTimeout(r, 800));
  },
};