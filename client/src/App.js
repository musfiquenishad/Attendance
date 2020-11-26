import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable";
import { Authentication } from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import Admin from "./components/Admin";
import ManageArchive from "./components/ManageArchive";
import AddArchive from "./components/AddArchive";
import EditAttendance from "./components/EditAttendance";
import Notfound from "./components/Notfound";
import PublicArchive from "./components/PublicArchive";
import { OnOffContext } from "./components/OnOffContext";
import SubjectWiseArchive from "./components/SubjectWiseArchive";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		let isMounted = true;
		axios
			.get("/authenticated")
			.then((res) => {
				if (isMounted) {
					setAuthenticated(res.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/showform")
			.then((res) => {
				setShowForm(res.data.formvisibility);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			isMounted = false;
		};
	}, [authenticated]);
	return (
		<div className="App">
			<Router>
				<Authentication.Provider value={{ authenticated, setAuthenticated }}>
					<OnOffContext.Provider value={{ showForm, setShowForm }}>
						<Switch>
							<Route path="/" exact component={AttendanceForm} />

							<Route exact path="/presents">
								<Header />
								<AttendanceTable />
							</Route>

							<Route exact path="/admin" component={Admin} />

							<Route exact path="/archives">
								<Header />
								<PublicArchive />
							</Route>
							<Route exact path="/archives/:subject">
								<Header />
								<SubjectWiseArchive />
							</Route>

							<PrivateRoute path="/dashboard" exact component={Dashboard} />
							<PrivateRoute
								path="/manage-archives"
								exact
								component={ManageArchive}
							/>
							<PrivateRoute exact path="/edit/:id" component={EditAttendance} />
							<PrivateRoute path="/add-archive" exact component={AddArchive} />

							<Route path="*">
								<Notfound />
							</Route>
						</Switch>
					</OnOffContext.Provider>
				</Authentication.Provider>
			</Router>
		</div>
	);
}

export default App;
