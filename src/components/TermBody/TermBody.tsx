import styles from './TermBody.module.css'

export default function TermBody({ children }: { children: React.ReactNode;}) {
    return (
        <main className={styles.stack}>
            {children}
        </main>
    )
}