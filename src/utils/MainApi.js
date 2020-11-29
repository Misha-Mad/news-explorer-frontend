import {CONFIG_MAIN_API} from './utils';

class MainApi {
	constructor({baseUrl}) {
		this._baseUrl = baseUrl;
	}

	register(email, password, name) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
			})
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

	authorize(email, password) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
			})
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then(({token}) => {
				if (token) {
					localStorage.setItem('token', token);
				}
			})
	}

	getUser(jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwt}`
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	getCards() {
		return fetch(`${this._baseUrl}/articles`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	createCard(keyword, title, text, date, source, link, image,) {
		return fetch(`${this._baseUrl}/articles`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				keyword: keyword,
				title: title,
				text: text,
				date: date,
				source: source,
				link: link,
				image: image,
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/articles/${id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

}

const mainApi = new MainApi(CONFIG_MAIN_API);
export default mainApi;