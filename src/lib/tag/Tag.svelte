<script lang="ts">
	import { betterForground, parseHexColor } from '$lib/utils';
	export let color = '#e0e0e0';
	const getForegroundColor = () => betterForground(parseHexColor(color));
</script>

<div style="--foreground-color: {getForegroundColor()}; --background-color: {color}">
	<span>
		<slot />
	</span>
</div>

<style lang="scss">
	div {
		display: inline-block;
		display: inline-flex;
		align-items: center;
		justify-content: baseline;

		padding: 0.25rem 0.625rem;
		border: 0;
		margin: 0.25rem;
		border-radius: 1rem;

		color: var(--foreground-color, #101010);
		background-color: var(--background-color, #e0e0e0);

		span {
			display: inline-block;
			display: inline-flex;
			align-items: center;
			justify-content: baseline;
			white-space: nowrap;
		}
	}
</style>
