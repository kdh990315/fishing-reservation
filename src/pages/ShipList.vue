<template>
	<div id="shiplist_wrap">
		<aside class="ship_aside">
			<ship-aside></ship-aside>
		</aside>
		<main>
			<warning-section></warning-section>
			<div class="btn_Box">
				<base-button :link="true" :to="'/ShipRegister'">선박 등록하기</base-button>
			</div>
			<ship-item @showShipDetail="showShipDetail"></ship-item>
			<ship-detail :NewShipId="NewShipId" v-if="ShipDetailVisible" @closeShipDetail="closeShipDetail"></ship-detail>
		</main>
	</div>
</template>

<script>
import WarningSection from '@/components/shiplist/WarningSection.vue';
import ShipItem from '@/components/shiplist/ShipItem.vue';
import ShipAside from '@/components/shiplist/ShipAside.vue';
import ShipDetail from '@/components/shiplist/ShipDetail.vue';
import { ref } from 'vue';


export default {
	components: {
		WarningSection,
		ShipItem,
		ShipAside,
		ShipDetail
	},
	setup() {
		const ShipDetailVisible = ref(false);

		const NewShipId = ref('');

		const showShipDetail = (shipId) => {
			ShipDetailVisible.value = true;
			NewShipId.value = shipId;
		}

		const closeShipDetail = () => {
			ShipDetailVisible.value = false;
		}


		return {
			ShipDetailVisible,
			showShipDetail,
			closeShipDetail,
			NewShipId
		}
	}
}
</script>

<style lang="scss" scoped>
#shiplist_wrap {
	width: 1200px;
	margin: 0 auto;
	display: flex;

	@media (max-width: 1200px) {
		width: 100%;
	}

	.ship_aside {
		width: 300px;


		@media (max-width:900px) {
			display: none;
		}
	}

	main {
		width: 900px;
		margin: 0 auto;
		padding-left: 15px;

		@media (max-width: 900px) {
			padding-left: 0;
		}

		.btn_Box {
			margin-top: 20px;
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>