<template>
	<div id="introduction_wrap">
		<div class="ship_img_container">
			<h1 class="title">선박 이미지</h1>
			<div class="ship_img">
				<img src="/images/shiplistimg/img1.jpg" alt="선박이미지">
				<img src="/images/shiplistimg/img1.jpg" alt="선박이미지">
				<img src="/images/shiplistimg/img1.jpg" alt="선박이미지">
			</div>
		</div>
		<div class="introduction_text_wrap">
			<div class="ship_intro">
				<h1 class="title">선박정보</h1>
				<p>▩ 선명 : {{ shipData.name }}</p>
				<p>▩ 안전장비 : {{ shipData.safety }}</p>
				<p>▩ 보험 : (유어선 관리법에 의해) 낚시객 승선정원 전원 보험가입 </p>
			</div>
			<div class="ship_discription">
				<h1 class="title">인사말</h1>
				<p>{{ shipData.discription }}</p>
			</div>
			<div class="ship_message">
				<h1 class="title">전달사항</h1>
				<p><strong>1. </strong>최소 출항 30분 전에는 집결지에 도착하여 승선명부를 작성해주세요!</p>
				<p><strong>2. </strong>출항 당일 악천후로 인하여 출항이 취소될 수 있어요!</p>
				<strong class="hl_text hl_small">악천후로 인한 출항 취소시 전액 환불해려요!</strong>
				<p><strong>3. </strong>승선명부를 작성하기 위해 <strong class="hl_text">신분증</strong>을 꼭 챙겨주세요!</p>
				<p><strong>4. </strong>단순 변심으로 인한 예약취소는 일정 수수료가 발생할 수 있어요!</p>
			</div>
			<div class="ship_map">
				<h1 class="title">출항지</h1>
				<div id="map"></div>
			</div>
			<div class="refund_rule">
				<h1 class="title">취소 및 환불규정</h1>
				<p>- 출항일 기준 7일전 : 100% 환불</p>
				<p>- 출항일 기준 4~6일전 : 70% 환불</p>
				<p>- 출항일 기준 2~3일전 : 50% 환불</p>
				<p>- 출항일 기준 1일전 또는 당일 : 환불 불가</p>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
	props: ['shipId'],
	setup(props) {
		const store = useStore();

		const ship_Id = ref(props.shipId);

		const shipDatas = store.getters['shipitem/ships'];

		const shipData = ref('');

		onMounted(() => {
			const data = shipDatas.find(ship => ship.id === ship_Id.value);
			if (data) {
				shipData.value = data;
			}

			// const script = document.createElement('script');
			/* global kakao */
			// script.onload = () => kakao.maps.load(initMap);
			// script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=0700e8a59649fa1750ac6f51c839e252&autoload=false&libraries=services';
			// document.head.appendChild(script);
			loadScript();
			console.log(data);
		});

		//카카오 지도
		// onMounted(() => {
		// 	const script = document.createElement('script');
		// 	/* global kakao */
		// 	script.onload = () => kakao.maps.load(initMap);
		// 	script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=0700e8a59649fa1750ac6f51c839e252&autoload=false&libraries=services';
		// 	document.head.appendChild(script);

		// 	// window.kakao && window.kakako.maps ? initMap() : loadScript();
		// });
		//스크립트 소스 가져오기
		const loadScript = () => {
			const script = document.createElement('script');
			// /* global kakao */
			script.onload = () => kakao.maps.load(initMap);
			script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=0700e8a59649fa1750ac6f51c839e252&autoload=false&libraries=services';
			document.head.appendChild(script);
		};

		//지도생성
		const initMap = () => {
			console.log(shipData.value.lat, shipData.value.lon);
			const mapContainer = document.getElementById('map');
			const option = {
				center: new kakao.maps.LatLng(shipData.value.lat, shipData.value.lon),
				level: 3,
			};

			const map = new kakao.maps.Map(mapContainer, option);
			console.log(mapContainer, option);
			//마커를 생성
			var markerPosition = new kakao.maps.LatLng(shipData.value.lat, shipData.value.lon);

			var marker = new kakao.maps.Marker({
				position: markerPosition
			});

			marker.setMap(map);
		};

		return {
			shipData,
			loadScript,
			initMap
		};
	},
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#introduction_wrap {
	width: calc(100% - 180px);
	padding: 20px;
	overflow-y: scroll;

	.ship_img_container {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 15px;

		.ship_img {
			width: 100%;

			@include center-sa;

			img {
				width: 300px;
			}
		}
	}

	.introduction_text_wrap {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 15px;
		margin-top: 15px;

		.ship_intro {
			p {
				color: #5c5c5c;
			}
		}

		.ship_discription {
			p {
				color: #5c5c5c;
			}
		}

		.ship_message {
			line-height: 1.75;

			.hl_text {
				color: red;
			}

			.hl_small {
				font-size: 16px;
			}

			p {
				color: #5c5c5c;
			}
		}

		.ship_map {

			#map {
				width: 100%;
				height: 500px;
			}
		}

		.refund_rule {
			p {
				color: #5c5c5c;
			}
		}
	}
}

.title {
	font-size: 18px;
	font-weight: 600;
	padding-top: 30px;
	padding-bottom: 5px;
}
</style>