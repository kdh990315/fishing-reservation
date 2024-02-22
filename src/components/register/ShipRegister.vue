<template>
	<section id="register_section">
		<form @submit.prevent="submitForm">
			<div class="form_container ship_name">
				<label>선박명</label>
				<input type="text" placeholder="선박명을 입력해주세요" v-model="shipData.shipName.val" @blur="clearValid('shipName')">
				<p class="error" v-if="shipData.shipName.valid">선박명을 입력해주세요</p>
			</div>
			<div class="form_container">
				<label>선박 이미지 등록하기(최대 3장)</label>
				<input multiple type="file" accept="image/*" @change="fileChange">
			</div>
			<div class="form_container ship_people">
				<label>최대 승선 인원</label>
				<input type="number" placeholder="ex) 12" v-model="shipData.people.val" @blur="clearValid('people')">
				<p class="error" v-if="shipData.people.valid">최대 승선 인원을 입력해주세요</p>
			</div>
			<div class="form_container ship_price">
				<label>비용</label>
				<input type="number" placeholder="ex) 120000" v-model="shipData.price.val" @blur="clearValid('price')">
				<p class="error" v-if="shipData.price.valid">비용을 입력해주세요</p>
			</div>
			<div class="form_container ship_time">
				<label>출항시간</label>
				<input type="time" v-model="shipData.departureTime.val" class="ship_time_input"
					@blur="clearValid('departureTime')">
				<label>입항시간</label>
				<input type="time" v-model="shipData.arrivalTime.val" class="ship_time_input"
					@blur="clearValid('arrivalTime')">
				<span v-if="changeTime.hours * changeTime.minutes > -1">({{ changeTime.hours }}시간 {{
					changeTime.minutes }}분)</span>
				<div>
					<label for="0">시간배</label>
					<input type="radio" name="halfOption" v-model="shipData.halfOption.val" id="0" value="시간배"
						@blur="clearValid('halfOption')">
					<label for="1">종일배</label>
					<input type="radio" name="halfOption" v-model="shipData.halfOption.val" id="1" value="종일배"
						@blur="clearValid('halfOption')">
				</div>
				<p class="error" v-if="shipData.departureTime.valid && shipData.arrivalTime.valid">출항시간과 입항시간을 입력해주세요</p>
			</div>
			<div class="form_container ship_map">
				<label>출항지</label>
				<p class="error" v-if="shipData.departurePlace.valid">출항지를 선택해주세요</p>
				<div id="map_wrap">
					<div id="map"></div>
					<div id="search_box">
						<form @submit.prevent="searchKeyword">장소 검색 : <input type="text"
								v-model="keyword"><button>검색하기</button></form>
					</div>
					<div id="result">
						<div class="place" v-for="(location, idx) in searchData.result" :key="location.id"
							@click="addLatLng(location, idx), clearValid('departurePlace')">
							<h5>{{ location.place_name }}</h5>
							<span>{{ location.address_name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="form_container fishplaceholder">
				<label>대표어종</label>
				<input type="text" :placeholder="selectedFishPlaceholder" @click="open" @blur="clearValid('fishName')">
				<base-fishdata v-if="isvisible" @trysubmit="tryClose"></base-fishdata>
				<p class="error" v-if="shipData.fishName.valid">대표어종을 선택해주세요</p>
			</div>
			<div class="form_container ship_fishingtype">
				<div class="fishingtype_wrap">
					<label class="fishingtype_title">낚시방법<span class="error" v-if="shipData.fishingType.valid">낚시 방법을
							선택해주세요</span></label>
					<div v-for="fishingType in fishingTypeData" :key="fishingType.id" class="fishing_type">
						<input type="radio" name="fishingType" :id="fishingType.id" :value="fishingType.value"
							v-model="shipData.fishingType.val" @blur="clearValid('fishingType')">
						<label :for="fishingType.id">{{ fishingType.value }}</label>
					</div>
				</div>

			</div>
			<div class="form_container ship_msg">
				<label for="intro_text">인사말</label>
				<p class="error" v-if="shipData.introText.valid">인사말을 입력해주세요</p>
				<textarea name="intro_text" id="intro_text" cols="30" rows="10" v-model="shipData.introText.val"
					@blur="clearValid('introText')"></textarea>
			</div>
			<div class="form_container ship_msg">
				<label for="message">전달사항</label>
				<p class="error" v-if="shipData.message.valid">전달사항을 입력해주세요</p>
				<textarea name="message" id="message" cols="30" rows="10" v-model="shipData.message.val"
					@blur="clearValid('message')"></textarea>
			</div>
			<base-button mode="register_btn">등록하기</base-button>
		</form>
	</section>
</template>

<script>
import { ref, computed, watchEffect, onMounted } from 'vue';
import BaseFishdata from '@/components/ui/BaseFishdata.vue';

//hook
import { fishSearch } from '@/hooks/fishSearch.js';

import router from '@/router';

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useStore } from 'vuex';

//data 
import { fishingType } from '@/data/data.js';

export default {
	components: {
		BaseFishdata,
	},
	setup() {
		const selectedFishId = ref([]);

		const store = useStore();

		//**데이터**
		const fishingTypeData = fishingType;

		const shipData = ref({
			shipName: {
				val: '',
				valid: false,
			},
			people: {
				val: '',
				valid: false,
			},
			price: {
				val: '',
				valid: false,
			},
			departureTime: {
				val: '',
				valid: false,
			},
			arrivalTime: {
				val: '',
				valid: false,
			},
			halfOption: {
				val: '',
				valid: false,
			},
			departurePlace: {
				val: '',
				valid: false,
			},
			departureAddress: {
				val: '',
				valid: false,
			},
			location: {
				val: '',
				valid: false,
			},
			lat: {
				val: '',
				valid: false,
			},
			lng: {
				val: '',
				valid: false,
			},
			fishName: {
				val: [],
				valid: false,
			},
			fishingType: {
				val: '',
				valid: false,
			},
			introText: {
				val: '',
				valid: false,
			},
			message: {
				val: '',
				valid: false,
			},
		});
		//**데이터**

		const clearValid = (input) => {
			shipData.value[input].valid = false;
		}


		//**선박 이미지 저장**
		const fileChange = (e) => {
			const shipimgfiles = e.target.files;

			if (shipimgfiles.length > 0) {
				uploadImages(shipimgfiles);
			}
		}

		const uploadImages = async (files) => {
			const storage = getStorage();
			const userId = store.getters.userId.userId;

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const storageRefPath = `images/${userId}/img${i}`;
				const storageRef1 = storageRef(storage, storageRefPath);

				await uploadBytes(storageRef1, file);

				const imageUrl = await getDownloadURL(storageRef1);

				console.log('Uploaded Image URL:', imageUrl);
			}
		}
		//**선박 이미지 저장**

		//**카카오 지도**
		const searchData = ref({
			result: null,
		});

		const LatLng = ref({
			lat: 37.566826,
			lng: 126.9786567,
		});

		onMounted(() => {
			//스크립트 소스 가져오기
			const script = document.createElement('script');
			/* global kakao */
			script.onload = () => kakao.maps.load(initMap);
			script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=0700e8a59649fa1750ac6f51c839e252&autoload=false&libraries=services';
			document.head.appendChild(script);
		});

		const initMap = () => {
			const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
				mapOption = {
					center: new kakao.maps.LatLng(LatLng.value.lat, LatLng.value.lng), // 지도의 중심좌표
					level: 7 // 지도의 확대 레벨
				};

			// 지도를 생성합니다    
			var map = new kakao.maps.Map(mapContainer, mapOption);

			//마커를 생성
			var markerPosition = new kakao.maps.LatLng(LatLng.value.lat, LatLng.value.lng);

			var marker = new kakao.maps.Marker({
				position: markerPosition
			});
			marker.setMap(map);

			return map;
		}
		const keyword = ref('');

		const searchKeyword = () => {

			if (keyword.value === '') {
				alert('출항지 주소를 입력해주세요!');
				return;
			}

			// 장소 검색 객체를 생성합니다
			const ps = new kakao.maps.services.Places();

			// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
			ps.keywordSearch(keyword.value, placesSearchCB);

			function placesSearchCB(data, status) {
				searchData.value.result = data;

				if (status === kakao.maps.services.Status.ZERO_RESULT) {
					alert('검색 결과가 존재하지 않습니다.');
					return;
				} else if (status === kakao.maps.services.Status.ERROR) {
					alert('검색 결과 중 오류가 발생했습니다.');
					return;
				}

				let bounds = new kakao.maps.LatLngBounds();

				for (var i = 0; i < data.length; i++) {
					// 마커를 생성하고 지도에 표시합니다
					let marker = new kakao.maps.Marker({
						map: map,
						position: new kakao.maps.LatLng(data[i].y, data[i].x)
					});
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
					marker.setMap(map);
				}

				const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
					mapOption = {
						center: new kakao.maps.LatLng(LatLng.value.lat, LatLng.value.lng), // 지도의 중심좌표
						level: 7 // 지도의 확대 레벨
					};

				// 지도를 생성합니다    
				var map = new kakao.maps.Map(mapContainer, mapOption);


				//마커를 생성
				var markerPosition = new kakao.maps.LatLng(LatLng.value.lat, LatLng.value.lng);

				var marker = new kakao.maps.Marker({
					position: markerPosition
				});
				marker.setMap(map);

				map.setBounds(bounds);
			}
		}

		const addLatLng = (locationData, idx) => {
			shipData.value.departurePlace.val = locationData.place_name;
			shipData.value.departureAddress.val = locationData.address_name;
			shipData.value.lat.val = locationData.y;
			shipData.value.lng.val = locationData.x;

			const locationOj = document.querySelectorAll('.place');

			locationOj.forEach(item => {
				item.classList.remove('place_active');
			});

			locationOj[idx].classList.add('place_active');
		}

		//**카카오 지도**

		//**시간변환**
		// const changeTime = computed(() =>{ 
		// 	const departure = new Date(`2020-01-01T${shipData.value.departureTime}`);
		// 	const arrival = new Date(`2020-01-01T${shipData.value.arrivalTime}`);
		// 	const differenceTime = arrival - departure;

		// 	const hours = Math.floor(differenceTime / (1000 * 60 * 60));
		// 	const minutes = Math.floor(differenceTime % (1000 * 60 * 60) / (1000 * 60));

		// 	return { hours, minutes }
		// });
		const changeTime = ref({ hours: 0, minutes: 0 });

		watchEffect(() => {
			const departure = new Date(`2020-01-01T${shipData.value.departureTime.val}`);
			const arrival = new Date(`2020-01-01T${shipData.value.arrivalTime.val}`);
			const differenceTime = arrival - departure;

			changeTime.value.hours = Math.floor(differenceTime / (1000 * 60 * 60));
			changeTime.value.minutes = Math.floor((differenceTime % (1000 * 60 * 60)) / (1000 * 60));
		});
		//**시간변환**


		//**어종선택창**
		const isvisible = ref(false);

		//열기
		const open = () => {
			isvisible.value = true;
		}

		//닫기
		const tryClose = (selectFish) => {
			isvisible.value = false;
			selectedFishId.value = selectFish;

			shipData.value.fishName.val = fishSearch(selectedFishId.value);
		}
		//**어종선택창**


		//**placeholder**
		const selectedFishPlaceholder = computed(() => {
			return shipData.value.fishName.val.length > 0 ? shipData.value.fishName.val.join(', ') : "클릭하여 어종을 선택해주세요";
		});
		//**placeholder**

		//지역 이름 반환
		const locationReturn = () => {
			shipData.value.location.val = shipData.value.departureAddress.val.split(' ')[0];
		}

		//데이터 제출
		const submitForm = () => {
			locationReturn();

			// 유효성 검사
			let isValid = false;

			for (const key in shipData.value) {
				if (shipData.value[key].val === '' || shipData.value[key].val.length === 0) {
					shipData.value[key].valid = true;
					isValid = false;
				}
			}

			if (!isValid) {
				return;
			}

			const formData = {
				shipName: shipData.value.shipName.val,
				people: shipData.value.people.val,
				price: shipData.value.price.val,
				departureTime: shipData.value.departureTime.val,
				arrivalTime: shipData.value.arrivalTime.val,
				halfOption: shipData.value.halfOption.val,
				departurePlace: shipData.value.departurePlace.val,
				departureAddress: shipData.value.departureAddress.val,
				location: shipData.value.location.val,
				lat: shipData.value.lat.val,
				lng: shipData.value.lng.val,
				fishName: shipData.value.fishName.val,
				fishingType: shipData.value.fishingType.val,
				introText: shipData.value.introText.val,
				message: shipData.value.message.val,
			}
			store.dispatch('shipitem/registerShip', formData);

			for (const key in shipData.value) {
				shipData.value[key].valid = false;
			}

			router.replace('/ShipList');
		}

		return {
			open,
			isvisible,
			tryClose,
			selectedFishId,
			selectedFishPlaceholder,
			shipData,
			changeTime,
			submitForm,
			//kakao map
			keyword,
			searchKeyword,
			searchData,
			addLatLng,
			//kakao map
			fileChange,
			fishingTypeData,
			clearValid
		}
	}
}
</script>

