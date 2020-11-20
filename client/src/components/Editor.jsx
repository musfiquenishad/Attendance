import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor() {
	const [data, setData] = useState();

	return (
		<div className="container text-center">
			<h1>Rich Text editor</h1>
			<CKEditor
				editor={ClassicEditor}
				data={data}
				config={{}}
				onChange={(event, editor) => {
					const data = editor.getData();
					console.log({ event, editor, data });
				}}
			/>
		</div>
	);
}

export default Editor;
