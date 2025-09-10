import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}