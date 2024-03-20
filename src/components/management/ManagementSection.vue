<template>
	<section id="management_section">
		<div class="wrap">
			<h1 class="title">예약 내역 확인하기</h1>
			<div class="container" v-if="ReservationManagementData">
				<div class="reservationData_container" v-for="(monthData, month) in ReservationManagementData"
					:key="month">
					<h3 class="month">{{ month }}월</h3>
					<div class="dayData" v-for="(dayData, day) in monthData" :key="day">
						<div class="main_container">
							<div class="day_container">
								<h4 class="day">{{ day }}일</h4>
							</div>
							<div class="reservationData">
								<div class="userData" v-for="(userData, userId) in dayData" :key="userId">
									<span class="userName">예약자 성함 : {{ userData.userData.name }}</span>/
									<span class="userPeople">예약 인원 : {{ userData.userData.people }}명</span>
									<p>예약자 전화번호 : {{ userData.userData.phone }}</p>
								</div>
							</div>
						</div>
						<div class="total_container">
							<p class="total">총 승선 인원<br><span>{{ totalPeople(month, day) }}</span>명</p>
						</div>
					</div>
				</div>
			</div>
			<p v-else>예약자가 존재하지 않습니다.</p>
		</div>
		
	</section>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const shipId = localStorage.userId;
		onMounted(() => {
			store.dispatch('shipitem/setShipData');
		});

		const shipDatas = computed(() => {
			return store.getters['shipitem/ships'];
		});

		const ReservationManagementData = ref(null);

		watchEffect(() => {
			ReservationManagementData.value = shipDatas.value.find(item => item.id === shipId)?.rservation;
		});

		const totalPeople = (month, day) => {
			let total = 0;
			if (ReservationManagementData.value && ReservationManagementData.value[month] && ReservationManagementData.value[month][day]) {
				const data = ReservationManagementData.value[month][day];
				for (const userId in data) {
					total += data[userId].userData.people;
				}
			}
			return total;
		};

		return {
			ReservationManagementData,
			totalPeople
		};
	}
};
</script>

<style lang="scss" scoped>
@import "../../scss/mixin.scss";

#management_section {
	width: 500px;
	min-height: 500px;
	border: 1px solid #ccc;
	border-radius: 1rem;
	margin: 50px auto 0 auto;
	padding: 1rem;

	.wrap {
		.title {
			text-align: center;
			font-size: 1.5rem;
			padding-bottom: 1rem;
		}

		.container {

			.reservationData_container {
				width: 100%;
				border: 1px solid #ccc;
				border-radius: 1rem;
				margin-bottom: 15px;

				.month {
					width: 100%;
					padding: .1rem 0 .5rem 0;
					font-size: 1.4rem;
					text-align: center;
				}

				.dayData {
					width: 100%;
					padding: .5rem 1rem;
					border-bottom: 1px solid #ccc;

					&:last-child {
						border-bottom: none
					}

					@include center-sb;

					.main_container {
						display: flex;

						.day_container {
							padding-right: 1rem;

							.day {
								@include position-center-r;
							}
						}

						.reservationData {

							.userData {
								margin-bottom: .3rem;
								font-size: .8rem;
								letter-spacing: 0.5px;

								.userName {
									margin-right: .3rem;
								}
							}
						}
					}

					.total_container {
						text-align: center;

						.total {
							font-size: .8rem;

							span {
								font-weight: 600;
								margin-right: 1px;
							}
						}
					}
				}
			}
		}
	}
}
</style>