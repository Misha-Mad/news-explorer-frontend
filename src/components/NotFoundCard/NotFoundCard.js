import './NotFoundCard.css';
import SVGSmile from '../../images/NotFound.svg';

function NotFoundCard({errorNewsMessage}) {
    return (
        <div className="not-found-card">
            <img className="not-found-card__smile" src={SVGSmile} alt="грустный смайлик"/>
            <h2 className="not-found-card__title">{errorNewsMessage ? 'Ошибка!' : 'Ничего не найдено'}</h2>
            <p className="not-found-card__text">
                {errorNewsMessage ? {errorNewsMessage} : 'К сожалению по вашему запросу ничего не найдено.'}
            </p>
        </div>
    )
}

export default NotFoundCard;