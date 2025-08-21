import styles from 'styles/container.module.css'

interface ContainerProps {
  children: React.ReactNode;
  large: boolean
}

export default function Container({ children, large = false }: ContainerProps) {
    return (
        <div className={large ? styles.large : styles.default}>
            {children}
        </div>
    )
}