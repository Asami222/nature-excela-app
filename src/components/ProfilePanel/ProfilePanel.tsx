import Image from "next/image";
import styles from "./ProfilePanel.module.css"

type Props = {
  imageUrl?: string | null;
  name: string;
};

export default function ProfilePanel({
  imageUrl,
  name,
}: Props) {
  return (
    <div className={styles.module}>
      <div className={styles.photo}>
        <Image
          src={imageUrl || "/items/account.svg"}
          width={98}
          height={98}
          alt={name || ""}
        />
      </div>
        <div className={styles.text}>
          <h2>{name}</h2>
        </div>
    </div>
  );
}