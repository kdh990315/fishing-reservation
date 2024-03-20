<template>
	<header>
		<div class="header_wrap">
			<router-link to="/" class="logo"></router-link>

			<nav class="header_nav">
				<ul class="main_nav">
					<li @click="toggleMenu(idx)" v-for="(mainMenu, idx) in headerMenuData" :key="idx">{{ mainMenu.mainMenu }}
						<i class="fa-solid fa-angle-down"></i>
						<ul class="sub_nav" v-if="subOpen === idx">
							<li v-for="(subMenu, idx) in mainMenu.subMenu" :key="idx"><router-link to="/ShipList">{{ subMenu.sub }}</router-link></li>
						</ul>
					</li>
				</ul>
			</nav>

			<div class="nav_info">
				<div class="mobil_nav_btn" @click="mobilNavActive">
					<span></span>
				</div>

				<i class="fa-solid fa-magnifying-glass search_icon" @click="searchDislogVisible"></i>

				<div class="login_btn">
					<base-button :link="true" to="/ManagementSection" v-if="isAuth">예약관리</base-button>
					<base-button :link=false @click="logOut" v-if="isToken"><i class="fa-solid fa-right-to-bracket"></i>로그아웃</base-button>
					<base-button :link=true to="/LoginSection" v-else><i class="fa-solid fa-right-to-bracket"></i>로그인</base-button>
				</div>
			</div>

			<div class="mobil_nav" v-if="mobilNavBtn">
				<ul class="mobil_main_nav">
					<li v-for="(mainMenu, idx) in headerMenuData" :key="idx">
						<div class="mobil_main_nav_title" @click="mobilNavToggle(idx)">
							<span>{{ mainMenu.mainMenu }}</span><i class="fa-solid fa-angle-down"></i>
						</div>
						<ul class="mobil_sub_nav" v-if="mobilsubOpen === idx">
							<li v-for="(subMenu, idx) in mainMenu.subMenu" :key="idx"><router-link to="/ShipList" @click="mobilNavActive">{{ subMenu.sub }}</router-link></li>
						</ul>
					</li>
				</ul>
			</div>

			<div class="backdrop" v-if="searchVisible" @click="searchClose"></div>

			<div class="custom_dialog" v-if="searchVisible">
				<div class="search_header">
					<h2>검색하기</h2>
				</div>
				<div>
					<form @submit.prevent="submitSearchForm">
						<input type="text" placeholder="검색어를 입력해주세요" v-model="searchKeyword">
					</form>
					<p v-if="shipNotFound" class="notfound">일치하는 선박을 찾을 수 없습니다.</p>
				</div>
				<menu>
					<base-button @click="submitSearchForm">검색하기</base-button>
					<base-button @click="searchClose" class="close_btn">닫기</base-button>
				</menu>
			</div>

		</div>
	</header>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { headerMenu } from '@/data/data.js';

export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		//pc버전 헤더
		const headerMenuData = headerMenu;

		const subOpen = ref(null);
		const toggleMenu = (idx) => {
			if (subOpen.value === idx) {
				subOpen.value = null;
			}
			else {
				subOpen.value = idx;
			}
		};
		//모바일보전 헤더
		const mobilNavBtn = ref(false);
		const mobilsubOpen = ref(null);
		const mobilNavActive = () => {
			mobilNavBtn.value = !mobilNavBtn.value;
		};
		const mobilNavToggle = (idx) => {
			if (mobilsubOpen.value === idx) {
				mobilsubOpen.value = null;
			}
			else {
				mobilsubOpen.value = idx;
			}
		};
		// 로그인/로그아웃
		const isToken = ref(store.getters['auth/isToken']);

		watch(() => store.getters['auth/isToken'],
			(newValue) => {
				isToken.value = newValue;
			}
		);

		//로그아웃
		const logOut = () => {
			store.dispatch('auth/logout');
			router.replace('/');
		}

		//검색창
		onMounted(() => {
			store.dispatch('shipitem/setShipData');
		})

		const searchVisible = ref(false);

		const searchDislogVisible = () => {
			searchVisible.value = true;
		}

		const searchClose = () => {
			searchVisible.value = false;
		}

		const searchKeyword = ref('');

		const shipNotFound = ref(false);

		const shipData = computed(() => store.getters['shipitem/ships']);

		//검색 데이터 제출
		const submitSearchForm = () => {
			
			const matchShips = shipData.value.filter(ship => ship.name.includes(searchKeyword.value));

			if (!matchShips) {
				shipNotFound.value = true;
				return;
			}

			store.dispatch('search/setSearchData', matchShips);

			searchClose();

			router.replace('/SearchList');
		}

		//로그인 여부 확인
		const isAuth = computed(() => {
			return store.getters['auth/isToken'];
		})

		return {
			subOpen,
			headerMenuData,
			toggleMenu,
			mobilNavBtn,
			mobilNavActive,
			mobilsubOpen,
			mobilNavToggle,
			isToken,
			logOut,
			searchVisible,
			searchDislogVisible,
			searchClose,
			searchKeyword,
			shipNotFound,
			submitSearchForm,
			isAuth,
		};
	}
}

