<template>
	<section id="schedule_section">
		<div class="intro_text">
			<h1>출조 준비 되셨나요?</h1>
		</div>
		<div class="intro_search_box">
			<form @submit.prevent="submitForm">
				<div class="timeoption_select_wrap wrap">
					<div class="selected_timeoption selected" @click="open('timeInput')">
						<span>{{ searchData.time === '' ? '시간배/종일배' : searchData.time }}</span>
					</div>
					<div class="selected_input_wrap input_wrap" v-if="inputvisible.timeInput">
						<div class="input_title">
							<h2>시간배/종일배</h2>
							<i class="fa-solid fa-xmark" @click="close('timeInput')"></i>
						</div>
						<div class="input_main">
							<div class="time_wrap">
								<label for="half_time" :class="{ 'active': searchData.time === '시간배' }">시간배</label>
								<input type="radio" name="ship_type" value="시간배" id="half_time" v-model="searchData.time">
								<label for="all_time" :class="{ 'active': searchData.time === '종일배' }">종일배</label>
								<input type="radio" name="ship_type" value="종일배" id="all_time" v-model="searchData.time">
							</div>
						</div>

						<div class="ok_btn">
							<p @click="close('timeInput')">확인</p>
						</div>
					</div>
				</div>
				<div class="location_select_wrap wrap">
					<div class="selected_location selected" @click="open('locationInput')">
						<span>{{ searchData.location.length === 0 ? '지역선택' : searchData.location.join(',') }}</span>
					</div>
					<div class="location_input_wrap input_wrap" v-if="inputvisible.locationInput">
						<div class="input_title">
							<h2>지역선택</h2>
							<i class="fa-solid fa-xmark" @click="close('locationInput')"></i>
						</div>
						<div class="input_main">
							<div class="location_wrap">
								<div class="location_box" v-for="loc in locationData" :key="loc.id">
									<label :for="loc.id" :class="{ 'active': searchData.location.includes(loc.value) }">{{
										loc.value }}</label>
									<input type="checkbox" :name="loc.id" :id="loc.id" :value="loc.value"
										v-model="searchData.location">
								</div>
							</div>
						</div>

						<div class="ok_btn">
							<p @click="close('locationInput')">확인</p>
						</div>
					</div>
				</div>
				<div class="fish_select_wrap wrap">
					<div class="selected_fish selected" @click="open('fishInput')">
						<span>{{ searchData.fish.length === 0 ? '어종선택' : searchData.fish.join(',') }}</span>
					</div>
					<div class="fish_input_wrap input_wrap" v-if="inputvisible.fishInput">
						<div class="input_title">
							<h2>어종선택</h2>
							<i class="fa-solid fa-xmark" @click="close('fishInput')"></i>
						</div>
						<div class="fish_wrap">
							<div class="fish_box" v-for="(group, idx) in allFishData" :key="idx">
								<p class="fish_title">{{ group.title }}</p>
								<div class="line"></div>
								<div class="fish_select_box">
									<div class="fish_data" v-for="fish in group.fishName" :key="fish.id">
										<label :for="fish.id" :class="{ 'active': searchData.fish.includes(fish.name) }">{{
											fish.name }}</label>
										<input type="checkbox" :name="fish.id" :id="fish.id" :value="fish.name"
											v-model="searchData.fish">
									</div>
								</div>
							</div>
						</div>

						<div class="ok_btn">
							<p @click="close('fishInput')">확인</p>
						</div>

					</div>
				</div>

				<base-button>찾아보기</base-button>
			</form>
		</div>
	</section>
</template>

