import './About.css';
import avatar from '../../images/avatar.png';

function About() {

	return (
		<section className="about" >
			<img className="about__avatar" src={avatar} alt="Аватар автора"/>
			<div className="about__container">
				<h1 className="about__title">Об авторе</h1>
				<p>
					Это блок с описанием автора проекта.
					Здесь следует указать,
					как вас зовут, чем вы занимаетесь,
					какими технологиями разработки владеете.
				</p>
				<p>
					Также можно рассказать о процессе обучения в Практикуме,
					чему вы тут научились,
					и чем можете помочь потенциальным заказчикам.
				</p>
			</div>


		</section>
	)
}

export default About;