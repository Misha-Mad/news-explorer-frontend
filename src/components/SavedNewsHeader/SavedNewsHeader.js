import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation';
import {Link} from "react-router-dom";

function SavedNewsHeader({isBurgerButton, isBurgerMenu, onSwitchMenu}) {

	return (
		isBurgerMenu ? (
			<header className="header burger-menu__header">
				<Link to="/" className="header__link">
					<div className="header__logo "/>
				</Link>
				<Navigation
					isBurgerButton={isBurgerButton}
					isBurgerMenu={isBurgerMenu}
					onSwitchMenu={onSwitchMenu}
				/>
			</header>
		) : (
			<header className="header_saved-news">
				<Link to="/" className="header__link">
					<div className=" header__logo_saved-news"/>
				</Link>
				<Navigation
					isBurgerButton={isBurgerButton}
					isBurgerMenu={isBurgerMenu}
					onSwitchMenu={onSwitchMenu}
				/>
			</header>)
	)
}

export default SavedNewsHeader;