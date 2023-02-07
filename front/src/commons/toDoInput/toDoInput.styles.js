import styled from 'styled-components';
import { Input } from '../../index.globalStyles';

export const InputBox = styled.div`
	 {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		margin-right: var(--spacing);
	}
`;

export const UserInput = styled(Input)`
	outline: none;
	padding-left: var(--spacing-xsm);
	&[placeholder='Title...'] {
		width: 7.5rem;
		border-top-left-radius: var(--border-radius-lg);
		border-bottom-left-radius: var(--border-radius-lg);
		border-right: none;
		margin-left: var(--spacing-sm);
	}
	&[placeholder='Description...'] {
		width: 15rem;
		border-top-right-radius: var(--border-radius-lg);
		border-bottom-right-radius: var(--border-radius-lg);
		border-left: none;
	}
`;

export const CalendarBox = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-xsm);
	margin-right: var(--spacing-l);
	cursor: pointer;
`;

export const CalendarInput = styled(Input)`
	outline: none;
	width: 6rem;
	text-align: center;
	border-radius: var(--border-radius-lg);
`;

export const DatepickerBox = styled.div`
	position: absolute;
	top: 11rem;
`;
