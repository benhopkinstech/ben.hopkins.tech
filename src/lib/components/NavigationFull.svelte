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
					toggleFullNavigation();
					setTimeout(() => {
						scrollToElement(selector);
					}, 300);
				}}
			>
				{text}
			</a>
		{/each}
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply md:hidden fixed right-0 top-14 h-full w-full bg-gray-300 flex justify-center items-center;
	}

	.nav-links {
		@apply absolute w-3/4 mb-28;
	}

	.nav-links a {
		@apply block hover:text-white text-left text-4xl py-6 px-4;
	}
</style>
