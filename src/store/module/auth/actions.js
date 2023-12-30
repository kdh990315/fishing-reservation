let timer;

export default {
	async login(context, payload) {
		const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgS9gPUCK2Pfd-assFgSZe2mpK094JQIA', {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			})
		});

		const responseData = await response.json();

		if(!response.ok) {
			const error = new Error(responseData.message || '인증 과정에서 문제가 발생혀였습니다.');
			throw error;
		}
		
		context.commit('setUser', {
			token: responseData.idToken,
			userID: responseData.localId,
			tokenExpiration: responseData.expiresIn,
			captain: responseData.captain
		});

		const expiresIn = +responseData.expiresIn * 1000;
		const expiration = new Date().getTime() + expiresIn;

		timer = setTimeout(() => {
			context.dispatch('logout');
		}, expiresIn);

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', expiration);

	},
	async signup(context, payload) {
		const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgS9gPUCK2Pfd-assFgSZe2mpK094JQIA', {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
				captain: false,
			})
		});
		
		const responseData = await response.json();

		if(!response.ok) {
			const error = new Error(responseData.message || '인증 과정에서 문제가 발생하였습니다.');
			throw error;
		}

		context.commit('setUser', {
			token: responseData.idToken,
			userID: responseData.localId,
			tokenExpiration: responseData.expiresIn
		});
	},
	autoLogin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		const newTokenExpiration = +tokenExpiration - new Date().getTime();

		if(newTokenExpiration < 0) {
			return;
		}

		timer = setTimeout(() => {
			context.dispatch('logout');
		}, newTokenExpiration);

		if(token && userId) {
			context.commit('setUser', {
				token: token,
				userID: userId,
				tokenExpiration: null,
			});
		}
	},
	logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

		clearInterval(timer);

		context.commit('setUser', {
			token: null,
			userID: null,
			tokenExpiration: null,
		});
	}
}