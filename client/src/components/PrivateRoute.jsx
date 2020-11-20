import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Authentication } from "./Authentication";

function PrivateRoute({ component: Component, ...rest }) {
	const { authenticated } = useContext(Authentication);

	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? <Component {...props} /> : <Redirect to="/admin" />
			}
		/>
	);
}

export default PrivateRoute;
