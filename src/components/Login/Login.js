import {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../hooks/useForm';

function Login ({isOpen, onClose, onSwitch, onLogin, errorMessage}) {

	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

	useEffect(() => {
		resetForm({email: '', password: ''},{},false);
	}, [isOpen, resetForm])

	function handleSubmit(e) {
		e.preventDefault();
		const email = values.email;
		const password = values.password;
		if (!email || !password) {
			return;
		}
		onLogin(email, password);
	}

	return (
		<PopupWithForm name={'edit'}
									 title={'Вход'}
									 isOpen={isOpen}
									 onClose={onClose}
									 onSwitch={onSwitch}
									 onSubmit={handleSubmit}
									 >
			<label className="popup__label" htmlFor="email">Email</label>
				<input name="email"
							 id="email"
							 className={`popup__input popup__email`}
							 type="email"
							 required
					    	 minLength="8"
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
			<span className={`popup__input-error_registration ${errorMessage && 'popup__input-error_registration_active'} `}>
				{errorMessage}
			</span>
			<button disabled={!isValid} type="submit" className={`popup__save ${!isValid && 'popup__save_disabled'} `} onSubmit={handleSubmit}>Войти</button>
		</PopupWithForm>
	)

}

export default Login;