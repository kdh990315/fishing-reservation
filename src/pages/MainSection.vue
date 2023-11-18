<template>
	<main>
		<schedule-section></schedule-section>
		<category-section></category-section>
		<hotpicks-section></hotpicks-section>
		<banner-section></banner-section>
	</main>
</template>

<script>
import ScheduleSection from '@/components/main/ScheduleSection.vue';
import CategorySection from '@/components/main/CategorySection.vue';
import HotpicksSection from '@/components/main/HotpicksSection.vue';
import BannerSection from '@/components/main/BannerSection.vue';

export default {
	components: {
		ScheduleSection,
		CategorySection,
		HotpicksSection,
		BannerSection
	},
	setup() {
		return {
			
		}
	},
}
</script>

<style lang="scss" scoped>
	main {
		width: 1200px;
		margin: 0 auto;
	}
</style>