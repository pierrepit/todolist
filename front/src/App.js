import { useState, useEffect, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './elements/toDoInput/toDoInput';
import ToDoList from './elements/toDoList/toDoList';
import styles from './App.module.css';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState();
	const [shownItems, setShownItems] = useState([]);
	const [doneFilter, setDoneFilter] = useState(0);

	const onSave = useCallback(async () => {
		if (titleValue) {
			let valueToSave = {};
			valueToSave.title = titleValue;
			valueToSave.done = false;
			if (descriptionValue) valueToSave.description = descriptionValue;
			if (deadlineValue && deadlineValue instanceof Date) valueToSave.deadline = deadlineValue;
			setShownItems((prev) => [...prev, valueToSave]);
			setTitleValue('');
			setDescriptionValue('');
			setDeadlineValue('');
			try {
				await postRequest('add', valueToSave);
			} catch (err) {
				console.error(err);
				throw err;
			}
		}
	}, [descriptionValue, titleValue, deadlineValue]);

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
		setTitleValue(event.target.value);
	}
	function onDescriptionChange(event) {
		setDescriptionValue(event.target.value);
	}

	function onDeadlineChange(date) {
		setDeadlineValue(date);
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<ToDoInput
					onTitleChange={onTitleChange}
					onDescriptionChange={onDescriptionChange}
					onDeadlineChange={onDeadlineChange}
					titleValue={titleValue}
					descriptionValue={descriptionValue}
					deadlineValue={deadlineValue}
				/>
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
