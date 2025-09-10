import styles from './ProductColumn.module.css'

export default function ProductColumn() {
    return (
        <div className={styles.container}>
            <div className={styles.circle}>
                <svg width="clamp(18.875rem, 15.674rem + 13.66vw, 27.625rem)" height="clamp(13.563rem, 10.704rem + 12.2vw, 21.375rem)" stroke="#171313" strokeWidth="1px" fill="none">
                    <rect x="1" y="1" width="clamp(18.75rem, 15.549rem + 13.66vw, 27.5rem)" height="clamp(13.438rem, 10.579rem + 12.2vw, 21.25rem)" stroke='#171313' rx="clamp(7.5rem, 6.357rem + 4.88vw, 10.625rem)" ry="clamp(7.5rem, 6.357rem + 4.88vw, 10.625rem)" strokeDasharray="10 10"/>
                </svg>
            </div>
            <div className={styles.text}>
                <p>
                    いつか誰かが言っていた<br />
                    深い海と森の話。
                </p>
                <p>
                    眠り続けている誰も知らない<br />
                    生命の源の話。
                </p>
                <p>
                    大きな自然の見えない<br />場所の話。
                </p>
            </div>
        </div>
    )
}