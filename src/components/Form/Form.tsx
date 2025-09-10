"use client";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Link from "next/link"
import styles from './Form.module.css'

type Data = {
  name: string;
  phone?: string;
  email: string;
  category?: "goods" | "howto" | "others" | "";
  memo: string;
  check: boolean;
}

export default function Form() {

    const { register, handleSubmit,getValues,formState:{errors, isSubmitting,isSubmitted}} =useForm<Data>();

    const values =getValues()

    let kind;
    if(values.category === 'goods') {
        kind = "商品について";
    } else if(values.category === 'howto') {
        kind = "利用方法について";
    } else {
        kind = "その他"
    }
  //const onsubmit = async (data: Data) => { ... };　小規模 & 試作ならSubmitHandler<Data>は省略OK
    const onsubmit: SubmitHandler<Data> = async (data: Data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
    };

    const onerror: SubmitErrorHandler<Data> = (err) => {console.log(err)};

    return (
        <form onSubmit={handleSubmit(onsubmit,onerror)} noValidate className={styles.form}>
            <div>
                <label htmlFor="name" className={styles.required}>お名前</label>
                <input id="name" type="text" placeholder="鈴木 真由子" {...register('name',{required: '名前は必須入力です。'})} />
                <div className={styles.error}>{errors.name?.message}</div>
            </div>
            <div>
                <label htmlFor="phone">電話番号</label>
                <input id="phone" type="text" placeholder="00-0000-0000" {...register('phone')} />
            </div>
            <div>
                <label htmlFor="email" className={styles.required}>メールアドレス</label>
                <input id="mail" type="email" placeholder="admin@example.com" 
                {...register('email',{
                    required: 'メールアドレスは必須入力です。',
                    pattern: {
                        value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                        message: 'メールアドレスの形式が不正です。'
                    }
                    })} />
                <div className={styles.error}>{errors.email?.message}</div>
            </div>
            <div>
                <label htmlFor="category">お問い合わせの種類</label><br/>
                <select id="category" defaultValue="" {...register('category')}>
                    <option value="" disabled>選択してください</option>
                    <option value="goods">商品について</option>
                    <option value="howto">利用方法について</option>
                    <option value="others">その他</option>
                </select>
                <div className={styles.error}>{errors.category?.message}</div>
            </div>
            <div>
                <label htmlFor="memo" className={styles.required}>お問い合わせ内容</label>
                <textarea id="memo" placeholder="1,000文字以内で入力してください。"
                {...register('memo',{
                    required: 'お問い合わせ内容は必須入力です。',
                    maxLength: {
                        value: 1000,
                        message: '文字は1,000文字以内にしてください。'
                    }
                })} />
                <div className={styles.error}>{errors.memo?.message}</div>
            </div>
            <p className={styles.privacy}><Link href="/privacy">個人情報の取り扱いについて</Link></p>
            <div>
                <div className={styles.privacyFlex}>
                    <label htmlFor="check" className={styles.required}>個人情報の取り扱いについてに同意する</label>
                    <input id="check" type="checkbox" {...register('check',{ required: '同意するにチェックは必須です。' })} />
                </div>
                <div className={styles.error}>{errors.check?.message}</div>
            </div>
            <div className={styles.button}>
                <button type="submit" disabled={isSubmitting}>送信する</button>
            </div>
            {isSubmitting && <div className={styles.sending}>....送信中....</div>}
            {isSubmitted &&
                <div className={styles.afterSubmit}>
                    {values.name && <p>{values.name}さん</p>}
                    <p>お問い合わせありがとうございます。</p>
                    {values.category && <p>お問い合わせの種類は、&ensp;<span>{kind}</span>&ensp;です。</p>}
                    {values.memo && <p>お問い合わせ内容は、&ensp;<span>{values.memo}</span>&ensp;です。</p>}
                    <p>当サイトはテストサイトとなっており、実際に情報が送られることはありません。</p>
                    <p>ご入力いただきありがとうございました。</p>
                </div>
            }       
        </form>
    )
}