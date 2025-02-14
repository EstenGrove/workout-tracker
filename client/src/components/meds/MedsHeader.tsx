import styles from "../../css/meds/MedsHeader.module.scss";
import { format, isValid } from "date-fns";

type Props = {
	selectedDate: Date | string;
};

// Returns: 'Fri, Feb 7th
const getTodaysDate = (selectedDate: Date | string = new Date()) => {
	if (!selectedDate || !isValid(selectedDate)) {
		const now = new Date();
		const today = format(now, "EEE, MMM do");

		return today;
	} else {
		const thisDate = format(selectedDate, "EEE, MMM do");
		return thisDate;
	}
};

const Titles = ({ selectedDate = new Date() }: Props) => {
	const today: string = getTodaysDate(selectedDate);
	return (
		<div className={styles.MedsHeader_main_titles}>
			<div className={styles.MedsHeader_main_titles_today}>{today}</div>
			<h2 className={styles.MedsHeader_main_titles_label}>Medications</h2>
		</div>
	);
};

const MedsHeader = ({ selectedDate = new Date() }: Props) => {
	return (
		<div className={styles.MedsHeader}>
			<div className={styles.MedsHeader_main}>
				<Titles selectedDate={selectedDate} />
			</div>
		</div>
	);
};

export default MedsHeader;
