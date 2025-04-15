<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import { updateProfile } from 'firebase/auth';

	import { auth } from '$lib/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	import { session } from '$lib/session';

	let email: string = $state('');
	let password: string = $state('');
	let cpassword: string = $state('');
	let name: string = $state('');
	let files: string | null = $state(null);
	let currenttab: string = $state('jobseeker');

	import { createUploader } from '$lib/uploadthing';
	import { UploadButton, Uploader } from '@uploadthing/svelte';

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			console.log(`onClientUploadComplete`, res);
			if (res) {
				files = res[0].ufsUrl;
			}
			alert('Upload Completed');
		},
		onUploadError: (error: Error) => {
			alert(`ERROR! ${error.message}`);
		}
	});

	async function handleRegister() {
		try {
			if (password !== cpassword) {
				alert('Passwords do not match');
				return;
			}
			if (currenttab == 'jobseeker') {
				if (!files) {
					alert('Please upload a resume');
					return;
				}
			}

			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const { user } = userCredential;

			await updateProfile(user, {
				displayName: name + '<' + currenttab + '>',
				photoURL: files
			});
			session.update((cur: any) => {
				return {
					...cur,
					user,
					loggedIn: true,
					loading: false
				};
			});
			if (currenttab == 'jobposter') {
				goto('/jobposter-dashboard');
			} else {
				goto('/jobseeker-dashboard');
			}
		} catch (error) {
			console.error('Error signing up with email and password:', error);
			alert('Error signing up');
		}
	}
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
	<Card.Root>
		<Card.Header>
			<Card.Title><div class="text-3xl font-bold">SignUp</div></Card.Title>
			<Card.Description>Enter your information to create your account</Card.Description>
		</Card.Header>
		<Card.Content class="w-full">
			<Tabs.Root bind:value={currenttab} class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="jobseeker" class="w-full">Job Seeker</Tabs.Trigger>
					<Tabs.Trigger value="jobposter" class="w-full">Job Poster</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="jobposter">
					{@render jobposter()}
				</Tabs.Content>
				<Tabs.Content value="jobseeker">
					{@render jobseeker()}
				</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full flex-row justify-center gap-1">
				<div class="text-gray-600">
					Already have an account?<Button variant="link" onclick={() => goto('/login')}
						>LogIn</Button
					>
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</div>

{#snippet jobposter()}
	<div class="flex w-full flex-col gap-2">
		<Label for="name" class="font-semibold">Full Name</Label>
		<Input type="name" placeholder="Name" bind:value={name} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="email" class="font-semibold">Email</Label>
		<Input type="email" placeholder="Email" bind:value={email} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="password" class="font-semibold">Password</Label>
		<Input type="password" placeholder="Password" bind:value={password} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="cpassword" class="font-semibold">Confirm Password</Label>
		<Input type="password" placeholder="Password" bind:value={cpassword} />
	</div>
	<br />
	<Button
		class="w-full"
		onclick={() => {
			handleRegister();
		}}>Create Account</Button
	>
{/snippet}

{#snippet jobseeker()}
	<div class="flex w-full flex-col gap-2">
		<Label for="name" class="font-semibold">Full Name</Label>
		<Input type="name" placeholder="Name" bind:value={name} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="email" class="font-semibold">Email</Label>
		<Input type="email" placeholder="Email" bind:value={email} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="password" class="font-semibold">Password</Label>
		<Input type="password" placeholder="Password" bind:value={password} />
	</div>
	<br />
	<div class="flex w-full flex-col gap-2">
		<Label for="cpassword" class="font-semibold">Confirm Password</Label>
		<Input type="password" placeholder="Password" bind:value={cpassword} />
	</div>
	<br />
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="resume">Upload Resume</Label>
		<UploadButton {uploader} accept="application/pdf, application/msword"></UploadButton>
		<p class="text-xs text-gray-600">Accepted formats: PDF, DOC, DOCX</p>
	</div>
	<br />
	<Button
		class="w-full"
		onclick={() => {
			handleRegister();
		}}>Create Account</Button
	>
{/snippet}
