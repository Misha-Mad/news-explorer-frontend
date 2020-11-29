import './SearchForm.css';
import useFormWithValidation from '../../hooks/useForm';
import {useEffect} from "react";

function SearchForm({isBurgerMenu, onGetNews}) {

	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

	function handleGetNews(e) {
		e.preventDefault();
		const req = values.request;
		onGetNews(req);
	}

	return (
		<section className={`${isBurgerMenu && 'search-form_burger-menu'} search-form`} >
			<h1 className="search-form__title">Что творится в мире?</h1>
			<p className="search-form__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
			<form onSubmit={handleGetNews} className="search-form__form">
				<input name="request" id="request" onChange={handleChange} value={values.request || ''} required className="search-form__input" placeholder="Введите тему новости"/>
				<button onSubmit={handleGetNews} className="search-form__button">Искать</button>
			</form>
		</section>
	)
}

export default SearchForm;