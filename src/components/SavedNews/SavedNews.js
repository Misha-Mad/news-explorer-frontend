import './SavedNews.css';
import NewsCard from "../NewsCard/NewsCard";
import cards from "../../utils/utils";

function SavedNews({isBurgerMenu}) {

	return (
		<section className={`${isBurgerMenu && 'saved-news_burger-menu'} saved-news`}>
			<div className="saved-news__description">
				<p className="saved-news__subtitle">Сохранённые статьи</p>
				<h1 className="saved-news__title">Misha, у вас 5 сохранённых статей</h1>
				<p className="saved-news__keywords">По ключевым словам:
					<span className="saved-news__keyword"> Природа</span>,
					<span className="saved-news__keyword"> Тайга</span> и
					<span className="saved-news__keyword"> 2-м другим</span>
				</p>
			</div>

			<div className="saved-news__container">
				{cards.map((card) => (
					<NewsCard card={card} />
				))}
			</div>
		</section>
	)
}

export default SavedNews;