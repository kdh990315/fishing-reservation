<template>
	<section id="hoppicks_section">
		<div class="hot_picks_title">
			<h3>지금 핫한 어종🔥</h3>
		</div>
		<div class="hot_picks_slide_wrap">
			<ul class="hot_picks_slide_container">
				<li class="slides" v-for="(hotPick, idx) in HotPicksData" :key="idx">
					<div class="hot_picks_text">
						<strong>{{ hotPick.fishName }}</strong>
						<small>{{ hotPick.how }}</small>
						<p>{{ hotPick.location }}</p>
					</div>
				</li>
			</ul>

		</div>
		<div class="slide_control_container">
			<span class="prev"><i class="fa-solid fa-angle-left"></i></span>
			<span class="next"><i class="fa-solid fa-angle-right"></i></span>
		</div>
	</section>
</template>

<script>
import { HotPicksData } from '@/data/data.js';

//hook
import { slideAnimation } from '@/hooks/slideAnimation.js';
import { onMounted } from 'vue';
//hook
export default {
	setup() {
		onMounted(() => {
			const windowWidth = window.innerWidth;
			if (windowWidth > 1200) slideAnimation(".hot_picks_slide_container", ".slides", 280, 20, 4, ".prev", ".next")
			if (windowWidth < 1200 && windowWidth > 800) slideAnimation(".hot_picks_slide_container", ".slides", 246.6, 20, 3, ".prev", ".next")
			if (windowWidth < 800) slideAnimation(".hot_picks_slide_container", ".slides", 146.6, 20, 3, ".prev", ".next")
		});
		return {
			HotPicksData
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#hoppicks_section {
	width: 100%;
	margin-top: 150px;
	position: relative;

	@media (max-width: 1200px) {
		width: 800px;
		margin: 150px auto 0 auto;
	}

	@media (max-width: 800px) {
		width: 500px;
		margin: 150px auto 0 auto;
	}

	.hot_picks_title {

		h3 {
			font-weight: 700;
			line-height: 1.25;
			color: #0b0a12;
			font-size: 28px;
			margin: 15px 0 15px 13px;
		}
	}

	.hot_picks_slide_wrap {
		width: 100%;
		height: 600px;
		position: relative;
		overflow: hidden;

		@media (max-width: 800px) {
			height: 450px;
		}

		.hot_picks_slide_container {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: .3s;
			margin: 15px 10px 0 10px;
			touch-action: pan-x;

			.slides {
				width: 280px;
				height: 350px;
				float: left;
				background-repeat: no-repeat;
				// background-size: cover;
				border-radius: 20px;
				position: relative;
				background-position: center;
				background-size: 100% 100%;

				&:hover {
					@include hover-efect;
				}

				&:not(:last-child) {
					margin-right: 20px;
				}

				&:nth-child(1) {
					background-image: url('@/assets/images/hot_picks_img1.png');
				}

				&:nth-child(2) {
					background-image: url('@/assets/images/hot_picks_img2.png');
				}

				&:nth-child(3) {
					background-image: url('@/assets/images/hot_picks_img3.png');
				}

				&:nth-child(4) {
					background-image: url('@/assets/images/hot_picks_img4.png');
				}

				&:nth-child(5) {
					background-image: url('@/assets/images/hot_picks_img5.png');
				}

				&:nth-child(6) {
					background-image: url('@/assets/images/hot_picks_img6.png');
				}

				@media (max-width: 1200px) {
					width: 246.6px;
				}

				@media (max-width: 800px) {
					width: 146.6px;
					height: 300px;
				}

				.hot_picks_text {
					position: absolute;
					left: 10px;
					bottom: -83px;
					color: #0b0a12;

					strong {
						font-size: 20px;
					}

					small {
						font-size: 13px;
						margin-left: 10px;
					}

					p {
						letter-spacing: 1.15px;
					}

					@media (max-width: 800px) {
						strong {
							font-size: 16px;
						}

						small {
							margin-left: 0px;
							font-size: 12px;
							display: block;

						}

						p {
							letter-spacing: 1.15px;
							font-size: 13px;
						}
					}
				}
			}
		}

	}
	.slide_control_container {
		width: 30%;
		text-align: center;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 11%;
		left: 50%;
		transform: translate(-50%, -50%);

		.prev,
		.next {
			font-size: 25px;
			padding: 2px 12px;
			background-color: #f3f3f3;
			color: #afafaf;
			border-radius: 50%;
			cursor: pointer;

			&.btn_on {
				background-color: #ccc;
				color: #000;
			}
		}

		@media (max-width: 800px) {
			bottom: -1%;

			.prev,
			.next {
				font-size: 20px;
				padding: 0px 8px;
			}
		}
	}
}
</style>