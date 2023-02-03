import styled from 'styled-components';
import { Button } from './index.globalStyles';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--spacing-sm);
`;

export const Title = styled.h1`
	height: 5rem;
	padding-top: var(--spacing);
	font-size: 4rem;
	background-image: linear-gradient(to right, var(--col-dark), #0014ff, #3ab7ff, var(--col-light));
	color: transparent;
	background-clip: text;
	-webkit-background-clip: text;
`;

export const SaveButton = styled(Button)`
	&:active {
		background-color: var(--col-dark);
	}
	margin: var(--spacing-sm);
`;

export const InputsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0 var(--spacing-xl);
	flex-wrap: wrap;
	@media (max-width: 990px) {
		${SaveButton} {
			margin-left: auto;
		}
	}
`;

export const TodoWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: var(--spacing) var(--spacing-xl) var(--spacing-xl) var(--spacing-xl);
`;
