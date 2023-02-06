import styled from 'styled-components';
import { Button, Input } from '../../index.globalStyles';
import { CalendarInput } from '../toDoInput/toDoInput.styles';

export const ModifWindowContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--col-dark);
	border-radius: var(--border-radius-sm);
	position: fixed;
	top: 10rem;
	z-index: 100;
`;

export const ModifWindowTop = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--spacing-sm);
`;

export const CloseButton = styled(Button)`
	width: fit-content;
	height: fit-content;
	background-color: var(--col-light);
	color: var(--col);
	font-weight: bold;
	padding: 1px 2px 0 2px;
`;

export const ModifWindowSpan = styled.span`
	color: var(--col-aux);
`;

export const ModifWindowTitle = styled(ModifWindowSpan)`
	font-size: 1.25rem;
	font-weight: bold;
	margin-left: 0.5rem;
	margin-top: 0.5rem;
`;

export const ModifWindowEntries = styled.div`
	display: grid;
	grid-template: repeat(4, 1fr) / 1fr 3fr;
	gap: var(--spacing-sm);
	margin: 0 var(--spacing-sm);
`;

export const ModifWindowInput = styled(Input)`
	border-color: var(--col-light);
	border-radius: var(--border-radius-lg);
	color: var(--col-light);
	padding-left: 0.5rem;
	&::placeholder {
		font-style: normal;
		color: var(--col-light);
	}
`;

export const ModifWindowSaveButton = styled(Button)`
	background-color: var(--col-light);
	width: fit-content;
	color: var(--col);
	font-weight: bold;
	margin: var(--spacing-sm) auto;
	&:active {
		background-color: var(--col-aux);
	}
`;

export const ModifWindowCalendarInput = styled(CalendarInput)`
	border: 3px solid var(--col-light);
	color: var(--col-light);
`;
