import styles from "../../css/dashboard/RecentActivity.module.scss";
import sprite from "../../assets/icons/main.svg";
import { iconsMap } from "../../utils/utils_icons";
import DetailsCard from "../layout/DetailsCard";

type Props = {
	title: string;
	icon: keyof typeof iconsMap;
};

const NoData = () => {
	return (
		<div className="NoData">
			<svg className="NoData_icon">
				<use xlinkHref={`${sprite}#icon-`}></use>
			</svg>
		</div>
	);
};

const RecentActivity = ({
	title = "Recent Steps",
	icon = "recentActivity",
}: Props) => {
	return (
		<div className={styles.RecentActivity}>
			<header className={styles.RecentActivity_header}>
				<h4>Recent Activity</h4>
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
