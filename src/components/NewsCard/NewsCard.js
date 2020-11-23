import './NewsCard.css';
import {useLocation} from 'react-router-dom';

function NewsCard({card}) {

	const location = useLocation();

	return (
		<div className="news-card__container">
			<img alt="картинка" className="news-card__image" src={card.img}/>
			<div className={`news-card__tag ${location.pathname === '/' ? 'news-card__tag_mark' : 'news-card__tag_trash'}`}/>
			<div className={`news-card__tag news-card__tag_help ${location.pathname === '/saved-news' && 'news-card__tag_del-save'}`}>
				{location.pathname === '/' ? 'Войдите, чтобы сохранять статьи' : 'Убрать из сохранённых'}
			</div>
			{location.pathname === '/saved-news' && <div className="news-card__tag news-card__tag_theme">
				Природа
			</div>}
			<a href={card.link} target="_blank" className="news-card__description">
				<p className="news-card__date">{card.data}</p>
				<h2 className="news-card__title">{card.title}</h2>
				<p className="news-card__text">{card.text}</p>
				<p className="news-card__origin">{card.origin}</p>
			</a>
		</div>
	)
}

export default NewsCard;