import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './commons/toDoInput/toDoInput';
import ToDoList from './commons/toDoList/toDoList';
import ModifWindow from './commons/modifWindow/modifWindow';
import { Container, InputsWrapper, TodoWrapper, Title, SaveButton } from './App.styles';

export default function App() {
	//const [progressValue, setProgressValue] = useState(0)
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState(new Date());
	const [doneFilter, setDoneFilter] = useState(0);
	const [selectedItem, setSelectedItem] = useState();
	const [showDialog, setShowDialog] = useState(false);

	const onSave = useCallback(
		async (/* item */) => {
			if (titleValue) {
				let valueToSave = {};
				valueToSave.title = /* item.title */ titleValue;
				valueToSave.status = false;
				if (descriptionValue) valueToSave.description = /*  item.description */ descriptionValue;
				valueToSave.deadline = /* item.deadline */ deadlineValue instanceof Date ? /* item.deadline */ deadlineValue : new Date();
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
		},
		[descriptionValue, titleValue, deadlineValue]
	);

	const onDelete = useCallback(async (item) => {
		setData((items) => items.filter((i) => i !== item));
		try {
			await deleteRequest(item._id);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}, []);

	const onModif = useCallback(async (id, field) => {
		const res = await postRequest('update/' + id, field);
		if (res.ok) setShowDialog(false);
	}, []);

	const onCheck = useCallback(async (item) => {
		/* const res =  */ await postRequest('update/' + item._id, { status: !item.status }); //try catch or then missing
		/* if (res.ok) {} */
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
		if (doneFilter === 1) return data.filter((e) => e.status);
		else if (doneFilter === 2) return data.filter((e) => !e.status);
		else return data;
	}, [data, doneFilter]);

	function handleModif(item) {
		setSelectedItem(item);
		setShowDialog(true);
	}

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
		<>
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
					<SaveButton onClick={() => onSave()} /*setShowDialog(true)*/>Save !</SaveButton>
				</InputsWrapper>
				<TodoWrapper>
					<ToDoList
						items={organizedData}
						onDelete={onDelete}
						handleModif={(item) => handleModif(item)}
						setIndex={setDoneFilter}
						onCheck={onCheck}
						index={doneFilter}
					/>
				</TodoWrapper>
				{showDialog && <ModifWindow item={selectedItem} onModif={onModif} onClose={() => setShowDialog(false)} />}
				{/* <ProgressBar barProgressValue={progressValue}/> */}
			</Container>
		</>
	);
}
