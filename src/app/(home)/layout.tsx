import Header from "@/components/Header/Header";
import HomeHero from "@/components/HomeHero/Home.Hero";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <div className={styles.headContainer}>
          <Header isHome />
          <HomeHero/>
        </div>
        <main className={styles.mainContainer}>{children}</main>
        <Footer isHome />
      </>
  );
}