<script lang="ts">
	let first = $session.user!.displayName!.indexOf('<');
	let name = $session.user!.displayName!.substring(0, first);
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { session } from '$lib/session';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { query } from 'firebase/firestore';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';

	let jobs: any = [];
	onMount(async () => {
		const querySnapshot = await getDocs(query(collection(db, 'CareerSync_DB')));
		jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		jobs = [...jobs];
	});
</script>

<div class="flex flex-row items-center justify-between p-4">
	<div>
		<h1 class="text-3xl font-bold">CareerSync</h1>
	</div>
	<div class="flex h-full flex-row content-center justify-center gap-4">
		<Button variant="outline" on:click={() => goto('/jobposter-dashboard')}>View My Jobs</Button>
		<Avatar.Root>
			<Avatar.Image src="person-circle.svg" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex items-center">
			<h1>{name}</h1>
		</div>
	</div>
</div>

<div class="flex h-screen w-full flex-row gap-2 bg-gray-100 p-4">
	{#if jobs.length === 0}
		<div class="flex items-center">
			<h1 class="w-full text-4xl">
				Oops!<br />No Jobs as of now!!!!!
			</h1>
		</div>
	{:else}
		<div
			class="grid h-fit w-full grid-cols-4 place-items-center items-stretch justify-center gap-3"
		>
			{#each jobs as job}
				<div class="h-full w-full">
					<Card.Root class="h-full w-full">
						<Card.Header>
							<div class="flex flex-row items-center justify-between gap-2">
								<div>
									<Card.Title><p class="text-sm">{job.jobtitle}</p></Card.Title>
									<Card.Description>{job.companyname}</Card.Description>
								</div>
								<div class="flex flex-row justify-end">
									<div>
										<Dialog.Root>
											<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
												>View Job</Dialog.Trigger
											>
											<Dialog.Content>
												<Dialog.Header>
													<Dialog.Title><p class="text-2xl">{job.jobtitle}</p></Dialog.Title>
													<Dialog.Description>
														<p class="text-base">{job.companyname}</p>
													</Dialog.Description>
													<br />
													{job.jobdescription}
													<br />
													<br />
													<div class="flex flex-row items-center gap-4 text-gray-600">
														<div class="flex flex-row items-center gap-2">
															<img src="geo-alt-fill.svg" alt="location" />{job.location}
														</div>
														<div class="items-centre flex flex-row gap-2">
															<img src="credit-card-fill.svg" alt="card" />{job.salary}
														</div>
													</div>
													<br />
												</Dialog.Header>
											</Dialog.Content>
										</Dialog.Root>
									</div>
								</div>
							</div>
						</Card.Header>
						<Card.Content></Card.Content>
						<hr />
						<br />
						<Card.Footer class="gap-2">
							<p>Posted on :</p>
							<p>
								{job.date
									.toDate()
									.toLocaleString()
									.substring(0, job.date.toDate().toLocaleString().indexOf(','))}
							</p>
						</Card.Footer>
					</Card.Root>
				</div>
			{/each}
		</div>
	{/if}
</div>
