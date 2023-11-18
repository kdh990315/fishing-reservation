import { createStore } from "vuex";

const store = createStore({
	modules: {
		auth: auth,
	},
	state() {
		return {

		},
		mutations,
		getters,
		actions
	}
});

export default store;