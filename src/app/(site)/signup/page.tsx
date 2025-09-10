"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./page.module.css"

const signupSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().refine(
    (val) => /\S+@\S+\.\S+/.test(val),
    { message: "有効なメールアドレスを入力してください" }
  ),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/[0-9]/, "少なくとも1つの数字を含めてください")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "少なくとも1つの記号を含めてください"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // 前のページまたはホーム
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // メール・パスワードサインアップ
  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(result.error || "登録に失敗しました");
        return;
      }

      // 自動ログイン
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setLoading(false);
      alert("サーバーエラーが発生しました");
    }
  };

  // Google OAuth サインイン
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl, // 前のページに戻る
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setLoading(false);
      alert("Googleログインに失敗しました");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>アカウント登録</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.inputWrapper}>
          <div>
            <label className={styles.required}>名前</label>
            <input
              type="text"
              placeholder="鈴木 ゆう"
              {...register("name")}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className={styles.required}>メールアドレス</label>
            <input
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className={styles.required}>パスワード</label>
            <input
              type="password"
              placeholder="•••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className={styles.button}>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "登録中..." : "登録"}
          </button>
        </div>
      </form>
      {/* 区切り線 */}
      <div className={styles.lineWrapper}>
        <hr />
        <span>or</span>
        <hr />
      </div>
      {/* Google ログイン */}
      <button
        onClick={handleGoogleLogin}
        className={styles.googleButton}
        disabled={loading}
      >
        <Image
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span>Googleではじめる</span>
      </button>
    </div>
  );
}