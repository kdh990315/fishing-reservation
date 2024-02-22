<template>
	<div id="shiplist_wrap">
		<aside class="ship_aside" v-if="innerWidth">
			<ship-aside></ship-aside>
		</aside>
		<main>
			<warning-section></warning-section>
			<div class="btn_Box">
				<base-button :mode="'asideBtn'" @click="asideOpen">조건 검색하기</base-button>
				<base-button @click="checkRegister" v-if="loginStatu">선박 등록하기</base-button>
			</div>
			<aside class="ship_aside_mobil" v-if="asidevisible && !innerWidth">
				<ship-aside></ship-aside>
			</aside>
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
import { computed, onMounted, ref, watchEffect } from 'vue';
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

		const checkRegister = () => {
			router.replace('/ShipRegister')
			// for (let i = 0; i < shipdata.value.length; i++) {
			// 	if (shipdata.value[i].id === localStorage.userId) {
			// 		alert('이미 선박이 등록되어 있습니다.');
			// 		router.replace('/ShipList')
			// 	} else {
			// 		router.push('/ShipRegister');
			// 	}
			// }
		}

		const asidevisible = ref(false);

		const asideOpen = () => {
			asidevisible.value = !asidevisible.value;
			console.log(asidevisible.value);
		}

		const innerWidth = ref(true)

		onMounted(() => {
			const wdinnerWidth = window.innerWidth;
			if(wdinnerWidth >= 1200) {
				innerWidth.value = true;
			} else {
				innerWidth.value = false;
			}
		})

		watchEffect(() => {
			window.addEventListener('resize', () => {
				const wdinnerWidth = window.innerWidth;
				if(wdinnerWidth >= 1200) {
					innerWidth.value = true;
				} else {
					innerWidth.value = false;
				}

				console.log(innerWidth.value);
			})
		});

		return {
			ShipDetailVisible,
			showShipDetail,
			closeShipDetail,
			NewShipId,
			loginStatu,
			checkRegister,
			asideOpen,
			asidevisible,
			innerWidth
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

		@media (max-width:1200px) {
			display: none;
		}
	}

	main {
		width: 900px;
		margin: 0 auto;
		padding-left: 15px;

		@media (max-width: 1200px) {
			padding-left: 0;

		}

		.btn_Box {
			margin-top: 20px;
			display: flex;
			justify-content: flex-end;

			@media (max-width: 900px) {
				justify-content: space-between;
			}
		}
	}
}
</style>