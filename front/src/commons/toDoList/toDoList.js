import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { TodoContainer, FilterBox, FilterButton, TodoEntries, TodoCategory } from './toDoList.styles';

export default function ToDoList(props) {
	function onCheck(item) {
		if (props.onModif) props.onModif(item._id, { status: !item.status });
	}

	return (
		<TodoContainer>
			<FilterBox>
				<FilterButton active={props.index === 0} onClick={() => props.setIndex(0)}>
					All items
				</FilterButton>
				<FilterButton active={props.index === 1} onClick={() => props.setIndex(1)}>
					Done
				</FilterButton>
				<FilterButton active={props.index === 2} onClick={() => props.setIndex(2)}>
					Yet to do
				</FilterButton>
			</FilterBox>
			{props.items?.length > 0 &&
				props.items.map((item, key) => (
					<TodoEntries key={key}>
						<TodoCategory onClick={() => props.handleModif(item)}>{item.title}</TodoCategory>
						<TodoCategory>{item.description}</TodoCategory>
						<TodoCategory>{item.formatedDeadline}</TodoCategory>
						<TodoCategory className='icon'>
							<FontAwesomeIcon onClick={() => props.onDelete(item)} icon={faTrash} />
						</TodoCategory>
						<TodoCategory className='icon'>
							<FontAwesomeIcon onClick={() => onCheck(item)} icon={item.status ? faCheck : faBan} />
						</TodoCategory>
					</TodoEntries>
				))}
		</TodoContainer>
	);
}
