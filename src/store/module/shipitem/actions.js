export default {
	registerShip(context, shipData) {
		const userId = context.rootGetters.userId;
		const NewShipData = {
			name: shipData.shipName,
			people: shipData.people,
			price: shipData.price,
			departureTime: shipData.departureTime,
			arrivalTime: shipData.arrivalTime,
			location: '태안',
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

		context.commit('registerShip', {
			...NewShipData,
			id: userId,
		});
	}
}	