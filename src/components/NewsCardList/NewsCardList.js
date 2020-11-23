import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import cards from '../../utils/utils';
import {useState} from 'react';

function NewsCardList({isBurgerMenu, isStartEndArray}) {

	const [isArticles, setArticles] = useState([cards[0], cards[1], cards[2]]);
	const [isButtonDisabled, setButtonDisabled] = useState(false)

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
		if (moreArticles[3] === undefined) {
			setButtonDisabled(true);
		}
	}

	return (
		<section className="news-card-list">
			<h2 className={`${isBurgerMenu && "news-card-list__title_burger-menu" } news-card-list__title`}>Результаты поиска</h2>
			<div className="news-card-list__container">
				{isArticles.map((card) => (
					<NewsCard key={card.id} card={card} />
				))}
			</div>
			<button onClick={handleSeeMoreNews}	className={`news-card-list__button ${isButtonDisabled && 'news-card-list__button_disabled'} `}>Показать еще</button>
		</section>
	)
}

export default NewsCardList;