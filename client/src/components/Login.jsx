import axios from "axios";
import React, { useState, useContext, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Authentication } from "./Authentication";
import Header from "./Header";

function Login(props) {
	const { authenticated, setAuthenticated } = useContext(Authentication);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alertVersion, setAlertVersion] = useState("warning");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		axios
			.post("/login", { username: email, password: password })
			.then((res) => {
				setAuthenticated(true);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				notify({
					alertVersion: "danger",
					alertMessage: "Email and password incorrect!",
				});
			});
	}

	function notify(props) {
		setShowAlert(true);
		setAlertVersion(`${props.alertVersion}`);
		setAlertMessage(`${props.alertMessage}`);

		setTimeout(() => {
			setShowAlert(false);
		}, 4000);
	}

	if (authenticated) {
		return props.location.state ? (
			<Redirect to={props.location.state.from.pathname} />
		) : (
			<Redirect to="/dashboard" />
		);
	}

	return (
		<Fragment>
			<Header />
			<div className="container text-center mt-5">
				<form className="form-signin " onSubmit={handleSubmit}>
					<h1 className="h3 mb-5 font-weight-bold">Please sign in</h1>
					{showAlert && (
						<div
							className={`alert alert-${alertVersion} alert-dismissible fade show `}
							role="alert"
						>
							{alertMessage}
						</div>
					)}
					<label htmlFor="inputEmail" className="sr-only">
						Email address
					</label>
					<input
						type="text"
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

					{!loading ? (
						<button className="btn btn-lg btn-warning btn-block" type="submit">
							Login
						</button>
					) : (
						<button
							className="btn btn-lg btn-warning btn-block"
							type="button"
							disabled
						>
							Login...
						</button>
					)}
				</form>

				<footer className="footer mt-auto py-3">
					<div className="container text-center sticky-bottom mb-4 mt-5">
						<span className="text-muted">
							&copy; Made By{" "}
							<a href="http://ahsannishad.com/">Musfique Ahsan Nishad</a>
						</span>
					</div>
				</footer>
			</div>
		</Fragment>
	);
}

export default Login;
