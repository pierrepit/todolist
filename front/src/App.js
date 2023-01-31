import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './elements/toDoInput';
import ToDoList from './elements/toDoList';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState(new Date());
	const [doneFilter, setDoneFilter] = useState(0);
	const [data, setData] = useState([]);

	const onSave = useCallback(async () => {
		if (titleValue) {
			let valueToSave = {};
			valueToSave.title = titleValue;
			valueToSave.done = false;
			if (descriptionValue) valueToSave.description = descriptionValue;
			valueToSave.deadline = deadlineValue instanceof Date ? deadlineValue : new Date();
			setData((prev) => [...prev, valueToSave]);
			setTitleValue('');
			setDescriptionValue('');
			setDeadlineValue(new Date());
			try {
				await postRequest('add', valueToSave);
			} catch (err) {
				console.error(err);
				throw err;
			}
		}
	}, [descriptionValue, titleValue, deadlineValue]);

	const onDelete = useCallback(async (item) => {
		setData((items) => items.filter((i) => i !== item));
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
			for (let e of res) e.formatedDeadline = getFormatedDate(e.deadline);
			setData(res);
		}
		loadData();
	}, [onSave, onDelete]);

	const organizedData = useMemo(() => {
		data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		if (doneFilter === 1) return data.filter((e) => e.done);
		else if (doneFilter === 2) return data.filter((e) => !e.done);
		else return data;
	}, [data, doneFilter]);

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
		<div className='container'>
			<div className='container_input'>
				<ToDoInput
					onTitleChange={onTitleChange}
					onDescriptionChange={onDescriptionChange}
					onDeadlineChange={onDeadlineChange}
					titleValue={titleValue}
					descriptionValue={descriptionValue}
					deadlineValue={deadlineValue}
				/>
				<button className='button_save' onClick={onSave}>
					Save !
				</button>
			</div>
			<div className='container_todolist'>
				<ToDoList items={organizedData} onDelete={onDelete} setIndex={setDoneFilter} index={doneFilter} />
			</div>
			{/* <ProgressBar barProgressValue={progressValue}/> */}
		</div>
	);
}
