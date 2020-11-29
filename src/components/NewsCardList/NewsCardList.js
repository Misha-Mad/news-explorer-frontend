import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import {useState} from 'react';

function NewsCardList({isBurgerMenu, cards, isLoggedIn, onSaveCard, onFormatDate, onDeleteCard, onSignUpPopup, isBlockedTag}) {

	const [isArticles, setArticles] = useState([cards[0], cards[1], cards[2]]);
	const [isButtonDisabled, setButtonDisabled] = useState(false);


	//функция для кнопки показать еще
	function handleSeeMoreNews() {
		let moreArticles = [cards[isArticles.length], cards[isArticles.length +1], cards[isArticles.length + 2]]
		if (moreArticles[0] === undefined ) {
			setButtonDisabled(true);
			return;
		}
		if (moreArticles[1] === undefined) {
			setArticles([...isArticles, moreArticles[0]]);
			setButtonDisabled(true);
			return;
		}
		if (moreArticles[2] === undefined) {
			setArticles([...isArticles, moreArticles[0] ,moreArticles[1]]);
			setButtonDisabled(true);
			return;
		}
		setArticles([...isArticles, ...moreArticles]);
		if (cards[isArticles.length + 3] === undefined) {
			setButtonDisabled(true);
		}
	}

	return (
		<section className="news-card-list">
			<h2 className={`${isBurgerMenu && "news-card-list__title_burger-menu" } news-card-list__title`}>Результаты поиска</h2>
			<div className="news-card-list__container">
				{cards[0] && isArticles.map((card, i) => (
					<NewsCard key={i} card={card}
										isLoggedIn={isLoggedIn}
										onSaveCard={onSaveCard}
										onFormatDate={onFormatDate}
										onDeleteCard={onDeleteCard}
										onSignUpPopup={onSignUpPopup}
										isBlockedTag={isBlockedTag}/>
				))}
			</div>
			{!isButtonDisabled && <button onClick={handleSeeMoreNews}	className={`news-card-list__button`}>Показать еще</button>}
		</section>
	)
}

export default NewsCardList;