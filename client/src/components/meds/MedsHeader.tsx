import styles from "../../css/meds/MedsHeader.module.scss";
import { format } from "date-fns";

const getTodaysDate = () => {
	const now = new Date();
	const today = format(now, "EEE, MMM do");

	return today;
};

const Titles = () => {
	const today = getTodaysDate();
	return (
		<div className={styles.MedsHeader_main_titles}>
			<div className={styles.MedsHeader_main_titles_today}>{today}</div>
			<h2 className={styles.MedsHeader_main_titles_label}>Medications</h2>
		</div>
	);
};

const MedsHeader = () => {
	return (
		<div className={styles.MedsHeader}>
			<div className={styles.MedsHeader_main}>
				<Titles />
			</div>
		</div>
	);
};

export default MedsHeader;
