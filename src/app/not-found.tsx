import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.textContainer}>
      <dl className={styles.wrapper}>
        <dt className={styles.title}>ページが見つかりませんでした</dt>
        <dd className={styles.text}>
          あなたがアクセスしようとしたページは存在しません。<br />URLを再度ご確認ください。
        </dd>
      </dl>
      </div>
      <Footer />
    </div>
  );
}