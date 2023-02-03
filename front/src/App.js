import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './commons/toDoInput/toDoInput';
import ToDoList from './commons/toDoList/toDoList';
import { Container, InputsWrapper, TodoWrapper, Title, SaveButton } from './App.styles';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState(new Date());
	const [data, setData] = useState([]);
	const [doneFilter, setDoneFilter] = useState(0);
	//const [showDialog, setShowDialog] = useState(false);

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

	/* 	function handleCheck(item) {
		if (item.done) {
			item.done = false;
		} else item.done;
	} */

	return (
		<Container>
			<Title>Todolist</Title>
			<InputsWrapper>
				<ToDoInput
					onTitleChange={onTitleChange}
					onDescriptionChange={onDescriptionChange}
					onDeadlineChange={onDeadlineChange}
					titleValue={titleValue}
					descriptionValue={descriptionValue}
					deadlineValue={deadlineValue}
				/>
				<SaveButton /* onClick={() => setShowDialog(true)} */>Save !</SaveButton>
			</InputsWrapper>
			<TodoWrapper>
				<ToDoList items={organizedData} onDelete={onDelete} /* onModif={() => setShowDialog(true)} */ setIndex={setDoneFilter} /* onCheck={handleCheck} */ index={doneFilter} />
			</TodoWrapper>
			{/* <ProgressBar barProgressValue={progressValue}/> */}
		</Container>
	);
}
