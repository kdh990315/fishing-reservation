<template>
	<section id="warning_section">
		<div class="warning_text_container">
			<h5>낚시 예약을 하시나요? 아래 주의사항을 유심히 읽어보세요!</h5>
			<div class="warning_text">
				<i class="fa-solid fa-check"></i><span>예약하시기 전에 먼저 출조 지역의 날씨를 확인하세요!</span>
				<p>(불가피하게 당일에 예약이 취소될 수 있어요!)</p>
			</div>
			<div class="warning_text">
				<i class="fa-solid fa-check"></i><span>출조 전 미리 필요한 장비 및 채비를 구비해두세요!</span>
				<p>대부분의 업체에서 채비 판매와 낚시대 대여를 하지만 하지 않는 곳도 있어요!</p>
			</div>
			<div class="warning_text">
				<i class="fa-solid fa-check"></i><span>어복도 안전함이 보장이 되어야지 따라오는 법!</span>
				<p>안전장비(구명복, 신발, 장갑 등)를 꼭 착용하셔야 안전사고를 예방할 수 있어요!</p>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
#warning_section {
	.warning_text_container {
		padding: 15px;
		border-radius: 20px;
		border: 2px solid rgb(247, 195, 46);
		background-color: #fff3cd;

		h5 {
			font-size: 21px;
			margin-bottom: 15px;
		}

		.warning_text {
			margin-bottom: 10px;

			i {
				color: rgb(250, 177, 41);
			}

			span {
				margin-left: 10px;
				font-size: 18px;
			}

			p {
				font-size: 14px;
				color: #afaf45;
				text-decoration: line-through;
			}
		}

		@media (max-width: 768px) {
			h5 {
				font-size: 17px;
			}

			.warning_text {
				span {
					font-size: 16px;
				}
				p {
					font-size: 13px;
				}
			}
		}
	}
}
</style>