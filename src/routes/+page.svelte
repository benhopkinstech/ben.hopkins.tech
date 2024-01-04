<script>
	import '../app.css';
	import Landing from '$lib/components/Landing.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Ben Hopkins</title>
</svelte:head>

<div>
	<Landing />
	<About />
	<Experience />
	<Contact />
</div>
