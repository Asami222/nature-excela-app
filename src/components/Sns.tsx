"use client";

import { useMediaQuery } from 'react-responsive'
import Image from "next/image";

const data = {
    default:[
        {
            id: "1",
            image: {
                url: "/items/x.svg",
                alt: "x",
                height: 27,
            },
        },
        {
            id: "2",
            image: {
                url: "/items/instagram.svg",
                alt: "instagram",
                height: 30,
            },
        },
    ],
    mobile:[
        {
            id: "1",
            image: {
                url: "/items/xHomeM.svg",
                alt: "x",
                height: 27,
            },
        },
        {
            id: "2",
            image: {
                url: "/items/instaHomeM.svg",
                alt: "instagram",
                height: 30,
            },
        },
    ],
}

export default function Sns({isHome = false}) {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    let isData;

    if(isHome && isMobile){
        isData = data.mobile;
    } else if(isHome) {
        isData = data.default;
    } else {
        isData = data.default;
    }

    return (  
        ( isData.map((sns) => (
            <div key={sns.id}>
                <a href="#">
                    <Image
                        src={sns.image.url}
                        alt={sns.image.alt}
                        width={30}
                        height={sns.image.height}
                        sizes='(min-width: 1260px) 30px, (min-width: 768px) 3vw, 100vw'
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </a>
            </div>
        )))  
    )
}