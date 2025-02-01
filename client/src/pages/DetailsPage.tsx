import React from "react";
import styles from "../css/pages/DetailsPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import NavArrows from "../components/layout/NavArrows";

type Props = {};

const DetailsPage = ({}: Props) => {
	return (
		<PageContainer>
			<div className={styles.DetailsPage}>
				<NavArrows />
				<h2>Details</h2>
			</div>
		</PageContainer>
	);
};

export default DetailsPage;
