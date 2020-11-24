import './SignInPopup.css';
import {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useForm';

function SignInPopup ({isOpen, onClose, onSwitch}) {

	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

	useEffect(() => {
		resetForm({email: '', password: ''},{},false);
	}, [isOpen, resetForm])

	return (
		<PopupWithForm name={'edit'}
									 title={'Вход'}
									 isOpen={isOpen}
									 onClose={onClose}
									 onSwitch={onSwitch}
									 >
			<label className="popup__label" htmlFor="email">Email</label>
				<input name="email"
							 id="email"
							 className={`popup__input popup__email`}
							 type="email"
							 required
							 maxLength="40"
							 placeholder="Введите почту"
							 onChange={handleChange}
							 value={values.email || ''}
				/>
				<span
					className={`popup__input-error popup__name-error ${!isValid && 'popup__input-error_active'}`}>{ errors.email || '' }</span>
				<label className="popup__label" htmlFor="password">Пароль</label>
				<input name="password"
							 id="password"
							 className={`popup__input  popup__password`}
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
				<span
					className={`popup__input-error_registration `}
				/>
		</PopupWithForm>
	)

}

export default SignInPopup;