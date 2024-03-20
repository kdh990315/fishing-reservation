import { deleteObject, getStorage, listAll, ref } from "firebase/storage";

export default {
	async registerShip(context, shipData) {
		const userId = context.rootGetters.userId.userId;
		const NewShipData = {
			id: userId,
			name: shipData.shipName,
			people: shipData.people,
			price: shipData.price,
			departureTime: shipData.departureTime,
			arrivalTime: shipData.arrivalTime,
			location: shipData.location,
			halfOption: shipData.halfOption,
			port: shipData.departurePlace,
			departureAddress: shipData.departureAddress,
			lat: shipData.lat,
			lon: shipData.lng,
			fishName: shipData.fishName.join(', '),
			fishingType: shipData.fishingType,
			discription: shipData.introText,
			message: shipData.message,
			safety: '승선 정원의 120%에 해당하는 구명조끼, 구명부환, 소화기, 구명밧줄, 자기발연, 자기발화, 엔진자동 소화기 완전구비함.',
		}

		const response = await fetch(
			`https://fishing-reservation-54646-default-rtdb.firebaseio.com/shipData/${userId}.json`,
			{
				method: 'PUT',
				body: JSON.stringify(NewShipData),
			}
		)

		// const responseData = await response.json();

		if (!response.ok) {
			//error
		}

		context.commit('registerShip', {
			...NewShipData,
			id: userId,
		});
	},
	async setShipData(context) {
		const response = await fetch(
			`https://fishing-reservation-54646-default-rtdb.firebaseio.com/shipData.json`
		);
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.message || '데이터 로드에 실패하였습니다. 잠시 후 다시 이용해주세요');
			throw error;
		}

		const shipDatas = [];

		for (let key in responseData) {
			const shipData = {
				id: key,
				name: responseData[key].name,
				people: responseData[key].people,
				price: responseData[key].price,
				departureTime: responseData[key].departureTime,
				arrivalTime: responseData[key].arrivalTime,
				location: responseData[key].location,
				port: responseData[key].port,
				halfOption: responseData[key].halfOption,
				departureAddress: responseData[key].departureAddress,
				lat: responseData[key].lat,
				lon: responseData[key].lon,
				fishName: responseData[key].fishName,
				fishingType: responseData[key].fishingType,
				discription: responseData[key].discription,
				rservation: responseData[key].rservation,
				message: responseData[key].message,
				safety: '승선 정원의 120%에 해당하는 구명조끼, 구명부환, 소화기, 구명밧줄, 자기발연, 자기발화, 엔진자동 소화기 완전구비함.',
			}
			shipDatas.push(shipData);
		}

		context.commit('setShipData', shipDatas);
	},
	filterShips(context, searchData) {
		const shipdatas = context.getters.ships;
		const filteredData = shipdatas.filter(shipdata => {
			// 시간이 일치하는 경우를 필터링합니다.
			const timeMatch = shipdata.halfOption === searchData.time;
			// 선택된 지역 중 하나라도 shipdata의 location에 포함되어 있는 경우를 확인합니다.
			const locationMatch = searchData.location.some(loc => shipdata.location.includes(loc));
			return timeMatch && locationMatch;
		});
		
		context.commit('setFilterData', filteredData);
	},
	async deleteShip(_, payload) {
		const userId = payload;

		const response = await fetch(
			`https://fishing-reservation-54646-default-rtdb.firebaseio.com/shipData/${userId}.json`,
			{
				method: 'DELETE',
			}
		)

		if(!response.ok) {
			// ...error
		}

		const storage = getStorage();
		const desertRef = ref(storage, `images/${userId}/`);
		const imgList = await listAll(desertRef);

		imgList.items.forEach(async (item) => {
			await deleteObject(item);
		});
		
	}
}