import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Archives() {
	const [data, setData] = useState("");
	const [subject, setSubject] = useState("");
	const [date, setDate] = useState("");

	const [alertVersion, setAlertVersion] = useState("warning");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		if (data === "") {
			notify({
				alertVersion: "warning",
				alertMessage:
					"Inpute cannot be empty!! Please fill out every feild properly",
			});
			setLoading(false);
		} else {
			axios
				.post("/post", { date, subject, data })
				.then((res) => {
					notify({
						alertVersion: "success",
						alertMessage: "Attendance data saved into archive",
					});
					setData("");
					setData("");
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
							<Link className="nav-link" to="/dashboard">
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
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/manage-archives">
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
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/add-archive">
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
							</Link>
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

				<form onSubmit={handleSubmit}>
					<div className="form-group">
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
							<option value="Story of the Emergance of Indipendent Bangladesh">
								History of Indipendent Bangladesh
							</option>

							<option value="Others">Others</option>
						</select>
					</div>
					<div className="form-group">
						<CKEditor
							required
							editor={ClassicEditor}
							data={data}
							config={{ toolbar: ["insertTable"] }}
							onChange={(event, editor) => {
								const data = editor.getData();
								setData(data);
							}}
						/>
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
