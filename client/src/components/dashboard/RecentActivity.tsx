import styles from "../../css/dashboard/RecentActivity.module.scss";
import { iconsMap } from "../../utils/utils_icons";
import { NavLink } from "react-router";
import { Activity } from "../../features/activity/types";
import { isSunday } from "date-fns";
import { WeeklyMinsByDate } from "../../features/dashboard/types";
import DetailsCard from "../layout/DetailsCard";
import NoDataFound from "../layout/NoDataFound";
import RecentMinsForWeek from "./RecentMinsForWeek";

type Props = {
	title: string;
	icon?: keyof typeof iconsMap;
	activityData: WeeklyMinsByDate[];
};

const getDetailsUrl = (type: Activity, date: string) => {
	const basePath =
		"/recent?" +
		new URLSearchParams({
			type: "steps",
			date: date,
		});

	return basePath;
};

const isNewWeek = (data: WeeklyMinsByDate[]) => {
	const now = new Date();
	const hasNoData = data.filter((x) => x?.mins !== 0);
	const isTodaySunday = isSunday(now);

	return isTodaySunday && hasNoData?.length <= 0;
};

const RecentActivity = ({
	title = "Recent Mins.",
	icon = "recentActivity",
	activityData = [],
}: Props) => {
	const isWeekStart: boolean = isNewWeek(activityData);
	// based off activity type & date
	const detailsUrl: string = getDetailsUrl("Walk", new Date().toString());

	return (
		<div className={styles.RecentActivity}>
			<header className={styles.RecentActivity_header}>
				<h4>Recent Activity</h4>
				<NavLink to={detailsUrl} className={styles.RecentActivity_header_btn}>
					Show All
				</NavLink>
			</header>
			<div className={styles.RecentActivity_card}>
				<DetailsCard
					to="details"
					title={title}
					icon={icon}
					color="var(--accent-blue)"
				>
					{isWeekStart && (
						<NoDataFound title="It's a new week!" icon="calendar" />
					)}
					{!isWeekStart && <RecentMinsForWeek recentMins={activityData} />}
				</DetailsCard>
			</div>
		</div>
	);
};

export default RecentActivity;
