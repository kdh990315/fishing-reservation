import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

export default {
	namespaced: true,
	state() {
		return {
			reservationData: [
				{
					shipId: 'Gx8C0DehlqcIPbeslXXOyjXy0Cl2',
					month : 2,
					day: 15,
					userData: {
						name: '김동현', phone: '010-5509-3095', people: 2
					}
				},
				{
					shipId: 'Gx8C0DehlqcIPbeslXXOyjXy0Cl2',
					month : 2,
					day: 17,
					userData: {
						name: '최소연', phone: '010-1111-2222', people: 1
					}
				},
				{
					shipId: 'Gx8C0DehlqcIPbeslXXOyjXy0Cl2',
					month : 2,
					day: 17,
					userData: {
						name: '최소연', phone: '010-1111-2222', people: 1
					}
				},
				{
					shipId: 'Gx8C0DehlqcIPbeslXXOyjXy0Cl2',
					month : 3,
					day: 2,
					userData: {
						name: '최희빈', phone: '010-4444-2222', people: 2
					}
				},
				{
					shipId: 'Gx8C0DehlqcIPbeslXXOyjXy0Cl2',
					month : 3,
					day: 4,
					userData: {
						name: '염다희', phone: '010-7878-8686', people: 1
					}
				},
			],
		}
	},
	mutations,
	getters,
	actions
}