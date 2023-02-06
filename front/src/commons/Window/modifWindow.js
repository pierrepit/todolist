import { useState } from 'react';
import { CalendarBox, DatepickerBox } from '../toDoInput/toDoInput.styles';
import {
	WindowContainer,
	WindowCloseButton,
	WindowTitle,
	WindowEntries,
	WindowTop,
	WindowSpan,
	WindowInput,
	WindowButton,
	WindowCalendarInput,
} from './Window.styles';
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
		if (onModif && Object.keys(field).length > 0) onModif(item, field);
	}

	function handleDeadlineChange(date) {
		setNewDeadline(date);
		setIsCalendarOpen(false);
	}

	return (
		<WindowContainer>
			<WindowTop>
				<WindowTitle>Modify todo item</WindowTitle>
				<WindowCloseButton onClick={() => onClose()}>X</WindowCloseButton>
			</WindowTop>
			<WindowEntries>
				<WindowSpan>Title</WindowSpan>
				<WindowInput autoFocus onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
				<WindowSpan>Description</WindowSpan> <WindowInput onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />
				<WindowSpan>Deadline</WindowSpan>
				<CalendarBox>
					<WindowCalendarInput disabled value={getFormatedDate(newDeadline)} />
					<div ref={calendarRef} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
						<FontAwesomeIcon icon={faCalendarDays} size='lg' color='#dcf9f1' />
						{isCalendarOpen && (
							<DatepickerBox>
								<Datepicker onSelect={(date) => handleDeadlineChange(date)} dateFormat='dd/MM/yyyy' inline />
							</DatepickerBox>
						)}
					</div>
				</CalendarBox>
				<WindowSpan>Status</WindowSpan>
				<div>
					<WindowInput list='status' onChange={(e) => setNewStatus(e.target.value)} placeholder={newStatus ? 'done' : 'yet to do'} />
					<datalist id='status'>
						<option value='done' />
						<option value='yet to do' />
					</datalist>
				</div>
			</WindowEntries>
			<WindowButton onClick={() => handleChange()}>Save</WindowButton>
		</WindowContainer>
	);
}
