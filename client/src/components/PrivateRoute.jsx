import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Authentication } from "./Authentication";

function PrivateRoute({ component: Component, ...rest }) {
	const { authenticated } = useContext(Authentication);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (authenticated) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{ pathname: "/admin", state: { from: props.location } }}
						/>
					);
				}
			}}
		/>
	);
}

export default PrivateRoute;
