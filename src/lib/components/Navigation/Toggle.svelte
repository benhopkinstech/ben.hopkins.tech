<script lang="ts">
	import { onMount } from 'svelte';

	export let toggleFullNavigation: () => void;
	export let showFullNavigation: boolean;

	let scrollbarWidth = 0;

	onMount(() => {
		scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	});
</script>

<button
	on:click={toggleFullNavigation}
	class:full-nav={showFullNavigation}
	style="margin-right: {showFullNavigation ? scrollbarWidth : 0}px"
>
	<div />
</button>

<style lang="postcss">
	button {
		@apply py-6 px-4 md:hidden cursor-pointer ml-auto;
	}

	div {
		@apply relative w-4 h-0.5 bg-black transition-all ease-in-out duration-500;
	}

	div::before,
	div::after {
		@apply absolute left-0 content-[''] w-full h-0.5 bg-black transition-all ease-in-out duration-500;
	}

	div::before {
		@apply transform -translate-y-1.5;
	}

	div::after {
		@apply transform translate-y-1.5;
	}

	.full-nav div {
		@apply transform -translate-x-10 bg-transparent;
	}

	.full-nav div::before {
		@apply transform rotate-45 translate-x-10 translate-y-0;
	}

	.full-nav div::after {
		@apply transform -rotate-45 translate-x-10 translate-y-0;
	}
</style>
