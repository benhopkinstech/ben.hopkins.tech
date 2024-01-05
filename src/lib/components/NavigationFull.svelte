<script lang="ts">
	export let links: Link[];
	export let scrollToElement: (selector: string) => void;
	export let toggleFullNavigation: () => void;

	type Link = {
		text: string;
		selector: string;
	};
</script>

<nav>
	<div class="nav-links">
		{#each links as { text, selector }}
			<a
				href={'#'}
				on:click|preventDefault={() => {
					scrollToElement(selector);
					toggleFullNavigation();
				}}
			>
				{text}
			</a>
		{/each}
	</div>
	<button on:click={toggleFullNavigation}> X </button>
</nav>

<style lang="postcss">
	nav {
		@apply md:hidden fixed right-0 top-0 h-screen w-full bg-gray-300 flex justify-center items-center;
	}

	nav button {
		@apply absolute top-0 right-0 py-4 px-9 cursor-pointer;
	}

	.nav-links {
		@apply absolute w-3/4;
	}

	.nav-links a {
		@apply block hover:text-white text-left text-4xl py-8 px-4;
	}
</style>
