import styled from 'styled-components';
import { Button } from './index.globalStyles';

export const Container = styled.div.attrs({
	'data-id': 'Container',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--spacing-sm);
`;

export const Title = styled.h1.attrs({
	'data-id': 'Title',
})`
	height: 5rem;
	padding-top: var(--spacing);
	font-size: 4rem;
	background-image: linear-gradient(to right, var(--col-dark), #0014ff, #3ab7ff, var(--col-light));
	color: transparent;
	background-clip: text;
	-webkit-background-clip: text;
`;

export const SaveButton = styled(Button).attrs({
	'data-id': 'SaveButton',
})`
	margin: var(--spacing-sm);
	&:active {
		background-color: var(--col-dark);
	}
`;

export const InputsWrapper = styled.div.attrs({
	'data-id': 'InputsWrapper',
})`
	display: flex;
	align-items: center;
	margin: 0 var(--spacing-xl);
	flex-wrap: wrap;
	@media (max-width: 1000px) {
		${SaveButton} {
			margin-left: auto;
		}
	}
`;

export const TodoWrapper = styled.div.attrs({
	'data-id': 'TodoWrapper',
})`
	display: flex;
	justify-content: center;
	margin: var(--spacing) var(--spacing-xl) var(--spacing-xl) var(--spacing-xl);
`;
