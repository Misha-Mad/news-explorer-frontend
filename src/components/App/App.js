import './App.css';
import {Switch, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Main from '../Main/Main';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import SignInPopup from "../SignInPopup/SignInPopup";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [burgerButtonActive, setBurgerButtonActive] = useState(false);
	const [burgerMenuActive, setBurgerMenuActive] = useState(false);
	const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
	const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

//закрытие попапов на escape и оверлей
	useEffect(() => {
		function handleEscClose(event) {
			if (event.key === "Escape") {
				closeAllPopups();
			}
		}

		function closeByOverlay(event) {
			if (event.target.classList.contains('popup_active')) {
				closeAllPopups();
			}
		}

		document.addEventListener('mousedown', closeByOverlay);
		document.addEventListener('keydown', handleEscClose);
		return () => {
			document.removeEventListener('keydown', handleEscClose);
			document.removeEventListener('mousedown', closeByOverlay);
		}
	})

	//отслеживание изменения ширины окна
	useEffect(() => {
		function resizeScreen(e) {
			setScreenWidth(e.target.innerWidth);
		}

		window.addEventListener('resize', resizeScreen);
		return () => {
			window.removeEventListener('resize', resizeScreen);
		};
	}, [])

	//функция закрытия попапов
	function closeAllPopups() {
		setIsSignInPopupOpen(false);
		setIsSignUpPopupOpen(false);
		setInfoTooltipOpen(false);
	}

	//изменение стейта бургер меню
	useEffect(() => {
		if (screenWidth <= 680) {
			setBurgerButtonActive(true);
		} else {
			setBurgerButtonActive(false);
		}
	}, [screenWidth])

	//открытие бургер меню
	function handleClickBurgerMenu() {
		if (burgerMenuActive === false) {
			setBurgerMenuActive(true);
		} else {
			setBurgerMenuActive(false);
		}
	}

	//открытие попапа авторизации
	function handleSignInClick() {
		setIsSignInPopupOpen(true);
	}

	//открытие попапа регистрации
	function handleSwitchPopup() {
		if (isSignInPopupOpen) {
			setIsSignInPopupOpen(false);
			setIsSignUpPopupOpen(true);
		} else {
			setIsSignUpPopupOpen(false);
			setIsSignInPopupOpen(true);
		}
	}

	//переход с тултипа на попап логина
	function handleTooltipSwitch() {
		setInfoTooltipOpen(false);
		setIsSignInPopupOpen(true);
	}


	return (
		<div className="root">
			<Switch>

				<Route path="/saved-news">
					<SavedNewsHeader
						isBurgerButton={burgerButtonActive}
						isBurgerMenu={burgerMenuActive}
						onSwitchMenu={handleClickBurgerMenu}
					/>
					<SavedNews isBurgerMenu={burgerMenuActive}/>

				</Route>

				<Route path="/">
					<Main
						isBurgerButton={burgerButtonActive}
						isBurgerMenu={burgerMenuActive}
						onSwitchMenu={handleClickBurgerMenu}
						onSignIn={handleSignInClick}
					/>
				</Route>

			</Switch>

			<Footer/>

			<SignInPopup isOpen={isSignInPopupOpen}
									 onClose={closeAllPopups}
									 onSwitch={handleSwitchPopup}
			/>

			<SignUpPopup isOpen={isSignUpPopupOpen}
									 onClose={closeAllPopups}
									 onSwitch={handleSwitchPopup}
			/>

			<InfoTooltip isOpen={isInfoTooltipOpen}
										onClose={closeAllPopups}
										onSwitch={handleTooltipSwitch}
			/>

		</div>
	);
}

export default App;
