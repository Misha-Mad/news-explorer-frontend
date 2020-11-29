import './NewsCard.css';
import {useLocation} from 'react-router-dom';
import {NOT_FOUND_CARD_IMAGE} from '../../utils/utils'

function NewsCard({card, isLoggedIn, onSaveCard, onDeleteCard, onFormatDate, onSignUpPopup, isBlockedTag}) {

	const location = useLocation();

	function handleDeleteCard() {
		onDeleteCard(card);
	}

	function handleFormatDate(date) {
		return onFormatDate(date);
	}

	function handleCardSave() {
		onSaveCard(card);
	}

	function handleOpenPopup() {
		onSignUpPopup(true);
	}

	return (
		<div className="news-card__container">
			<img alt="картинка" className="news-card__image" src={card.urlToImage || card.image || NOT_FOUND_CARD_IMAGE}/>
			{location.pathname === '/' ?
			<button onClick={(isLoggedIn && !card.marked) ? handleCardSave : isLoggedIn ? handleDeleteCard : handleOpenPopup }
							disabled={isBlockedTag}
					 className={ `news-card__tag news-card__tag_mark ${!isLoggedIn && 'news-card__tag_disabled'} ${card.marked === true && 'news-card__tag_marked'}`
					 }/> :
			<button onClick={handleDeleteCard} className={ `news-card__tag news-card__tag_trash`}/>
		}
			{!isLoggedIn &&
			<div
				className={`news-card__tag news-card__tag_help ${location.pathname === '/saved-news' && 'news-card__tag_del-save'}`}>
				{location.pathname === '/' ? 'Войдите, чтобы сохранять статьи' : 'Убрать из сохранённых'}
			</div>
			}
			{location.pathname === '/saved-news' && <div className="news-card__tag news-card__tag_theme">
				{card.keyword}
			</div>}
			<a href={card.url || card.link} target="_blank" rel="noreferrer" className="news-card__description">
				<p className="news-card__date">{handleFormatDate(card.publishedAt || card.date)}</p>
				<h2 className="news-card__title">{card.title}</h2>
				<p className="news-card__text">{card.description || card.text}</p>
				<p className="news-card__origin">{card.source.name || card.source}</p>
			</a>
		</div>
	)
}

export default NewsCard;