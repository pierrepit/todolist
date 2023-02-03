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
		background-color: var(--bg-dark);
		&:hover {
			background-color: var(--bg-dark);
	}`}
`;

export const TodoEntries = styled.div`
	 {
		display: grid;
		grid-template-columns: 2.5fr 9fr 2.5fr 0.5fr 0.5fr;
		border-bottom: 1px solid var(--fg-aux);
		&:last-child {
			border-bottom: none;
		}
		@media (max-width: 984px) {
			grid-template-columns: 3.5fr 6fr 3.5fr 1fr 1fr;
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
			font-weight: bold;
		}
	}
`;
