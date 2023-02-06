import { useState } from 'react';
import { CalendarBox, DatepickerBox } from '../toDoInput/toDoInput.styles';
import {
	ModifWindowContainer,
	CloseButton,
	ModifWindowTitle,
	ModifWindowEntries,
	ModifWindowTop,
	ModifWindowSpan,
	ModifWindowInput,
	ModifWindowSaveButton,
	ModifWindowCalendarInput,
} from './modifWindow.styles';
import Datepicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getFormatedDate, useOutsideClick } from '../../utils';

export default function ModifWindow({ item, onModif, onClose }) {
	const [newTitle, setNewTitle] = useState(item.title);
	const [newDescription, setNewDescription] = useState(item.description);
	const [newDeadline, setNewDeadline] = useState(item.deadline);
	const [newStatus, setNewStatus] = useState(item.status);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const calendarRef = useOutsideClick(() => setIsCalendarOpen(false));

	function handleChange() {
		const field = {};
		if (newTitle !== item.title) field.title = newTitle;
		if (newDescription !== item.description) field.description = newDescription;
		if (newDeadline !== item.deadline) field.deadline = newDeadline;
		if (newStatus !== item.status) field.status = newStatus;
		if (onModif && Object.keys(field).length > 0) onModif(item._id, field);
	}

	function handleDeadlineChange(date) {
		setNewDeadline(date);
		setIsCalendarOpen(false);
	}

	return (
		<ModifWindowContainer>
			<ModifWindowTop>
				<ModifWindowTitle>Modify todo item</ModifWindowTitle>
				<CloseButton onClick={() => onClose()}>X</CloseButton>
			</ModifWindowTop>
			<ModifWindowEntries>
				<ModifWindowSpan>Title</ModifWindowSpan>
				<ModifWindowInput autoFocus onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
				<ModifWindowSpan>Description</ModifWindowSpan>{' '}
				<ModifWindowInput onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />
				<ModifWindowSpan>Deadline</ModifWindowSpan>
				<CalendarBox>
					<ModifWindowCalendarInput disabled value={getFormatedDate(newDeadline)} />
					<div ref={calendarRef} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
						<FontAwesomeIcon icon={faCalendarDays} size='lg' color='#dcf9f1' />
						{isCalendarOpen && (
							<DatepickerBox>
								<Datepicker onSelect={(date) => handleDeadlineChange(date)} dateFormat='dd/MM/yyyy' inline />
							</DatepickerBox>
						)}
					</div>
				</CalendarBox>
				<ModifWindowSpan>Status</ModifWindowSpan>
				<div>
					<ModifWindowInput list='status' onChange={(e) => setNewStatus(e.target.value)} placeholder={newStatus ? 'done' : 'yet to do'} />
					<datalist id='status'>
						<option value='done' />
						<option value='yet to do' />
					</datalist>
				</div>
			</ModifWindowEntries>
			<ModifWindowSaveButton onClick={() => handleChange()}>Save</ModifWindowSaveButton>
		</ModifWindowContainer>
	);
}
