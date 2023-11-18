<template>
	<section id="banner_section">
		<div class="banner_container">
			<ul class="banner_slider">
				<li class="slides"></li>
				<li class="slides"></li>
				<li class="slides"></li>
			</ul>
			<div class="slide_control_container">
				<span class="banner_prev"><i class="fa-solid fa-angle-left"></i></span>
				<span class="banner_next"><i class="fa-solid fa-angle-right"></i></span>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#banner_section {
	width: 100%;
	margin-top: 150px;

	.banner_container {
		width: 100%;
		height: 300px;
		background-color: rebeccapurple;
		overflow: hidden;
		position: relative;

		.banner_slider {
			width: 100%;
			height: 300px;
			position: absolute;
			transition: .4s;

			.slides {
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
				background-color: #ccc;
				border-radius: 50%;
				cursor: pointer;
			}
		}
	}
}
</style>