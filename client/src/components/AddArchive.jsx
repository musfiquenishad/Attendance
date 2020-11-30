import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Archives() {
	const [data, setData] = useState([]);
	const [subject, setSubject] = useState("");
	const [date, setDate] = useState("");
	const [section, setSection] = useState("");
	const [searchSection, setSearchSection] = useState("");
	const [alertVersion, setAlertVersion] = useState("warning");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [presentsLoading, setPresentsLoading] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		if (!data.length) {
			notify({
				alertVersion: "warning",
				alertMessage: "There is no data, Please get data first",
			});
			setLoading(false);
		} else {
			axios
				.post("/post", { date, section, subject, data })
				.then((res) => {
					notify({
						alertVersion: "success",
						alertMessage: "Attendance data saved into archive",
					});
					setDate("");
					setSection("");
					setData([]);
					setSubject("");
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					console.log(error);
					setLoading(false);
					notify({
						alertVersion: "danger",
						alertMessage: "Internal Server Error Please Try Again Later",
					});
				});
		}
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
		<div>
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
								className="nav-link"
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
					<h1 className="h2">Add Archives</h1>
				</div>

				{showAlert && (
					<div
						className={`alert alert-${alertVersion} alert-dismissible fade show tex-right `}
						role="alert"
					>
						{alertMessage}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mb-5">
					<div className="form-group">
						<div className="input-group">
							<select
								className="custom-select "
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
								<option value="All">All</option>
							</select>
							<input
								type="date"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter Date"
								required
								value={date}
								onChange={(event) => {
									setDate(event.target.value);
								}}
							/>
						</div>
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
							<option value="English">English</option>
							<option value="Linear Algebra">Linear Algebra</option>
							<option value="Discrete Mathematics">Discrete Mathematics</option>
							<option value="Digital Systems Design">
								Digital Systems Design
							</option>
							<option value="Statistics and Probability">
								Statistics and Probability
							</option>

							<option value="Structure Programming Language">
								Structure Programming Language{" "}
							</option>
							<option value="History of Indipendent Bangladesh">
								History of Indipendent Bangladesh
							</option>

							<option value="Others">Others</option>
						</select>
					</div>
					{!data.length ? (
						<div className="form-group">
							{!presentsLoading ? (
								<div className="input-group mb-3">
									<button
										type="button"
										className="btn btn-warning"
										onClick={(event) => {
											setPresentsLoading(true);
											axios
												.get(`/getpresents/${searchSection}`)
												.then((res) => {
													setData(res.data);
													setPresentsLoading(false);
												})
												.catch((error) => {
													setPresentsLoading(false);
													notify({
														alertVersion: "danger",
														alertMessage: error.message,
													});
												});
										}}
									>
										<svg
											width="1em"
											height="1em"
											viewBox="0 0 16 16"
											className="bi bi-download"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
											/>
											<path
												fillRule="evenodd"
												d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
											/>
										</svg>{" "}
										Get Data
									</button>

									<select
										className="custom-select "
										id="section"
										value={searchSection}
										onChange={(event) => {
											setSearchSection(event.target.value);
										}}
									>
										<option value="">Section...</option>
										<option value="All">ALL</option>
										<option value="A">A</option>

										<option value="B">B</option>
										<option value="C">C</option>
										<option value="D">D</option>
									</select>
								</div>
							) : (
								<button type="button" className="btn btn-warning" disabled>
									Getting Data...
								</button>
							)}
						</div>
					) : (
						<button
							type="button"
							className="btn btn-warning"
							onClick={(event) => {
								setData([]);
							}}
						>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-folder-x"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"
								/>
								<path
									fillRule="evenodd"
									d="M11.146 10.146a.5.5 0 0 1 .708 0L13 11.293l1.146-1.147a.5.5 0 0 1 .708.708L13.707 12l1.147 1.146a.5.5 0 0 1-.708.708L13 12.707l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 12l-1.147-1.146a.5.5 0 0 1 0-.708z"
								/>
							</svg>{" "}
							Remove Data
						</button>
					)}

					<div className="form-group">
						{!data.length ? (
							<h4>There is no data here to submit</h4>
						) : (
							<div className="table-responsive border-bottom">
								<table className="table table-striped table-sm">
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Section</th>
											<th className="text-center">Subject</th>
										</tr>
									</thead>
									<tbody>
										{data.map((student) => {
											return (
												<tr key={student._id}>
													<td>{student.classId}</td>
													<td>{student.name}</td>
													<td>{student.section}</td>
													<td className="text-center">{student.subject}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
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
						<button className="btn btn-warning" type="button" disabled>
							<span
								className="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"
							></span>{" "}
							Loading...
						</button>
					)}
				</form>
			</main>
		</div>
	);
}

export default Archives;
