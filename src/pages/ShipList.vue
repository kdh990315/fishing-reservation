<template>
	<div id="shiplist_wrap">
		<aside class="ship_aside">
			<ship-aside></ship-aside>
		</aside>
		<main>
			<warning-section></warning-section>
			<h2 v-if="notFound">등록된 선박이 없습니다.</h2>
			<div class="btn_Box">
				<base-button :link="true" v-if="loginStatu" @click="checkRegister">선박 등록하기</base-button>
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


export default {
	components: {
		WarningSection,
		ShipItem,
		ShipAside,
		ShipDetail
	},
	setup() {
		const store = useStore();

		const router = useRouter();

		const ShipDetailVisible = ref(false);

		const NewShipId = ref('');

		const showShipDetail = (shipId) => {
			ShipDetailVisible.value = true;
			NewShipId.value = shipId;
		}

		const closeShipDetail = () => {
			ShipDetailVisible.value = false;
		}
		
		const loginStatu = computed(() => {
			return store.getters['auth/isToken'];
		});
		
		const notFound = ref(false);



		const shipdata = computed(() => {
			return store.getters['shipitem/ships'];
		});

		if(!shipdata.value) {
			notFound.value = true;
		} else {
			notFound.value = false;
		}
		const checkRegister = () => {
			for(let i = 0; i < shipdata.value.length; i++) {
				if(shipdata.value[i].id === localStorage.userId) {
					alert('이미 선박이 등록되어 있습니다.');
					router.replace('/ShipList')
				} else {
					router.push('/ShipRegister');
				}
			}
		}

		return {
			ShipDetailVisible,
			showShipDetail,
			closeShipDetail,
			NewShipId,
			loginStatu,
			notFound,
			checkRegister
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