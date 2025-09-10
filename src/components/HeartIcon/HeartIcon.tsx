"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import styles from "./HeartIcon.module.css";

export default function HeartButton({
  onToggle,
  isFavorite,
}: {
  onToggle: () => void;
  isFavorite: boolean;
}) {

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (isFavorite) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500); // バウンド後にリセット
      return () => clearTimeout(timer);
    }
  }, [isFavorite]);

  return (
    <button className={styles.button} onClick={onToggle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 58 58">
        <title>お気に入りに追加</title>
        <g id="ia" data-name="i_a">
          <g id="icon_data">
            {/* ハートだけスケール */}
            <motion.path
              initial={false}
              animate={animate ? { scale: [1, 1.2, 1.1, 1] } : { scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "50% 50%" }}
              className={cn(styles.icon, isFavorite ? styles.isFavorite : styles.notFavorite)}
              d="M41.51,11.63a9.67,9.67,0,0,0-13.7,0L24,15.43l-3.81-3.8a9.69,9.69,0,0,0-13.7,13.7L24,42.84l13.7-13.7h0l3.81-3.81A9.69,9.69,0,0,0,41.51,11.63Z"
              fill="#fff"
              stroke="#171313"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2px"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}