<template>
	<div class="aside_form_container">
		<form>
			<h1>선박 종류</h1>
			<div class="time_option">
				<label for="half_time" :class="{ 'active': searchData.time === '시간배' }">시간배</label>
				<input type="radio" name="ship_type" value="시간배" id="half_time" checked v-model="searchData.time">
				<label for="all_time" :class="{ 'active': searchData.time === '종일배' }">종일배</label>
				<input type="radio" name="ship_type" value="종일배" id="all_time" v-model="searchData.time">
			</div>
			<h1>지역</h1>
			<div class="location_wrap">
				<div class="location_box" v-for="loc in locationData" :key="loc.id">
					<label :for="loc.id" :class="{ 'active': searchData.location.includes(loc.value) }">{{ loc.value }}</label>
					<input type="checkbox" :name="loc.id" :id="loc.id" :value="loc.value" v-model="searchData.location">
				</div>
			</div>
		</form>

		<div class="button_wrap">
			<base-button @click="initialForm">초기화하기</base-button>
			<base-button @click="submitForm">검색하기</base-button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

import { location } from '@/data/data.js';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();

		const locationData = location;

		const searchData = ref({
			time: '시간배',
			location: [],
		})

		const submitForm = async () => {
			await store.dispatch('shipitem/setShipData');

			store.dispatch('shipitem/filterShips', searchData.value);
			console.log(searchData.value);
			searchData.value.location = [];
		}

		const initialForm = () => {
			store.dispatch('shipitem/setShipData');
			searchData.value.location = [];
		}

		return {
			locationData,
			searchData,
			submitForm,
			initialForm
		}
	}
}
</script>

<style lang="scss" scoped>
.aside_form_container {
    width: 100%;
    height: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    position: sticky;
    top: 30px;

	form {
		.time_option {
			margin: 10px 0;
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
			margin-top: 10px;
			.location_box {
				display: inline-block;
				margin-bottom: 10px;

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

	.button_wrap {
		position: absolute;
		right: 0;
		bottom: 10px;
	}

	@media (max-width: 900px) {
		margin-top: 20px;
		position: relative;
		top: 0;
		height: 250px;
	}
}
</style>