<style lang="scss" scoped>
#register_section {
	width: 1200px;
	margin: 30px auto 0 auto;
	border: 1px solid #ccc;
	padding: 10px;
	border-radius: 25px;

	@media (max-width: 1200px) {
		width: calc(100% - 50px);
	}

	.form_container {
		margin: 10px 0 0 10px;

		.error {
			font-size: 13px;
			color: red;
		}
	}

	.ship_name {

		input {
			width: 300px;
			height: 30px;
			padding-left: 10px;
			margin-left: 8px;
			background-color: #e1e1e1;
			font-size: 15px;
			border: 0;
			border-radius: 15px;
			outline: none;
		}
	}

	.ship_people {

		input {
			width: 100px;
			height: 30px;
			padding-left: 10px;
			margin-left: 8px;
			background-color: #e1e1e1;
			font-size: 15px;
			border: 0;
			border-radius: 15px;
			outline: none;

			&::-webkit-inner-spin-button {
				appearance: none;
				-moz-appearance: none;
				-webkit-appearance: none;
			}
		}
	}

	.ship_price {

		input {
			width: 150px;
			height: 30px;
			padding-left: 10px;
			margin-left: 8px;
			background-color: #e1e1e1;
			font-size: 15px;
			border: 0;
			border-radius: 15px;
			outline: none;

			&::-webkit-inner-spin-button {
				appearance: none;
				-moz-appearance: none;
				-webkit-appearance: none;
			}
		}
	}

	.ship_time {

		.ship_time_input {
			width: 120px;
			height: 30px;
			padding-left: 10px;
			padding-right: 5px;
			margin-left: 8px;
			background-color: #e1e1e1;
			font-size: 13px;
			border: 0;
			border-radius: 15px;
			outline: none;
		}

		div {
			display: inline-block;
			margin-left: 5px;

			label {
				margin-right: 3px;
			}

			input {
				border: 1px solid #ccc;
				margin-right: 5px;
			}
		}
	}

	.ship_map {
		#map_wrap {
			width: 500px;
			position: relative;

			#map {
				width: 500px;
				height: 400px;
			}

			@media (max-width:600px) {
				width: 350px;

				#map {
					width: 100%;
					height: 300px;
				}
			}

			#search_box {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 30000;

				form {
					background-color: rgba(255, 255, 255, 0.9);
					padding: 3px 10px;
					border-radius: 5px;
					display: flex;
					align-items: center;

					input {
						width: 100px;
						height: 30px;
						font-size: 18px;
						padding-left: 5px;
						margin: 0 5px 0 5px;
					}

					button {
						background-color: #7aa5d2;
						border: none;
						padding: 2px 5px;
						border-radius: 5px;
						color: #111;
					}
				}

				@media (max-width: 950px) {
					form {
						font-size: 15px;

						input {
							font-size: 16px;
						}

					}
				}
			}

			#result {
				width: 250px;
				min-height: 0px;
				max-height: 100%;
				position: absolute;
				top: 0;
				left: 100%;
				z-index: 3000;
				overflow-y: scroll;

				.place {
					margin: 0 0 7px 3px;
					padding-left: 15px;
					background: rgba(0, 0, 0, .1);
					border-radius: 25px;
					cursor: pointer;

					h5 {
						font-size: 16px;
						font-weight: normal;
					}

					span {
						font-size: 12px;
					}

					&.place_active {
						background: #7aa5d2;
					}
				}

				@media (max-width: 950px) {
					width: 200px;
					height: calc(100% - 36px);
					top: 36px;
					left: 0;
					background-color: #fff;

					.place {
						h5 {
							font-size: 14px;
						}

						span {
							font-size: 11px;
							width: 100%;
							display: block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}

	.fishplaceholder {

		input {
			width: 200px;
			text-align: center;
			height: 30px;
			padding-right: 5px;
			margin-left: 8px;
			background-color: #e1e1e1;
			font-size: 13px;
			border: 0;
			border-radius: 15px;
			outline: none;
			caret-color: transparent;
			cursor: pointer;

			&::placeholder {
				color: #000;
			}
		}
	}

	.ship_fishingtype {

		.fishingtype_wrap {
			border: 1px solid #ccc;
			width: 30%;
			padding: 20px 15px 10px 15px;
			margin-top: 30px;
			margin-bottom: 30px;
			border-radius: 15px;
			display: flex;
			flex-wrap: wrap;
			position: relative;
			justify-content: center;

			@media (max-width: 600px) {
				width: 150px;
			}

			.fishingtype_title {
				position: absolute;
				top: -14px;
				left: 15px;
				background: #fff;
			}

			.fishing_type {
				display: inline-block;
				width: 150px;

				input {
					margin-right: 3px;
				}
			}
		}
	}

	.ship_msg {
		display: flex;
		flex-direction: column;

		textarea {
			max-width: 500px;
			margin: 7px 10px 0 0;
			border: 1px solid #ccc;
		}
	}
}
</style>