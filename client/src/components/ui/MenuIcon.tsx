import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/ui/MenuIcon.module.scss";

type Props = {
	openMenu: () => void;
};

const MenuIcon = ({ openMenu }: Props) => {
	return (
		<div onClick={openMenu} className={styles.MenuIcon}>
			<svg className={styles.MenuIcon_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_control`}></use>
			</svg>
		</div>
	);
};

export default MenuIcon;
