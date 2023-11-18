<template>
	<div id="login_wrap">
		<router-link to="/" class="logo"></router-link>
		<h1>로그인하기</h1>
		<form @submit.prevent="submitLoginForm">
			<div class="form_container">
				<input type="text" placeholder="이메일을 입력해주세요" v-model="userInfo.user_id">
				<input type="password" placeholder="비밀번호를 입력해주세요" v-model="userInfo.user_pw">
				<base-button to="/" mode="login">로그인하기</base-button>
				<p>만약 계정이 없다면 <router-link to="/SignUpSection">회원가입</router-link>을 먼저 진행해주세요.</p>
			</div>
		</form>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
	setup() {
		const router = useRouter();
		const userInfo = ref({
			user_id: '',
			user_pw: ''
		});

		const submitLoginForm = () => {
			if(userInfo.value.user_id === '' || !userInfo.value.user_id.includes('@')) {
				alert('이메일 형식으로 작성해주세요!');
				return
			}

			if(userInfo.value.user_pw === '') {
				alert('비밀번호를 입력해주세요!');
			}
			
			router.replace('/');
		}

		return {
			userInfo,
			submitLoginForm,
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

		input {
			border: none;
			border-bottom: 1px solid #ccc;
			padding: 5px 3px;
			margin-bottom: 20px;
			font-size: 18px;
			width: 300px;
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