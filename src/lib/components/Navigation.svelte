<script>
	const links = [
		{ text: 'Home', selector: '#home' },
		{ text: 'About', selector: '#about' },
		{ text: 'Experience', selector: '#experience' },
		{ text: 'Contact', selector: '#contact' }
	];

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	let prevScrollPos = typeof window !== 'undefined' ? window.scrollY : 0;
	let scrollingUp = true;

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			const currentScrollPos = window.scrollY;
			const header = document.querySelector('header');
			if (!header) return;

			if (prevScrollPos > currentScrollPos && !menuOpen) {
				scrollingUp = true;
				header.style.transform = 'translateY(0)';
			} else {
				scrollingUp = false;
				header.style.transform = 'translateY(-100%)';
			}

			prevScrollPos = currentScrollPos;
		});
	}

	/**
	 * Scrolls to the element specified by the selector.
	 * @param {string} selector - The CSS selector of the target element.
	 */
	const scrollToElement = (selector) => {
		const element = document.querySelector(selector);
		if (!element) return;

		let position = element.getBoundingClientRect().top;
		let offset = position + window.scrollY;

		window.scrollTo({
			top: offset,
			behavior: 'smooth'
		});
	};
</script>

<header>
	<nav>
		<div>BH</div>
		<div class="nav-links">
			{#each links as { text, selector }}
				<a href={'#'} on:click|preventDefault={() => scrollToElement(selector)}>{text}</a>
			{/each}
		</div>
		<button on:click={toggleMenu}> ☰ </button>
	</nav>
</header>

{#if menuOpen}
	<div class="full-nav">
		<button on:click={toggleMenu}> X </button>
		<div class="full-nav-links">
			{#each links as { text, selector }}
				<a
					href={'#'}
					on:click|preventDefault={() => {
						scrollToElement(selector);
						toggleMenu();
					}}
				>
					{text}
				</a>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	header {
		@apply fixed w-full bg-red-600 transition transform ease-in-out duration-300;
	}

	nav {
		@apply p-4 text-white flex justify-between items-center;
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

	.full-nav {
		@apply md:hidden fixed right-0 top-0 h-screen w-full bg-gray-300 flex justify-center items-center;
	}

	.full-nav button {
		@apply absolute top-4 right-4 cursor-pointer;
	}

	.full-nav-links {
		@apply absolute w-3/4;
	}

	.full-nav-links a {
		@apply block hover:text-red-600 text-left text-4xl mb-8;
	}
</style>
