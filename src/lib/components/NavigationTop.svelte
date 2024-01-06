<script lang="ts">
	import NavigationToggle from '$lib/components/NavigationToggle.svelte';
	import NavigationDarkMode from '$lib/components/NavigationDarkMode.svelte';

	export let links: Link[];
	export let scrollToElement: (selector: string) => void;
	export let toggleFullNavigation: () => void;
	export let showFullNavigation: boolean;

	type Link = {
		text: string;
		selector: string;
	};
</script>

<header>
	<nav>
		<NavigationDarkMode />
		<div class="nav-links">
			{#each links as { text, selector }}
				<a href={'#'} on:click|preventDefault={() => scrollToElement(selector)}>{text}</a>
			{/each}
		</div>
		<NavigationToggle {showFullNavigation} {toggleFullNavigation} />
	</nav>
</header>

<style lang="postcss">
	header {
		@apply fixed bg-gray-300 w-full transition transform ease-in-out duration-300;
	}

	nav {
		@apply flex justify-between items-center;
	}

	.nav-links {
		@apply hidden md:flex;
	}

	.nav-links a {
		@apply py-4 px-6 hover:text-white;
	}
</style>
