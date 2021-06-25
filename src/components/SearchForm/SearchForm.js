import './SearchForm.css';
import useFormWithValidation from '../../hooks/useForm';
import {useEffect} from "react";

function SearchForm({isBurgerMenu, onGetNews}) {

	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

	useEffect(() => {
		resetForm({request: ''},{},false);
	}, [])

	function handleGetNews(e) {
		e.preventDefault();
		const req = values.request;
		onGetNews(req);
	}

	return (
		<section className={`${isBurgerMenu && 'search-form_burger-menu'} search-form`} >
			<h1 className="search-form__title">Что творится в мире?</h1>
			<p className="search-form__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
			<form  onSubmit={handleGetNews} className="search-form__form">
				<input minLength="1" maxLength="19" name="request" id="request" onChange={handleChange} value={values.request || ''} required className="search-form__input" placeholder='Введите тему новости'/>
				<button disabled={!isValid} onSubmit={handleGetNews} className={`search-form__button ${!isValid && 'search-form__button_disabled'}`}>Искать</button>
			</form>
		</section>
	)
}

export default SearchForm;