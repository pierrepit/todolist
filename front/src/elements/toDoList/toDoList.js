import styles from './toDoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDoList(props) {
	return (
		<div className={styles.todolist}>
			<div className={styles.buttons_container}>
				<button onClick={() => props.setShownItems(0)}>All items</button>
				<button onClick={() => props.setShownItems(1)}>Done</button>
				<button onClick={() => props.setShownItems(2)}>Not done</button>
			</div>
			{props.items.length > 0 &&
				props.items.map((item, key) => (
					<div key={key} className={styles.entries}>
						<div className={styles.categories}>{item.title}</div>
						<div className={styles.categories}>{item.description}</div>
						<div className={styles.categories}>{item.formatedDeadline}</div>
						<div className={styles.categories + ' ' + styles.trash}>
							<FontAwesomeIcon onClick={() => props.deleteItems(item)} icon={faTrash} />
						</div>
					</div>
				))}
		</div>
	);
}
