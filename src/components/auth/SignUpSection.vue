<template>
	<div id="login_wrap">
		<router-link to="/" class="logo"></router-link>
		<h1>회원가입하기</h1>
			<div class="form_container">
				<input type="text" placeholder="이메일을 입력해주세요" class="login_form_contents">
				<input type="password" placeholder="비밀번호를 입력해주세요" class="login_form_contents">
				<input type="password" placeholder="비밀번호를 다시 한번 입력해주세요" class="login_form_contents">
				<div class="captain_form">
					<label for="CaptainCase" class="checkbox_label">선장님으로 가입하기</label>
					<input type="checkbox" id="CaptainCase" class="checkbox">
				</div>
				<base-button to="/" mode="login">회원가입하기</base-button>
				<p><router-link to="/LoginSection">로그인으로 돌아가기</router-link></p>
			</div>
	</div>
</template>

<script>


export default {
	setup() {
		return {
			
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#login_wrap {
    width: 450px;
    margin: 100px auto 0 auto;
	padding: 30px 0;
    border: 1px solid #ccc;

	@include c-center();

	h1 {
		font-size: 22px;
	}

	.logo {
		width: 300px;
		height: 150px;
		margin-bottom: 30px;
		display: block;
		background-image: url('@/assets/images/logo_transparent.png');
		background-size: contain;
		background-repeat: no-repeat;
		
	}

	.form_container {
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.login_form_contents {
			border: none;
			border-bottom: 1px solid #ccc;
			padding: 5px 3px;
			margin-bottom: 20px;
			font-size: 18px;
			width: 300px;
		}

		.captain_form {
			margin-bottom: 30px;
			.checkbox_label {
				margin-right: 5px;
			}
		}

		p {
			font-size: 14px;
			margin-top: 10px;
			
			a {
				font-size: 15px;
				color: #111;
				text-decoration: underline;
			}
		}
	}
}
</style>