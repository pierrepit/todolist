import { useState } from 'react';
import { getFormatedDate, useOutsideClick } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Datepicker from 'react-datepicker';
import { UserInput, InputBox, CalendarBox, CalendarInput, DatepickerBox } from './toDoInput.styles';

export default function ToDoInput({ onTitleChange, onDescriptionChange, onDeadlineChange, titleValue, descriptionValue, deadlineValue }) {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const ref = useOutsideClick(() => setIsCalendarOpen(false));

	function handleDeadlineChange(date) {
		if (onDeadlineChange) onDeadlineChange(date);
		setIsCalendarOpen(false);
	}

	return (
		<>
			<InputBox>
				<FontAwesomeIcon icon={faArrowAltCircleRight} color='#dcf9f1' size='lg' />
				<UserInput autoFocus placeholder='Title...' required={true} onChange={onTitleChange} value={titleValue} />
				<UserInput placeholder='Description...' onChange={onDescriptionChange} value={descriptionValue} />
			</InputBox>
			<CalendarBox>
				<CalendarInput disabled value={getFormatedDate(deadlineValue)} />
				<div ref={ref} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
					<FontAwesomeIcon icon={faCalendarDays} size='lg' />
					{isCalendarOpen && (
						<DatepickerBox>
							<Datepicker onSelect={(date) => handleDeadlineChange(date)} selected={deadlineValue} dateFormat='dd/MM/yyyy' inline />
						</DatepickerBox>
					)}
				</div>
			</CalendarBox>
		</>
	);
}
