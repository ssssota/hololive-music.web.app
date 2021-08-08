<script lang="ts">
	export let title: string;
	export let backgroundColor = '#000430';
	export let color = '#fff8e8';
</script>

<header style="--background-color: {backgroundColor}; --color: {color}">
	<h1>{title}</h1>
	<section />
</header>

<style lang="scss">
	header {
		background-color: var(--background-color);
		color: var(--color);

		margin: 0;
		padding: 0;
		border: 0;

		display: flex;
		align-items: center;
		justify-content: space-around;

		user-select: none;

		h1 {
			margin: 0;
			border: 0;
			padding-top: 0.25em;
			padding-bottom: 0.2em;
			padding-left: 1em;
		}
	}
</style>
