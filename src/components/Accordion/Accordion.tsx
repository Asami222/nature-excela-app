"use client";

import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './Accordion.module.css'

type Props = {
  heading: string;
  children: React.ReactNode;
}

export default function Accordion({heading, children}: Props) {

    const [ textIsOpen, setTextIsOpen] = useState(false)

    const toggleText = () => {
        setTextIsOpen((prev) => !prev)
    }

    const refText = useRef<HTMLDivElement>(null)

    return (
        <div className={textIsOpen ? styles.open : styles.close}>
            <h4 className={styles.heading}>
                <button onClick={toggleText} aria-expanded={textIsOpen} aria-controls={`accordion-content-${heading}`}>
                    {heading}
                    <div className={styles.arrow}>
                        <Image
                            src="/items/contact/arrow.svg"
                            alt="open"
                            fill
                            sizes='(min-width: 700px) 15px, 2.1vw'
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </button>
            </h4>
            <div 
                id={`accordion-content-${heading}`}
                role="region"
                className={styles.text} 
                ref={refText} 
                style={{'--text-height': refText.current ? `${refText.current.scrollHeight}px` : '0px',} as React.CSSProperties}
            >
                <div className={styles.textInner}>{children}</div>
            </div>
        </div>
    )
}