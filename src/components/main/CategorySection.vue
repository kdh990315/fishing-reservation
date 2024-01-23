<template>
	<section id="categoty_section">
		<div class="category_title">
			<h3>카테고리</h3>
		</div>
		<div class="category_container">
			<div class="category_item_wrap" v-for="(category, idx) in categoryData" :key="idx">
				<router-link :to="category.link">
					<div class="category_item">
						<div class="category_div">
							<img :src="category.src" :alt="category.alt" class="category_icon">
							<p>{{ category.title }}</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import { categoryData } from "@/data/data.js";

export default {
	setup() {

		return {
			categoryData,
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

#categoty_section {
	width: 100%;
	margin-top: 150px;

	.category_title {

		h3 {
			font-weight: 700;
			line-height: 1.25;
			color: #0b0a12;
			font-size: 28px;
			margin: 15px 0 15px 13px;
		}
	}

	.category_container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;

		.category_item_wrap {
			width: 25%;
			height: 250px;
			margin-bottom: 15px;
			padding: 0 13px;

			.category_item {
				height: 100%;
				padding: 25px;
				border-radius: 20px;
				position: relative;


				&:hover {
					@include hover-efect;
				}

				.category_div {
					text-align: center;

					@include position-center;

					.category_icon {
						width: 150px;
					}

					p {
						font-size: 20px;
						font-weight: 500;
						color: #5f5f5f;
					}
				}
			}

			&:nth-child(1) .category_item {
				background-color: rgba(12, 188, 135, .1);
			}

			&:nth-child(2) .category_item {
				background-color: rgba(214, 41, 62, .1);
			}

			&:nth-child(3) .category_item {
				background-color: rgba(23, 162, 184, .1);
			}

			&:nth-child(4) .category_item {
				background-color: rgba(149, 184, 23, 0.1);
			}

			&:nth-child(5) .category_item {
				background-color: rgba(184, 23, 157, 0.1);
			}

			&:nth-child(6) .category_item {
				background-color: rgba(184, 74, 23, 0.1);
			}

			&:nth-child(7) .category_item {
				background-color: rgba(23, 39, 184, 0.1);
			}

			&:nth-child(8) .category_item {
				background-color: rgba(157, 23, 184, 0.1);
			}


			@media (max-width: 1200px) {
				height: 200px;

				.category_item {

					.category_div {

						.category_icon {
							width: 110px;
						}

						p {
							font-size: 18px;
						}
					}
				}
			}

			@media (max-width: 768px) {
				height: 150px;

				.category_item {

					.category_div {

						.category_icon {
							width: 90px;
						}

						p {
							font-size: 16px;
						}
					}
				}
			}
		}
	}
}
</style>