import ProductColumn from "../ProductColumn/ProductColumn"
import ProductMenu from "../ProductMenu/ProductMenu"
import Container from "../Container/Container"
import styles from './ProductMain.module.css'
import cx from "classnames"

type LinkProps = { type: "link"; name: string; link: string; exist?: "on" };

type Props = {
  items: LinkProps[];
};

export default function ProductMain({items}: Props) {
    return (
        <main className={styles.wrapper}>
            <Container>
                <div className={cx(["sideBySide", styles.container], styles.containerHeader)}>
                    <ProductColumn />
                    <ProductMenu items={items}/>
                </div>
            </Container>
        </main>
    )
}

