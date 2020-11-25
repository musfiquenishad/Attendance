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
					<a className="navbar-brand" href="/">
						<span style={{ color: "#0063AD" }}>Atten</span>
						<span style={{ color: "#21AC4A" }}>dance</span>
					</a>

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
								<a className="nav-link" href="/">
									Home <span className="sr-only">(current)</span>
								</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" href="/students">
									Present
								</a>
							</li>

							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/archivelist"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Archives
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" href="/archives/English">
										English
									</a>
									<a className="dropdown-item" href="/archives/Linear Algebra">
										Linear Algebra
									</a>
									<a
										className="dropdown-item"
										href="/archives/Discrete Mathematics"
									>
										Discrete Mathematics
									</a>
									<a
										className="dropdown-item"
										href="/archives/Digital Systems Design"
									>
										Digital Systems Design
									</a>
									<a
										className="dropdown-item"
										href="/archives/Statistics and Probability"
									>
										Statistics and Probability
									</a>
									<a
										className="dropdown-item"
										href="/archives/Structure Programming Language"
									>
										Structure Programming Language
									</a>
									<a
										className="dropdown-item"
										href="/archives/Story of the Emergance of Indipendent Bangladesh"
									>
										History of Indipendent Bangladesh
									</a>
									<a className="dropdown-item" href="/archives/Others">
										Others
									</a>
								</div>
							</li>
							<li className="nav-item auth-nav">
								<a className="nav-link" href="/admin">
									Admin
								</a>
							</li>
						</ul>

						{authenticated ? (
							<ul className="navbar-nav ml-auto">
								<br />
								<li className="nav-item auth-nav">
									<a className="nav-link" href="/dashboard">
										Dashboard
									</a>
								</li>
								<li className="nav-item  auth-nav">
									<a className="nav-link" href="/archives">
										Archives
									</a>
								</li>
								<li className="nav-item auth-nav">
									<a className="nav-link" href="/addarchive">
										Add Archive
									</a>
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