<script>
import { computed, ref } from 'vue';
import { location, allFish } from '@/data/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
	setup() {
		const store = useStore();
		const router = useRouter();

		const locationData = location;
		const allFishData = allFish;

		const searchData = ref({
			time: '',
			location: [],
			fish: [],
		});

		const submitForm = () => {
			if (searchData.value.time === '' && searchData.value.location.length === 0 && searchData.value.fish === 0) {
				alert('최소 한가지 조건을 설정해주세요');
			} else {
				const shipdata = computed(() => store.getters['shipitem/ships']);
				const matchShips = shipdata.value.filter(ship => {
					if (
						(!searchData.value.time || ship.halfOption === searchData.value.time) &&
						(!searchData.value.location || ship.location.includes(searchData.value.location)) &&
						(!searchData.value.fish || ship.fishName.includes(searchData.value.fish))
					) {
						return true;
					}
					return false;
				});

				store.dispatch('search/setSearchData', matchShips);

				router.replace('/SearchList');
			}

			console.log(searchData.value);


		}

		const inputvisible = ref({
			timeInput: false,
			locationInput: false,
			fishInput: false,
		});

		const open = (ev) => {
			inputvisible.value[ev] = true;
		}

		const close = (ev) => {
			inputvisible.value[ev] = false;
		}



		return {
			locationData,
			allFishData,
			searchData,
			submitForm,
			inputvisible,
			open,
			close
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#schedule_section {
	width: 100%;
	height: 600px;
	background-image: url('@/assets/images/intro_bg.jpg');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 30px;
	margin-top: 35px;
	padding-top: 100px;

	@media (max-width: 800px) {
		padding-top: 30px;
	}

	.intro_text {
		text-align: center;

		h1 {
			font-size: 70px;
			padding-top: 35px;

			@media (max-width: 800px) {
				font-size: 9vw;
			}
		}
	}

	.intro_search_box {
		width: 1000px;
		height: 200px;
		background-color: #fff;
		margin: 30px auto 0;
		border-radius: 10px;

		@media (max-width:1000px) {
			width: calc(100% - 50px);
			margin: 70px auto 0 auto;
		}

		form {
			width: 100%;
			height: 100%;

			@include center-sa;

			.wrap {
				width: 230px;
				height: 110px;
				background-color: #f5f5f5;
				border-radius: 20px;
				position: relative;

				@include center;

				.selected {
					width: 170px;
					height: 40px;
					background-color: #c7c7c7;
					border-radius: 10px;
					line-height: 40px;
					text-align: center;
					cursor: pointer;
				}

				.input_wrap {
					width: 270px;
					min-height: 120px;
					background-color: #fff;
					border-radius: 25px;
					border: 1px solid #ccc;

					@include position-center-a;

					.input_title {
						position: relative;
						width: 100%;
						height: 40px;
						border-bottom: 1px solid #ccc;

						h2 {
							font-size: 18px;
							@include position-center-a;
						}

						i {
							font-size: 22px;
							position: absolute;
							right: 11px;
							top: 10px;
							cursor: pointer;
						}
					}

					.input_main {
						min-height: 80px;
						position: relative;

						.time_wrap {
							@include position-center-a;

							label {
								border: 1px solid #ccc;
								padding: 0 3px;
								border-radius: 5px;
								margin-right: 10px;
								cursor: pointer;
							}

							.active {
								background-color: #7aa5d2;
								color: #fff;
							}

							input {
								display: none;
							}
						}

						.location_wrap {
							display: flex;
							flex-wrap: wrap;
							justify-content: center;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);

							.location_box {
								display: inline-block;
								margin: 5px 0;

								label {
									border: 1px solid #ccc;
									padding: 0 3px;
									border-radius: 5px;
									margin-right: 10px;
									cursor: pointer;
								}

								.active {
									background-color: #7aa5d2;
									color: #fff;
								}

								input {
									display: none;
								}
							}
						}
					}

					.fish_wrap {
						padding: 12px;

						.fish_box {

							.fish_title {
								text-align: center;
								font-size: 16px;
								padding: 2px 0;
							}

							.line {
								width: 100%;
								height: 1px;
								margin-bottom: 5px;
								background-color: #ccc;
							}

							.fish_select_box {
								display: flex;
								flex-wrap: wrap;

								.fish_data {
									display: inline-block;
									margin: 5px 0;

									label {
										border: 1px solid #ccc;
										padding: 0 3px;
										border-radius: 5px;
										margin-right: 10px;
										cursor: pointer;
									}

									.active {
										background-color: #7aa5d2;
										color: #fff;
									}

									input {
										display: none;
									}
								}
							}
						}
					}

					.ok_btn {
						text-align: center;

						p {
							border-top: 1px solid #ccc;
							padding: 5px 0;
							border-radius: 0 0 25px 25px;
							background-color: #7aa5d2;
							cursor: pointer;
						}
					}
				}
			}
		}

		@media (max-width: 800px) {
			width: calc(100% - 50px);
			height: 322px;

			form {
				height: auto;
				flex-direction: column;

				.wrap {
					width: 280px;
					height: 70px;
					margin: 15px auto;
					border-bottom: 1px solid #ccc;

					.selected {
						width: 190px;
						height: 35px;
						line-height: 35px;
					}
				}
			}
		}
	}
}
</style>