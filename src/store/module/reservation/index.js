import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

export default {
	namespaced: true,
	state() {
		return {
			reservationData: [],
		}
	},
	mutations,
	getters,
	actions
}