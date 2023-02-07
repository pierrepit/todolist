import styled from 'styled-components';
import { Button } from '../../index.globalStyles';

export const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	padding: var(--spacing) var(--spacing-l) var(--spacing-l) var(--spacing-l);
	border-radius: 0 100px 0 100px;
	background-color: inherit;
	border: var(--border);
	gap: 0.25rem;
`;

export const FilterBox = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const FilterButton = styled(Button)`
	margin: 0 var(--spacing) var(--spacing-l) var(--spacing);
	${({ active }) =>
		active &&
		`
		background-color: var(--col-dark);
		&:hover {
			background-color: var(--col-dark);
	}`}
`;

export const TodoEntries = styled.div`
	 {
		display: grid;
		grid-template-columns: 2.5fr 8.5fr 2.5fr 0.75fr 0.75fr;
		border-bottom: 1px solid var(--col-aux);
		&:last-child {
			border-bottom: none;
		}
		@media (max-width: 984px) {
			grid-template-columns: 3.5fr 7fr 3fr 0.75fr 0.75fr;
		}
	}
`;

export const TodoCategory = styled.div`
	 {
		white-space: nowrap;
		text-overflow: ellipsis;
		display: block;
		overflow: hidden;
		width: 100%;
		padding-left: 4px;
		&.icon {
			justify-self: flex-end;
			cursor: pointer;
		}
		&:first-of-type {
			cursor: pointer;
			color: var(--col-light);
		}
	}
`;
