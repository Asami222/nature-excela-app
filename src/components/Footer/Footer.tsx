import Link from "next/link";
import { Inter } from "next/font/google"
import { FooterLogo } from "../Logo/Logo";
import Nav from "../Nav/Nav";
import styles from './Footer.module.css'
import Container from "../Container/Container";
import cx from "classnames"
import Sns from "../Sns/Sns";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })

export default function Footer({isHome = false}) {

    return (
        <footer className={cx(styles.wrapper, isHome && styles.homeWrapper)}>
            <Container>
            <div className={styles.footerFlex}>
                <div className={cx("sideBySide", styles.flexContainer)}>
                    {isHome ? <FooterLogo isHome={isHome} /> : <FooterLogo />}
                        <Nav isHome={isHome}/> 
                    <div className={styles.sns}>
                    <Sns isHome={isHome}/>
                    </div>         
                </div>
                <div>
                    <div className={styles.privacy}>
                        <p><Link href="/terms">利用規約</Link></p>
                        <p><Link href="/commercial">特定商取引法に基づく表記</Link></p>
                    </div> 
                    <p className={cx(inter.className, styles.copyright)}>©︎ NATURE EXCELA. All Rights Reserved.</p>
                </div>
            </div>
            </Container>
        </footer>
    )
}