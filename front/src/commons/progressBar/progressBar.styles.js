import styled from 'styled-components';

export const BarContainer = styled.div.attrs({
	'data-id': 'ProgressBar',
})`
	height: 1.5rem;
	width: 16rem;
	border: var(--border);
	margin-bottom: var(--spacing-sm);
`;

export const BarValue = styled.div.attrs({
	'data-id': 'ProgressValue',
})`
	height: 100%;
	color: transparent;
	background-image: linear-gradient(to right, var(--col-dark), #0014ff, #3ab7ff, var(--col-light));
	background-size: 16rem;
	width: ${(props) => props.value};
`;
