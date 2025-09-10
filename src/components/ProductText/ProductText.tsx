import { libreCaslonDisplay } from '@/styles/fonts';
import styles from './ProductText.module.css'
import ProfilePanel from '../ProfilePanel/ProfilePanel';

type Props = {
  title: string;
  text?: string;
  profile?: boolean;
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function ProductText({title, text, profile=false, user}: Props) {

    return (
        <div className={styles.container}>
            <h1 className={libreCaslonDisplay.className}>{title}</h1>
            { profile ? (
                <ProfilePanel
                    imageUrl={user?.image}
                    name={user?.name || ""}
                />
            ):(
                <p>{text}</p>
            )}
        </div>
    )
}