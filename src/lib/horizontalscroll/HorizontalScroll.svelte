<script lang="ts">
	import { onMount } from 'svelte';
	let scrollElement: HTMLElement | null;
	let scroll = 0;
	let scrollWidth = 0;
	let offsetWidth = 0;
	const setWidth = () => {
		scrollWidth = scrollElement?.scrollWidth ?? 0;
		offsetWidth = scrollElement?.offsetWidth ?? 0;
	};

	const onScroll = (e: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		scroll = e.currentTarget.scrollLeft;
	};
	const goLeft = () =>
		scrollElement?.scrollBy({
			left: -offsetWidth * 0.8,
			behavior: 'smooth'
		});
	const goRight = () =>
		scrollElement?.scrollBy({
			left: offsetWidth * 0.8,
			behavior: 'smooth'
		});
	onMount(() => {
		if (scrollElement == null) return;
		const observer = new window.ResizeObserver(setWidth);
		observer.observe(scrollElement);
		setWidth();
		return observer.disconnect;
	});
</script>

<div class="wrapper">
	{#if offsetWidth < scrollWidth && scroll > 0}
		<button on:click={goLeft} class="left-button">▲</button>
	{/if}
	<div class="scroll" bind:this={scrollElement} on:scroll={onScroll}>
		<slot />
	</div>
	{#if offsetWidth < scrollWidth && scroll < scrollWidth - offsetWidth}
		<button on:click={goRight} class="right-button">▼</button>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		position: relative;
	}
	.scroll {
		overflow-x: auto;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			height: 0;
		}
	}
	button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) rotate(-90deg);

		display: flex;
		justify-content: center;
		align-items: center;

		margin: 0;
		padding: 0;
		border: none;
		border-radius: 50%;

		background-color: rgba(0, 0, 0, 0.5);
		color: #ffffff;

		cursor: pointer;
		user-select: none;

		width: 2rem;
		height: 2rem;
		font-size: 0.75rem;
	}
	.left-button {
		left: 0.5rem;
	}
	.right-button {
		right: 0.5rem;
	}
</style>
