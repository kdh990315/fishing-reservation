export default {
	async reservation(context, payload) {
		const shipId = payload.shipId;
		const reservationData = {
			month: payload.month,
			day: payload.day,
			userData: payload.userData,
		}

		const response = await fetch(`https://fishing-reservation-54646-default-rtdb.firebaseio.com/shipData/${shipId}/rservation/${payload.month}/${payload.day}.json`, {
			method: 'POST',
			body: JSON.stringify(reservationData)
		})

		if (!response.ok) {
			//error
		}

		context.commit('reservation', payload);
	},

	async setReservation(context, shipId) {
		const response = await fetch(`https://fishing-reservation-54646-default-rtdb.firebaseio.com/shipData/${shipId}/rservation/.json`)

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.message || '예약 내역을 불러오는데 실패하였습니다. 잠시 후 다시 시도해주세요');
			throw error;
		}

		const reservationDatas = [];

		for (let key in responseData) {
			const item = responseData[key];
			for (let monthKey in item) {
				const monthData = item[monthKey];
				for (let dataKey in monthData) {
					const data = monthData[dataKey];
					const reservationData = {
						month: data.month,
						day: data.day,
						userData: {
							name: data.userData.name,
							phone: data.userData.phone,
							people: data.userData.people
						}
					};
					reservationDatas.push(reservationData);
				}
			}
		}
		context.commit('setReservation', reservationDatas);
	}
}