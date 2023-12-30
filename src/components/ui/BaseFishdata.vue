<template>
	<div class="form_container">
		<div class="form_section" v-for="(group, idx) in fishData" :key="idx">
			<p class="title">{{ group.title }}</p>
			<span v-for="fish in group.fishName" :key="fish.id">
				<input type="checkbox" :id="fish.id" :value="fish.id" v-model="selectFish">
				<label :for="fish.id">{{ fish.name }}</label>
			</span>
		</div>
		<base-button @click="trysubmit">확인</base-button>
	</div>
</template>

<script>
import { allFish } from '@/data/data.js';
//export default와 export 차이
import { ref } from 'vue';

export default {
	setup(_, {emit}) {
		const fishData = allFish;

		const selectFish = ref([]);

		const trysubmit = () => {
			emit('trysubmit', selectFish.value);
		}

		return {
			fishData,
			selectFish,
			trysubmit
		}
	}
}
</script>

<style lang="scss" scoped>
.form_container {
	border: 1px solid #ccc;
	border-radius: 15px;
	padding: 5px;
	margin-bottom: 15px;

	.form_section {
		margin-bottom: 15px;

		.title {
			font-size: 18px;
			letter-spacing: 1.1px;
			padding-bottom: 5px;
			font-weight: 500;
		}

		span {
				margin-right: 10px;

				input {
					margin-right: 2px;
				}
			}
	}
}
</style>