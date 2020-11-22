import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable";
import { Authentication } from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import Admin from "./components/Admin";
import Archives from "./components/Archives";
import AddArchive from "./components/AddArchive";
import EditAttendance from "./components/EditAttendance";
import Notfound from "./components/Notfound";
import AttendanceArchive from "./components/AttendanceArchive";
import LoadingScreen from "./components/LoadingScreen";
import { OnOffContext } from "./components/OnOffContext";

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
			<HashRouter>
				<Authentication.Provider value={{ authenticated, setAuthenticated }}>
					<OnOffContext.Provider value={{ showForm, setShowForm }}>
						<Switch>
							<Route path="/" exact component={AttendanceForm} />

							<Route exact path="/students">
								<Header />
								<AttendanceTable />
							</Route>

							<Route exact path="/admin" component={Admin} />
							<Route exact path="/loading" component={LoadingScreen} />
							<PrivateRoute exact path="/edit/:id" component={EditAttendance} />
							<Route exact path="/archivelist">
								<Header />
								<AttendanceArchive />
							</Route>

							<PrivateRoute path="/dashboard" exact component={Dashboard} />
							<PrivateRoute path="/archives" exact component={Archives} />
							<PrivateRoute path="/addarchive" exact component={AddArchive} />

							<Route path="*">
								<Notfound />
							</Route>
						</Switch>
					</OnOffContext.Provider>
				</Authentication.Provider>
			</HashRouter>
		</div>
	);
}

export default App;
