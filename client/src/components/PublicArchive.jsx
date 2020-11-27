import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

function AttendanceArchive() {
	const [data, setData] = useState([]);
	const [archiveData, setArchiveData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalLoading, setModalLoading] = useState(false);
	const [singleData, setSingleData] = useState([]);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		axios
			.get("/allarchives")
			.then((res) => {
				if (isMounted) {
					setData(res.data);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<div>
			{loading ? (
				<LoadingScreen marginTop="200px" />
			) : (
				<div className="container mt-5 text-center margin-bottom ">
					{!data.length ? (
						<h2>There is no information in the archive</h2>
					) : (
						<div className="table-responsive border-bottom">
							<table className="table table-striped table-sm ">
								<thead>
									<tr>
										<th>Date</th>
										<th>Subject</th>
										<th className="text-center">Attendance Data</th>
									</tr>
								</thead>
								<tbody>
									{data.map((archive) => {
										return (
											<tr key={archive._id}>
												<td>{archive.date}</td>
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
																		<LoadingScreen marginTop="0px" />
																	) : (
																		<div className="table-responsive border-bottom">
																			<table className="table table-striped table-sm">
																				<thead>
																					<tr>
																						<th>ID</th>
																						<th>Name</th>
																						<th className="text-center">
																							Section
																						</th>
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
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default AttendanceArchive;
