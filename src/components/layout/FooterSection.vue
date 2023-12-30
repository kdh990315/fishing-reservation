<template>
	<footer>
		<div class="footer_wrap">
			<div class="logo">
				<router-link to="/" class="logo"></router-link>
			</div>
			<div class="footer_nav">
				<ul>
					<li>이용약관</li>
					<li>1:1 문의하기</li>
					<li>홈페이지 제작문의</li>
					<li>마케팅/제휴 문의</li>
					<li>상호명 : 낙시고</li>
				</ul>
			</div>
			<div class="footer_text">
				<span>2023 @ 해당 사이트는 vue.js를 사용하여 제작하였습니다.</span>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

footer {
	width: 100%;
	margin-top: 150px;

	.footer_wrap {
		width: 1200px;
		padding-top: 30px;
		margin: 0 auto;
		background-color: black;

		@include c-center;

		.logo {
			width: 200px;
			height: 100px;
			display: block;
			background-image: url('@/assets/images/logo.png');
			background-size: contain;
			background-repeat: no-repeat;
		}

		.footer_nav {
			width: 50%;
			color: #ccc;
			padding: 15px 0 5px;

			ul {
				width: 100%;

				@include center-sb;

				li {
					font-weight: 600;
				}
			}
		}

		.footer_text {
			width: 100%;
			padding: 15px 0 3px;
			border-top: 1px solid #ccc;
			text-align: center;

			span {
				font-size: 14px;
				color: #ccc;
				letter-spacing: 1.5px;
			}
		}

		@media (max-width: 1200px) {
			width: 100%;

			.footer_nav {
				width: 80%;
			}
		}

		@media (max-width: 768px) {
			width: 100%;

			.footer_nav {
				width: 80%;
				font-size: 14px;

				ul {
					flex-wrap: wrap;
				}
			}
		}
	}
}
</style>