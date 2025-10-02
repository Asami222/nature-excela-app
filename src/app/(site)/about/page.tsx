import { createMetadata } from "@/lib/metadata";
import Image from 'next/image'
import styles from './page.module.css'
import Container from '@/components/Container/Container';
import PostBody from '@/components/PostBody/PostBody';
import ProductHero from '@/components/ProductHero/ProductHero';
import cx from "classnames";
import aboutImg from '../../../../public/hero/about.webp';

const data = {
    contents: [
        {
            id: "1",
            image: {
                url: "/about/facility.png",
                alt: "研究施設",
                width: 220,
                height: 400,
            },
            text: "自然界で見つけたナチュラルな力。それを毎日身につける化粧品にも取り入れたい。そういう思いから生まれた NATURE EXCELA。研究チームを立ち上げてから5年。ついに誕生した究極に自然的な化粧品。身につけた人だけに分かる軽さと自然さ。不要なものを一切排除したシンプルなテクスチャー。日々実感できる本来の肌に戻っていく感覚。ぜひお試しください。",
        },
        {
            id: "2",
            image: {
                url: "/about/ceo.jpg",
                alt: "ceo マーガレット・ウェンディ",
                width: 220,
                height: 326,
            },
            post: "CEO",
            title: "マーガレット・ウェンディ",
            text: "私の故郷コスタリカでは古くから女性たちは家のすぐ近くに密生する植物を使い自分たちで化粧品を作ってきました。もちろん天然成分なので体に良くしかも全て無料なのです。ですから私はなぜ多くの女性は高価でしかも体に良くない成分を扱った化粧品を買うのだろうと最初は思いました。給料の多くの部分を化粧品に使い、旅行などの自分の楽しみに使うお金に回せないなんて私はおかしいと常々感じていました。私の思いは自然はそのままで特別だということです。そして自然であることは美しいこと。この思いとともにNATURE EXCELLAは立ち上がりました。私は本を読むことが大好きで年間多くの本を読みます。多くの女性が自らの楽しみを制限なくできることをいつも望んでいます。",
        },
    ],
};

export const metadata = createMetadata({
    title: "私たちについて",
    description: "私たちの会社についての紹介ページです。",
    path: "/about",
});

export default function About() {
    
    return (
        <>
            <ProductHero background={aboutImg} subtitle="私たちについて" isAbout/>
            <div className={styles.wrapper}>
                <Container>
                <PostBody>
                    <section className={styles.aboutSection}>
                        <h2>健やかな肌とは何か。本来あるべき肌の姿とは・・・</h2>
                        {data.contents.map((about) => (
                        <div key={about.id} className={cx(styles.mainFlex,about.post ? ["sideBySide", styles.fig2] : ["sideBySideCenter", styles.fig1])}>  
                            <div className={styles.mainImage}>
                                <Image
                                    src={about.image.url}
                                    alt={about.image.alt}
                                    width={about.image.width}
                                    height={about.image.height}
                                />
                            </div>
                            <div>
                                {about.title && <h3><span>{about.post}</span>{about.title}</h3>}
                                <p>{about.text}</p>
                            </div> 
                        </div>
                        ))}
                    </section>
                    <section className={styles.companySection}>
                        <h3>企業情報</h3>
                        <dl className={styles.companyContainer}>
                            <dt>商号</dt>
                            <dd>NATURE EXCELA, Limited</dd>
                        </dl>
                        <dl className={styles.companyContainer}>
                            <dt>東京支社</dt>
                            <dd>〒104-0087<br/>東京都中央区銀座2-5-8<br/>TEL 03-2857-0012（代表）</dd>
                        </dl>
                        <dl className={styles.companyContainer}>
                            <dt>創業</dt>
                            <dd>2021年</dd>
                        </dl>
                        <dl className={styles.companyContainer}>
                            <dt>CEO</dt>
                            <dd>マーガレット・ウェンディ</dd>
                        </dl>
                    </section>    
                </PostBody>
                </Container>
            </div>
        </>
    )
}