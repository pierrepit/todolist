import styled from 'styled-components';
import { SaveButton } from '../../App.styles';
import { Button, Input } from '../../index.globalStyles';
import { CalendarInput } from '../toDoInput/toDoInput.styles';

export const PopupContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--col-dark);
	border-radius: var(--border-radius-sm);
	position: fixed;
	top: 11rem;
	z-index: 100;
	color: var(--col-aux);
	max-width: 23rem;
`;

export const PopupTop = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--spacing-sm);
`;

export const PopupCloseButton = styled(Button)`
	width: fit-content;
	height: fit-content;
	background-color: var(--col-light);
	color: var(--col);
	font-weight: bold;
	padding: 1px 2px 0 2px;
`;

export const PopupChildren = styled.span`
	margin: 0 var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
	& + ${SaveButton} {
		margin-bottom: 0;
	}
`;

export const PopupTitle = styled.div`
	font-size: 1.25rem;
	font-weight: bold;
	margin-left: var(--spacing-xsm);
	margin-top: var(--spacing-xsm);
	padding: 0 var(--spacing-xsm);
`;

export const PopupInputsGrid = styled.div`
	display: grid;
	grid-template: repeat(4, 1fr) / 1fr 3fr;
	gap: var(--spacing-sm);
`;

export const PopupInput = styled(Input)`
	border-color: var(--col-light);
	border-radius: var(--border-radius-lg);
	color: var(--col-light);
	padding-left: var(--spacing-xsm);
	&::placeholder {
		font-style: normal;
		color: var(--col-light);
	}
`;

export const PopupButton = styled(Button)`
	background-color: var(--col-light);
	width: fit-content;
	color: var(--col);
	font-weight: bold;
	margin: var(--spacing-sm) auto;
	&:active {
		background-color: var(--col-aux);
	}
`;

export const PopupCalendarInput = styled(CalendarInput)`
	border: 3px solid var(--col-light);
	color: var(--col-light);
`;
