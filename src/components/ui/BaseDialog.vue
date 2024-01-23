<template>
	<teleport to="body">
		<div class="backdrop" v-if="show"></div>
		<dialog open v-if="show">
			<header>
				<slot name="name">
					<h2>{{ title }}</h2>
				</slot>
			</header>
			<div>
				<slot></slot>
			</div>
			<menu v-if="!fixed">
				<base-button @click="tryClose">닫기</base-button>
			</menu>
		</dialog>
	</teleport>
</template>

<script>
export default {
	emits: ['tryClose'],
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: false,
		},
		fixed: {
			type: Boolean,
			required: false,
			default: false,
		}
	},
	methods: {
		tryClose() {
			if (this.fixed) {
				return;
			}
			this.$emit('tryClose');
		}
	}
}
</script>

<style lang="scss" scoped>
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 10;
}

dialog {
	position: fixed;
	top: 20vh;
	left: 30%;
	width: 40%;
	z-index: 100;
	border-radius: 12px;
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 0;
	margin: 0;
	overflow: hidden;
	background-color: white;

	header {
		background-color: #7aa5d2;
		color: white;
		width: 100%;
		padding: 1rem;
		text-align: center;
	}

	div {
		padding: 1rem;
	}

	menu {
		padding: 1rem;
		display: flex;
		justify-content: flex-end;
		margin: 0;
	}
}
</style>