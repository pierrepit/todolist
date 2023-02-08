import { useState, useEffect, useMemo, useCallback } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
//import ProgressBar from "./progressBar/progressBar";
import ToDoInput from './commons/toDoInput/toDoInput';
import ToDoList from './commons/toDoList/toDoList';
import ModifPopup from './commons/popup/modifPopup';
import Popup from './commons/popup/popup';
import { Container, InputsWrapper, TodoWrapper, Title, SaveButton } from './App.styles';

export default function App() {
	const [data, setData] = useState([]);
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState(new Date());
	const [doneFilter, setDoneFilter] = useState(0);
	//const [progressValue, setProgressValue] = useState(0)
	const [selectedItem, setSelectedItem] = useState({});
	const [modifPopup, setModifPopup] = useState(false);
	const [savePopup, setSavePopup] = useState(false);
	const [voidSavePopup, setVoidSavePopup] = useState(false);
	const [deletePopup, setDeletePopup] = useState(false);
	const [isModifsToFetch, setIsModifsToFetch] = useState(false);

	const onSave = useCallback(async () => {
		setData((prev) => [...prev, selectedItem]);
		setTitleValue('');
		setDescriptionValue('');
		setDeadlineValue(new Date());
		setSavePopup(false);
		try {
			await postRequest('add', selectedItem);
		} catch (err) {
			console.error(err);
			throw err;
		}
		setSelectedItem({});
	}, [selectedItem]);

	const onDelete = useCallback(async (item) => {
		setData((items) => items.filter((i) => i !== item));
		setDeletePopup(false);
		try {
			await deleteRequest(item._id);
		} catch (err) {
			console.error(err);
			throw err;
		}
		setSelectedItem({});
	}, []);

	const onModif = useCallback(
		async (item, field) => {
			const res = await postRequest('update/' + item._id, field); //try catch or then missing
			if (res.ok) {
				setIsModifsToFetch(true);
				if (modifPopup) setModifPopup(false);
			}
			setSelectedItem({});
		},
		[modifPopup]
	);

	useEffect(() => {
		async function loadData() {
			const res = await getRequest('/'); //try catch or then missing
			for (let e of res) e.formatedDeadline = getFormatedDate(e.deadline);
			res.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
			setData(res);
			setIsModifsToFetch(false);
		}
		loadData();
	}, [isModifsToFetch]);

	const filteredData = useMemo(() => {
		if (!data || !data.length) return;
		/* 		for (let e of data) e.formatedDeadline = getFormatedDate(e.deadline);
			data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); */
		if (doneFilter === 1) return data.filter((e) => e.status);
		else if (doneFilter === 2) return data.filter((e) => !e.status);
		else return data;
	}, [data, doneFilter]);

	function handleSave() {
		if (!titleValue) setVoidSavePopup(true);
		else {
			let valueToSave = {};
			valueToSave.title = titleValue;
			valueToSave.status = false;
			if (descriptionValue) valueToSave.description = descriptionValue;
			valueToSave.deadline = deadlineValue instanceof Date ? deadlineValue : new Date();
			setSelectedItem(valueToSave);
			setSavePopup(true);
		}
	}

	function handleDelete(item) {
		setSelectedItem(item);
		setDeletePopup(true);
	}

	function handleModif(item) {
		setSelectedItem(item);
		setModifPopup(true);
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
					<SaveButton onClick={handleSave}>Save !</SaveButton>
				</InputsWrapper>
				<TodoWrapper>
					<ToDoList
						items={filteredData}
						handleDelete={(item) => handleDelete(item)}
						handleModif={(item) => handleModif(item)}
						setIndex={setDoneFilter}
						onModif={onModif}
						index={doneFilter}
					/>
				</TodoWrapper>
				{modifPopup && <ModifPopup item={selectedItem} onModif={onModif} onClose={() => setModifPopup(false)} popupType='Save' />}
				{voidSavePopup && (
					<Popup title='No title detected' onClose={() => setVoidSavePopup(false)}>
						<span>You need to give a title to any item you want to save into your todolist.</span>
					</Popup>
				)}
				{savePopup && (
					<ModifPopup
						title='Save new item ?'
						item={selectedItem}
						onClose={() => setSavePopup(false)}
						onModif={() => onSave(selectedItem)}
						popupType='Save'
					>
						<span>You're about to save the following item: {titleValue}. Click below if you want to continue.</span>
					</ModifPopup>
				)}
				{deletePopup && (
					<ModifPopup
						title='Delete item ?'
						item={selectedItem}
						onClose={() => setDeletePopup(false)}
						onModif={() => onDelete(selectedItem)}
						popupType='Delete'
					>
						<span>You're about to delete the following item: {selectedItem.title}. Click below if you want to continue.</span>
					</ModifPopup>
				)}
				{/* <ProgressBar barProgressValue={progressValue}/> */}
			</Container>
		</>
	);
}
