import styles from './ProductMenu.module.css'
import Link from "next/link";

type LinkProps = { type: "link"; name: string; link: string; exist?: "on" };

type Props = {
  items: LinkProps[];
};

export default function ProductMenu({items}: Props) { 

    return (
            <ul className={styles.container}>
                {items.map((item,i) => (
                  
                    <li key={i}>
                        <Link href={item.link} className={item.exist ? styles.exist : styles.noExist}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
    )
}