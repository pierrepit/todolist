import styled from 'styled-components';
import { Button, Input } from '../../index.globalStyles';
import { CalendarInput } from '../toDoInput/toDoInput.styles';

export const WindowContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--col-dark);
	border-radius: var(--border-radius-sm);
	position: fixed;
	top: 10rem;
	z-index: 100;
`;

export const WindowTop = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--spacing-sm);
`;

export const WindowCloseButton = styled(Button)`
	width: fit-content;
	height: fit-content;
	background-color: var(--col-light);
	color: var(--col);
	font-weight: bold;
	padding: 1px 2px 0 2px;
`;

export const WindowSpan = styled.span`
	color: var(--col-aux);
`;

export const WindowTitle = styled(WindowSpan)`
	font-size: 1.25rem;
	font-weight: bold;
	margin-left: 0.5rem;
	margin-top: 0.5rem;
`;

export const WindowEntries = styled.div`
	display: grid;
	grid-template: repeat(4, 1fr) / 1fr 3fr;
	gap: var(--spacing-sm);
	margin: 0 var(--spacing-sm);
`;

export const WindowInput = styled(Input)`
	border-color: var(--col-light);
	border-radius: var(--border-radius-lg);
	color: var(--col-light);
	padding-left: 0.5rem;
	&::placeholder {
		font-style: normal;
		color: var(--col-light);
	}
`;

export const WindowButton = styled(Button)`
	background-color: var(--col-light);
	width: fit-content;
	color: var(--col);
	font-weight: bold;
	margin: var(--spacing-sm) auto;
	&:active {
		background-color: var(--col-aux);
	}
`;

export const WindowCalendarInput = styled(CalendarInput)`
	border: 3px solid var(--col-light);
	color: var(--col-light);
`;
