import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
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
					<NavLink activeClassName="active-nav" className="navbar-brand" to="/">
						<span style={{ color: "#0063AD" }}>Atten</span>
						<span style={{ color: "#21AC4A" }}>dance</span>
					</NavLink>

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
							<li className="nav-item">
								<NavLink
									activeClassName="active-nav"
									className="nav-link"
									to="/presents"
								>
									Presents
								</NavLink>
							</li>

							<li className="nav-item dropdown">
								<NavLink
									activeClassName="active-nav"
									className="nav-link dropdown-toggle"
									to="/archives"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Archives
								</NavLink>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/English"
									>
										English
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Linear Algebra"
									>
										Linear Algebra
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Discrete Mathematics"
									>
										Discrete Mathematics
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Digital Systems Design"
									>
										Digital Systems Design
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Statistics and Probability"
									>
										Statistics and Probability
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Structure Programming Language"
									>
										Structure Programming Language
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Story of the Emergance of Indipendent Bangladesh"
									>
										History of Indipendent Bangladesh
									</NavLink>
									<NavLink
										activeClassName="active-nav"
										className="dropdown-item"
										to="/archives/Others"
									>
										Others
									</NavLink>
								</div>
							</li>
							<li className="nav-item auth-nav">
								<NavLink
									activeClassName="active-nav"
									className="nav-link"
									to="/admin"
								>
									Admin
								</NavLink>
							</li>
						</ul>

						{authenticated ? (
							<ul className="navbar-nav ml-auto">
								<br />
								<li className="nav-item auth-nav">
									<NavLink
										activeClassName="active-nav"
										className="nav-link"
										to="/dashboard"
									>
										Dashboard
									</NavLink>
								</li>
								<li className="nav-item  auth-nav">
									<NavLink
										activeClassName="active-nav"
										className="nav-link"
										to="/manage-archives"
									>
										Archives
									</NavLink>
								</li>
								<li className="nav-item auth-nav">
									<NavLink
										activeClassName="active-nav"
										className="nav-link"
										to="/add-archive"
									>
										Add Archive
									</NavLink>
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
