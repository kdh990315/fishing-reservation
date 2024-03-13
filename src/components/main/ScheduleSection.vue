<template>
	<section id="schedule_section">
		<div class="intro_container">
			<div class="intro_img"></div>
			<div class="intro_form_container">
				<h6>출조를 준비중이신가요?</h6>

				<div class="intro_search_box">
					<form @submit.prevent="submitForm">
						<div class="timeoption_select_wrap wrap">
							<div class="input_main">
								<div class="time_wrap">
									<input type="radio" name="ship_type" value="시간배" id="half_time"
										v-model="searchData.time">
									<label for="half_time" :class="{ 'active': searchData.time === '시간배' }">시간배</label>
									<input type="radio" name="ship_type" value="종일배" id="all_time"
										v-model="searchData.time">
									<label for="all_time" :class="{ 'active': searchData.time === '종일배' }">종일배</label>
								</div>
							</div>
						</div>

						<div class="location_select_wrap wrap">
							<span class="location_title">지역선택</span>
							<div class="selected_location selected" :class="{ 'active': inputvisible.locationInput }">
								<span @click="open('locationInput')" class="selected_placeholder">{{
						searchData.location.length === 0 ? '지역선택' : searchData.location.join(',') }}</span>
								<div class="location_input_wrap input_wrap" v-if="inputvisible.locationInput">
									<div class="input_main">
										<div class="location_wrap">
											<div class="location_box" v-for="loc in locationData" :key="loc.id"
												:class="{ 'active': searchData.location.includes(loc.value) }">
												<label :for="loc.id">{{ loc.value }}</label>
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
						</div>

						<div class="fish_select_wrap wrap">
							<span class="fish_title">어종선택</span>
							<div class="selected_fish selected" :class="{ 'active': inputvisible.fishInput }">
								<span @click="open('fishInput')" class="selected_placeholder">{{ searchData.fish.length
						=== 0 ? '어종선택' : searchData.fish.join(',') }}</span>

								<div class="fish_input_wrap input_wrap" v-if="inputvisible.fishInput">
									<div class="fish_wrap">
										<div class="fish_box" v-for="(group, idx) in allFishData" :key="idx">
											<p class="fish_group">{{ group.title }}</p>
											<div class="fish_select_box">
												<div class="fish_data" v-for="fish in group.fishName" :key="fish.id"
													:class="{ 'active': searchData.fish.includes(fish.name) }">
													<label :for="fish.id">{{ fish.name }}</label>
													<input type="checkbox" :name="fish.id" :id="fish.id"
														:value="fish.name" v-model="searchData.fish">
												</div>
											</div>
										</div>
									</div>

									<div class="ok_btn">
										<p @click="close('fishInput')">확인</p>
									</div>

								</div>
							</div>
						</div>

						<base-button mode="intro_btn">찾아보기</base-button>
					</form>
				</div>
			</div>
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
			time: '시간배',
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
		}

		const inputvisible = ref({
			locationInput: false,
			fishInput: false,
		});

		const open = (ev) => {
			inputvisible.value[ev] = !inputvisible.value[ev];
		}

		const close = (ev) => {
			inputvisible.value[ev] = !inputvisible.value[ev];
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
	height: 650px;
	margin-top: 35px;

	.intro_container {
		width: 100%;
		height: 100%;
		position: relative;

		.intro_img {
			width: 1000px;
			height: 100%;
			background-image: url('@/assets/images/intro_bg.jpg');
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			border-radius: 1rem;
			margin-left: auto;
		}

		.intro_form_container {
			width: 25%;
			position: absolute;
			top: 50%;
			left: 5%;
			transform: translateY(-50%);
			background-color: #fff;
			box-shadow: 0px 0px 40px rgba(29, 58, 83, 0.1);
			border-radius: 1rem;

			h6 {
				font-size: 1.3rem;
				padding: 1.2rem 1.6rem;
				border-bottom: 1px solid #efefef;
				letter-spacing: 0.04rem;
			}

			.intro_search_box {
				padding: 1.6rem;

				.timeoption_select_wrap {

					.input_main {

						.time_wrap {
							display: flex;

							input {
								margin-right: 7px;

								&:checked {
									background-color: #7aa5d2;
									border-color: #7aa5d2;
								}
							}

							label {
								margin-right: 1rem;
								color: #747579;

								&.active {
									color: #000;
								}
							}
						}
					}
				}

				.location_select_wrap {
					width: 100%;
					margin-top: 25px;
					position: relative;


					.location_title {
						background-color: #fff;
						padding: 1px 2px;
						position: absolute;
						top: -11px;
						left: 16px;
						color: #8d8d8d;
						font-size: 0.85rem;
					}

					.selected {
						width: 100%;
						border-radius: 1rem;
						text-align: center;
						border: 1px solid #c5c5c7;

						&.active {
							border: 1px solid #000;
							border-radius: 1rem 1rem 0 0;
						}

						.selected_placeholder {
							display: block;
							width: 100%;
							padding: 0.65rem 0;
							cursor: pointer;
						}

						.location_input_wrap {
							border: 1px solid #000;
							background-color: #fff;
							z-index: 30000;
							position: absolute;
							width: 100%;
							left: 0;

							.input_main {
								max-height: 200px;
								overflow-y: scroll;
								scrollbar-width: none;

								.location_wrap {

									.location_box {
										padding: .5rem;
										cursor: pointer;

										&.active {
											background-color: rgba(122, 165, 210, .3);
										}

										&:hover {
											background-color: rgba(122, 165, 210, .3);
										}

										label {
											width: 100%;
											cursor: pointer;
											display: block;
										}

										input {
											display: none;
										}
									}
								}
							}

							.ok_btn {
								color: #fff;
								background-color: #272323;
								padding: .35rem;
								cursor: pointer;
							}
						}
					}
				}

				.fish_select_wrap {
					width: 100%;
					margin-top: 35px;
					position: relative;

					.fish_title {
						background-color: #fff;
						padding: 1px 2px;
						position: absolute;
						top: -11px;
						left: 16px;
						color: #8d8d8d;
						font-size: 0.85rem;
					}

					.selected {
						width: 100%;
						border-radius: 1rem;
						text-align: center;
						border: 1px solid #c5c5c7;

						&.active {
							border: 1px solid #000;
							border-radius: 1rem 1rem 0 0;
						}

						.selected_placeholder {
							display: block;
							width: 100%;
							padding: 0.65rem 0;
							cursor: pointer;
						}

						.fish_input_wrap {
							border: 1px solid #000;
							background-color: #fff;
							z-index: 30000;
							position: absolute;
							width: 100%;
							left: 0;

							.fish_wrap {
								max-height: 350px;
								overflow-y: scroll;
								scrollbar-width: none;
								font-size: 15px;

								.fish_box {
									border-bottom: 1px solid #e7e7e7;

									.fish_group {
										font-size: 16px;
										background-color: rgba(189, 189, 189, .3);
										padding: 0.3rem;
									}

									.fish_select_box {
										margin-bottom: .5rem;

										.fish_data {
											padding: .5rem;
											cursor: pointer;

											&:hover {
												background-color: rgba(122, 165, 210, .3);
											}

											&.active {
												background-color: rgba(122, 165, 210, .3);
											}

											label {
												display: block;
												width: 100%;
											}

											input {
												display: none;
											}
										}
									}
								}
							}

							.ok_btn {
								color: #fff;
								background-color: #272323;
								padding: .35rem;
								cursor: pointer;
							}
						}
					}
				}
			}
		}

		@media (max-width: 1200px) {

			.intro_img {
				width: calc(100% - 100px);
				margin: 0 auto;
			}

			.intro_form_container {
				width: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		@media (max-width: 600px) {

			.intro_img {
				width: calc(100% - 10px);
				margin: 0 auto;
			}

			.intro_form_container {
				width: 80%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
}
</style>