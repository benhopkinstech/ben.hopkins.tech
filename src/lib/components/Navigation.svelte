<script lang="ts">
	import NavigationFull from '$lib/components/NavigationFull.svelte';
	import NavigationTop from '$lib/components/NavigationTop.svelte';

	const links = [
		{ text: 'About', selector: '#about' },
		{ text: 'Experience', selector: '#experience' },
		{ text: 'Contact', selector: '#contact' }
	];

	let showFullNavigation = false;

	function toggleFullNavigation() {
		showFullNavigation = !showFullNavigation;

		const body = document.querySelector('body');
		if (!body) return;

		if (showFullNavigation) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}
	}

	if (typeof window !== 'undefined') {
		let prevScrollPos = window.scrollY;

		window.addEventListener('scroll', () => {
			const currentScrollPos = window.scrollY;
			const header = document.querySelector('header');
			if (!header) return;

			if (prevScrollPos > currentScrollPos && !showFullNavigation) {
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

<NavigationTop {links} {scrollToElement} {toggleFullNavigation} />

{#if showFullNavigation}
	<NavigationFull {links} {scrollToElement} {toggleFullNavigation} />
{/if}
