<template>
	<article id="ship_list" v-for="shipData in shipDatas" :key="shipData.id">
		<div class="ship_info1">
			<div class="ship_img">
				<img src="/images/shiplistimg/img1.jpg" alt="선박이미지">
			</div>
			<div class="ship_detail">
				<div class="ship_title">
					<h1>{{shipData.name}}<span>[{{ shipData.location }} / {{ shipData.port }}]</span></h1>
					<span>{{ shipData.fishName }}</span><small>생미끼 외수질</small>
				</div>
				<div class="ship_detail_btn_wrap">
					<base-button :link=false @click="showDetail(shipData.id)">자세히 보기</base-button>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import { useStore } from 'vuex';

export default {
	emits: ['showShipDetail'],
	setup(_, {emit}) {
		const store = useStore();

		const shipDatas = store.getters['shipitem/ships']

		const showDetail = (shipId) => {
			emit('showShipDetail', shipId);
		}

		return {
			shipDatas,
			showDetail
		}
	}
}
</script>

<style lang="scss" scoped>
#ship_list {
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 20px;
	margin-top: 20px;

	.ship_info1 {
		display: flex;

		.ship_img {
			width: 30%;
			height: 180px;

			img {
				width: 100%;
				height: 100%;
			}
		}
		
		.ship_detail {
			width: 70%;
			display: flex;
			justify-content: space-between;

			.ship_title {
				padding-left: 10px;

				h1 {
					font-size: 26px;

					span {
						font-size: 22px;
						margin-left: 10px;
					}
				}

				small {
					margin-left: 5px;
				}
			}
		}
	}
}
</style>