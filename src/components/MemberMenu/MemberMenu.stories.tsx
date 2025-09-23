import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MemberMenu from "./MemberMenu";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

// args の型定義
type MemberMenuArgs = {
  status: "loading" | "unauthenticated" | "authenticated";
  image?: string | null;
};

// MemberMenu のラッパー
const MemberMenuWrapper = () => <MemberMenu />;

// Meta 定義（ジェネリックは 1 つだけ）
const meta: Meta<typeof MemberMenuWrapper> = {
  title: "Example/MemberMenu",
  component: MemberMenuWrapper,
  parameters: { layout: "centered" },
  decorators: [
    (Story, context) => {
      // context.args に型アサーション
      const { status, image } = context.args as MemberMenuArgs;

      const session: Session | null =
        status === "authenticated"
          ? {
              user: {
                id: "test-user",
                name: "Test User",
                email: "test@example.com",
                image: image ?? null,
              },
              expires: "9999-12-31T23:59:59.999Z",
            }
          : null;

      return (
        <SessionProvider session={session}>
          <Story />
        </SessionProvider>
      );
    },
  ],
  argTypes: {
    status: {
      control: "select",
      options: ["loading", "unauthenticated", "authenticated"],
    },
    image: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof MemberMenuWrapper>;

// ストーリー定義
export const Loading: Story = { args: { status: "loading" } };
export const Unauthenticated: Story = { args: { status: "unauthenticated" } };
export const AuthenticatedWithImage: Story = {
  args: { status: "authenticated", image: "https://placekitten.com/100/100" },
};
export const AuthenticatedNoImage: Story = {
  args: { status: "authenticated", image: null },
};