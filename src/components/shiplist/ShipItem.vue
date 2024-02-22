<template>
	<base-loading v-if="isLoading"></base-loading>
	<article v-else id="ship_list" v-for="(shipData, idx) in shipDatas" :key="shipData.id">
		<div class="ship_info">
			<div class="ship_img">
				<img :src="shipImages[idx]" alt="선박이미지" :id="'shipimgdata_' + idx">
			</div>
			<div class="ship_detail">
				<div class="ship_title">
					<h1>{{ shipData.name }}</h1><span>[{{ shipData.location }} / {{ shipData.port }}]</span><br>
					<span class="fish_name">{{ shipData.fishName }}</span><small>{{ shipData.fishingType }}</small>
				</div>
				<div class="ship_detail_btn_wrap">
					<base-button :link=false @click="showDetail(shipData.id)">자세히 보기</base-button>
				</div>
			</div>
		</div>
	</article>
	<h2 v-if="notFound && !isLoading">등록된 선박이 없습니다.</h2>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default {
	emits: ['showShipDetail'],
	setup(_, { emit }) {
		const store = useStore();

		const isLoading = ref(false);

		const shipDatas = computed(() => store.getters['shipitem/ships']);

		const showDetail = (shipId) => {
			emit('showShipDetail', shipId);
		};

		const shipImages = ref([]);

		const fetchImages = async () => {
			const storage = getStorage();

			for (let i = 0; i < shipDatas.value.length; i++) {
				const storageRef1 = storageRef(storage, `images/${shipDatas.value[i].id}/img0`);
				try {
					const imgUrl = await getDownloadURL(storageRef1);
					shipImages.value[i] = imgUrl;
				} catch (error) {
					alert(error);
				}
			}
		};

		onMounted(async () => {
			isLoading.value = true;

			try {
				await store.dispatch('shipitem/setShipData');

				await fetchImages();
			} catch(error) {
				alert(error);
			} finally {
				isLoading.value = false;
			}
			
		});

		const shipdata = computed(() => {
			return store.getters['shipitem/ships'];
		});

		const notFound = ref(false);

		watchEffect(() => {
			if (shipdata.value.length === 0) {
				notFound.value = true;
			} else {
				notFound.value = false;
			}
		});

		return {
			shipDatas,
			showDetail,
			isLoading,
			shipImages,
			notFound
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

	.ship_info {
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
					display: inline-block;
				}
				
				span {
					font-size: 20px;
					margin-left: 10px;
				}

				.fish_name {
					font-size: 18px;
				}

				small {
					margin-left: 5px;
				}

				@media (max-width: 800px) {
					h1 {
						display: block;
						font-size: 4.1vw;
					}

					span {
						margin-left: 0;
						font-size: 3.0vw;
					}

					.fish_name {
						font-size: 2.6vw;
					}
				}
			}
		}
	}
}
</style>