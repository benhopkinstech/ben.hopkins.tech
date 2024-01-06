<script lang="ts">
	let darkMode = false;

	function toggleDarkMode() {
		darkMode = !darkMode;
	}
</script>

<button on:click={toggleDarkMode}>
	{#if darkMode}
		D
	{:else}
		L
	{/if}
</button>

<style lang="postcss">
	button {
		@apply p-4;
	}
</style>
