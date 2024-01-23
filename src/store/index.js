import { createStore } from "vuex";
import auth from "./module/auth/index.js";
import shipitem from "./module/shipitem/index.js";
import search from "./module/search/index.js";

const store = createStore({
	modules: {
		auth: auth,
		shipitem: shipitem,
		search: search,
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