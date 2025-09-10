import styles from './PostBody.module.css'

export default function PostBody({ children }:{ children: React.ReactNode;}) {
    return (
        <div className={styles.stack}>
            {children}
        </div>
    )
}