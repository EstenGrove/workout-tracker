import { ChangeEvent, useState } from "react";
import styles from "../css/pages/LoginPage.module.scss";

const LoginPage = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
		rememberMe: false,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setValues({
			...values,
			[name]: checked,
		});
	};

	const handleLogin = () => {
		// do stuff
	};

	return (
		<div className={styles.LoginPage}>
			<div className={styles.LoginPage_title}>
				<h1>Login/Signup</h1>
			</div>
			<form className={styles.LoginPage_form}>
				<div className={styles.LoginPage_form_field}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						value={values.username}
						onChange={handleChange}
						className={styles.LoginPage_form_field_input}
					/>
				</div>
				<div className={styles.LoginPage_form_field}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={values.password}
						onChange={handleChange}
						className={styles.LoginPage_form_field_input}
					/>
				</div>
			</form>
			<div className={styles.LoginPage_login}>
				<button
					type="button"
					onClick={handleLogin}
					className={styles.LoginPage_login_btn}
				>
					Login
				</button>
			</div>
			<div className={styles.LoginPage_alts}>
				{/* ALT SIGN-IN: GOOGLE ETC. */}
				{/* ALT SIGN-IN: GOOGLE ETC. */}
				{/* ALT SIGN-IN: GOOGLE ETC. */}
			</div>
		</div>
	);
};

export default LoginPage;
