import React, { Fragment, useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { OnOffContext } from "./OnOffContext";
import AttendanceArchive from "./PublicArchive";
function AttendanceForm() {
	const [ip, setIp] = useState("");
	const [name, setName] = useState("");
	const [classId, setClassId] = useState("");
	const [section, setSection] = useState("");
	const [subject, setSubject] = useState("");
	const [email, setEmail] = useState("");
	const [alertVersion, setAlertVersion] = useState("warning");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { showForm } = useContext(OnOffContext);

	useEffect(() => {
		let isMounted = true;

		axios.get("https://api64.ipify.org").then((res) => {
			if (isMounted) {
				setIp(res.data);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [ip]);

	function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		axios
			.post("/attend", { ip, classId, name, section, subject, email })
			.then((res) => {
				notify({
					alertVersion: "success",
					alertMessage: "Your attendance recorded successfully",
				});
				setName("");
				setClassId("");
				setSection("");
				setSubject("");
				setEmail("");

				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);

				notify({
					alertVersion: "danger",
					alertMessage: "Device is already registered !!",
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
			<div className="mt-5 mb-5">
				{showForm ? (
					<div className="container text-center mb-5">
						<h1 className="mb-4">
							<span style={{ color: "#0063AD" }}>Attendance</span>{" "}
							<span style={{ color: "#21AC4A" }}>Form</span>
						</h1>

						<p className="mb-4">
							Check Today's <Link to="/students">Present</Link>.
							<br />
							Check previous <Link to="/archivelist">Aattendance</Link>.
						</p>
						<br />
						{showAlert && (
							<div
								className={`alert alert-${alertVersion} alert-dismissible fade show `}
								role="alert"
							>
								{alertMessage}
							</div>
						)}

						<form
							className="p-4 border border-warning attendance-form  mt-4 mb-5"
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
								<div className="row">
									<div className="col">
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
									<div className="col">
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
									<option value="Discrete Mathematics">
										Discrete Mathematics
									</option>
									<option value="Digital Systems Design">
										Digital Systems Design
									</option>
									<option value="Statistics and Probability">
										Statistics and Probability
									</option>

									<option value="Structure Programming Language">
										Structure Programming Language
									</option>
									<option value="Story of the Emergance of Indipendent Bangladesh">
										History of Indipendent Bangladesh
									</option>

									<option value="Others">Others</option>
								</select>
							</div>

							<div className="form-group">
								<input
									required
									type="email"
									className="form-control"
									placeholder="DIIT Email"
									value={email}
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
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
									<button className="btn btn-warning" type="button" disabled>
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
				) : (
					<AttendanceArchive />
				)}
			</div>
		</Fragment>
	);
}

export default AttendanceForm;
