<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { session } from '$lib/session';
	import { goto } from '$app/navigation';
	let first = $session.user!.displayName!.indexOf('<');
	let name = $session.user!.displayName!.substring(0, first);
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { query, where } from 'firebase/firestore';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	console.log(name);
	console.log($session.user?.displayName);

	let my_jobs: any = [];
	onMount(async () => {
		const querySnapshot = await getDocs(
			query(collection(db, 'CareerSync_DB'), where('postermail', '==', $session.user?.email))
		);
		my_jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		my_jobs = [...my_jobs];
	});
</script>

<div class="flex flex-row items-center justify-between p-4">
	<div>
		<h1 class="text-3xl font-bold">CareerSync</h1>
	</div>
	<div class="flex h-full flex-row content-center justify-center gap-4">
		<Button
			on:click={() => {
				goto('/jobposter-list');
			}}>View All Jobs</Button
		>
		<Avatar.Root>
			<Avatar.Image src="person-circle.svg" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex items-center">
			<h1>{name}</h1>
		</div>
	</div>
</div>
<div class="h-screen w-full bg-gray-100">
	<div class="flex flex-row justify-between p-5">
		<div>
			<h1 class="text-2xl font-semibold">Postings Dashboard</h1>
		</div>
		<div>
			<Button variant="outline" on:click={() => goto('/add-jobs')}>Post New Job</Button>
		</div>
	</div>
	<div class="p-4">
		{#if my_jobs.length === 0}
			<div class="flex items-center">
				<h1 class="w-full text-4xl">
					Oops!<br />Ig you are a new user <br />Try creating a new job....!!!!!
				</h1>
			</div>
		{:else}
			<div
				class="grid h-fit w-full grid-cols-4 place-items-center items-stretch justify-center gap-3"
			>
				{#each my_jobs as my_job}
					<div class="h-full w-full">
						<Card.Root class="h-full w-full">
							<Card.Header>
								<div class="flex flex-row items-center justify-between">
									<div>
										<Card.Title><p class="text-xl">{my_job.jobtitle}</p></Card.Title>
										<Card.Description>{my_job.companyname}</Card.Description>
									</div>
									<div class="flex flex-row justify-end">
										<div>
											<Dialog.Root>
												<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
													>View Job</Dialog.Trigger
												>
												<Dialog.Content>
													<Dialog.Header>
														<Dialog.Title><p class="text-2xl">{my_job.jobtitle}</p></Dialog.Title>
														<Dialog.Description>
															<p class="text-base">{my_job.companyname}</p>
														</Dialog.Description>
														<br />
														{my_job.jobdescription}
														<br />
														<br />
														<div class="flex flex-row items-center gap-4 text-gray-600">
															<div class="flex flex-row items-center gap-2">
																<img src="geo-alt-fill.svg" alt="location" />{my_job.location}
															</div>
															<div class="items-centre flex flex-row gap-2">
																<img src="credit-card-fill.svg" alt="card" />{my_job.salary}
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
									{my_job.date
										.toDate()
										.toLocaleString()
										.substring(0, my_job.date.toDate().toLocaleString().indexOf(','))}
								</p>
							</Card.Footer>
						</Card.Root>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
