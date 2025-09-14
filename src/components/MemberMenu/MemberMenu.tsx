// components/ProfileMenu.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { signOut } from "next-auth/react";
import styles from "./MemberMenu.module.css"; // CSS Modules
import { Session } from 'next-auth';
//import { useSession } from "next-auth/react";

type MemberMenuProps = {
  session: Session | null
};

export default function MemberMenu({ session }: MemberMenuProps) {

  const imageSrc = session?.user?.image ?? "/items/noImg.jpg";

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

  return (
    <Menu as="div" className={styles.menu}>
      <MenuButton className={styles.profileButton}>
        <div className={styles.globals}>
          <div className={styles.img}>
            <Image
              src={imageSrc}
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