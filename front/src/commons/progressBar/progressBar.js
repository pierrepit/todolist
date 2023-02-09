import { BarContainer, BarValue } from './progressBar.styles';

export default function ProgressBar({ percentage = 0 }) {
	return (
		<>
			<span style={{ whiteSpace: 'nowrap' }}>You achieved {percentage}% of your tasks !</span>
			<BarContainer>
				<BarValue value={percentage + '%'} />
			</BarContainer>
		</>
	);
}
