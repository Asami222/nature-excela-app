import { INITIAL_PER_PAGE } from "@/constants";
import Link from "next/link";
import styles from "./Pagination.module.css"

type Props = {
  totalCount: number;
  current?: number;
  createHref: (page: number) => string;
};

export default function Pagination({ totalCount, current = 1, createHref }: Props) {

  const pages = Array.from(
    { length: Math.ceil(totalCount / INITIAL_PER_PAGE) },
    (_,i) => i + 1
  )

  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link href={createHref(p)} className={styles.item}>
              {p}
              </Link>
            ):(
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}





