import { useState } from 'react';
import { CalendarBox, DatepickerBox } from '../toDoInput/toDoInput.styles';
import { PopupInput, PopupCalendarInput, PopupInputsGrid } from './popup.styles';
import Popup from './popup';
import Datepicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getFormatedDate, useOutsideClick } from '../../utils';

export default function ModifPopup({ item, onModif, onClose }) {
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
		<Popup onValid={handleChange} validation='Save' onClose={onClose} title='Modify todo item'>
			<PopupInputsGrid>
				<span>Title</span>
				<PopupInput autoFocus onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
				<span>Description</span> <PopupInput onChange={(e) => setNewDescription(e.target.value)} value={newDescription} />
				<span>Deadline</span>
				<CalendarBox>
					<PopupCalendarInput disabled value={getFormatedDate(newDeadline)} />
					<div ref={calendarRef} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
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
					<PopupInput list='status' onChange={(e) => setNewStatus(e.target.value)} placeholder={newStatus ? 'done' : 'yet to do'} />
					<datalist id='status'>
						<option value='done' />
						<option value='yet to do' />
					</datalist>
				</div>
			</PopupInputsGrid>
		</Popup>
	);
}
