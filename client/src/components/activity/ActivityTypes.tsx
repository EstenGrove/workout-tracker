import styles from "../../css/activity/ActivityTypes.module.scss";
import { Activity } from "../../features/activity/types";
import { ACTIVITIES as defaultActivities } from "../../utils/utils_activity";
import ActivityType from "./ActivityType";

type ActivityProps = {
	selectActivity?: (type: Activity) => void;
	activities?: Activity[];
};
const ActivityTypes = ({
	selectActivity,
	activities = defaultActivities,
}: ActivityProps) => {
	const handleSelect = (type: Activity) => {
		return selectActivity && selectActivity(type);
	};

	return (
		<div className={styles.ActivityTypes}>
			{activities &&
				activities.map((type, idx) => (
					<div key={idx} className={styles.ActivityTypes_type}>
						<ActivityType
							key={type + idx}
							type={type}
							onClick={() => handleSelect(type)}
						/>
						<span>{type}</span>
					</div>
				))}
		</div>
	);
};

export default ActivityTypes;
