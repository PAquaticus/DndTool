<script>
	import '../app.postcss';
	import '../theme.postcss';
	import '@brainandbones/skeleton/styles/all.css';
	import { AppShell, AppBar } from '@brainandbones/skeleton';
	import logo from '$lib/images/logo.png';
</script>

<AppShell class="bg-surface-50">
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar class="h-14 bg-accent-900">
			<svelte:fragment slot="lead">
				<div class="w-12 h-12">
					<a class="w-12 h-12" href="/">
						<img class="w-12 h-12" src={logo} alt="SvelteKit" />
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>abd</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<div class="w-full flex justify-center">
			<p>Always remember: Crying is a free action.</p>
		</div>
	</svelte:fragment>
</AppShell>
