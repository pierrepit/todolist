import styles from './toDoInput.module.css';
import { useState, useEffect } from 'react';

export default function Input({ onTitleChange, onDescChange, onDeadlineChange, itemTitle, itemDesc, itemDeadline }) {
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [deadlineValue, setDeadlineValue] = useState('');

	useEffect(() => {
		setTitleValue(itemTitle);
		setDescriptionValue(itemDesc);
		setDeadlineValue(itemDeadline);
	}, [itemTitle, itemDesc, itemDeadline]);

	return (
		<div className={styles.input}>
			<input placeholder='Title...' required={true} onChange={onTitleChange} value={titleValue} />
			<input placeholder='Description...' onChange={onDescChange} value={descriptionValue} />
		</div>
	);
}
