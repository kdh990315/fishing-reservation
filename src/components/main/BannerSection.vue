<template>
	<section id="banner_section">
		<div class="banner_container">
			<ul class="banner_slider">
				<li class="banner_slides"></li>
				<li class="banner_slides"></li>
				<li class="banner_slides"></li>
			</ul>
			<div class="slide_control_container">
				<span class="banner_prev"><i class="fa-solid fa-angle-left"></i></span>
				<span class="banner_next"><i class="fa-solid fa-angle-right"></i></span>
			</div>
		</div>
	</section>
</template>

<script>
import { slideAnimation } from '@/hooks/slideAnimation.js';

export default {
	data() {
		return {

		}
	},
	mounted() {
		//슬라이더 반응형
		const windowWidth = window.innerWidth;
		if (windowWidth > 1200) {
			slideAnimation('.banner_slider', '.banner_slides', 1200, 0, 1, '.banner_prev', '.banner_next');
		} else if (windowWidth < 1200 && windowWidth > 768) {
			slideAnimation('.banner_slider', '.banner_slides', 800, 0, 1, '.banner_prev', '.banner_next');
		} else {
			slideAnimation('.banner_slider', '.banner_slides', 500, 0, 1, '.banner_prev', '.banner_next');
		}
		//슬라이더 반응형
	}
}
</script>

<style lang="scss" scoped>
#banner_section {
	width: 100%;
	margin-top: 150px;

	@media (max-width: 1200px) {
		width: 800px;
		margin: 150px auto 0 auto;
	}

	@media (max-width: 768px) {
		width: 500px;
		margin: 150px auto 0 auto;
	}

	.banner_container {
		width: 100%;
		height: 300px;
		overflow: hidden;
		position: relative;

		@media (max-width: 768px) {
			height: 200px;
		}

		.banner_slider {
			width: 100%;
			height: 100%;
			position: absolute;
			transition: .4s;

			.banner_slides {
				width: 1200px;
				height: 100%;
				float: left;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-position: center;

				&:nth-child(1) {
					background-image: url('@/assets/images/banner1.png');
				}

				&:nth-child(2) {
					background-image: url('@/assets/images/banner2.png');
				}

				&:nth-child(3) {
					background-image: url('@/assets/images/banner3.png');
				}

				@media (max-width: 1200px) {
					width: 800px;
					height: 100%;
				}

				@media (max-width: 768px) {
					width: 500px;
					height: 200px;
				}
			}
		}

		.slide_control_container {
			position: absolute;
			width: 100%;
			display: flex;
			justify-content: space-between;
			top: 48%;

			.banner_prev,
			.banner_next {
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
		}
	}
}
</style>