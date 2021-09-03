<script lang="ts">
	import GitHubIcon from './github.svg';
	export let title: string;
	export let backgroundColor = '#000430';
	export let color = '#fff8e8';
</script>

<header style="--background-color: {backgroundColor}; --color: {color}">
	<h1>{title}</h1>
	<section>
		<a
			href="https://github.com/holomuses/hololive-music.web.app"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img src={GitHubIcon} alt="GitHub Repository" />
		</a>
	</section>
</header>

<style lang="scss">
	header {
		background-color: var(--background-color);
		color: var(--color);

		height: 4rem;
		margin: 0;
		padding: 0 2rem;
		border: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;

		user-select: none;

		h1 {
			margin: 0;
			border: 0;
		}

		section {
			display: inline-flex;
			height: 100%;

			align-items: center;

			img {
				width: 2rem;
				height: 2rem;
			}
		}
	}
</style>
