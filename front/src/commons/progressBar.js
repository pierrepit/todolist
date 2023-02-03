export default function ProgressBar({ barProgressValue = 0 }) {
	return (
		<div className='progressbar'>
			<div className='progressbar_static'>
				<div className='progressbar-dynamic' style={{ width: barProgressValue + '%', opacity: barProgressValue + '%' }} />
			</div>
			{barProgressValue + '%'}
		</div>
	);
}
