<script lang="ts">
	import TopMenu from '$lib/components/Navigation/TopMenu.svelte';
	import FullMenu from '$lib/components/Navigation/FullMenu.svelte';

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

			if (prevScrollPos > currentScrollPos) {
				header.style.transform = 'translateY(0)';
			} else {
				if (!showFullNavigation) {
					header.style.transform = 'translateY(-100%)';
				}
			}

			if (currentScrollPos === 0) {
				header.style.transform = 'translateY(0)';
			}

			prevScrollPos = currentScrollPos;
		});

		window.addEventListener('beforeunload', () => {
			window.scrollTo(0, 0);
		});
	}

	const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return (...args: Parameters<T>) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	};

	const scrollToElement = debounce((selector: string) => {
		const element = document.querySelector(selector);
		if (!element) return;

		let position = element.getBoundingClientRect().top;
		let offset = position + window.scrollY;

		window.scrollTo({
			top: offset,
			behavior: 'smooth'
		});
	}, 300);
</script>

<TopMenu {links} {scrollToElement} {toggleFullNavigation} {showFullNavigation} />

{#if showFullNavigation}
	<FullMenu {links} {scrollToElement} {toggleFullNavigation} />
{/if}
