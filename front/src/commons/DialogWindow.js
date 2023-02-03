/* import React from "react";

class Dialog extends React.Component {
    render()  {

    }
} */

import { SaveButton } from '../App.styles';

export default function Dialog() {
	return (
		<div>
			<button onClick={() => props.onClose}>X</button>
			<p>{props.sentence}</p>
			{props.children}
			<SaveButton>Save</SaveButton>
		</div>
	);
}
