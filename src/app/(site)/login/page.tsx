"use client"

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link";
import styles from "./page.module.css"

type Data = {
  email: string;
  password: string;
}

export default function LoginForm() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const { register, handleSubmit, setError, formState:{errors, isSubmitting}} =useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      passwors: data.password,
      redirect: false, // 自動リダイレクトを無効化
      callbackUrl,
    })
    if (res?.ok && res.url) {
      router.push(res.url) // ログイン成功後に 前のページまたはホーム へ
    } else {
      setError("password", { type: "manual", message: "ログイン失敗しました" })
      
    }
  }

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl })
  }

  const handleGuestLogin = async () => {
    const res = await fetch("/api/auth/guest-login", { method: "POST" })
    const { email, password } = await res.json()

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    })
  }

  const onerror: SubmitErrorHandler<Data> = (err) => {console.log(err)};

  return (
  <div className={styles.wrapper}>
    <h1>ログイン</h1>
    <form onSubmit={handleSubmit(onSubmit,onerror)} noValidate className={styles.form}>
      <div className={styles.emailWrapper}>
        <label htmlFor="email" className={styles.required}>メールアドレス</label>
        <input
            id="mail"
            type="email"
            placeholder="admin@example.com"
            {...register('email',{
              required: 'メールアドレスを入力してください。',
              pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '正しいメールアドレスの形式で入力してください。',
              }
              })}
          />
          {errors.email &&<p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div>
        <label htmlFor="password" className={styles.required}>パスワード</label>
        <input
            id="password"
            type="password"
            placeholder="•••••••••"
            {...register('password',{
              required: 'パスワードを入力してください。',
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.button}>
          <button type="submit" disabled={isSubmitting}>ログイン</button>
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
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
        />
        <span>Googleでログイン</span>
      </button>
      <p className={styles.newUser}>
        アカウントをお持ちでない方は{" "} {/*{""}はスペース */}
        <Link href="/signup">
          新規登録
        </Link>
        {" "}へ
      </p>
      <div className={styles.guest}>
        <button onClick={handleGuestLogin}>
          ゲストでログイン
        </button>
      </div>
    </div>
  )
}