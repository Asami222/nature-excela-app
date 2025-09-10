import { HeaderLogoSimple } from "../Logo/Logo"
import Nav from "../Nav/Nav"
import CartCount from "../CartCount/CartCount"
import styles from './Header.module.css'
import Container from "../Container/Container"
import cx from "classnames"
import Link from "next/link";
import Image from "next/image"
import MemberMenu from "../MemberMenu/MemberMenu"

export default function Header({isHome = false}) {

    return (
        <header className={styles.header}>
            <Container large>
            <div className={cx("spaceBetween", isHome && styles.flexContainerHeader)}>
                { !isHome &&
                <HeaderLogoSimple />
                }
                <Nav isHeader isHome={isHome}/>
                <div className={styles.globalsContainer}>
                    <MemberMenu />
                    <Link href="/payments">
                        <div className={styles.globals}>
                            <div className={cx(styles.img, styles.bagimg)}>
                                <Image
                                    src="/items/bagfill.svg"
                                    alt="shopping bag"
                                    fill
                                    style={{
                                    objectFit: 'cover',
                                    }}
                                />
                            </div>
                            <CartCount />
                        </div>
                    </Link>
                </div>
            </div>
            </Container>
        </header>
    )
}