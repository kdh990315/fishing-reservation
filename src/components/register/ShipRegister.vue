<template>
	<section id="register_section">
		<form @submit.prevent="submitForm">
			<div class="form_container">
				<label>선박명</label>
				<input type="text" placeholder="선박명을 입력해주세요" v-model="shipData.shipName">
			</div>
			<div class="form_container">
				<label>선박 이미지 등록하기(최대 3장)</label>
				<input multiple type="file" accept="image/*" @change="fileChange">
			</div>
			<div class="form_container">
				<label>최대 승선 인원</label>
				<input type="text" placeholder="ex) 12" v-model="shipData.people">
			</div>
			<div class="form_container">
				<label>비용</label>
				<input type="text" placeholder="ex) 120000" v-model="shipData.price">
			</div>
			<div class="form_container">
				<label>출항시간</label>
				<input type="time" v-model="shipData.departureTime">
				<label>입항시간</label>
				<input type="time" v-model="shipData.arrivalTime">
				<span v-if="changeTime.hours * changeTime.minutes > -1">({{ changeTime.hours }}시간 {{
					changeTime.minutes }}분)</span>
			</div>
			<div class="form_container">
				<label>출항지</label>
				<div id="map_wrap">
					<div id="map"></div>
					<div id="search_box">
						<form @submit.prevent="searchKeyword">장소 검색 : <input type="text" v-model="keyword"><button>확인</button></form>
					</div>
					<div id="result">
						<div class="place" v-for="(location, idx) in searchData.result" :key="location.id" @click="addLatLng(location, idx)">
							<h5>{{ location.place_name }}</h5>
							<span>{{ location.address_name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="form_container fishplaceholder">
				<label>대표어종</label>
				<input type="text" :placeholder="selectedFishPlaceholder" @click="open">
				<base-fishdata v-if="isvisible" @trysubmit="tryClose"></base-fishdata>
			</div>
			<div class="form_container">
				<label>낚시방법</label>
				<div>
					<input type="radio" name="fishingType" id="1" value="생미끼 외수질" v-model="shipData.fishingType">
					<label for="1">생미끼 외수질</label>
				</div>
				<div>
					<input type="radio" name="fishingType" id="2" value="침선" v-model="shipData.fishingType">
					<label for="2">침선</label>
				</div>
				<div>
					<input type="radio" name="fishingType" id="3" value="타이라바" v-model="shipData.fishingType">
					<label for="3">타이라바</label>
				</div>
			</div>
			<div class="form_container">
				<label for="intro_text">인사말</label>
				<textarea name="intro_text" id="intro_text" cols="30" rows="10" v-model="shipData.introText"></textarea>
			</div>
			<div class="form_container">
				<label for="message">전달사항</label>
				<textarea name="message" id="message" cols="30" rows="10" v-model="shipData.message"></textarea>
			</div>
			<base-button>등록하기</base-button>
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

export default {
	components: {
		BaseFishdata,
	},
	setup() {
		const selectedFishId = ref([]);

		const store = useStore();

		//**데이터**
		const shipData = ref({
			shipName: '', //선박명
			people: '', //승선인원
			price: '', //가격
			departureTime: '', //출항시간
			arrivalTime: '', //입항시간
			// toTalTime: departureTime - arrivalTime,
			departurePlace: '', //출항지
			departureAddress: '', //출항지 주소
			location: '',
			lat: '', //좌표x
			lng: '', //좌표y
			fishName: [], //어종
			fishingType: '', //낚시방법
			introText: '', //인삿말
			message: '', //전달사항
			// imgFile: '', //선박 이미지
		});
		//**데이터**

		//**선박 이미지 저장**
		const fileChange = (e) => {
			const shipimgfiles = e.target.files;
			console.log(e.target.files);

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
					level: 3 // 지도의 확대 레벨
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
			// const keyword = e.target.value.trim();

			if (keyword.value === '') {
				alert('출항지 주소를 입력해주세요!');
				return;
			}

			// 장소 검색 객체를 생성합니다
			const ps = new kakao.maps.services.Places();

			// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
			ps.keywordSearch(keyword.value, placesSearchCB);

			function placesSearchCB(data, status, pagination) {
				searchData.value.result = data;
				console.log(data)
				console.log('status ' + status);

				if (status === kakao.maps.services.Status.ZERO_RESULT) {
					alert('검색 결과가 존재하지 않습니다.');
					return;
				} else if (status === kakao.maps.services.Status.ERROR) {
					alert('검색 결과 중 오류가 발생했습니다.');
					return;
				}

				console.log(pagination);

				// let bounds = new kakao.maps.LatLngBounds();

				// for(let i = 0; i < data.length; i++) {
				// 	var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x);
				// }

				// bounds.extend(placePosition);
				// console.log(bounds);
				// console.log(placePosition);

				// map.setBounds(bounds);
			}
		}

		const addLatLng = (locationData, idx) => {
			shipData.value.departurePlace = locationData.place_name;
			shipData.value.departureAddress = locationData.address_name;
			shipData.value.lat = locationData.y;
			shipData.value.lng = locationData.x;

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
			const departure = new Date(`2020-01-01T${shipData.value.departureTime}`);
			const arrival = new Date(`2020-01-01T${shipData.value.arrivalTime}`);
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

			shipData.value.fishName = fishSearch(selectedFishId.value);
		}
		//**어종선택창**


		//**placeholder**
		const selectedFishPlaceholder = computed(() => {
			return shipData.value.fishName.join(', ');
		});
		//**placeholder**

		const asd = () => {
			shipData.value.location = shipData.value.departureAddress.split(' ')[0];
		}

		const submitForm = () => {
			asd();
			store.dispatch('shipitem/registerShip', shipData.value);

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
			fileChange
		}
	}
}
</script>

<style lang="scss" scoped>
#register_section {
	width: 1200px;
	margin: 0 auto;
	border: 1px solid #ccc;

	.form_container {
		#map_wrap {
			width: 500px;
			position: relative;

			#map {
				width: 500px;
				height: 400px;
			}

			#search_box {
				height: 35px;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 30000;
				background: rgba(255, 255, 255, .5);
				padding: 5px 10px;

				input {
					width: 100px;
					height: 35px;
					font-size: 18px;
					padding-left: 5px;
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
			}
		}
	}

	.fishplaceholder {
		input {
			&::placeholder {
				color: #000;
			}
		}
	}
}
</style>