</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

header {
	width: 100%;
	height: 100px;

	.header_wrap {
		width: 1200px;
		height: 100%;
		margin: 0 auto;

		@include center-sb;

		@media (max-width: 1200px) {
			width: calc(100% - 2px);
			position: relative;
		}

		@media (max-width: 800px) {
			nav {
				display: none;
			}

		}

		.logo {
			width: 160px;
			height: 80px;
			display: block;
			background-image: url('@/assets/images/logo.png');
			background-size: contain;
			background-repeat: no-repeat;
		}

		nav {
			width: 500px;

			.main_nav {
				width: 100%;

				@include center-sa;

				>li {
					width: 100px;
					height: 100%;
					position: relative;
					font-size: 18px;
					text-align: center;
					cursor: pointer;

					i {
						font-size: 12px;
						margin-left: 5px;
						position: relative;
						top: -1.5px;
						color: #CB9;
					}

					.sub_nav {
						width: 120%;
						position: absolute;
						top: 50px;
						left: -10%;
						background-color: #fff;
						padding: 10px;
						border-radius: 15px;
						z-index: 10000;

						li {
							font-size: 12px;
							display: block;
							width: 100%;
							border-bottom: 1px solid rgba(0, 0, 0, 0.1);
							border-radius: 10px;
							padding: 3px 5px;

							&:not(:last-child) {
								margin-bottom: 22px;
							}

							a {
								font-size: 16px;
								color: black;
							}
						}
					}
				}
			}
		}

		.mobil_nav {
			position: absolute;
			left: 0;
			top: 100px;
			width: 100%;
			box-shadow: 0px 10px 30px rgba(83, 88, 93, 0.4);
			display: none;

			@media (max-width: 800px) {
				display: block;
			}

			.mobil_main_nav {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #fff;

				>li {
					width: 100%;
					padding: 8px 20px;
					position: relative;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					cursor: pointer;

					.mobil_main_nav_title {
						width: 100%;
						padding: 0 0 5px 0;

						i {
							color: #9c9c9c;
						}

						@include center-sb;
					}

					.mobil_sub_nav {
						width: 100%;
						border: 1px solid #dfdfe3;
						border-radius: 10px;
						padding: 16px 10px;

						>li {
							padding: 6px 5px;

							a {
								color: #747579;
							}
						}
					}
				}
			}
		}

		.nav_info {
			@include center-sb;

			.mobil_nav_btn {
				width: 21px;
				height: 21px;
				position: relative;
				display: none;
				cursor: pointer;

				@media (max-width: 800px) {
					display: block;
				}

				span {
					display: inline-block;
					width: 21px;
					height: 2px;
					background-color: black;
					border-radius: 10px;
					position: absolute;
					top: 50%;

					&::after {
						content: '';
						position: absolute;
						left: 0;
						top: 8px;
						width: 21px;
						height: 2px;
						border-radius: 10px;
						background-color: black;
					}

					&::before {
						content: '';
						position: absolute;
						left: 0;
						bottom: 8px;
						width: 21px;
						height: 2px;
						border-radius: 10px;
						background-color: black;
					}
				}
			}

			.search_icon {
				font-size: 18px;
				margin: 0 15px;
				padding: 5px;
				cursor: pointer;
			}

			.login_btn {

				i {
					margin-right: 5px;
				}
			}
		}



		.backdrop {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.75);
			z-index: 10;
		}

		.custom_dialog {
			position: fixed;
			top: 20vh;
			left: 30%;
			width: 40%;
			z-index: 9999999999;
			border-radius: 12px;
			border: none;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
			padding: 0;
			margin: 0;
			overflow: hidden;
			background-color: white;

			@media (max-width: 1200px) {

				width: calc(100% - 100px);
				left: 50%;
				transform: translateX(-50%);
			
			}

			.search_header {
				background-color: #7aa5d2;
				color: white;
				width: 100%;
				padding: 1rem;
				text-align: center;
			}

			div {
				padding: 1rem;

				form {
					display: flex;
					justify-content: center;

					input {
						border: none;
						border-bottom: 1px solid #ccc;
						padding: 5px 3px;
						margin-bottom: 20px;
						font-size: 18px;
						width: 90%;
					}
				}

				.notfound {
					margin-top: 0.5rem;
					color: #ff1010;
					font-size: 13px;
				}
			}

			menu {
				padding: 1rem;
				display: flex;
				justify-content: flex-end;
				margin: 0;
			}
		}
	}
}
</style>