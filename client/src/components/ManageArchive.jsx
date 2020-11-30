import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import LoadingScreen from "./LoadingScreen";
function Archives() {
	const [data, setData] = useState([]);
	const [archiveData, setArchiveData] = useState([]);
	const [singleData, setSingleData] = useState([]);
	const [modalLoading, setModalLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;
		axios
			.get("/allarchives")
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
					<h1 className="h2">Archives</h1>
				</div>
				{!data.length ? (
					<LoadingScreen />
				) : (
					<div className="table-responsive">
						<table className="table table-striped table-sm">
							<thead>
								<tr>
									<th>Date</th>
									<th>Section</th>
									<th>Subject</th>
									<th className="text-center">Attendance Data</th>
									<th className="text-right">Action</th>
								</tr>
							</thead>
							<tbody>
								{data.map((archive) => {
									return (
										<tr key={archive._id}>
											<td>{archive.date}</td>
											<td>{archive.section}</td>
											<td>{archive.subject}</td>

											<td className="text-center">
												<button
													type="button"
													className="btn btn-warning btn-sm"
													data-toggle="modal"
													data-target="#exampleModalScrollable"
													onClick={(event) => {
														setModalLoading(true);
														axios
															.get(`/archive/${archive._id}`)
															.then((res) => {
																setArchiveData(res.data[0]);
																setSingleData(res.data[0].data);
																setModalLoading(false);
															})
															.catch((error) => {
																console.log(error);
															});
													}}
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
													View
												</button>

												<div
													className="modal fade"
													id="exampleModalScrollable"
													tabIndex="-1"
													role="dialog"
													aria-labelledby="exampleModalScrollableTitle"
													aria-hidden="true"
												>
													<div
														className="modal-dialog modal-dialog-scrollable"
														role="document"
													>
														<div className="modal-content">
															<div className="modal-header">
																<h5
																	className="modal-title text-left"
																	id="exampleModalScrollableTitle"
																>
																	{archiveData.subject} <br />
																	{archiveData.date}
																</h5>
																<br />

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
																{modalLoading ? (
																	<LoadingScreen />
																) : (
																	<div className="table-responsive border-bottom">
																		<table className="table table-striped table-sm">
																			<thead>
																				<tr>
																					<th>ID</th>
																					<th>Name</th>
																					<th>Section</th>
																					<th className="text-center">
																						Subject
																					</th>
																				</tr>
																			</thead>
																			<tbody>
																				{singleData.map((student) => {
																					return (
																						<tr key={student._id}>
																							<td>{student.classId}</td>
																							<td>{student.name}</td>
																							<td>{student.section}</td>
																							<td className="text-center">
																								{student.subject}
																							</td>
																						</tr>
																					);
																				})}
																			</tbody>
																		</table>
																	</div>
																)}
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
											</td>
											<td className="text-right">
												<button
													type="button"
													className="btn btn-sm btn-danger"
													onClick={(event) => {
														const confirm = prompt(
															`Do you want to delete ${archive.subject} on ${archive.date} ? Type Delete to confirm`
														);
														if (confirm === "Delete") {
															axios
																.delete(`/archive/${archive._id}`)
																.then((res) => {
																	console.log("Archive deleted successfully");
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
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</main>
		</div>
	);
}

export default Archives;
