<script>
	const links = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '/about' },
		{ text: 'Experience', href: '/experience' },
		{ text: 'Contact', href: '/contact' }
	];

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header>
	<nav>
		<div>BH</div>
		<div class="nav-links">
			{#each links as { text, href }}
				<a {href}>{text}</a>
			{/each}
		</div>
		<button on:click={toggleMenu}> ☰ </button>
	</nav>

	{#if menuOpen}
		<div class="drawer">
			<button on:click={toggleMenu}> X </button>
			<div class="drawer-links">
				{#each links as { text, href }}
					<a {href} on:click={toggleMenu}>{text}</a>
				{/each}
			</div>
		</div>
	{/if}
</header>

<style lang="postcss">
	header {
		@apply absolute w-screen;
	}

	nav {
		@apply bg-red-600 p-4 text-white flex justify-between items-center;
	}

	nav button {
		@apply md:hidden cursor-pointer;
	}

	.nav-links {
		@apply hidden md:flex;
	}

	.nav-links a {
		@apply text-white mr-4 hover:text-gray-300;
	}

	.nav-links a:last-child {
		@apply mr-0;
	}

	.drawer {
		@apply md:hidden fixed right-0 top-0 h-screen w-screen bg-gray-300 flex justify-center items-center;
	}

	.drawer button {
		@apply absolute top-4 right-4 cursor-pointer;
	}

	.drawer-links {
		@apply absolute w-3/4;
	}

	.drawer-links a {
		@apply block hover:text-red-600 text-left text-4xl mb-8;
	}
</style>
