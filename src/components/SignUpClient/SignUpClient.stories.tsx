// src/components/SignupClient/SignupClient.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within, expect, fn } from "@storybook/test";
import SignUpClient from "./SignUpClient";

// =========================
// Storybook 用モック関数
// =========================
const mockSignIn = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).lastSignInCalled = true;
  console.log("Mock signIn called");
};

const meta: Meta<typeof SignUpClient> = {
  title: "Auth/SignupClient",
  component: SignUpClient,
  parameters: {
    nextjs: { appDirectory: true },
  },
};
export default meta;

type Story = StoryObj<typeof SignUpClient>;

// =========================
// Story: フォームバリデーション確認
// =========================
export const ShowErrorMessage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空で送信
    await userEvent.click(canvas.getByRole("button", { name: /登録/i }));

    // エラー表示確認
    await expect(canvas.findByText("名前を入力してください")).resolves.toBeVisible();
    await expect(canvas.findByText("有効なメールアドレスを入力してください")).resolves.toBeVisible();
    await expect(canvas.findByText(/パスワードは8文字以上/)).resolves.toBeVisible();
  },
};

// =========================
// Story: 入力修正でエラー消える
// =========================
export const ClearErrorOnInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 空で送信してエラー表示
    await userEvent.click(canvas.getByRole("button", { name: /登録/i }));
    await expect(canvas.findByText("名前を入力してください")).resolves.toBeVisible();

    // 入力修正
    await userEvent.type(canvas.getByPlaceholderText("鈴木 ゆう"), "山田 太郎");
    await userEvent.type(canvas.getByPlaceholderText("admin@example.com"), "test@example.com");
    await userEvent.type(canvas.getByPlaceholderText("•••••••••"), "Abc12345!");

    // エラー消えているか確認
    expect(canvas.queryByText("名前を入力してください")).not.toBeInTheDocument();
  },
};

// =========================
// Story: 正常送信 (モック)
// =========================
export const SubmitSuccess: Story = {
  args: {
    onSubmitMock: fn(), // ← 明示的に spy を作る
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 入力
    await userEvent.type(canvas.getByPlaceholderText("鈴木 ゆう"), "山田 太郎");
    await userEvent.type(canvas.getByPlaceholderText("admin@example.com"), "test@example.com");
    await userEvent.type(canvas.getByPlaceholderText("•••••••••"), "Abc12345!");

    // モック submit
    await userEvent.click(canvas.getByRole("button", { name: /登録/i }));

    // window にフラグが立つ想定
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastSignInCalled = (window as any).lastSignInCalled;
    expect(lastSignInCalled).toBeTruthy();
  },
};