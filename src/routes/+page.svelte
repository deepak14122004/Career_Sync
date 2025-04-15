<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
	<div class="font-sans text-6xl font-bold">CareerSync</div>
	<div class="text-4xl">Find Your Dream Job Today</div>
	<br />
	<div class="text-3xl text-gray-600">Jobs where you fit in perfectly</div>
	<br />
	<div class="flex flex-row gap-7">
		<Button class="w-[80px] " onclick={() => goto('/login')}>LogIn</Button>
		<Button class="w-[80px]" onclick={() => goto('/signup')} variant="outline">SignUp</Button>
	</div>
</div>
