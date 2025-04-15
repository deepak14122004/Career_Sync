<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { Toaster } from '$lib/components/ui/sonner';

	//import '@uploadthing/svelte/styles.css';
	import type { LayoutData } from './$types';

	let loading: boolean = true;
	let loggedIn: boolean = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user: any = await data.getAuthUser();

		const loggedIn = !!user && user?.emailVerified;
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});

		if (loggedIn) {
			goto('/');
		}
	});
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div>
		{@render children()}
	</div>
{/if}

<Toaster />
