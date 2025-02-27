import { NavLink } from "react-router";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/workouts/WorkoutsWeekHeader.module.scss";
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
		<div className={styles.WorkoutsWeekHeader_main_titles}>
			<div className={styles.WorkoutsWeekHeader_main_titles_today}>{today}</div>
			<h2 className={styles.WorkoutsWeekHeader_main_titles_label}>Workouts</h2>
		</div>
	);
};

const SettingsButton = () => {
	return (
		<NavLink to="settings" className={styles.MedSettings}>
			<svg className={styles.MedSettings_icon}>
				<use xlinkHref={`${sprite}#icon-settings`}></use>
			</svg>
		</NavLink>
	);
};

const WorkoutsWeekHeader = ({ selectedDate = new Date() }: Props) => {
	return (
		<div className={styles.WorkoutsWeekHeader}>
			<div className={styles.WorkoutsWeekHeader_main}>
				<Titles selectedDate={selectedDate} />
				<div className={styles.WorkoutsWeekHeader_main_right}>
					<SettingsButton />
				</div>
			</div>
		</div>
	);
};

export default WorkoutsWeekHeader;
