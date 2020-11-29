import {CONFIG_NEWS_API} from './utils';
import{ weekAgoDateCalculate, todayDateCalculate} from './DateCalculate';

class NewsApi {

	constructor({baseUrl}) {
		this._baseUrl = baseUrl;
	}

	getNews(request) {
		return fetch(`${this._baseUrl}/everything?q=${request}&from=${weekAgoDateCalculate()}&to=${todayDateCalculate()}&pageSize=100&apiKey=f46b5f7912644a6eab5ec90c0032fa8f`, {
			method: 'GET',
			headers: {
			}
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((res) => {
				return res;
			})
	};

}

const newsApi = new NewsApi(CONFIG_NEWS_API);
export default newsApi;
