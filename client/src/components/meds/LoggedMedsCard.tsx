import React, { ReactNode } from "react";
import styles from "../../css/meds/LoggedMedsCard.module.scss";
import DetailsCard from "../layout/DetailsCard";

type Props = { children: ReactNode };

const LoggedMedsCard = ({ children }: Props) => {
	const count = 1.25;
	return (
		<DetailsCard icon="pill" title="Today's Doses">
			<div className={styles.LoggedMedsCard}>
				<div className={styles.LoggedMedsCard_title}>
					You've taken <b>{count}</b> pills today
				</div>
				<div className={styles.LoggedMedsCard_main}>{children}</div>
				{/*  */}
				{/*  */}
			</div>
		</DetailsCard>
	);
};

export default LoggedMedsCard;
