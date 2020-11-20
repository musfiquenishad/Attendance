import React, { Fragment } from "react";
import Header from "./Header";

function Notfound() {
	return (
		<Fragment>
			<Header />
			<div className="container text-center mt-5">
				<span className="mt-5">
					<h1>404 Not Found</h1>
					<h4>Opps! Look Like you'v lost</h4>
				</span>
			</div>
		</Fragment>
	);
}

export default Notfound;
