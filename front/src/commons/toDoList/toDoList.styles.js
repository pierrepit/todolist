import styled from 'styled-components';
import { Button } from '../../index.globalStyles';

export const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: var(--spacing) var(--spacing-l) var(--spacing-l) var(--spacing-l);
	border-radius: 0 100px 0 100px;
	background-color: inherit;
	border: var(--border);
	gap: 0.25rem;
	@media (min-width: 1200px) {
		width: 1050px;
	}
	@media (max-width: 1199px) {
		width: 850px;
	}
	@media (max-width: 955px) {
		width: 650px;
	}
	@media (max-width: 767px) {
		width: 450px;
	}
`;

export const FilterBox = styled.div.attrs({
	'data-id': 'FilterBox',
})`
	display: flex;
	justify-content: space-evenly;
`;

export const FilterButton = styled(Button).attrs({
	'data-id': 'FilterButton',
})`
	margin: 0 var(--spacing) var(--spacing-l) var(--spacing);
	${({ active }) =>
		active &&
		`
		background-color: var(--col-dark);
		&:hover {
			background-color: var(--col-dark);
	}`}
`;

export const TodoEntries = styled.div.attrs({
	'data-id': 'TodoEntries',
})`
	 {
		display: grid;
		grid-template-columns: 2.5fr 8.25fr 2.5fr 1fr 0.75fr;
		border-bottom: 1px solid var(--col-aux);
		&:last-child {
			border-bottom: none;
		}
		@media (max-width: 991px) {
			grid-template-columns: 3.5fr 6.75fr 3fr 1fr 0.75fr;
		}
	}
`;

export const TodoCategory = styled.div.attrs({
	'data-id': 'TodoCategory',
})`
	 {
		white-space: nowrap;
		text-overflow: ellipsis;
		display: block;
		overflow: hidden;
		width: 100%;
		padding-left: 4px;
		&.icon {
			cursor: pointer;
			padding-left: var(--spacing-xsm);
			width: fit-content;
		}
		&:first-of-type {
			cursor: pointer;
			color: ${(props) => (props.late ? 'red' : 'var(--col-light)')};
		}
	}
`;
