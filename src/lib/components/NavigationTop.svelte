<script lang="ts">
	import { onMount } from 'svelte';

	export let links: Link[];
	export let scrollToElement: (selector: string) => void;
	export let toggleFullNavigation: () => void;
	export let showFullNavigation: boolean;

	type Link = {
		text: string;
		selector: string;
	};

	let scrollbarWidth = 0;

	onMount(() => {
		scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	});
</script>

<header>
	<nav>
		<div class="nav-links">
			{#each links as { text, selector }}
				<a href={'#'} on:click|preventDefault={() => scrollToElement(selector)}>{text}</a>
			{/each}
		</div>
		<button
			on:click={toggleFullNavigation}
			class:full-nav={showFullNavigation}
			style="margin-right: {showFullNavigation ? scrollbarWidth : 0}px"
		>
			<div class="nav-toggle"></div>
		</button>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply fixed bg-gray-300 w-full transition transform ease-in-out duration-300;
	}

	nav {
		@apply flex justify-center;
	}

	nav button {
		@apply py-[27px] px-4 md:hidden cursor-pointer ml-auto;
	}

	.nav-toggle {
		@apply relative w-4 h-0.5 bg-black transition-all ease-in-out duration-500;
	}

	.nav-toggle::before,
	.nav-toggle::after {
		@apply absolute left-0 content-[''] w-full h-0.5 bg-black transition-all ease-in-out duration-500;
	}

	.nav-toggle::before {
		@apply transform -translate-y-1.5;
	}

	.nav-toggle::after {
		@apply transform translate-y-1.5;
	}

	.full-nav .nav-toggle {
		@apply transform -translate-x-10 bg-transparent;
	}

	.full-nav .nav-toggle::before {
		@apply transform rotate-45 translate-x-10 translate-y-0;
	}

	.full-nav .nav-toggle::after {
		@apply transform -rotate-45 translate-x-10 translate-y-0;
	}

	.nav-links {
		@apply hidden md:flex;
	}

	.nav-links a {
		@apply py-4 px-12 hover:text-white;
	}
</style>
