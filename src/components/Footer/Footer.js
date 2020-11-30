import './Footer.css';
import {
  Link
} from "react-router-dom";

function Footer() {
	return (
		<footer className="footer">
			<p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
			<Link to="/" className="footer__link">Главная</Link>
			<a target="_blank" rel="noreferrer" href="https://praktikum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
			<a target="_blank" rel="noreferrer" href="https://github.com/Misha-Mad" className="footer__github">
			    текст для eslint
			</a>
			<a target="_blank" rel="noreferrer" href="https://vk.com/m_3axapov" className="footer__facebook">
			    текст для eslint
			</a>
		</footer>
	)
}

export default Footer;