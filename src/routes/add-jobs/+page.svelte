<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { session } from '$lib/session';
	import { db } from '$lib/firebase';
	import { collection, addDoc } from 'firebase/firestore';
	import { Timestamp } from 'firebase/firestore';
	import { toast } from 'svelte-sonner';

	let companyname = '';
	let jobdescription = '';
	let location = '';
	let annualsalary = '';
	let jobtitle = '';
	let applylink = '';

	async function postjob() {
		const docRef = await addDoc(collection(db, 'CareerSync_DB'), {
			companyname: companyname,
			postermail: $session.user?.email,
			jobdescription: jobdescription,
			date: Timestamp.now(),
			jobtitle: jobtitle,
			location: location,
			salary: annualsalary,
			applylink: applylink
		});
		console.log('Document written with ID: ', docRef.id);

		toast.success('Job Posted', {
			description: Timestamp.now().toDate().toLocaleString(),
			action: {
				label: 'Close',
				onClick: () => goto('/jobposter-dashboard')
			}
		});
	}
</script>

<div class="flex flex-row items-center justify-between p-4">
	<div>
		<h1 class="text-3xl font-bold">CareerSync</h1>
	</div>
	<div class="flex flex-row content-center justify-center gap-4">
		<Button on:click={() => goto('/jobposter-dashboard')}>Back to Dashboard</Button>
	</div>
</div>
<div class=" flex flex-col items-center justify-center bg-gray-100 p-10">
	<div class="h-screen w-[800px] bg-gray-100">
		<h1 class="text-3xl font-semibold">Post a New Job</h1>
		<br />
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-2xl">Job Details</Card.Title>
				<Card.Description class="text-xl"
					>Fill in the information for your job listing</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<div class="flex w-full flex-col gap-1.5">
					<Label for="jtitle" class="text-base">Job Title*</Label>
					<Input type="text" bind:value={jobtitle} placeholder="e.g. Frontend Developer" />
				</div>
				<br />
				<div class="flex w-full flex-col gap-1.5">
					<Label for="jdescription" class="text-base">Job Description*</Label>
					<Textarea
						bind:value={jobdescription}
						placeholder="Describe the role, responsibilites and requirements......"
					/>
				</div>
				<br />
				<div class="flex w-full flex-row gap-4">
					<div class="flex w-full flex-col gap-1.5">
						<Label for="jlocation" class="text-base">Job Location*</Label>
						<Input type="text" bind:value={location} placeholder="e.g. Chennai, Hyderabad, etc" />
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<Label for="jsalary" class="text-base">Annual Salary*</Label>
						<Input type="number" bind:value={annualsalary} placeholder="e.g. 1300000" />
					</div>
					<br />
				</div>
				<br />
				<div class="flex w-full flex-col gap-1.5">
					<Label for="jcompanyname" class="text-base">Company name*</Label>
					<Input type="text" bind:value={companyname} placeholder="e.g. Google, Microsoft, etc" />
				</div>
				<br />
				<div class="flex w-full flex-col gap-1.5">
					<Label for="applylink" class="text-base">Apply Link*</Label>
					<Input type="text" bind:value={applylink} placeholder="e.g. carrers@company.com" />
				</div>
				<br />
				<hr />
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full flex-row justify-between">
					<Button variant="outline" on:click={() => goto('/jobposter-dashboard')}>Cancel</Button>
					<Button onclick={() => postjob()}>Post Job</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
