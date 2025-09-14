"use client";

import { libreCaslonDisplay } from "@/styles/fonts";
import cx from "classnames"
import Link from "next/link";
import { useState } from "react";
import styles from './Nav.module.css'

interface NavProps {
    isHeader?: boolean;
    isHome?: boolean;
}

export default function Nav({ isHeader = false, isHome = false}: NavProps) {

    /** product menu */
    const[isAction, setAction] = useState(false)
    const action = () => setAction((prev) => !prev)

    /** mobile nav menu */
    const [navIsOpen, setNavIsOpen] = useState(false)
    const toggleNav = () => setNavIsOpen((prev) => !prev)
    const closeNav = () => {
        setNavIsOpen(false)
    }
  
    
    return (
        <nav className={cx(styles.nav,navIsOpen ? styles.open : styles.close, isHome && styles.homeNav)}>
            {navIsOpen && (
                <style jsx global>{`
                    @media (max-width: 768px) {
                        body {
                            overflow: hidden;
                            position: fixed;
                            width: 100%;
                        }
                    }
                `}</style>
            )}
            {isHeader && 
            <button className={styles.btn} onClick={toggleNav}>
                <span className={styles.bar}></span>
                <span className={styles.srOnly}>MENU</span>
            </button>}
            <ul className={cx(styles.navList,isHeader ? [libreCaslonDisplay.className, styles.hamburger ] : styles.footerNav)}>
                <li>
                    <Link href="/" onClick={closeNav}>
                    home
                    </Link>
                </li>
                <li>
                    <Link href="/about" onClick={closeNav}>
                    about
                    </Link>
                </li>
                <li>
                    <Link href="/new-product" onClick={closeNav}>
                    new product
                    </Link>
                </li>
                <ul className={cx(styles.productFlex,isAction && styles.openProduct)}>
                    <li className={styles.navProduct} onMouseEnter={action}>  
                        <p className={styles.productArrow}>product</p>
                    </li>
                    <div className={cx(styles.productMenu,isHeader ? styles.productMenuH : styles.productMenuF)}>
                        <li>
                            <Link href="/products/skincare" onClick={closeNav}>
                                skincare
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/face" onClick={closeNav}>
                                face
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/eye" onClick={closeNav}>
                                eye
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/rip" onClick={closeNav}>
                                rip
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/brush" onClick={closeNav}>
                                brush
                            </Link>
                        </li>
                    </div>
                </ul>
                <li>
                    <Link href="/contact" onClick={closeNav}>
                    contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
