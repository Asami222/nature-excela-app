"use client";

import Image from "next/image";
import styles from "./Sns.module.css";
import cx from "classnames"

const snsList = [
    { id: "1", url: "/items/x.svg", alt: "x" },
    { id: "2", url: "/items/instagram.svg", alt: "instagram" },
  ];

export default function Sns({isHome = false}) {

    return (  
        <>
        { snsList.map((sns) => (
            <div key={sns.id} className={cx(isHome && styles.isHome )}>
                <a href="#">
                    <Image
                        src={sns.url}
                        alt={sns.alt}
                        width={30}
                        height={30}
                        sizes='(min-width: 1260px) 30px, (min-width: 768px) 3vw, 100vw'
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        className={styles.snsIcon}
                    />
                </a>
            </div>
        ))}
        </>
    )
}