import sprite from "../../assets/icons/main.svg";
import styles from "../../css/layout/NoDataFound.module.scss";

type Props = {
	title: string;
	icon?: string;
};

const NoDataFound = ({
	title = "No data found.",
	icon = "empty-box-2",
}: Props) => {
	return (
		<div className={styles.NoDataFound}>
			<svg className={styles.NoDataFound_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
			<div className={styles.NoDataFound_title}>{title}</div>
		</div>
	);
};

export default NoDataFound;
