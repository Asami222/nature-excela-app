// components/HomeSectionSkeleton.tsx
import styles from "./HomeSecctionSkelton.module.css"

function SingleSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          {/* メニュー（リンク5個分） */}
          <div className={styles.menu}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`${styles.box} ${styles.menuItem}`} />
            ))}
          </div>
        {/* 画像枠 */}
        <div className={`${styles.box} ${styles.image}`} />
      </div>
      <div className={styles.skeleton}>
        {/* 画像枠 */}
        <div className={`${styles.box} ${styles.image}`} />
        {/* メニュー（リンク5個分） */}
        <div className={`${styles.menu} ${styles.menu2}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.box} ${styles.menuItem}`} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeSectionSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <SingleSkeleton key={i} />
      ))}
    </>
  );
}