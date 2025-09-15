// components/ProfileMenu.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { signOut, useSession } from "next-auth/react";
import styles from "./MemberMenu.module.css"; 


export default function MemberMenu() {

  const { data: session, status } = useSession();

  // Skeleton表示フラグ
  const loading = status === "loading";

  const imageSrc = session?.user?.image;
  
  if (loading) {
    // 読み込み中は丸いスケルトンを表示
    return (
      <div className={styles.img}>
        <div className={styles.skeleton}></div>
      </div>
    );
  }

  if (!session) {
    // 未ログイン → プロフィールアイコンをクリックしたら /login に飛ばすだけ
    return (
      <Link href="/member">
          <div className={styles.globals}>
            <div className={styles.img}>
              <Image
                  src="/items/account.svg"
                  alt="account"
                  fill
                  sizes='25px'
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: '50%'
                  }}
                />
            </div>
          </div>
      </Link>
    );
  }
  // ログイン済みユーザー
  return (
    <Menu as="div" className={styles.menu}>
      <MenuButton className={styles.profileButton}>
        <div className={styles.globals}>
          <div className={styles.img}>
            <Image
              src={imageSrc ?? "/items/noImg.jpg"}
              alt="account"
              fill
              sizes='25px'
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </MenuButton>
      <MenuItems className={styles.items}>
        
        <MenuItem>
          {({ focus }) => (
            <a
              href="/member"
              className={`${styles.item} ${focus ? styles.active : ""}`}
            >
              マイページ
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className={`${styles.item} ${focus ? styles.active : ""}`}
            >
              ログアウト
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}