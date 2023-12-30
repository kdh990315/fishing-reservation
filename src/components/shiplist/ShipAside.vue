<template>
	<div class="aside_form_container">
		<form>
			<h1>선박 종류</h1>
			<label for="half_time">시간배</label>
				<input type="radio" name="ship_type" id="half_time" checked>
			<label for="all_time">종일배</label>
				<input type="radio" name="ship_type" id="all_time">
		</form>
		<form>
			<h1>지역</h1>
		</form>
		<form>
			<h1>어종</h1>
		</form>
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
.aside_form_container {
	width: 100%;
	height: 300px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 15px;
}
</style>