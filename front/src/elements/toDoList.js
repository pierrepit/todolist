import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDoList(props) {
	return (
		<div className='todolist'>
			<div className='todolist_buttons'>
				<button className={(props.index === 0 ? 'todolist_filter--selected ' : '') + 'todolist_filter'} onClick={() => props.setIndex(0)}>
					All items
				</button>
				<button className={(props.index === 1 ? 'todolist_filter--selected ' : '') + 'todolist_filter'} onClick={() => props.setIndex(1)}>
					Done
				</button>
				<button className={(props.index === 2 ? 'todolist_filter--selected ' : '') + 'todolist_filter'} onClick={() => props.setIndex(2)}>
					Not done
				</button>
			</div>
			{props.items.length > 0 &&
				props.items.map((item, key) => (
					<div key={key} className='todolist_entries'>
						<div className='todolist_categories'>{item.title}</div>
						<div className='todolist_categories'>{item.description}</div>
						<div className='todolist_categories'>{item.formatedDeadline}</div>
						<div className='todolist_categories trash'>
							<FontAwesomeIcon onClick={() => props.onDelete(item)} icon={faTrash} />
						</div>
					</div>
				))}
		</div>
	);
}
