
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/logo.module.css'
import { useMediaQuery } from 'react-responsive'


export function HeaderLogoSimple() {
    return (
        <div className={styles.logoSimple}>
            <Link href="/">
                    <Image
                        src="/logo/headerLogo.svg"
                        alt="Nature Excela"
                        layout="fixed"
                        width={55}
                        height={29}
                        sizes='(min-width: 1320px) 1320px, 100vw'
                    />
            </Link>
        </div>
    )
}

export function FooterLogo({isHome = false}) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    
    return (
        <div className={styles.footerLogo}>
            <Link href="/">
                { isHome ?
                    ( isMobile ?
                        <Image
                            src="/home/LogoHomeM.svg"
                            alt="Nature Excela"
                            layout="responsive"
                            width={250}
                            height={41}
                            sizes='(min-width: 768px) 250px, 50vw'
                        />
                        :
                        <Image
                        src="/home/LogoFooter.svg"
                        alt="Nature Excela"
                        layout="responsive"
                        width={347}
                        height={50}
                        sizes='(min-width: 1260px) 347px, (min-width: 768px) 33vw, 50vw'
                        />
                    )
                    :
                    <Image
                        src="/home/LogoFooter.svg"
                        alt="Nature Excela"
                        layout="responsive"
                        width={347}
                        height={50}
                        sizes='(min-width: 1260px) 347px, (min-width: 768px) 33vw, 50vw'
                    />
                } 
            </Link>
        </div>
    )
}