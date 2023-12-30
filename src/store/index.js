import { createStore } from "vuex";
import auth from "./module/auth/index.js";
import shipitem from "./module/shipitem/index.js";

const store = createStore({
	modules: {
		auth: auth,
		shipitem: shipitem,
	},
	state() {
		return {
			userId: 's3',
		};
	},
	mutations: {},
	getters: {
		userId(state) {
			return state.userId;
		}
	},
	actions: {},
});

export default store;