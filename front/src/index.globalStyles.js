import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;  
}

:root {
	--spacing-xl: 8rem;
	--spacing-l: 4rem;
	--spacing: 2rem;
	--spacing-sm: 1rem;
	--spacing-xsm: 0.5rem;
	--col: #200648;
	--col-aux: #778f8c;
	--col-dark: #260b4c;
	--col-light: #dcf9f1;
	--border: 3px solid #200648;
	--border-radius-lg: 25px;
	--border-radius-sm: 5px;
    font-size: 16px;
	color: var(--col);
	line-height: 24px;
	color-scheme: dark;
	background: -moz-radial-gradient(center, ellipse cover, #90b9e1 1%, #260b4c 98%); /* FF3.6-15 */
	background: -webkit-radial-gradient(center, ellipse cover, #90b9e1 1%, #260b4c 98%); /* Chrome10-25,Safari5.1-6 */
	background: radial-gradient(ellipse at center, #90b9e1 1%, #260b4c 98%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#90b9e1', endColorstr='#260b4c',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

body {
	min-height: 100vh;
	font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
`;
export const Input = styled.input.attrs({
	'data-id': 'Input',
})`
	 {
		font-size: 1rem;
		color: var(--col);
		border: var(--border);
		height: 1.5rem;
		background-color: inherit;
		&::placeholder {
			color: var(--col-aux);
			font-style: italic;
		}
	}
`;

export const Button = styled.button.attrs({
	'data-id': 'Button',
})`
	border: var(--border);
	border-radius: var(--border-radius-sm);
	font-size: 1.25rem;
	padding: 4px;
	background-color: inherit;
	cursor: pointer;
	white-space: nowrap;
	min-width: max-content;
	color: var(--col-light);
	&:hover {
		background-color: var(--col-aux);
	}
`;

export default GlobalStyle;
