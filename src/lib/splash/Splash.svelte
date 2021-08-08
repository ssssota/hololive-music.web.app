<script lang="ts">
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	export let color = '#000430';
	export let imagePath = '/favicon.png';

	let visible = true;
	onMount(() =>
		setTimeout(() => {
			visible = false;
		}, 1500)
	);
</script>

{#if visible}
	<section class="splash" style="--background-color: {color}">
		<div class="inner">
			<img src="{assets}{imagePath}" alt="splash" />
		</div>
	</section>
{/if}

<style lang="scss">
	.splash {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--background-color);

		animation: to-transparent 0.5s ease 1s 1 normal both;
		@keyframes to-transparent {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}

	.inner {
		width: 100vmin;
		height: 100vmin;

		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 10vmin;
			height: 10vmin;
			animation: to-big 1s cubic-bezier(1, -0.3, 0.25, 1) 0.5s 1 normal both;

			@keyframes to-big {
				0% {
					transform: scale(1);
				}
				100% {
					transform: scale(20);
				}
			}
		}
	}
</style>
