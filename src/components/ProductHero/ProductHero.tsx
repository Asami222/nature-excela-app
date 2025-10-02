import Image from 'next/image'
import cx from "classnames"
import styles from './ProductHero.module.css'
import { libreCaslonDisplay } from "@/styles/fonts";
import { StaticImageData } from 'next/image';
import aboutTitle from '../../../public/about/aboutTitle.svg';

type Props = {
  background: StaticImageData;
  title?: string;
  subtitle: string;
  isAbout?: boolean;
  isNew?: boolean;
  white?: boolean;
}

export default function ProductHero({isAbout = false, isNew = false, background, title, subtitle, white = false}: Props) {
    return (
        <div className={cx(isNew ? styles.newContainer : styles.heroContainer)}>
          <Image
            src={background}
            alt={subtitle}
            fill
            priority
            placeholder="blur"
            blurDataURL={background.blurDataURL}
            style={{ objectFit: "cover", zIndex: 0}}
          />
          <div className={styles.heroTexts}>
            <h1 className={cx(isAbout ? styles.titleAbout : [libreCaslonDisplay.className, styles.title], white && styles.white)}>
                {isAbout && 
                <Image
                  src={aboutTitle}
                  alt='NATURE EXCELA'
                  width={541}
                  height={65}
                  sizes='(min-width: 1260px) 541px, (min-width: 768px) 45vw, 100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                /> 
                }
                {title}    
            </h1>
            <p className={cx(isAbout ? styles.subtitleAbout : styles.subtitle, white && styles.white)}>{subtitle}</p>
          </div>
        </div>
    )
}
