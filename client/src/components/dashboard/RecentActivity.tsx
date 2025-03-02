import styles from "../../css/dashboard/RecentActivity.module.scss";
import sprite from "../../assets/icons/main.svg";
import { iconsMap } from "../../utils/utils_icons";
import DetailsCard from "../layout/DetailsCard";
import { NavLink } from "react-router";
import { Activity } from "../../features/activity/types";

type Props = {
	title: string;
	icon: keyof typeof iconsMap;
	activityData: object;
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

const RecentActivity = ({
	title = "Recent Mins.",
	icon = "recentActivity",
	activityData = {},
}: Props) => {
	// based off activity type & date
	const detailsUrl = getDetailsUrl("Walk", new Date().toString());

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
					{/* SOME UI HERE */}
					{/* SOME UI HERE */}
				</DetailsCard>
			</div>
		</div>
	);
};

export default RecentActivity;
