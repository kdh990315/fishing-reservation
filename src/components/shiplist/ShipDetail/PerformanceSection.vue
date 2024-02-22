<template>
	<div id="notice_wrap">
		<img src="@/assets/images/preparing.png" alt="이미지 준비중입니다">
	</div>
</template>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';
#notice_wrap {
	width: 1000px;
	height: 100%;
	position: relative;

	img {
		width: 300px;

		@include position-center-a;
	}
}
</style>