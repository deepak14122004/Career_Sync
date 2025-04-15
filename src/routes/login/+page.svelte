<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';

	import { session } from '$lib/session';
	import { auth } from '$lib/firebase';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';

	let email: string = $state('');
	let password: string = $state('');

	async function loginWithMail() {
		try {
			await signInWithEmailAndPassword(auth, email, password).then((result) => {
				const { user }: UserCredential = result;
				session.set({
					loggedIn: true,
					user: {
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL
					}
				});
				let first = user!.displayName!.indexOf('<');
				let last = user!.displayName!.indexOf('>');
				if ($session.user?.displayName!.substring(first + 1, last) == 'jobseeker') {
					goto('/jobseeker-dashboard');
				} else if ($session.user?.displayName!.substring(first + 1, last) == 'jobposter') {
					goto('/jobposter-dashboard');
				}
			});
		} catch (error) {
			console.error('Error signing in with email and password:', error);
			alert('Invalid credentials');
		}
	}
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
	<div class="w-[500px]">
		<Card.Root>
			<Card.Header>
				<Card.Title><div class="text-3xl font-bold">Login</div></Card.Title>
				<Card.Description>Enter your credentials to access your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex w-full flex-col gap-2">
					<Label for="email" class="font-semibold">Email</Label>
					<Input type="email" id="email" placeholder="name@example.com" bind:value={email} />
				</div>
				<br />
				<div class="flex w-full flex-col gap-2">
					<Label for="password" class="font-semibold">Password</Label>
					<Input type="password" id="password" placeholder="Password" bind:value={password} />
				</div>
				<br />
				<Button
					class="w-full"
					onclick={() => {
						loginWithMail();
					}}>LogIn</Button
				>
			</Card.Content>
			<Card.Footer>
				<div class="content-centre flex w-full flex-row items-stretch justify-center gap-1">
					<div class="text-gray-600">
						Already have an account?<Button variant="link" onclick={() => goto('/signup')}
							>SignUp</Button
						>
					</div>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
