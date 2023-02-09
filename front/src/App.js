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
		setTitleValue('');
		setDescriptionValue('');
		setDeadlineValue(new Date());
		try {
			await postRequest('add', selectedItem);
		} catch (err) {
			console.error(err);
			throw err;
		}
		setIsModifsToFetch(true);
		setSelectedItem({});
		setSavePopup(false);
	}, [selectedItem]);

	const onDelete = useCallback(async (item) => {
		try {
			await deleteRequest(item._id);
		} catch (err) {
			console.error(err);
			throw err;
		}
		setIsModifsToFetch(true);
		setSelectedItem({});
		setDeletePopup(false);
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
			setData(res);
			setIsModifsToFetch(false);
		}
		loadData();
	}, [isModifsToFetch]);

	const filteredData = useMemo(() => {
		if (!data || !data.length) return;

		for (let e of data) e.formatedDeadline = getFormatedDate(e.deadline);
		data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
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
			valueToSave.description = descriptionValue ? descriptionValue : '';
			valueToSave.deadline = deadlineValue;
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
				{modifPopup && <ModifPopup item={selectedItem} onClose={() => setModifPopup(false)} onValid={onModif} popupType='Modify' />}
				{voidSavePopup && (
					<Popup title='No title detected' onClose={() => setVoidSavePopup(false)}>
						<span>You need to give a title to any item you want to save into your todolist.</span>
					</Popup>
				)}
				{savePopup && (
					<ModifPopup item={selectedItem} onClose={() => setSavePopup(false)} onValid={onSave} popupType='Save'>
						<span>You're about to save the following item: {titleValue}. Click below if you want to continue.</span>
					</ModifPopup>
				)}
				{deletePopup && (
					<ModifPopup item={selectedItem} onClose={() => setDeletePopup(false)} onValid={() => onDelete(selectedItem)} popupType='Delete'>
						<span>You're about to delete the following item: {selectedItem.title}. Click below if you want to continue.</span>
					</ModifPopup>
				)}
				{/* <ProgressBar barProgressValue={progressValue}/> */}
			</Container>
		</>
	);
}
