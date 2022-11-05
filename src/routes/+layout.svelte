<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<div class="header">
		<Header />
	</div>
	<main>
		<slot />
	</main>

	<footer>
		<p>Always remember: Crying is a free action.</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		max-height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 4em 1fr 2.5em;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'header header header'
			'main main main'
			'footer footer footer';
	}
	.header {
		grid-area: header;
	}

	main {
		grid-area: main;
		padding: 1rem;
		width: 100%;
		max-width: 100%;
		height: 100%;
		overflow: auto;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		width: 100%;
		grid-area: footer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
