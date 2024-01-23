<template>
	<base-loading v-if="isLoading"></base-loading>
	<article id="ship_list" v-for="(shipData, idx) in shipDatas" :key="shipData.id">
		<div class="ship_info1">
			<div class="ship_img">
				<img :src="shipLoadImg(shipData.id, idx)" alt="선박이미지" :id="'shipimgdata_' + idx">
			</div>
			<div class="ship_detail">
				<div class="ship_title">
					<h1>{{ shipData.name }}<span>[{{ shipData.location }} / {{ shipData.port }}]</span></h1>
					<span>{{ shipData.fishName }}</span><small>{{ shipData.fishingType }}</small>
				</div>
				<div class="ship_detail_btn_wrap">
					<base-button :link=false @click="showDetail(shipData.id)">자세히 보기</base-button>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import { computed, onMounted, ref} from 'vue';
import { useStore } from 'vuex';

import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default {
	emits: ['showShipDetail'],
	setup(_, { emit }) {
		const store = useStore();

		const isLoading = ref(false);

		const shipDatas = computed(() => {
			return store.getters['shipitem/ships'];
		})

		const showDetail = (shipId) => {
			emit('showShipDetail', shipId);
		}

		const shipLoadImg = async (shipId, idx) => {
			const storage = getStorage();
			
			// const storageRefPath = `gs://fishing-reservation-54646.appspot.com/images/` + shipId + `/img0`;
			const storageRefPath = `images/${shipId}/img0`;
			const storageRef1 = storageRef(storage, storageRefPath);

			try {
				const imgUrl = await getDownloadURL(storageRef1);
				const img = document.getElementById('shipimgdata_' + idx);
				img.setAttribute('src', imgUrl);
			} catch (error) {
				alert(error);
				return;
			}
		}

		onMounted(() => {
			store.dispatch('shipitem/setShipData');
		});

		return {
			shipDatas,
			showDetail,
			isLoading,
			shipLoadImg
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