import './Main.css'
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFoundCard from '../NotFoundCard/NotFoundCard';

function Main({
                  isBurgerMenu,
                  onGetNews,
                  cards,
                  notFound,
                  isLoading,
                  isLoggedIn,
                  onSaveCard,
                  onFormatDate,
                  onDeleteCard,
                  onSignUpPopup,
                  isBlockedTag,
                  errorNewsMessage
              }) {

    return (
        <main className="main">
            <SearchForm isBurgerMenu={isBurgerMenu} onGetNews={onGetNews}/>
            {cards.toString() !== [].toString() && <NewsCardList cards={cards}
                                                                 isLoggedIn={isLoggedIn}
                                                                 onSaveCard={onSaveCard}
                                                                 onFormatDate={onFormatDate}
                                                                 onDeleteCard={onDeleteCard}
                                                                 onSignUpPopup={onSignUpPopup}
                                                                 isBlockedTag={isBlockedTag}/>}
            {(notFound && !isLoading) && <NotFoundCard errorMessage={errorNewsMessage}/>}
            {isLoading && <Preloader/>}
            <About/>
        </main>
    )
}

export default Main;