import styles from "../../css/user/HealthProfile.module.scss";
import { CurrentUser } from "../../features/user/types";

type Props = {
	currentUser: CurrentUser;
	healthProfile: UserHealthProfile;
};

interface UserHealthProfile {
	profileID: number;
	userID: string;
	age: number;
	heightInInches: number;
	weightInLbs: number;
	strideLength: number;
	isActive: boolean;
	createdDate: string;
}

const HealthProfile = ({ currentUser, healthProfile }: Props) => {
	return (
		<div className={styles.HealthProfile}>
			<div className={styles.HealthProfile_item}>Age: 37</div>
			<div className={styles.HealthProfile_item}>Height: 5'8"</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HealthProfile;
