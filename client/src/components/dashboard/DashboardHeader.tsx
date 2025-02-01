import styles from "../../css/dashboard/DashboardHeader.module.scss";
import { format } from "date-fns";

interface CurrentUser {
	userID: string;
	username: string;
	firstName: string;
	lastName: string;
	userAvatar: string | null;
}

type Props = {
	currentUser: CurrentUser;
};

const UserBadge = ({ currentUser }: { currentUser: CurrentUser }) => {
	const initials =
		currentUser.firstName.slice(0, 1) + currentUser.lastName.slice(0, 1);
	return (
		<div className={styles.UserBadge}>
			<div>{initials}</div>
		</div>
	);
};

const getTodaysDate = () => {
	const now = new Date();
	const today = format(now, "EEE, MMM do");

	return today;
};

const Titles = () => {
	const today = getTodaysDate();
	return (
		<div className={styles.DashboardHeader_main_titles}>
			<div className={styles.DashboardHeader_main_titles_today}>{today}</div>
			<h2 className={styles.DashboardHeader_main_titles_label}>Dashboard</h2>
		</div>
	);
};

const DashboardHeader = ({ currentUser }: Props) => {
	return (
		<div className={styles.DashboardHeader}>
			<div className={styles.DashboardHeader_main}>
				<Titles />
				<div className={styles.DashboardHeader_main_user}>
					<UserBadge currentUser={currentUser} />
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
