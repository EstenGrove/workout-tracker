import styles from "../../css/activity/ActivityTotal.module.scss";

type Props = {
	total: string | number;
	label: string | number;
};

const ActivityTotal = ({ total, label = "" }: Props) => {
	return (
		<div className={styles.ActivityTotal}>
			<span className={styles.ActivityTotal_value}>{total}</span>
			<span className={styles.ActivityTotal_label}>{label}</span>
		</div>
	);
};

export default ActivityTotal;
