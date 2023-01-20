import { useState, useEffect, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './elements/toDoInput/toDoInput';
import ToDoList from './elements/toDoList/toDoList';
import styles from './App.module.css';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [itemTitle, setItemTitle] = useState('');
	const [itemDesc, setItemDesc] = useState('');
	const [itemDeadline, setItemDeadline] = useState('');
	const [shownItems, setShownItems] = useState([]);
	const [doneFilter, setDoneFilter] = useState(0);

	const onSave = useCallback(async () => {
		if (itemTitle) {
			let valueToSave = {};
			valueToSave.title = itemTitle;
			valueToSave.done = false;
			if (itemDesc) valueToSave.description = itemDesc;
			if (itemDeadline) {
				const conformDate = itemDeadline.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/); //eslint-disable-line no-useless-escape
				if (conformDate) {
					valueToSave.deadline = new Date(itemDeadline.slice(-4), itemDeadline.slice(3, 5) - 1, itemDeadline.slice(0, 2));
					console.log(valueToSave);
				} else {
					alert('wrong date format!');
				}
			}
			setShownItems((prev) => [...prev, valueToSave]);
			setItemTitle('');
			setItemDesc('');
			setItemDeadline('');
			try {
				await postRequest('add', valueToSave);
			} catch (err) {
				console.error(err);
				throw err;
			}
		}
	}, [itemDesc, itemTitle, itemDeadline]);

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
			res.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
			for (let e of res) e.formatedDeadline = getFormatedDate(e.deadline);
			if (doneFilter === 1) setShownItems(res.filter((e) => e.done));
			else if (doneFilter === 2) setShownItems(res.filter((e) => !e.done));
			else setShownItems(res);
		}
		loadData();
	}, [onSave, onDelete, doneFilter]);

	function onTitleChange(event) {
		setItemTitle(event.target.value);
	}
	function onDescChange(event) {
		setItemDesc(event.target.value);
	}

	function onDeadlineChange(event) {
		setItemDeadline(event.target.value);
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<ToDoInput onTitleChange={onTitleChange} onDescChange={onDescChange} onDeadlineChange={onDeadlineChange} itemTitle={itemTitle} itemDesc={itemDesc} itemDeadline={itemDeadline} />
				<button className={styles.button} onClick={onSave}>
					Save !
				</button>
			</div>
			<div className={styles.todolist_container}>
				<ToDoList items={shownItems} setShownItems={setDoneFilter} deleteItems={onDelete} />
			</div>
			{/* <ProgressBar barProgressValue={progressValue}/> */}
		</div>
	);
}
