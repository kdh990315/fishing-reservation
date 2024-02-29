<template>
	<div class="backdrop" @click="closeDialog"></div>
	<dialog>
		<i class="fa-solid fa-xmark close" @click="closeDialog"></i>
		<div class="title">
			<h1>{{ shipData.name }}</h1>
		</div>
		<div class="detail_main_container">
			<div class="detail_menu_container">
				<div v-for="(menuData, index) in menuDatas" :key="index" @click="activeMenu(index); changComponent(menuData.link)"
					:class="{ 'detail_menu': true, 'on': activeIdx === index }">
					<span>{{ menuData.title }}</span>
				</div>
			</div>
			<component :is="currentComponent" :shipId="shipId"></component>
		</div>
	</dialog>
</template>

<script>
import { onMounted, ref, shallowRef, watchEffect } from 'vue';
import { useStore } from 'vuex';

import IntroductionSection from '@/components/shiplist/ShipDetail/IntroductionSection.vue'
import NoticeSection from '@/components/shiplist/ShipDetail/NoticeSection.vue'
import PerformanceSection from '@/components/shiplist/ShipDetail/PerformanceSection.vue'
import ReservationSection from '@/components/shiplist/ShipDetail/ReservationSection.vue'

export default {
	emits: ['closeShipDetail'],
	props: ['NewShipId'],
	setup(props, { emit }) {
		const store = useStore();

		const shipId = ref(props.NewShipId);
		// const shipData = ref(null);

		// watchEffect(() => {
		// 	const shipDatas = store.getters['shipitem/ships'];
		// 	const data = shipDatas.find(ship => ship.id === props.NewShipId);
		// 	if (data) {
		// 		shipData.value = data;
		// 		console.log(shipData.value);
		// 	}
		// });
		const shipDatas = store.getters['shipitem/ships'];
		const shipData = ref('');
		onMounted(() => {
			watchEffect(() => {
				const data = shipDatas.find(ship => ship.id === shipId.value);
				if (data) {
					shipData.value = data;
				}
			});
		});

		// const shipData = computed(() => {
		// 	const shipDatas = ref(store.getters['shipitem/ships']);
		// 	return shipDatas.value.find(ship => ship.id === shipId.value);
		// });

		const closeDialog = () => {
			emit('closeShipDetail');
		}
		const activeIdx = ref(0);
		const activeMenu = (index) => {
			activeIdx.value = index;
		}

		const menuDatas = [
			{ title: '선박소개', link: `IntroductionSection` },
			{ title: '예약하기', link: `ReservationSection` },
			{ title: '조황보기', link: `PerformanceSection` },
			{ title: '공지사항', link: `NoticeSection` },
		];

		const currentComponent = shallowRef(IntroductionSection);

		const changComponent = (component) => {
			switch (component) {
				case 'IntroductionSection':
					currentComponent.value = IntroductionSection;
					break;
				case 'ReservationSection':
					currentComponent.value = ReservationSection;
					break;
				case 'PerformanceSection':
					currentComponent.value = PerformanceSection;
					break;
				case 'NoticeSection':
					currentComponent.value = NoticeSection;
					break;
			}
		}

		return {
			closeDialog,
			shipData,
			menuDatas,
			activeIdx,
			activeMenu,
			changComponent,
			currentComponent,
			shipId
		}
	}
}
</script>

<style lang="scss" scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 10;
}

dialog {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1200px;
	display: block;
	z-index: 100;
	border-radius: 12px;
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 0;
	margin: 0;
	overflow: hidden;
	background-color: white;

	@media (max-width: 1250px) {
		width: calc(100% - 50px);
	}

	.close {
		position: absolute;
		right: 10px;
		top: 5px;
		cursor: pointer;
		font-size: 30px;
		padding: 5px;
	}

	.title {
		width: 100%;
		border-bottom: 1px solid #ccc;
		text-align: center;

		h1 {
			font-size: 20px;
			line-height: 50px;
		}
	}

	.detail_main_container {
		display: flex;
		height: 700px;

		.detail_menu_container {
			width: 180px;
			display: flex;
			align-items: center;
			padding: 10px;
			flex-direction: column;
			border-right: 1px solid #ccc;

			.detail_menu {
				font-size: 20px;
				width: 140px;
				text-align: center;
				letter-spacing: 1.1px;
				padding: 7px 15px;
				border-radius: 15px;

				margin-bottom: 10px;
				cursor: pointer;

				&.on {
					background-color: #7aa5d2;
					color: #fff;
				}
			}
		}

		@media (max-width: 1200px) {
			flex-direction: column;
			align-items: center;
			margin-top: 10px;

			.detail_menu_container {
				width: 100%;
				justify-content: space-around;
				flex-direction: row;
				border-bottom: 1px solid #ccc;

				.detail_menu {
					font-size: 18px;
					padding: 5px 13px;

					@media (max-width: 700px) {
						span {
							font-size: 3.5vw;
						}
					}
				}
			}

			#introduction_wrap {
				width: 100%;
				padding: 10px 20px 20px;
			}
		}
	}
}
</style>