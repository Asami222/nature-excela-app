import Header from "@/components/Header/Header";
import HomeHero from "@/components/HomeHero/Home.Hero";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css";
import face from 'public/home/face.webp'
import faceMobile from 'public/home/faceMobile.webp'
import logo from 'public/home/topLogo.svg'
import logoMobile from 'public/home/topLogoMobile.svg'


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <div className={styles.headContainer}>
          <Header isHome />
          <HomeHero face={face} faceMobile={faceMobile} logo={logo} logoMobile={logoMobile}/>
        </div>
        <main className={styles.mainContainer}>{children}</main>
        <Footer isHome />
      </>
  );
}