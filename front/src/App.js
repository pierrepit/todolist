import { useState, useEffect } from 'react';
//import ProgressBar from "./progressBar/progressBar";
import Input from './toDoInput/toDoInput';
import ToDoList from './toDoList/toDoList';
import styles from './App.module.css';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [itemTitle, setItemTitle] = useState('');
	const [itemDesc, setItemDesc] = useState('');
	const [toDoItems, setToDoItems] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const res = await fetch('http://localhost:3001/items'); // enhancing awaited
		const jsonRes = await res.json();
		setToDoItems(jsonRes);
	}

	function onTitleChange(event) {
		setItemTitle(event.target.value);
	}
	function onDescChange(event) {
		setItemDesc(event.target.value);
	}

	async function onSave() {
		let valueToSave = {};
		if (itemTitle) {
			valueToSave.title = itemTitle;
			if (itemDesc) {
				valueToSave.description = itemDesc;
			}
			setToDoItems([...toDoItems, valueToSave]);
			setItemTitle('');
			setItemDesc('');
			try {
				await fetch('http://localhost:3001/items/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(valueToSave) });
				loadData();
			} catch (err) {
				console.error(err);
				throw err;
			}
		}
	}

	async function onDelete() {}

	return (
		<div className={styles.container}>
			<div className={styles.input_div}>
				<Input onTitleChange={onTitleChange} onDescChange={onDescChange} itemTitle={itemTitle} itemDesc={itemDesc} />
				<button className={styles.button} onClick={onSave}>
					Save !
				</button>
			</div>
			<ToDoList items={toDoItems} />
			{/* <ProgressBar barProgressValue={progressValue}/> */}
		</div>
	);
}
