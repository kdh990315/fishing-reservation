<template>
	<section id="hoppicks_section">
		<div class="hot_picks_title">
			<h3>지금 핫한 어종🔥</h3>
		</div>
		<div class="hot_picks_slide_wrap">
			<ul class="hot_picks_slide_container">
				<li class="slides" v-for="(hotPick, idx) in HotPicksData" :key="idx">
					<div class="hot_picks_text">
						<strong>{{ hotPick.fishName }}</strong><small>{{ hotPick.how }}</small>
						<p>{{ hotPick.location }}</p>
					</div>
				</li>
			</ul>

			<div class="slide_control_container">
				<span class="prev"><i class="fa-solid fa-angle-left"></i></span>
				<span class="next"><i class="fa-solid fa-angle-right"></i></span>
			</div>
		</div>
	</section>
</template>

<script>
import { HotPicksData } from '@/data/data.js';
export default {
	setup() {
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

		.hot_picks_slide_container {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: .3s;
			margin: 15px 10px 0 10px;
			touch-action: pan-x;

			@media (max-width:1200px) {
				margin-left: 15px;
			}

			.slides {
				width: 280px;
				height: 350px;
				float: left;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 20px;
				position: relative;

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

				.hot_picks_text {
					position: absolute;
					left: 10px;
					bottom: -55px;
					color: #0b0a12;

					strong {
						font-size: 20px;
					}

					small {
						margin-left: 5px;
						font-size: 13px;
					}

					p {
						letter-spacing: 1.15px;
					}
				}

				@media (max-width: 1200px) {
					width: 280px;
					height: 360px;
				}
			}
		}

		.slide_control_container {
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			top: 34%;
			left: 50%;
			transform: translate(-50%, -50%);

			.prev,
			.next {
				font-size: 25px;
				padding: 2px 12px;
				background-color: #ccc;
				border-radius: 50%;
				cursor: pointer;

				&.active {
					color: #9f9f9f;
				}
			}

			@media (max-width: 1200px) {
				display: none;
			}
		}
	}
}
</style>