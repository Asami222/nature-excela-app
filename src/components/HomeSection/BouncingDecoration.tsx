"use client"

import { motion } from "framer-motion"
import styles from "./HomeSection.module.css"

export default function BouncingDecoration() {
  return (
    <motion.span
      animate={{ y: [0, -5, 0, -3, 0, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
      aria-hidden="true" // 装飾なのでスクリーンリーダーは無視
      className={styles.exist}
    >
      exists!
    </motion.span>
  )
}