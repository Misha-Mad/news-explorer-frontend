import './Main.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFoundCard from '../NotFoundCard/NotFoundCard';

function Main({isBurgerButton, isBurgerMenu, onSwitchMenu, onSignIn}) {

	return (
		<main className="main">
			<Header
				isBurgerButton={isBurgerButton}
				isBurgerMenu={isBurgerMenu}
				onSwitchMenu={onSwitchMenu}
				onSignIn={onSignIn}
			/>
			<SearchForm isBurgerMenu={isBurgerMenu}/>
			<NewsCardList isBurgerMenu={isBurgerMenu} />
			{/*<Preloader />*/}
			{/*<NotFoundCard />*/}
			<About/>
		</main>
	)
}

export default Main;