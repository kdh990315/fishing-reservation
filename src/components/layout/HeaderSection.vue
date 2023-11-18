<template>
	<header>
		<div class="header_wrap"> 
			<router-link to="/" class="logo"></router-link>

			<nav class="header_nav">
				<ul class="main_nav">
					<li @click="toggleMenu(1)">바다낚시
						<i class="fa-solid fa-angle-down"></i>
						<ul class="sub_nav" v-if="subOpen === 1">
							<li><router-link to="/ShipList">선상낚시</router-link></li>
							<li><a href="#">좌대낚시</a></li>
							<li><a href="#">선외기낚시</a></li>
							<li><a href="#">바다체험낚시</a></li>
						</ul>
					</li>
					<li @click="toggleMenu(2)">민물낚시
						<i class="fa-solid fa-angle-down"></i>
						<ul class="sub_nav" v-if="subOpen === 2">
							<li><a href="#">저수지</a></li>
							<li><a href="#">좌대낚시</a></li>
							<li><a href="#">방갈로</a></li>
						</ul>
					</li>
					<li @click="toggleMenu(3)">커뮤니티
						<i class="fa-solid fa-angle-down"></i>
						<ul class="sub_nav" v-if="subOpen === 3">
							<li><a href="#">실시간 조황</a></li>
							<li><a href="#">이벤트</a></li>
							<li><a href="#">대회</a></li>
							<li><a href="#">공지사항</a></li>
						</ul>
					</li>
				</ul>
			</nav>

			<div class="nav_info">
				<div class="mobil_nav_btn" @click="mobilNavActive">
					<span></span>
				</div>

				<i class="fa-solid fa-magnifying-glass search_icon"></i>

				<div class="login_btn">
					<base-button :link=true to="/LoginSection"><i class="fa-solid fa-right-to-bracket"></i>로그인</base-button>
				</div>
			</div>

			<div class="mobil_nav" v-if="mobilNavBtn">
				<ul class="mobil_main_nav">
					<li>
						<div class="mobil_main_nav_title" @click="mobilNavToggle(1)">
							<span>바다낚시</span><i class="fa-solid fa-angle-down"></i>
						</div>
						<ul class="mobil_sub_nav" v-if="mobilsubOpen === 1">
							<li><a href="#">선상낚시</a></li>
							<li><a href="#">좌대낚시</a></li>
							<li><a href="#">선외기낚시</a></li>
							<li><a href="#">바다체험낚시</a></li>
						</ul>
					</li>
					<li>
						<div class="mobil_main_nav_title" @click="mobilNavToggle(2)">
							<span>민물낚시</span><i class="fa-solid fa-angle-down"></i>
						</div>
						<ul class="mobil_sub_nav" v-if="mobilsubOpen === 2">
							<li><a href="#">저수지낚시</a></li>
							<li><a href="#">좌대낚시</a></li>
							<li><a href="#">방갈로</a></li>
						</ul>
					</li>
					<li>
						<div class="mobil_main_nav_title" @click="mobilNavToggle(3)">
							<span>커뮤니티</span><i class="fa-solid fa-angle-down"></i>
						</div>
						<ul class="mobil_sub_nav" v-if="mobilsubOpen === 3">
							<li><a href="#">실시간 조황</a></li>
							<li><a href="#">이벤트</a></li>
							<li><a href="#">대회</a></li>
							<li><a href="#">공지사항</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        //헤더
        const subOpen = ref(null);
        const toggleMenu = (idx) => {
            if (subOpen.value === idx) {
                subOpen.value = null;
            }
            else {
                subOpen.value = idx;
            }
        };
        //모바일헤더
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
        return {
            subOpen,
            toggleMenu,
            mobilNavBtn,
            mobilNavActive,
            mobilsubOpen,
            mobilNavToggle
        };
    },
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
			width: calc(100% - 60px);
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
			background-image: url('@/assets/images/logo_transparent.png');
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
						width: 100%;
						position: absolute;
						top: 50px;
						left: 0;
						padding-top: 23px;

						li {
							font-size: 12px;
							display: block;
							width: 100%;
							margin-bottom: 22px;

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
		}
	}
}
</style>