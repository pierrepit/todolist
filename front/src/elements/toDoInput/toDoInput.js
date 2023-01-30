import styles from './toDoInput.module.css';
import { useState, useEffect } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function Input({ onTitleChange, onDescriptionChange, onDeadlineChange, titleValue, descriptionValue, deadlineValue }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [deadline, setDeadline] = useState('');
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	useEffect(() => {
		setTitle(titleValue);
		setDescription(descriptionValue);
		setDeadline(deadlineValue);
	}, [titleValue, descriptionValue, deadlineValue]);

	return (
		<>
			<div className={styles.input}>
				<input placeholder='Title...' required={true} onChange={onTitleChange} value={title} />
				<input placeholder='Description...' onChange={onDescriptionChange} value={description} />
			</div>
			<div className={styles.calendar_icon} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
				<FontAwesomeIcon icon={faCalendarDays} />
			</div>
			{isCalendarOpen && (
				<div className={styles.datepicker}>
					<Datepicker onSelect={onDeadlineChange} selected={deadline} dateFormat='dd/MM/yyyy' inline />
				</div>
			)}
		</>
	);
}
