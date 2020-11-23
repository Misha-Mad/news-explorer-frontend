import './Header.css';
import Navigation from '../Navigation/Navigation';
import {Link} from "react-router-dom";

function Header({isBurgerButton, isBurgerMenu, onSwitchMenu, onSignIn}) {

	return (
		isBurgerMenu ? (
				<header className="header burger-menu__header">
					<Link to="/" className="header__link">
						<div className="header__logo"/>
					</Link>
					<Navigation
						isBurgerButton={isBurgerButton}
						isBurgerMenu={isBurgerMenu}
						onSwitchMenu={onSwitchMenu}
						onSignIn={onSignIn}
					/>
				</header>
		) : (
			<header className="header">
				<Link to="/" className="header__link">
					<div className="header__logo"/>
				</Link>
				<Navigation
					isBurgerButton={isBurgerButton}
					isBurgerMenu={isBurgerMenu}
					onSwitchMenu={onSwitchMenu}
					onSignIn={onSignIn}
				/>
			</header>)
	)
}

export default Header;