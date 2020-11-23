import './NotFoundCard.css';
import SVGSmile from '../../images/NotFound.svg';

function NotFoundCard() {
	return (
		<div className="not-found-card">
			<img className="not-found-card__smile" src={SVGSmile} alt="грустный смайлик"/>
			<h2 className="not-found-card__title">Ничего не найдено</h2>
			<p className="not-found-card__text">К сожалению по вашему запросу
				ничего не найдено.</p>
		</div>
	)
}

export default NotFoundCard;