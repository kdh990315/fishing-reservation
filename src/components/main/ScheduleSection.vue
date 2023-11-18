<template>
	<section id="schedule_section">
		<div class="intro_text">
			<h1>출조 준비 되셨나요?</h1>
		</div>
		<div class="intro_search_box">

		</div>
	</section>
</template>

<style lang="scss" scoped>
#schedule_section {
	width: 100%;
	height: 600px;
	background-image: url('@/assets/images/intro_bg.jpg');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 30px;
	margin-top: 35px;
	padding-top: 100px;

	.intro_text {
		text-align: center;

		h1 {
			font-size: 70px;
			padding-top: 35px;

		}
	}

	.intro_search_box {
		width: 1000px;
		height: 200px;
		background-color: #fff;
		margin: 30px auto 0;
		border-radius: 10px;

		@media (max-width:1000px) {
			width: 100%;
		}
	}
}
</style>