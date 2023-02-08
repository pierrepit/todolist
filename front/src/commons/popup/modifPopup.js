import { useState } from 'react';
import { CalendarBox, DatepickerBox } from '../toDoInput/toDoInput.styles';
import { PopupInput, PopupCalendarInput, PopupInputsGrid } from './popup.styles';
import Popup from './popup';
import Datepicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getFormatedDate, useOutsideClick } from '../../utils';

export default function ModifPopup({ item, onValid, onClose, popupType }) {
	const [newTitle, setNewTitle] = useState(item.title);
	const [newDescription, setNewDescription] = useState(item.description);
	const [newDeadline, setNewDeadline] = useState(item.deadline);
	const [newStatus, setNewStatus] = useState(item.status);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const calendarRef = useOutsideClick(() => setIsCalendarOpen(false));

	function handleValid() {
		if (popupType === 'Modify') {
			const field = {};
			if (newTitle !== item.title) field.title = newTitle;
			if (newDescription !== item.description) field.description = newDescription;
			if (newDeadline !== item.deadline) field.deadline = newDeadline;
			if (newStatus !== item.status) field.status = newStatus;
			if (Object.keys(field).length > 0) onValid(item, field);
		} else if (popupType === 'Save') {
			const newItem = {};
			newItem.title = newTitle;
			newItem.description = newDescription;
			newItem.deadline = newDeadline;
			newItem.status = newStatus;
			onValid(newItem);
		} else onValid(item);
	}

	function handleDeadlineChange(date) {
		setNewDeadline(date);
		setIsCalendarOpen(false);
	}

	function onCalendarClick() {
		if (popupType === 'Delete') return;
		setIsCalendarOpen(!isCalendarOpen);
	}

	const titleSentence = popupType === 'Save' ? 'Save new item ?' : popupType === 'Delete' ? 'Delete item ?' : 'Modify item ?';

	return (
		<Popup onValid={handleValid} onClose={onClose} validation={popupType} title={titleSentence}>
			<PopupInputsGrid>
				<span>Title</span>
				<PopupInput autoFocus disabled={popupType === 'Delete'} onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
				<span>Description</span>
				<PopupInput disabled={popupType === 'Delete'} onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />
				<span>Deadline</span>
				<CalendarBox disabled={popupType === 'Delete'}>
					<PopupCalendarInput disabled value={getFormatedDate(newDeadline)} />
					<div ref={calendarRef} onClick={onCalendarClick}>
						<FontAwesomeIcon icon={faCalendarDays} size='lg' color='#dcf9f1' />
						{isCalendarOpen && (
							<DatepickerBox>
								<Datepicker onSelect={(date) => handleDeadlineChange(date)} dateFormat='dd/MM/yyyy' inline />
							</DatepickerBox>
						)}
					</div>
				</CalendarBox>
				<span>Status</span>
				<div>
					<PopupInput
						list='status'
						disabled={popupType === 'Delete'}
						onChange={(e) => setNewStatus(e.target.value)}
						placeholder={newStatus ? 'done' : 'yet to do'}
					/>
					<datalist id='status'>
						<option value='done' />
						<option value='yet to do' />
					</datalist>
				</div>
			</PopupInputsGrid>
		</Popup>
	);
}
