<script>
	import '../app.css';
	import Home from '$lib/components/Home.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Ben Hopkins</title>
</svelte:head>

<div>
	<Home />
	<About />
	<Experience />
	<Contact />
</div>
