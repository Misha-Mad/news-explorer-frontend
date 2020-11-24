function InfoTooltip({isOpen, onClose, onSwitch}) {

	return (
		<div className={`popup ${isOpen && 'popup_active'}`}>
			<form noValidate className={`popup__container  popup__container_type_info`}
						name={'info'} >
				<div className={`popup__info popup__info_access`}/>
				<h2 className='popup__title popup__title_tooltip'>Пользователь успешно зарегистрирован!</h2>
				<button type="button" onClick={onSwitch} className="popup__switch-button popup__switch-button_tooltip">Войти</button>
				<button type="button" className="popup__close" onClick={onClose}/>
			</form>
		</div>
	)
}

export default InfoTooltip;