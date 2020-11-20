import React from "react";

function LoadingScreen(props) {
	return (
		<div className="text-center" style={{ marginTop: props.marginTop }}>
			<h1 className="text-warning">
				<span className="spinner-grow text-warning spinner-sm"></span>
				<span className="spinner-grow text-success spinner-sm"></span>
				<span className="spinner-grow text-danger spinner-sm"></span>
			</h1>
		</div>
	);
}

export default LoadingScreen;
