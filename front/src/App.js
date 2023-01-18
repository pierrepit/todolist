import { useState, useEffect, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './elements/toDoInput/toDoInput';
import ToDoList from './elements/toDoList/toDoList';
import styles from './App.module.css';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [itemTitle, setItemTitle] = useState('');
	const [itemDesc, setItemDesc] = useState('');
	const [shownItems, setShownItems] = useState([]);
	const [doneItems, setDoneItems] = useState([]);
	const [undoneItems, setUndoneItems] = useState([]);

	const onSave = useCallback(async () => {
		let valueToSave = {};
		if (itemTitle) {
			valueToSave.title = itemTitle;
			if (itemDesc) {
				valueToSave.description = itemDesc;
			}
			setShownItems((prev) => [...prev, valueToSave]);
			setItemTitle('');
			setItemDesc('');
			try {
				await postRequest('add', valueToSave);
			} catch (err) {
				console.error(err);
				throw err;
			}
		}
	}, [itemDesc, itemTitle]);

	const onDelete = useCallback(async (item) => {
		setShownItems((items) => items.filter((i) => i !== item));
		try {
			await deleteRequest(item._id);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}, []);

	useEffect(() => {
		async function loadData() {
			const res = await getRequest('/'); //try catch or then missing
			const dones = [];
			const undones = [];
			for (let e of res) {
				if (e.done) {
					dones.push(e);
				} else {
					undones.push(e);
				}
			}
			setDoneItems(dones);
			setUndoneItems(undones);
			setShownItems([...dones, ...undones]);
		}
		loadData();
	}, [onSave, onDelete]);

	function onTitleChange(event) {
		setItemTitle(event.target.value);
	}
	function onDescChange(event) {
		setItemDesc(event.target.value);
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<ToDoInput onTitleChange={onTitleChange} onDescChange={onDescChange} itemTitle={itemTitle} itemDesc={itemDesc} />
				<button className={styles.button} onClick={onSave}>
					Save !
				</button>
			</div>
			<div className={styles.todolist_container}>
				<ToDoList items={shownItems} setShownItems={setShownItems} undoneItems={undoneItems} doneItems={doneItems} deleteItems={onDelete} />
			</div>
			{/* <ProgressBar barProgressValue={progressValue}/> */}
		</div>
	);
}
