import { createMetadata } from "@/lib/metadata";
import LoginClient from "./loginClient";

export const metadata = createMetadata({
  title: "ログイン",
  description: "ログインページです。初めての場合は新規登録へお進みください",
  path: "/login",
});

export default function LoginForm() {
  return <LoginClient />
}