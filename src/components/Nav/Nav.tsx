"use client";

import cx from "classnames"
import Link from "next/link";
import { useState } from "react";
import styles from './Nav.module.css'

export default function Nav({ isHeader = false, isHome = false}) {

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
            <ul className={cx(styles.navList,isHeader ? styles.hamburger : styles.footerNav)}>
                <li>
                    <Link href="/" onClick={closeNav}>
                    HOME
                    </Link>
                </li>
                <li>
                    <Link href="/about" onClick={closeNav}>
                    ABOUT
                    </Link>
                </li>
                <li>
                    <Link href="/new-product" onClick={closeNav}>
                    NEW PRODUCT
                    </Link>
                </li>
                <ul className={cx(styles.productFlex,isAction && styles.openProduct)}>
                    <li className={styles.navProduct} onMouseEnter={action}>  
                        <p className={styles.productArrow}>PRODUCT</p>
                    </li>
                    <div className={cx(styles.productMenu,isHeader ? styles.productMenuH : styles.productMenuF)}>
                        <li>
                            <Link href="/product/skincare" onClick={closeNav}>
                                SKINCARE
                            </Link>
                        </li>
                        <li>
                            <Link href="/product/face" onClick={closeNav}>
                                FACE
                            </Link>
                        </li>
                        <li>
                            <Link href="/product/eye" onClick={closeNav}>
                                EYE
                            </Link>
                        </li>
                        <li>
                            <Link href="/product/rip" onClick={closeNav}>
                                RIP
                            </Link>
                        </li>
                        <li>
                            <Link href="/product/brush" onClick={closeNav}>
                                BRUSH
                            </Link>
                        </li>
                    </div>
                </ul>
                <li>
                    <Link href="/contact" onClick={closeNav}>
                    CONTACT
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
