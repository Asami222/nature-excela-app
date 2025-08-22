import { HeaderLogoSimple } from "../Logo/Logo"
import Nav from "../Nav/Nav"
import CartCount from "../CartCount/CartCount"
import styles from './Header.module.css'
import Container from "../Container/Container"
import cx from "classnames"
import Link from "next/link";
//import { useRecoilValue } from "recoil";
//import { cartState } from "store/cart"
import Image from "next/image"

export default function Header({isHome = false}) {

    return (
        <header className={styles.header}>
            <Container large>
            <div className={cx(styles.flexContainer, isHome && styles.flexContainerHeader)}>
                { !isHome &&
                <HeaderLogoSimple />
                }
                <Nav isHeader isHome={isHome}/>
                <Link href="/payments">
                <div className={styles.bag}>
                    <div className={styles.img}>
                        <Image
                            src="/items/bag.svg"
                            alt="shopping bag"
                            width={25}
                            height={25}
                        />
                    </div>
                    <CartCount />
                </div>
                </Link>
            </div>
            </Container>
        </header>
    )
}