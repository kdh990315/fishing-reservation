<template>
	<button v-if="!link" :class="mode">
		<slot></slot>
	</button>
	<router-link v-else :to="to" :class="mode">
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: '/'
		},
		mode: {
			type: String,
			required: false,
			default: null,
		}
	},
}
</script>

<style lang="scss" scoped>
button,
a {
	padding: 0.35rem 0.8rem;
	font: inherit;
	background-color: #7aa5d2;
	border: 1px solid #7aa5d2;
	color: white;
	cursor: pointer;
	border-radius: 30px;
	margin: 0 .5rem;
	white-space: nowrap;
	display: inline-block;

	&a:hover,
	&a:active,
	&button:hover,
	&button:active {
		background-color: #270041;
		border-color: #270041;
	}

	@media (max-width: 1000px) {
		padding: 0.25rem 0.65rem;
		font-size: 13px;	
	}
}

.register_btn {
	margin: 30px 0 15px 15px;
}

.reservation_dialog_close {
	position: absolute;
	right: 10px;
	bottom: 10px;
}

.reservation_btn {
	position: absolute;
	right: 100px;
	bottom: 10px;
}

.asideBtn {
	@media (min-width:1200px) {
		display: none;
	}
}

.intro_btn {
	width: 100%;
	padding: 0.25rem 0.8rem;
	background-color: #000;
	border: none;
	margin: 1.5rem auto 0 auto;
}
</style>