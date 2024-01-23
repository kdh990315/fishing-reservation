import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
	namespaced: true,
	state() {
		return {
			shipData: [
				// {
				// 	id: 's1',
				// 	name: '안산호', //선박명
				// 	people: '', //승선인원
				// 	price: '', //가격
				// 	departureTime: '', //출항시간
				// 	arrivalTime: '', //입항시간
				// 	location: '태안',
				// 	port: '나암도항', //출항지
				// 	departureAddress: '', //출항지 주소
				// 	lat: 36.492, //좌표x
				// 	lon: 126.4099, //좌표y
				// 	fishName: '우럭, 광어, 농어', //어종
				// 	fishingType: '생미끼 외수질', //낚시방법
				// 	discription: '안녕하십니까! 강원도 고성 문암항 배낚시 진양호를 찾아주신 모든분들께 감사인사 드립니다. 저희 진양호는 푸른바다 동해 고성에 위치해 있으며 다양한 어종을 대상으로 출항중에 있습니다. 찾아주시는 모든 분들께 소중한 시간 즐거운 추억 가득하도록 최선을 다하겠습니다. 궁금하신점은 언제든 연락주세요!항상 친절히 안내 드리겠습니다. 감사합니다. ', //인삿말
				// 	message: '', //전달사항
				// 	safety: '승선 정원의 120%에 해당하는 구명조끼, 구명부환, 소화기, 구명밧줄, 자기발연, 자기발화, 엔진자동 소화기 완전구비함.',
				// },
				// {
				// 	id: 's2',
				// 	name: '태풍호', //선박명
				// 	people: '', //승선인원
				// 	price: '', //가격
				// 	departureTime: '', //출항시간
				// 	arrivalTime: '', //입항시간
				// 	location: '태안',
				// 	port: '나암도항', //출항지
				// 	departureAddress: '', //출항지 주소
				// 	lat: 37.3827, //좌표x
				// 	lon: 126.7839, //좌표y
				// 	fishName: 'asd, ww, qq', //어종
				// 	fishingType: '생미끼 외수질', //낚시방법
				// 	discription: '안녕하십니까! 강원도 고성 문암항 배낚시 진양호를 찾아주신 모든분들께 감사인사 드립니다. 저희 진양호는 푸른바다 동해 고성에 위치해 있으며 다양한 어종을 대상으로 출항중에 있습니다. 찾아주시는 모든 분들께 소중한 시간 즐거운 추억 가득하도록 최선을 다하겠습니다. 궁금하신점은 언제든 연락주세요!항상 친절히 안내 드리겠습니다. 감사합니다. ', //인삿말
				// 	message: '', //전달사항
				// 	safety: '승선 정원의 120%에 해당하는 구명조끼, 구명부환, 소화기, 구명밧줄, 자기발연, 자기발화, 엔진자동 소화기 완전구비함.',
				// },
			],
		}
	},
	mutations,
	getters,
	actions,
}