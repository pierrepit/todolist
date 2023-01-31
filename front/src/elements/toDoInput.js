import { useState, useEffect } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getFormatedDate, useOutsideClick } from '../utils';

export default function Input({ onTitleChange, onDescriptionChange, onDeadlineChange, titleValue, descriptionValue, deadlineValue }) {
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
			<div className='input'>
				<input autoFocus className='input_entries' placeholder='Title...' required={true} onChange={onTitleChange} value={title} />
				<input className='input_entries' placeholder='Description...' onChange={onDescriptionChange} value={description} />
			</div>
			<div className='calendar_container' onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
				<input className='calendar_input' onChange={onDescriptionChange} value={getFormatedDate(deadline)} />
				<FontAwesomeIcon icon={faCalendarDays} />
			</div>
			{isCalendarOpen && (
				<div className='datepicker' ref={ref}>
					<Datepicker onSelect={(date) => handleDeadlineChange(date)} selected={deadline} dateFormat='dd/MM/yyyy' inline />
				</div>
			)}
		</>
	);
}
