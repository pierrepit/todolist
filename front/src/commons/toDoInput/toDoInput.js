import { useState, useEffect } from 'react';
import { getFormatedDate, useOutsideClick } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserInput, InputBox, CalendarBox, CalendarInput, DatepickerBox } from './toDoInput.styles';

export default function ToDoInput({ onTitleChange, onDescriptionChange, onDeadlineChange, titleValue, descriptionValue, deadlineValue }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [deadline, setDeadline] = useState(new Date());
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const ref = useOutsideClick(() => setIsCalendarOpen(false));

	useEffect(() => {
		setTitle(titleValue);
		setDescription(descriptionValue);
		setDeadline(deadlineValue);
	}, [titleValue, descriptionValue, deadlineValue]);

	function handleDeadlineChange(date) {
		if (onDeadlineChange) onDeadlineChange(date);
		setIsCalendarOpen(false);
	}

	return (
		<>
			<InputBox>
				<FontAwesomeIcon icon={faArrowAltCircleRight} color='white' size='lg' />
				<UserInput autoFocus placeholder='Title...' required={true} onChange={onTitleChange} value={title} />
				<UserInput placeholder='Description...' onChange={onDescriptionChange} value={description} />
			</InputBox>
			<CalendarBox>
				<CalendarInput disabled onChange={onDescriptionChange} value={getFormatedDate(deadline)} />
				<div ref={ref} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
					<FontAwesomeIcon icon={faCalendarDays} size='lg' />
					{isCalendarOpen && (
						<DatepickerBox>
							<Datepicker onSelect={(date) => handleDeadlineChange(date)} selected={deadline} dateFormat='dd/MM/yyyy' inline />
						</DatepickerBox>
					)}
				</div>
			</CalendarBox>
		</>
	);
}
