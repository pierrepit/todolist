//import styles from './toDoList.module.css'

export default function ToDoList(props) {
	return (
		<>
			{props.items.length > 0 &&
				props.items.map((item, key) => (
					<div key={key}>
						<>{item.title}</>
						<>{item.description}</>
					</div>
				))}
		</>
	);
}
