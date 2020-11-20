import axios from "axios";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Authentication } from "./Authentication";

function Login() {
	const { authenticated, setAuthenticated } = useContext(Authentication);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		axios
			.post("/login", { username: email, password: password })
			.then((res) => {
				setAuthenticated(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	if (authenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="container text-center mt-5">
			<form className="form-signin " onSubmit={handleSubmit}>
				<h1 className="h3 mb-5 font-weight-bold">Please sign in</h1>
				<label htmlFor="inputEmail" className="sr-only">
					Email address
				</label>
				<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Email address"
					required
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					autoFocus
				/>
				<label htmlFor="inputPassword" className="sr-only">
					Password
				</label>
				<input
					type="password"
					id="inputPassword"
					className="form-control"
					placeholder="Password"
					required
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>

				<button className="btn btn-lg btn-warning btn-block" type="submit">
					Sign in
				</button>
			</form>

			<footer className="footer mt-auto py-3">
				<div className="container text-center sticky-bottom mb-4 mt-5">
					<span className="text-muted">
						&copy; Made By Musfique Ahsan Nishad
					</span>
				</div>
			</footer>
		</div>
	);
}

export default Login;
