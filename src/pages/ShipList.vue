<template>
	<div id="shiplist_wrap">
		<aside>

		</aside>
		<main>
			<warning-section></warning-section>
			<ship-item></ship-item>
		</main>
	</div>
</template>

<script>
import WarningSection from '@/components/shiplist/WarningSection.vue';
import ShipItem from '@/components/shiplist/ShipItem.vue';

export default {
	components: {
		WarningSection,
		ShipItem
	},
	setup() {
		return {

		}
	}
}
</script>

<style lang="scss" scoped>
#shiplist_wrap {
	width: 1200px;
	margin: 0 auto;
	display: flex;

	aside {
		width: 300px;
	}

	main {
		width: 900px;
		margin: 0 auto;
		padding-left: 15px;
	}
}
</style>