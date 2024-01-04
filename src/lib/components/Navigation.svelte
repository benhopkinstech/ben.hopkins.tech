<script lang="ts">
	const links = [
		{ text: 'About', selector: '#about' },
		{ text: 'Experience', selector: '#experience' },
		{ text: 'Contact', selector: '#contact' }
	];

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	if (typeof window !== 'undefined') {
		let prevScrollPos = window.scrollY;

		window.addEventListener('scroll', () => {
			const currentScrollPos = window.scrollY;
			const header = document.querySelector('header');
			if (!header) return;

			if (prevScrollPos > currentScrollPos && !menuOpen) {
				header.style.opacity = '0.8';
				header.style.transform = 'translateY(0)';
			} else {
				header.style.transform = 'translateY(-100%)';
			}

			if (currentScrollPos === 0) {
				header.style.opacity = '1';
				header.style.transform = 'translateY(0)';
			}

			prevScrollPos = currentScrollPos;
		});

		window.addEventListener('beforeunload', () => {
			window.scrollTo(0, 0);
		});
	}

	const scrollToElement = (selector: string) => {
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
		<button on:click={toggleMenu}> X </button>
	</div>
{/if}

<style lang="postcss">
	header {
		@apply fixed bg-gray-300 w-full transition transform ease-in-out duration-300;
	}

	nav {
		@apply p-4;
	}

	nav button {
		@apply md:hidden cursor-pointer;
	}

	.nav-links {
		@apply hidden md:flex justify-center;
	}

	.nav-links a {
		@apply mx-10 hover:text-white;
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
		@apply block hover:text-white text-left text-4xl my-10;
	}
</style>
