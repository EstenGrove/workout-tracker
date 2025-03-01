import { WorkoutHistory } from "../../features/history/types";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/history/WorkoutHistoryList.module.scss";
import WorkoutHistoryLog from "./WorkoutHistoryLog";

type Props = {
	entries: WorkoutHistory[];
};

const NoHistoryFound = () => {
	return (
		<div className={styles.NoHistoryFound}>
			<svg className={styles.NoHistoryFound_icon}>
				<use xlinkHref={`${sprite}#icon-empty-box-2`}></use>
			</svg>
			<div className={styles.NoHistoryFound_title}>No history found.</div>
		</div>
	);
};
const WorkoutHistoryList = ({ entries }: Props) => {
	const noHistory = !entries || !entries.length;
	return (
		<div className={styles.WorkoutHistoryList}>
			{noHistory && <NoHistoryFound />}
			{entries &&
				entries.map((entry, idx) => (
					<WorkoutHistoryLog key={entry.historyID + idx} entry={entry} />
				))}
		</div>
	);
};

export default WorkoutHistoryList;
