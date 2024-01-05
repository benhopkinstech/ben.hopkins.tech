<script lang="ts">
	export let links: Link[];
	export let scrollToElement: (selector: string) => void;
	export let toggleFullNavigation: () => void;

	type Link = {
		text: string;
		selector: string;
	};
</script>

<header>
	<nav>
		<div class="nav-links">
			{#each links as { text, selector }}
				<a href={'#'} on:click|preventDefault={() => scrollToElement(selector)}>{text}</a>
			{/each}
		</div>
		<button on:click={toggleFullNavigation}> ☰ </button>
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
		@apply p-4 md:hidden cursor-pointer ml-auto;
	}

	.nav-links {
		@apply hidden md:flex;
	}

	.nav-links a {
		@apply py-4 px-12 hover:text-white;
	}
</style>
