import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useContext, useEffect, useState} from 'react';

function SavedNewsHeader({isSaveCards}) {

	const currentUser = useContext(CurrentUserContext);
	const [isSaveWord, setSaveWord] = useState('сохранённых статей');
	const [isTagArr, setTagArr] = useState([]);

	function countTag(arr) {
		return arr.reduce((acc, el) => {
			acc[el] = (acc[el] || 0) + 1;
			return acc;
		}, {});
	}

	useEffect(() => {
		let arrayLength = isSaveCards.length.toString();
		let lastNumberOfArray = parseInt(arrayLength[arrayLength.length - 1]);
		if (lastNumberOfArray === 1 && isSaveCards.length !== 11) {
			setSaveWord('сохранённая статья');
		} else {
			setSaveWord('сохранённых статей');
		}
		let tagArray = [];
		isSaveCards.map((card) => {
			tagArray.push(card.keyword);
		});
		let countTagObj = countTag(tagArray);
		let sortableTag = [];
		for (let tag in countTagObj) {
			sortableTag.push([tag, countTagObj[tag]])
		}
		sortableTag.sort((a, b) => {
			return b[1] - a[1];
		});
		let resultTag = sortableTag.map(arr => {
			return arr[0];
		})
		setTagArr(resultTag);
	}, [isSaveCards])


	return (

		<section className="saved-news-header">
			<div className="saved-news-header__description">
				<p className="saved-news-header__subtitle">Сохранённые статьи</p>
				<h1 className="saved-news-header__title">
					<span>{currentUser.name}</span>, у вас
					<span> {isSaveCards.length}</span> <span>{isSaveWord}</span></h1>
				<p className="saved-news-header__keywords">По ключевым словам:
					<span className="saved-news-header__keyword"> {isTagArr[0]}</span>
					{(isTagArr.length > 1) && <span>,</span>}
					<span className="saved-news-header__keyword"> {isTagArr[1]}</span>
					{(isTagArr.length > 2) && <span className="saved-news-header__keyword"> и {isTagArr.length - 2}-м другим</span>}
				</p>
			</div>
		</section>

	)
}

export default SavedNewsHeader;