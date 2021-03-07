import React from "react";
import { Fragment, useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { OnOffContext } from "./OnOffContext";
import LoadingScreen from "./LoadingScreen";

function Dashboard() {
	const [name, setName] = useState("");
	const [classId, setClassId] = useState("");
	const [section, setSection] = useState("");
	const [subject, setSubject] = useState("");

	const [alertVersion, setAlertVersion] = useState("warning");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const { showForm, setShowForm } = useContext(OnOffContext);

	useEffect(() => {
		let isMounted = true;
		axios
			.get("/students")
			.then((res) => {
				if (isMounted) {
					setData(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			isMounted = false;
		};
	}, [data]);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		axios
			.post("/addstudent", { classId, name, section, subject })
			.then((res) => {
				notify({
					alertVersion: "success",
					alertMessage: "Your attendance recorded successfully",
				});
				setName("");
				setClassId("");
				setSection("");
				setSubject("");
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				notify({
					alertVersion: "danger",
					alertMessage: "Internal Server Error Please Try Again Later",
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

	return (
		<Fragment>
			<Header />

			<nav
				id="sidebarMenu"
				className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
			>
				<div className="sidebar-sticky pt-3">
					<ul className="nav flex-column">
						<li className="nav-item">
							<NavLink
								activeClassName="active-nav"
								className="nav-link "
								to="/dashboard"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-house-door"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
									/>
									<path
										fillRule="evenodd"
										d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
									/>
								</svg>{" "}
								Dashboard
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								activeClassName="active-nav"
								className="nav-link"
								to="/manage-archives"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-archive"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
									/>
								</svg>{" "}
								Archives
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								activeClassName="active-nav"
								className="nav-link"
								to="/add-archive"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-file-earmark-plus"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
									<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
									<path
										fillRule="evenodd"
										d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"
									/>
								</svg>
								{"  "}
								Add Archive
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>

			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 className="h2">Dashboard</h1>
					<div className="btn-toolbar mb-2 mb-md-0">
						<div className="btn-group mr-2">
							{showForm ? (
								<button
									type="button"
									className="btn btn-success btn-sm"
									onClick={(event) => {
										axios
											.put("/formvisibility", { formvisibility: false })
											.then((res) => {
												setShowForm(false);
											})
											.catch((error) => {
												console.log(error);
											});
									}}
								>
									On
								</button>
							) : (
								<button
									type="button"
									className="btn btn-dark btn-sm"
									onClick={(event) => {
										axios
											.put("/formvisibility", { formvisibility: true })
											.then((res) => {
												setShowForm(true);
											})
											.catch((error) => {
												console.log(error);
											});
									}}
								>
									off
								</button>
							)}
						</div>
						<div className="btn-group mr-2">
							<button
								type="button"
								className="btn btn-warning btn-sm"
								data-toggle="modal"
								data-target="#exampleModalScrollable"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-file-earmark-bar-graph"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
									<path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3zm-5 11a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1zm3 0a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm3 0a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1z" />
								</svg>{" "}
								Attend
							</button>
						</div>
						<div className="btn-group mr-2">
							<button
								type="button"
								className="btn btn-sm btn-danger"
								onClick={(event) => {
									const confirm = prompt(
										"Please type Delete in order to delete all attendance"
									);
									if (confirm === "Delete") {
										axios
											.delete("/deleteall")
											.then((res) => {
												console.log("All Attendance deleted");
											})
											.catch((Error) => {
												console.log(Error);
											});
									}
								}}
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-trash"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
									<path
										fillRule="evenodd"
										d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
									/>
								</svg>{" "}
								Delete All
							</button>
						</div>
					</div>
				</div>
				<div
					className="modal fade"
					id="exampleModalScrollable"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalScrollableTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-scrollable" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5
									className="modal-title text-center"
									id="exampleModalScrollableTitle"
								>
									Attend someone in present list
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{showAlert && (
									<div
										className={`alert alert-${alertVersion} alert-dismissible fade show `}
										role="alert"
									>
										{alertMessage}
									</div>
								)}
								<form
									className="p-4 border border-warning attendance-form"
									onSubmit={handleSubmit}
								>
									<div className="form-group">
										<input
											required
											type="text"
											className="form-control"
											placeholder="Full Name"
											value={name}
											onChange={(event) => {
												setName(event.target.value);
											}}
										/>
									</div>

									<div className="form-group">
										<select
											className="custom-select"
											id="section"
											required
											value={section}
											onChange={(event) => {
												setSection(event.target.value);
											}}
										>
											<option value="">Section...</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="C">C</option>
											<option value="D">D</option>
										</select>
									</div>
									<div className="form-group">
										<input
											required
											type="number"
											className="form-control"
											placeholder="Class Id"
											value={classId}
											onChange={(event) => {
												setClassId(event.target.value);
											}}
										/>
									</div>
									<div className="form-group">
										<select
											className="custom-select"
											id="subject"
											required
											value={subject}
											onChange={(event) => {
												setSubject(event.target.value);
											}}
										>
											<option value="">Subject...</option>
											<option value="EEC">EEC</option>
											<option value="Physics">Physics</option>
											<option value="English">English</option>
											<option value="Calculus">Calculus</option>
											<option value="Linear Algebra">Linear Algebra</option>
											<option value="Discrete Mathematics">
												Discrete Mathematics
											</option>
											<option value="Digital Systems Design">
												Digital Systems Design
											</option>
											<option value="Statistics and Probability">
												Statistics and Probability
											</option>

											<option value="Structure Programming Language ">
												Structure Programming Language{" "}
											</option>
											<option value="History of Indipendent Bangladesh">
												History of Indipendent Bangladesh
											</option>

											<option value="Others">Others</option>
										</select>
									</div>

									<div className="form-group text-left">
										{!loading ? (
											<button type="submit" className="btn btn-warning">
												<svg
													width="1em"
													height="1em"
													viewBox="0 0 16 16"
													className="bi bi-box-arrow-in-up-right"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
													/>
													<path
														fillRule="evenodd"
														d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
													/>
												</svg>{" "}
												Submit
											</button>
										) : (
											<button
												className="btn btn-warning"
												type="button"
												disabled
											>
												<span
													className="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"
												></span>{" "}
												Loading...
											</button>
										)}
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-warning btn-sm"
									data-dismiss="modal"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
				{!data.length ? (
					<LoadingScreen />
				) : (
					<div className="table-responsive">
						<table className="table table-striped table-sm">
							<thead>
								<tr>
									<th>Class Id</th>
									<th>Name</th>
									<th>Section</th>
									<th>Subject</th>
									<th>Edit</th>
									<th>Delete</th>
									<th className="text-center">IP</th>
								</tr>
							</thead>
							<tbody>
								{data.map((student) => {
									return (
										<tr key={student._id}>
											<td>{student.classId}</td>
											<td>{student.name}</td>
											<td className="text-center">{student.section}</td>
											<td>{student.subject}</td>

											<td>
												<Link
													to={`/edit/${student._id}`}
													className="btn btn-warning btn-sm"
												>
													<svg
														width="1em"
														height="1em"
														viewBox="0 0 16 16"
														className="bi bi-pen"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
														/>
													</svg>
												</Link>
											</td>
											<td>
												<button
													type="button"
													className="btn btn-sm btn-danger"
													onClick={(event) => {
														const confirm = prompt(
															`Do you want to delete ${student.name} ? Type Delete to confirm`
														);
														if (confirm === "Delete") {
															axios
																.delete(`/deletestudent/${student._id}`)
																.then((res) => {
																	console.log("Student deleted successfully");
																})
																.catch((Error) => {
																	console.log(Error);
																});
														}
													}}
												>
													<svg
														width="1em"
														height="1em"
														viewBox="0 0 16 16"
														className="bi bi-trash"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
														<path
															fillRule="evenodd"
															d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
														/>
													</svg>
												</button>
											</td>
											<td className="text-center">
												{student.ip ? student.ip : ""}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</main>
		</Fragment>
	);
}

export default Dashboard;
