import './PopupWithForm.css';

function PopupWithForm({children, isOpen, onClose , title, onSwitch, onSubmit}) {

	return (
		<div className={`popup  ${isOpen && 'popup_active'}`}>
			<form onSubmit={onSubmit} className={`popup__container ${title === 'Регистрация' && 'popup__container_registration'}`}>
				<h2 className="popup__title popup__title_position">{title}</h2>
				{children}
				<button type="button" className="popup__close" onClick={onClose}/>
				<p className="popup__switch">или
					<button type="button" onClick={onSwitch} className="popup__switch-button">{title === 'Вход' ? 'Зарегистрироваться' : 'Войти'}</button>
				</p>
			</form>
		</div>
	)
}

export default PopupWithForm;