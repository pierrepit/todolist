import { useState, useEffect, useMemo } from 'react';
import { getRequest, postRequest, deleteRequest, getFormatedDate } from './utils';
import ToDoInput from './commons/toDoInput/toDoInput';
import ToDoList from './commons/toDoList/toDoList';
import ModifPopup from './commons/popup/modifPopup';
import Popup from './commons/popup/popup';
import ProgressBar from './commons/progressBar/progressBar';
import { Container, InputsWrapper, TodoWrapper, Title, SaveButton } from './App.styles';

export default function App() {
	const [data, setData] = useState([]);
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState(new Date());
	const [doneFilter, setDoneFilter] = useState(0);
	const [progressValue, setProgressValue] = useState(0);
	const [selectedItem, setSelectedItem] = useState({});
	const [modifPopup, setModifPopup] = useState(false);
	const [savePopup, setSavePopup] = useState(false);
	const [voidSavePopup, setVoidSavePopup] = useState(false);
	const [deletePopup, setDeletePopup] = useState(false);
	const [isModifsToFetch, setIsModifsToFetch] = useState(false);

	useEffect(() => {
		async function loadData() {
			const res = await getRequest('/');
			setData(res);
			setIsModifsToFetch(false);
		}
		loadData();
	}, [isModifsToFetch]);

	useEffect(() => {
		if (!data || !data.length) return;
		if (data.filter((e) => e.status).length > 0) setProgressValue(Math.round((100 * data.filter((e) => e.status).length) / data.length));
		else setProgressValue(0);
	}, [data]);

	const filteredData = useMemo(() => {
		if (!data || !data.length) return;

		for (let e of data) e.formatedDeadline = getFormatedDate(e.deadline);
		data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		if (doneFilter === 1) return data.filter((e) => e.status);
		else if (doneFilter === 2) return data.filter((e) => !e.status);
		else return data;
	}, [data, doneFilter]);

	const onSave = async () => {
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
	};

	const onDelete = async (item) => {
		try {
			await deleteRequest(item._id);
		} catch (err) {
			console.error(err);
			throw err;
		}
		setIsModifsToFetch(true);
		setSelectedItem({});
		setDeletePopup(false);
	};

	const onModif = async (item, field) => {
		const res = await postRequest('update/' + item._id, field);
		if (res.ok) {
			setIsModifsToFetch(true);
			if (modifPopup) setModifPopup(false);
		}
		setSelectedItem({});
	};

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
				<ProgressBar percentage={progressValue} />
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
			</Container>
		</>
	);
}
