import styles from "../../css/dashboard/ActivityCard.module.scss";
import { iconsMap } from "../../utils/utils_icons";
import DetailsCard from "../layout/DetailsCard";

type Props = {
	title: string;
	color: string;
	icon: keyof typeof iconsMap;
};

const ActivityCard = ({ title, icon, color }: Props) => {
	return (
		<DetailsCard title={title} icon={icon} color={color}>
			<div className={styles.ActivityCard}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</DetailsCard>
	);
};

export default ActivityCard;
