import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "./Authentication";
import axios from "axios";
function Header() {
	const { authenticated, setAuthenticated } = useContext(Authentication);

	return (
		<div className="mb-5">
			<nav
				className="navbar navbar-expand-lg navbar-light bg-light shadow"
				id="navbar"
			>
				<div className="container">
					<Link className="navbar-brand" to="/">
						Attendance
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link  " to="/">
									Home <span className="sr-only">(current)</span>
								</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/students">
									Present
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/archivelist">
									Archives
								</Link>
							</li>
							<li className="nav-item auth-nav">
								<Link className="nav-link" to="/admin">
									Admin
								</Link>
							</li>
						</ul>

						{authenticated ? (
							<ul className="navbar-nav ml-auto">
								<br />
								<li className="nav-item auth-nav">
									<Link className="nav-link" to="/dashboard">
										Dashboard
									</Link>
								</li>
								<li className="nav-item  auth-nav">
									<Link className="nav-link" to="/archives">
										Archives
									</Link>
								</li>
								<li className="nav-item auth-nav">
									<Link className="nav-link" to="/addarchive">
										Add Archive
									</Link>
								</li>

								<li className="nav-item logout-button">
									<button
										type="button"
										className="btn btn-sm btn-warning"
										onClick={(event) => {
											axios
												.post("/logout")
												.then((res) => {
													setAuthenticated(false);
												})
												.catch((error) => {
													console.log(error);
												});
										}}
									>
										Logout
									</button>{" "}
								</li>
							</ul>
						) : null}
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Header;
