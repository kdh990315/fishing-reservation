export default {
	reservation(state, payload) {
		state.reservationData.push(payload);
	},
	setReservation(state, payload) {
		state.reservationData = payload
	}
}