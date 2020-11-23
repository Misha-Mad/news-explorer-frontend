import './Navigation.css';
import {Link, useLocation} from 'react-router-dom';
import ExitIcon from '../../images/Exit.svg';
import ExitSavedNews from '../../images/Exit_SavedNews.svg';

function Navigation({isBurgerButton, isBurgerMenu, onSwitchMenu, onSignIn}) {

	const location = useLocation();

	return (
		<>
			<button onClick={onSwitchMenu} className={
				`navigation__burger-button 
				${(isBurgerButton || isBurgerMenu) && 'navigation__burger-button_visible'} 
				${isBurgerMenu && 'navigation__burger-button_close'}`
			}>

				<span className={
					`navigation__burger-span 
					${isBurgerMenu && 'navigation__burger-span_close-one'}
					${(location.pathname === '/saved-news' && !isBurgerMenu)  && 'navigation__burger-span_saved-news'}
					`}
				/>

				<span className={
					`navigation__burger-span 
					${isBurgerMenu && 'navigation__burger-span_close-two'}
					${(location.pathname === '/saved-news' && !isBurgerMenu) && 'navigation__burger-span_saved-news'}`}
				/>

			</button>

			<div className={`${isBurgerMenu && 'navigation__burger-overlay'}`}/>

			<div className={
				`navigation 
				${isBurgerButton && 'navigation_hide'} 
				${isBurgerMenu && 'navigation_burger'}`}
			>

				<Link to="/"
					className={` 
					${isBurgerMenu && 'navigation__link_burger'} 
					navigation__link 
					${location.pathname === '/' && 'navigation__link_active'}
					${location.pathname === '/saved-news' && 'navigation__link_saved-news'}
					`}
				>Главная</Link>

				<Link to="/saved-news" className={
					`navigation__link 
					${isBurgerMenu && 'navigation__link_burger'}
					${location.pathname === '/saved-news' && 'navigation__link_saved-news navigation__link_active-saved-news'}
					`}
				>Сохранённые статьи</Link>

				<button onClick={onSignIn} className={
					`navigation__button 
					${isBurgerMenu && 'navigation__button_burger'}
					${location.pathname === '/saved-news' && 'navigation__button_saved-news'}
					`}
				>{location.pathname === '/saved-news' ? 'Misha' : 'Авторизоваться'}
					<img className="navigation__icon" src={`${(location.pathname === '/saved-news' && !isBurgerMenu) ? ExitSavedNews : ExitIcon}`}/>
				</button>

			</div>
		</>
	)
}

export default Navigation;