// src/components/LoginClient/LoginClient.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within, expect } from "@storybook/test";
import LoginClient from "./LoginClient";

// =========================
// Storybook 設定
// =========================
const mockPush = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).lastPushUrl = url; // Playwright から確認可能
  console.log("Mock push to:", url);
};

const meta: Meta<typeof LoginClient> = {
  title: "Auth/LoginClient",
  component: LoginClient,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: { push: mockPush },
};
export default meta;

type Story = StoryObj<typeof LoginClient>;
// =========================
// ストーリー定義
// =========================

/**
 * 1. フォーム送信時にエラーメッセージが出る
 */
export const ShowErrorMessage: Story = {
  args: { push: mockPush },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空で送信
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));

    // エラー表示確認
    await expect(
      canvas.findByText("メールアドレスを入力してください。")
    ).resolves.toBeInTheDocument();

    await expect(
      canvas.findByText("パスワードを入力してください。")
    ).resolves.toBeInTheDocument();
  },
};

/**
 * 2. 入力を修正するとエラーが消える
 */
export const ClearErrorOnInput: Story = {
  args: { push: mockPush },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空で送信してエラー表示
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
    await expect(
      canvas.findByText("メールアドレスを入力してください。")
    ).resolves.toBeInTheDocument();

    // メール入力
    await userEvent.type(canvas.getByLabelText("メールアドレス"), "user@example.com");

    // エラーが消えるのを確認
    const emailError = canvas.queryByText("メールアドレスを入力してください。");
    expect(emailError).not.toBeInTheDocument();
  },
};

/**
 * 3. バリデーション通過時の submit
 *    UI動作確認用なので、submitの挙動はモックのみ
 */
export const SubmitSuccess: Story = {
  args: { push: mockPush },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 入力
    await userEvent.type(canvas.getByLabelText("メールアドレス"), "user@example.com");
    await userEvent.type(canvas.getByLabelText("パスワード"), "password123");

    // 送信
    await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));

    // 「ログイン失敗しました」が表示されていないことを確認
    const errorMessage = canvas.queryByText("ログイン失敗しました");
    expect(errorMessage).not.toBeInTheDocument();
  },
};