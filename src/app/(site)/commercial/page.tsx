import { createMetadata } from "@/lib/metadata";
import Container from "@/components/Container/Container";
import TermBody from "@/components/TermBody/TermBody";

export const metadata = createMetadata({
    title: "特定商取引法に基づく表記",
    description: "特定商取引法に基づく表記ついてのページです。",
    path: "/commercial",
});

export default function Commercial() {
    return (
            <Container>
                <TermBody>
                    <h1>特定商取引法に基づく表記</h1>
                    <section>
                        <h2>販売業者</h2>
                        <hr/>
                        <p>NATURE EXCELA Co., Ltd.</p>
                    </section>
                    <section>
                        <h2>代表責任者</h2>
                        <hr/>
                        <p>CEO マーガレット・ウェンディ</p>
                    </section>
                    <section>
                        <h2>所在地</h2>
                        <hr/>
                        <p>Saluna La Vilan, Costa 1, Derang Toa, San José, Costa Rica</p>
                    </section>
                    <section>
                        <h2>電話番号</h2>
                        <hr/>
                        <p>+507 6214-3787 </p>
                    </section>
                    <section>
                        <h2>電話受付時間</h2>
                        <hr/>
                        <p>受付時間 12:00-19:00（土日祝を除く）</p>
                    </section>
                    <section>
                        <h2>商品の販売価格</h2>
                        <hr/>
                        <p>該当項にて記載</p>
                    </section>
                    <section>
                        <h2>商品代金以外に必要な料金</h2>
                        <hr/>
                        <dl>
                            <dt>配送料</dt>
                            <dd>各配送に全国一律税込550円の送料がかかります。（税込4,000円以上のご購入で送料無料となります。）</dd>
                            <dt>手数料</dt>
                            <dd>コンビニ決済：220円、代引き：315円</dd>
                        </dl>
                    </section>
                    <section>
                        <h2>支払い方法</h2>
                        <hr/>
                        <p>クレジットカード決済・コンビニ決済・代引き</p>
                        <ul><li>クレジットカード決済：商品注文時にお支払いが確定します。</li></ul>
                    </section>
                    <section>
                        <h2>支払い時期</h2>
                        <hr/>
                        <ul>
                            <li>コンビニ決済：注文後10日以内にお支払いください。</li>
                            <li>代引き：商品到着時、配達員の方へ現金でお支払いください。</li>
                        </ul>
                    </section>
                    <section>
                        <h2>商品の引渡時期</h2>
                        <hr/>
                        <p>ご注文日から3営業日以内に発送いたします。</p>
                    </section>
                    <section>
                        <h2>返品・交換</h2>
                        <hr/>
                        <p>商品到着後10日以内に限り返品・交換が可能です。</p>
                    </section>
                    <section>
                        <h2>返品送料</h2>
                        <hr/>
                        <p>商品に欠陥がある場合には当方負担、お客様のご都合による返品・交換の場合にはお客様負担となります。</p>
                    </section>
                </TermBody>
            </Container>
    )
}