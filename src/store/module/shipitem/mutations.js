export default {
	registerShip(state, payload) {
		state.shipData.push(payload);
	},
	setShipData(state, payload) {
		state.shipData = payload;
	},
	setFilterData(state, payload) {
		state.shipData = payload;
	}
}