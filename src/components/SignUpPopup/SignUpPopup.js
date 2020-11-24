import './SignUpPopup.css';
import {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useForm';

function SignUpPopup ({isOpen, onClose, onSwitch}) {

	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

	useEffect(() => {
		resetForm({email: '', password: '', name: ''},{},false);
	}, [isOpen, resetForm])

	return (
		<PopupWithForm name={'edit'}
									 title={'Регистрация'}
									 isOpen={isOpen}
									 onClose={onClose}
									 onSwitch={onSwitch}
		>
			<label className="popup__label" htmlFor="email-registration">Email</label>
			<input name="email"
						 id="email-registration"
						 className={`popup__input popup__email `}
						 type="email"
						 required
						 maxLength="40"
						 placeholder="Введите почту"
						 onChange={handleChange}
						 value={values.email || ''}
			/>
			<span
				className={`popup__input-error popup__name-error popup__input-error_active ${!isValid && 'popup__input-error_active'}`}>{ errors.email || '' }</span>
			<label className="popup__label" htmlFor="password-registration">Пароль</label>
			<input name="password"
						 id="password-registration"
						 className={`popup__input  popup__password `}
						 type="password"
						 required
						 minLength="5"
						 maxLength="40"
						 placeholder="Введите пароль"
						 onChange={handleChange}
						 value={values.password || ''}
			/>
			<span
				className={`popup__input-error popup__specialty-error popup__input-error_active ${!isValid && 'popup__input-error_active'}`}>{ errors.password || '' }</span>
			<label className="popup__label" htmlFor="name">Имя</label>
			<input name="name"
						 id="name"
						 className={`popup__input  popup__name`}
						 type="text"
						 required
						 minLength="2"
						 maxLength="40"
						 placeholder="Введите своё имя"
						 onChange={handleChange}
						 value={values.name || ''}
			/>
			<span
				className={`popup__input-error popup__specialty-error popup__input-error_active ${!isValid && 'popup__input-error_active'}`}>{ errors.name || '' }</span>
			<span
				className={`popup__input-error_registration `}
			/>
		</PopupWithForm>
	)

}

export default SignUpPopup;