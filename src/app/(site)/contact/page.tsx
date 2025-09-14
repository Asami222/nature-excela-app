
import { createMetadata } from "@/lib/metadata";
import Link from "next/link"
import Accordion from "@/components/Accordion/Accordion"
import styles from './page.module.css'
import Form from "@/components/Form/Form"

export const metadata = createMetadata({
  title: "お問い合わせ",
  description: "ご質問、ご意見など受け付けております。",
  path: "/contact",
});

export default function Contact() {
    return(
        <div className={styles.wrapper}>
            <h1>CONTACT</h1>
            <p>当サイトをご覧になっていただきありがとうございます。NATURE EXCELAは日本での販売を開始し、より日本の皆様に喜んでいただけるような商品開発を目指して日々研究しております。そのため多くのお客様のご意見、ご要望を歓迎しております。ご質問も受け付けております。</p>
            <div className={styles.accordion}>
              <h3>よくあるご質問</h3>
              <Accordion heading="キャンペーンやイベントなどの情報はどこで掲載されていますか？">
                <p>“Instagram”や“x”などで事前に告知しております。</p>
              </Accordion>
              <Accordion heading="本社の所在地はどこですか？">
                <p>
                  コスタリカ共和国の首都サンホセ市に所在します。詳しくは<Link href="/commercial" className={styles.link}>特定商取引法に基づく表記</Link>の所在地をご覧ください。
                </p>
              </Accordion>
              <Accordion heading="ネット販売のみですか、実店舗はありませんか？">
                <p>現在実店舗はございません。ネット販売のみとなっております。</p>
              </Accordion>
            </div>
            <div className={styles.contact}>
              <h2>お問い合わせフォーム</h2>
              <Form />
            </div>
        </div>
            
    )
}