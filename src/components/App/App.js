import './App.css';
import {useEffect, useState, useCallback} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {NOT_FOUND_CARD_IMAGE} from '../../utils/utils';
import {formatDate} from '../../utils/DateCalculate';

function App() {

	const history = useHistory();
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [burgerButtonActive, setBurgerButtonActive] = useState(false);
	const [burgerMenuActive, setBurgerMenuActive] = useState(false);
	const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
	const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
	const [isRegistrationError, setRegistrationError] = useState(false);
	const [loggedIn, setloggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [isCurrentCards, setCurrentCards] = useState([]);
	const [isNotFound, setNotFound] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isSaveCards, setSaveCards] = useState([]);
	const [isBlockedTag, setBlockedTag] = useState(false);

	//проверка токена
	const tokenCheck = useCallback(() => {
		const jwt = localStorage.getItem('token');
		if (jwt) {
			mainApi.getUser(jwt)
				.then((currentUser) => {
					setCurrentUser(currentUser);
				})
				.then(() => {
					setloggedIn(true);
					setIsSignInPopupOpen(false);
				})
				.catch((err) => {
					setloggedIn(false);
					console.log(err);
				})
		}
	}, [])

	//проверка токена
	useEffect(() => {
		tokenCheck();
	}, [tokenCheck])

	// кладём в стейты данные из локального хранилища и открываем попап при редиректе
	useEffect(() => {
		let state = {...history.location.state}
		const localCards = JSON.parse(localStorage.getItem('localCards'));
		if (localCards !== null) {
			setCurrentCards(localCards);
		}
		if (state.url === '/saved-news') {
			setIsSignInPopupOpen(true);
			delete state.url;
			history.replace({...history.location, state});
		} else {
			setIsSignInPopupOpen(false);
			delete state.url;
			history.replace({...history.location, state});
		}
	}, [loggedIn, history])

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
		setRegistrationError(false);
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

	//переключение попапов
	function handleSwitchPopup() {
		if (isSignInPopupOpen) {
			setIsSignInPopupOpen(false);
			setIsSignUpPopupOpen(true);
		} else {
			setIsSignUpPopupOpen(false);
			setIsSignInPopupOpen(true);
			setRegistrationError(false);
		}
	}

	//переход с тултипа на попап логина
	function handleTooltipSwitch() {
		setInfoTooltipOpen(false);
		setIsSignInPopupOpen(true);
	}

	//обработчик регистрации
	function handleRegistration(email, password, name) {
		mainApi.register(email, password, name)
			.then(() => {
				setIsSignUpPopupOpen(false);
				setRegistrationError(false);
				setInfoTooltipOpen(true);
			})
			.catch((err) => {
					setRegistrationError(true);
					console.log(err);
				}
			)
	}

	//обработчик авторизации
	function handleAuthorization(email, password) {
		mainApi.authorize(email, password)
			.then(() => {
				tokenCheck();
			})
			.catch((err) => {
				console.log(err);
			})
	}

	//логаут
	function signOut() {
		localStorage.removeItem('token');
		setloggedIn(false);
		setCurrentUser({});
		setCurrentCards([]);
		localStorage.setItem('localCards', JSON.stringify([]));
		history.push('/');
	}

	//сохранение карточек
	function updateCards(cards) {
		localStorage.setItem('localCards', JSON.stringify(cards.articles));
		setCurrentCards([]);
		setCurrentCards(cards.articles);
		if (cards.totalResults === 0) {
			setLoading(false);
			setNotFound(true);
		} else {
			setLoading(false);
			setNotFound(false);
		}
	}

	// запрос на получение новостей от внешнего API
	function getNews(req) {
		localStorage.setItem('keyWord', req);
		setCurrentCards([]);
		setLoading(true);
		if (loggedIn) {
			Promise.all([newsApi.getNews(req), mainApi.getCards()])
				.then(([cards, saveCards]) => {
					cards.articles.forEach(card => {
						saveCards.forEach(saveCard => {
							if (card.url === saveCard.link) {
								card.marked = true;
							}
						})
					})
					updateCards(cards);
				})
				.catch(err => console.log(err))
		} else {
			newsApi.getNews(req)
				.then(cards => {
					updateCards(cards)
				})
				.catch(err => console.log(err))
		}
	}

	//функция сохранения карточки
	function saveCard(card) {
		setBlockedTag(true);
		const newCards = isCurrentCards.map(c => {
			if (c.url === card.url) {
				c.marked = true;
			}
			return c;
		})
		localStorage.setItem('localCards', JSON.stringify(newCards));
		setCurrentCards([]);
		setCurrentCards(newCards);
		const keyword = localStorage.getItem('keyWord');
		mainApi.createCard(keyword, card.title, card.description, card.publishedAt, card.source.name, card.url, card.urlToImage || NOT_FOUND_CARD_IMAGE)
			.then((newSaveCard) => setSaveCards([newSaveCard,...isSaveCards]))
			.then(() => setBlockedTag(false))
			.catch(err => console.log(err))
	}

	//функция удаления карточки
	function deleteSaveCard(card) {
		setBlockedTag(true)
		const newCards = isCurrentCards.map(c => {
			if (c.url === card.link || c.url === card.url) {
				c.marked = false;
			}
			return c;
		});
		localStorage.setItem('localCards', JSON.stringify(isCurrentCards));
		setCurrentCards([]);
		setCurrentCards(newCards);
		let newCard;
		if (!card._id) {
			newCard = isSaveCards.find(c => {
				return c.link === card.url
			})
		} else {
			newCard = card
		}
		mainApi.deleteCard(newCard._id)
			.then(() => {
				const newCards = isSaveCards.filter((c) => card._id !== c._id);
				setSaveCards(newCards);
			})
			.then(() => {
				setBlockedTag(false);
			})
			.catch(err => console.log(err))
	}

	return (

		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">

				<Header
					isBurgerButton={burgerButtonActive}
					isBurgerMenu={burgerMenuActive}
					onSwitchMenu={handleClickBurgerMenu}
					onSignIn={handleSignInClick}
					onSignOut={signOut}
					isLoggedIn={loggedIn}
				/>

				<Switch>
					<ProtectedRoute exact path="/saved-news"
													loggedIn={loggedIn}
													header={SavedNewsHeader}
													component={SavedNews}
													isBurgerButton={burgerButtonActive}
													isBurgerMenu={burgerMenuActive}
													onSwitchMenu={handleClickBurgerMenu}
													isSaveCards={isSaveCards}
													setSaveCards={setSaveCards}
													onDeleteCard={deleteSaveCard}
													onFormatDate={formatDate}
					/>
					<Route path="/">
						<Main
							isBurgerButton={burgerButtonActive}
							isBurgerMenu={burgerMenuActive}
							onSwitchMenu={handleClickBurgerMenu}
							onSignIn={handleSignInClick}
							onGetNews={getNews}
							cards={isCurrentCards}
							notFound={isNotFound}
							isLoading={isLoading}
							isLoggedIn={loggedIn}
							onSaveCard={saveCard}
							onFormatDate={formatDate}
							onDeleteCard={deleteSaveCard}
							onSignUpPopup={setIsSignUpPopupOpen}
							isBlockedTag={isBlockedTag}
						/>
					</Route>
					<Route path="/saved-news">
						{loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
					</Route>
				</Switch>

				<Footer/>

				<Login isOpen={isSignInPopupOpen}
							 onClose={closeAllPopups}
							 onSwitch={handleSwitchPopup}
							 onLogin={handleAuthorization}
				/>

				<Register isOpen={isSignUpPopupOpen}
									onClose={closeAllPopups}
									onSwitch={handleSwitchPopup}
									onRegistration={handleRegistration}
									isError={isRegistrationError}
				/>

				<InfoTooltip isOpen={isInfoTooltipOpen}
										 onClose={closeAllPopups}
										 onSwitch={handleTooltipSwitch}
				/>

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
