<template>
	<div id="reservation_wrap">
		<div class="month_wrap">
			<div class="month" :class="{ 'month_disable': month < currentMonth, 'month_active': month === selectedMonth }"
				v-for="(month, idx) in months" :key="idx" @click="month >= currentMonth && selectMonth(month)">
				<span>{{ month }}</span>
			</div>
		</div>
		<div class="day_wrap">
			<div class="day_box" v-for="(day, idx) in days" :key="idx">
				<div class="day_title_wrap" :class="dayClass(day)">
					<span>{{ day }}일</span>
				</div>
				<div class="day_main">
					<div class="reservation_state" :class="{ 'reservation_full_state': updatePeople(day) === 0 }">
						<span v-if="day < currentDay && matchMonth">예약불가</span>
						<span v-else>{{ updatePeople(day) === 0 ? '예약마감' : '예약가능' }}</span>
					</div>
					<div class="reservation_people" :class="{ 'close_day': day < currentDay && matchMonth }">{{
						updatePeople(day) }} / {{ maximumPeople }}</div>
					<button class="reservation_btn" :disabled="day < currentDay && matchMonth || updatePeople(day) === 0"
						:class="{ 'reservation_btn_active': selectedMonth === currentMonth && day < currentDay, 'reservation_full_btn': updatePeople(day) === 0 }"
						@click="goToReservation(day)">
						<span v-if="day < currentDay && matchMonth">예약불가</span>
						<span v-else>{{ updatePeople(day) === 0 ? '예약마감' : '예약하기' }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div id="reservation_dialog" v-if="reservationDialogVisible">
		<div class="dialog_wrap">
			<header>
				<h2>예약하기</h2>
			</header>
			<div class="reservation_contents">
				<form>
					<div class="reservation_name_section">
						<input type="text" placeholder="예약자 이름" v-model="reservationData.reservationName">
						<p class="error" v-if="inputError.name">예약자 이름을 작성해주세요</p>
					</div>
					<div class="reservation_phone_section">
						<input type="text" placeholder="휴대폰 번호" v-model="reservationData.reservationPhone">
						<p class="error" v-if="inputError.phone">예약자 전화번호를 작성해주세요</p>
					</div>
					<div class="reservation_people_section">
						<span>예약인원</span>
						<div>
							<i class="fa-solid fa-minus rv_btn" @click="minusBtn"></i>
							<input type="number" :value="reservationData.reservationPeople" @keydown.prevent>
							<i class="fa-solid fa-plus rv_btn" @click="plusBtn"></i>
						</div>
					</div>
					<div class="line"></div>
					<div class="reservation_tital_section">
						<span>{{ totalPrice }} Won</span>
					</div>
				</form>
			</div>
			<base-button mode="reservation_dialog_close" @click="close">닫기</base-button>
			<base-button mode="reservation_btn" @click="submitForm">예약하기</base-button>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	props: ['shipId'],
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const ship_Id = ref(props.shipId);

		//날짜를 구하는 부분
		const selectedMonth = ref(new Date().getMonth() + 1);

		const currentMonth = ref(new Date().getMonth() + 1);
		const currentDay = new Date().getDate();

		const months = Array.from({ length: 12 }, (_, idx) => idx + 1);
		const days = computed(() => {
			const lastday = new Date(new Date().getFullYear(), selectedMonth.value - 1, 0).getDate();
			return Array.from({ length: lastday }, (_, idx) => idx + 1);
		});

		const selectMonth = (month) => {
			selectedMonth.value = month;
		}

		const dayClass = (day) => {
			const date = new Date(new Date().getFullYear(), selectedMonth.value - 1, day);
			const weekday = date.getDay();
			return {
				'saturday': weekday === 6,
				'sunday': weekday === 0,
			};
		};

		const matchMonth = computed(() => selectedMonth.value === currentMonth.value)
		//날짜를 구하는 부분

		//예약 모달창 부분
		const reservationDialogVisible = ref(false);
		const selectedDay = ref('');
		const goToReservation = (day) => {
			if (!store.getters['auth/isToken']) {
				alert('로그인 후 예약 기능을 사용하실 수 있습니다.');
				router.replace('/LoginSection');
			}
			reservationDialogVisible.value = true;
			selectedDay.value = day;
		}

		const close = () => {
			reservationDialogVisible.value = false;
		}
		//예약 모달창 부분

		//예약 정보 데이터
		const reservationData = ref({
			reservationName: ref(''),
			reservationPhone: ref(''),
			reservationPeople: ref(1)
		})

		//예약 정보 데이터

		//예약인원 증감
		const minusBtn = () => {
			reservationData.value.reservationPeople--;
		}

		const plusBtn = () => {
			reservationData.value.reservationPeople++;
		}
		//예약인원 증감

		//예약 데이터 유효성 검사
		const inputError = ref({
			name: false,
			phone: false,
		});
		//예약 데이터 유효성 검사

		//데이터 제출
		const submitForm = () => {
			if(reservationData.value.reservationName === '' && reservationData.value.reservationPhone === '') {
				inputError.value.name = true;
				inputError.value.phone = true;
				return;
			} else if (reservationData.value.reservationName === '') {
				inputError.value.name = true;
				return;
			} else if (reservationData.value.reservationPhone === '') {
				inputError.value.phone = true;
				return;
			} else {
				const data = {
					month: selectedMonth.value,
					day: selectedDay.value,
					userData: {
						name: reservationData.value.reservationName,
						phone: reservationData.value.reservationPhone,
						people: reservationData.value.reservationPeople,
					},
					shipId: ship_Id.value,
				}
				store.dispatch('reservation/reservation', data);
				reservationDialogVisible.value = false;

				//데이터 초기화
				inputError.value.name = false;
				inputError.value.phone = false;
				reservationData.value.reservationName = '',
				reservationData.value.reservationPhone = '',
				reservationData.value.reservationPeople = 1,
				router.replace('/ShipList');
			}

		}
		//데이터 제출

		//선박의 최대 인원 구하기
		const shipDatas = computed(() => store.getters['shipitem/ships']);

		const maximumPeople = ref('');
		onMounted(() => {
			const data = shipDatas.value.find(ship => ship.id === ship_Id.value);
			if (data) {
				maximumPeople.value = data.people;
			}

			store.dispatch('reservation/setReservation', ship_Id.value);
		});

		const reservationDatas = computed(() =>
			store.getters['reservation/reservationData'].filter(data => data.month === selectedMonth.value)
		);
		//선박의 남은 자리 구하기
		const updatePeople = (day) => {
			const reservationsDay = reservationDatas.value.filter(data => data.day === day);

			if (reservationsDay.length > 0) {
				const reservationsPeople = reservationsDay.reduce((sum, reservation) => sum + reservation.userData.people, 0);

				const remainingSeat = maximumPeople.value - reservationsPeople;
				return remainingSeat;
			} else {
				return maximumPeople.value;
			}
		}


		const totalPrice = computed(() => {
			const data = shipDatas.value.find(ship => ship.id === ship_Id.value);
			const total = data.price * reservationData.value.reservationPeople;

			return total.toLocaleString('ko-KR');
		})
		return {
			months,
			currentMonth,
			selectedMonth,
			days,
			selectMonth,
			dayClass,
			currentDay,
			reservationDialogVisible,
			goToReservation,
			close,
			minusBtn,
			plusBtn,
			reservationData,
			submitForm,
			maximumPeople,
			updatePeople,
			matchMonth,
			totalPrice,
			inputError
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#reservation_wrap {
	width: calc(100% - 180px);
	padding: 20px;
	overflow-y: scroll;

	@media (max-width: 1200px) {
		width: 100%;
	}

	.month_wrap {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 15px;

		@include center-sb;

		.month {
			background-color: #ccc;
			text-align: center;
			padding: 0 14px;
			border-radius: 8px;
			line-height: 1.7;
			cursor: pointer;
		}

		.month_disable {
			background-color: #fff;
			cursor: default;
		}

		.month_active {
			background-color: #7aa5d2;
		}

		@media (max-width: 700px) {
			align-items: center;
			flex-wrap: wrap;
			justify-content: normal;

			.month {
				padding: 0;
				margin-bottom: 5px;
				width: 40px;
				margin-right: 10px;
			}
		}

	}

	.day_wrap {
		width: 100%;
		padding: 10px 10px 10px 30px;
		margin-top: 15px;
		border: 1px solid #ccc;
		border-radius: 15px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		.day_box {
			width: calc((100% - 80px) / 7);
			border: 1px solid #ccc;
			border-radius: 15px;
			margin-bottom: 20px;
			padding-bottom: 5px;

			.day_title_wrap {
				text-align: center;
				border-radius: 15px 15px 0 0;
				background-color: #ccc;
			}

			.saturday {
				background-color: rgb(49, 49, 224);
				color: #fff;
			}

			.sunday {
				background-color: rgb(216, 51, 51);
				color: #fff;
			}

			.day_main {
				text-align: center;

				.reservation_state {
					font-size: 14px;
					margin-top: 5px;
				}

				.reservation_full_state {
					color: rgb(248, 82, 82);
				}

				.reservation_people {
					font-size: 12px;
					margin: 5px 0 3px 0;
				}

				.close_day {
					text-decoration: line-through;
				}

				.reservation_btn {
					background-color: #7aa5d2;
					border: 1px solid #7aa5d2;
					border-radius: 30px;
					padding: 0.15rem 0.4rem;
					font-size: 12px;
					color: #fff;
					line-height: 1.4;
					margin: 0;
					cursor: pointer;
					display: inline-block;
				}

				.reservation_btn_active {
					padding: 0.15rem 0.4rem;
					font-size: 12px;
					margin: 0;
					background-color: #ccc;
					border: #ccc;
					cursor: default;
				}

				.reservation_full_btn {
					background-color: red;
					border: red;
				}
			}
		}

		@media (max-width: 1200px) {
			padding: 10px 0 10px 40px;

			.day_box {
				width: calc((100% - 80px) / 5);
			}
		}

		@media (max-width: 700px) {
			gap: 5px 20px;
			padding: 10px 10px 10px 10px;
		}

		@media (max-width: 649px) {

			.day_box {
				width: calc((126% - 80px) / 5);
			}
		}
	}
}

#reservation_dialog {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 10;

	.dialog_wrap {
		width: 500px;
		height: 500px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.46);
		border-radius: 25px;
		background-color: #fff;

		@include position-center-a;

		header {
			background-color: #7aa5d2;
			border-radius: 25px 25px 0 0;
			color: white;
			width: 100%;
			padding: .5rem;
			text-align: center;
			letter-spacing: 1.1px;

			h2 {
				font-size: 20px;
			}
		}

		.reservation_contents {
			margin-top: 50px;

			form {
				width: 300px;
				margin: 0 auto;

				.reservation_name_section {
					margin-bottom: 10px;

					input {
						background-color: #eee;
						border: none;
						padding: 12px 15px;
						margin: 8px 0;
						width: 100%;
					}
				}

				.reservation_phone_section {
					margin-bottom: 20px;

					input {
						background-color: #eee;
						border: none;
						padding: 12px 15px;
						margin: 8px 0;
						width: 100%;
					}
				}

				.error {
					font-size: 13px;
					color: red;
				}

				.reservation_people_section {
					display: flex;
					justify-content: space-around;

					div {
						display: flex;
						width: 100px;
						align-items: center;
						justify-content: space-between;

						input {
							width: 30px;
							border: none;
							text-align: center;
							font-size: 18px;

							&::-webkit-inner-spin-button {
								appearance: none;
								-moz-appearance: none;
								-webkit-appearance: none;
							}
						}

						i {
							border: 1px solid #000;
							border-radius: 101000px;
							padding: 3px 4px;
							cursor: pointer;
						}
					}
				}

				.line {
					width: 100%;
					height: 1px;
					border-top: 1px solid #000;
					margin-top: 30px;
					margin-bottom: 30px;
				}

				.reservation_tital_section {
					text-align: right;
				}
			}
		}
	}
}</style>