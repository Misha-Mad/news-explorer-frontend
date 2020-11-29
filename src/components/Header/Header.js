import './Header.css';
import Navigation from '../Navigation/Navigation';
import {Link, useLocation } from "react-router-dom";

function Header({isBurgerButton, isBurgerMenu, onSwitchMenu, onSignIn, onSignOut, isLoggedIn}) {

	const location = useLocation();

	return (

		<header className={`header ${isBurgerMenu && 'burger-menu__header'} ${location.pathname === '/saved-news' && 'header_saved-news'}`}>
			<Link to="/" className="header__link">
				<div className={`header__logo ${location.pathname === '/saved-news' && 'header__logo_saved-news'}`}/>
			</Link>
			<Navigation
				isBurgerButton={isBurgerButton}
				isBurgerMenu={isBurgerMenu}
				onSwitchMenu={onSwitchMenu}
				onSignIn={onSignIn}
				onSignOut={onSignOut}
				isLoggedIn={isLoggedIn}
			/>
		</header>

	)
}

export default Header;