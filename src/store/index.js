import { createStore } from "vuex";
import auth from "./module/auth/index.js";
import shipitem from "./module/shipitem/index.js";
import search from "./module/search/index.js";
import reservation from "./module/reservation/index.js";

const store = createStore({
	modules: {
		auth: auth,
		shipitem: shipitem,
		search: search,
		reservation: reservation,
	},
	state() {
		return {
			userId: null,
		};
	},
	mutations: {
		setUserId(state, payload) {
			state.userId = payload;
		}
	},
	getters: {
		userId(state) {
			return state.userId;
		}
	},
	actions: {},
});

export default store;