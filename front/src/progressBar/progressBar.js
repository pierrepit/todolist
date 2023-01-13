import styles from './progressBar.module.css';

export default function ProgressBar({ barProgressValue = 0 }) {
	return (
		<div className={styles.container}>
			<div className={styles.static}>
				<div className={styles.dynamic} style={{ width: barProgressValue + '%', opacity: barProgressValue + '%' }} />
			</div>
			{barProgressValue + '%'}
		</div>
	);
}
