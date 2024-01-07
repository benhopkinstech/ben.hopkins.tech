<script>
	import '../app.css';
	import Landing from '$lib/components/Landing/Landing.svelte';
	import About from '$lib/components/About/About.svelte';
	import Experience from '$lib/components/Experience/Experience.svelte';
	import Contact from '$lib/components/Contact/Contact.svelte';
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
