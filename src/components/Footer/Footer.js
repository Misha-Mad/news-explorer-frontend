import './Footer.css';
import {
  Link
} from "react-router-dom";

function Footer() {
	return (
		<footer className="footer">
			<p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
			<Link to="/" className="footer__link">Главная</Link>
			<a target="_blank" href="https://praktikum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
			<a target="_blank" href="https://github.com/Misha-Mad" className="footer__github"></a>
			<a target="_blank" href="https://vk.com/m_3axapov" className="footer__facebook"></a>
		</footer>
	)
}

export default Footer;