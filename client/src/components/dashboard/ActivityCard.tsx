import { ReactNode } from "react";
import styles from "../../css/dashboard/ActivityCard.module.scss";
import { iconsMap } from "../../utils/utils_icons";
import DetailsCard from "../layout/DetailsCard";

type Props = {
	title: string;
	color: string;
	icon: keyof typeof iconsMap;
	children?: ReactNode;
};

const ActivityCard = ({ title, icon, color, children }: Props) => {
	return (
		<DetailsCard title={title} icon={icon} color={color}>
			<div className={styles.ActivityCard}>{children}</div>
		</DetailsCard>
	);
};

export default ActivityCard;
