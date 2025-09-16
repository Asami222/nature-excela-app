
import Link from "next/link";
import Image from "next/image";
import styles from './Logo.module.css'
//import { useMediaQuery } from 'react-responsive'


export function HeaderLogoSimple() {
    return (
        <div className={styles.logoSimple}>
            <Link href="/">
                    <Image
                        src="/logo/headerLogo.svg"
                        alt="Nature Excela"
                        width={55}
                        height={29}
                        sizes='(min-width: 1320px) 1320px, 100vw'
                    />
            </Link>
        </div>
    )
}

export function FooterLogo({isHome = false}) {
    
    return (
            <Link href="/" className={styles.footerLogo}>
                { isHome ?
                    <>
                        {/* モバイル用 */}
                        <Image
                            src="/home/LogoHomeM.svg"
                            alt="Nature Excela"
                            fill
                            sizes="(max-width: 768px) 50vw, 0vw"
                            className={styles.footerLogoMobile}
                            priority
                        />
                        {/* PC用 */}
                        <Image
                        src="/home/LogoFooter.svg"
                        alt="Nature Excela"
                        fill
                        sizes='(min-width: 1260px) 347px, (max-width: 768px) 0vw, 50vw'
                        className={styles.footerLogoPc}
                        priority
                        />
                    </>
                    :
                    <Image
                        src="/home/LogoFooter.svg"
                        alt="Nature Excela"
                        fill
                        sizes='(min-width: 1260px) 347px, (min-width: 768px) 33vw, 50vw'
                        priority
                    />
                } 
            </Link>
    )
}