import { PopupContainer, PopupCloseButton, PopupTitle, PopupTop, PopupButton, PopupChildren } from './popup.styles';

export default function Popup({ title, onClose, children, onValid, validation }) {
	return (
		<PopupContainer>
			<PopupTop>
				<PopupTitle>{title}</PopupTitle>
				<PopupCloseButton onClick={() => onClose()}>X</PopupCloseButton>
			</PopupTop>
			<PopupChildren>{children}</PopupChildren>
			{onValid && validation && <PopupButton onClick={() => onValid()}>{validation}</PopupButton>}
		</PopupContainer>
	);
}
