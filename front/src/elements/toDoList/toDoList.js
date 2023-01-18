import styles from './toDoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDoList(props) {
	return (
		<div className={styles.todolist}>
			{props.items.length > 0 &&
				props.items.map((item, key) => (
					<div key={key} className={styles.entries}>
						<div className={styles.categories}>{item.title}</div>
						<div className={styles.categories}>{item.description}</div>
						<div className={styles.categories + ' ' + styles.trash}>
							<FontAwesomeIcon onClick={() => props.deleteItems(item)} icon={faTrash} />
						</div>
					</div>
				))}
			<div className={styles.buttons_container}>
				<button onClick={() => props.setShownItems([...props.doneItems, ...props.undoneItems])}>All items</button>
				<button onClick={() => props.setShownItems(props.doneItems)}>Done</button>
				<button onClick={() => props.setShownItems(props.undoneItems)}>Not done</button>
			</div>
		</div>
	);
}
