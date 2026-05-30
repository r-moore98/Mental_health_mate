import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "@/store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// Clear login errors when the component first loads
	useEffect(() => {
		if (actions.setStore) {
			actions.setStore({ login_error: null });
		}
	}, []);

	const handleClick = async (e) => {
		e.preventDefault();

		// Wait for the login operation to fully complete
		const success = await actions.login(email, password);

		// Use the functional return value or verify token state to safely navigate
		if (success || store.token) {
			navigate('./mainpage');
		}
	};

	return (
		<div className="loginCont">
			<h1 className="title">Welcome to <u>Mental Health Mate</u>!</h1>
			<h2 className="subtitle">We are here to connect you to other people to help with mental health</h2>
			<h2 className="subtitle">If you would like to connect with other people, you can login, and if you don't have an account, you can make one below</h2>

			<form className="loginForm" onSubmit={handleClick}>
				<div className="loginFormContent">
					<h1>Login</h1>

					<div className="input-field">
						<input
							className="myInput"
							type="text"
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="input-field">
						<input
							className="myInput"
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{/* DYNAMIC ERROR WARNING SYSTEM */}
					{store.login_error && (
						<div style={{
							backgroundColor: "#f8d7da",
							color: "#842029",
							border: "1px solid #f5c2c7",
							padding: "10px",
							borderRadius: "4px",
							fontSize: "14px",
							textAlign: "center",
							marginTop: "15px",
							marginBottom: "-5px"
						}}>
							{store.login_error}
						</div>
					)}
				</div>

				<div className="loginFormAction">
					{/* Changed button to use natural form submission behavior */}
					<button type="submit" className="formBtn regBtn">Login</button>
				</div>

				<Link to="./signup">Click to sign up</Link>
			</form>
		</div>
	);
};
