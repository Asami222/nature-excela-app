import { createMetadata } from "@/lib/metadata";
import SignUpClient from "@/components/SignUpClient/SignUpClient";

export const metadata = createMetadata({
  title: "新規登録",
  description: "新規アカウント登録ページです",
  path: "/signup",
});

export default function SignUpPage() {
  return <SignUpClient />
}