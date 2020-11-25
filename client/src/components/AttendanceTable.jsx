import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
function AttendanceTable() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

		axios
			.get("/students")
			.then((res) => {
				if (isMounted) {
					if (isMounted) {
						setData(res.data);
					}
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
		<Fragment>
			<Header />

			<div className="container margin-bottom">
				{loading ? (
					<LoadingScreen marginTop="200px" />
				) : (
					<div className="table-responsive">
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
		</Fragment>
	);
}

export default AttendanceTable;
