import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard';
import mainApi from '../../utils/MainApi';
import {useEffect} from 'react';

function SavedNews({isSaveCards, setSaveCards, onDeleteCard, onFormatDate}) {

	useEffect(() => {
		mainApi.getCards()
			.then(res => {
				setSaveCards(res);
			})
	}, [])

	return (

		<section className="saved-news">
			{ isSaveCards && <div className="saved-news__container">
			{isSaveCards.map((card, i) => (
				<NewsCard card={card} key={card._id} onDeleteCard={onDeleteCard} onFormatDate={onFormatDate}/>
			))}
			</div>}
		</section>
	)
}

export default SavedNews;