<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogFooter,
		DialogTitle,
		DialogDescription,
		DialogClose,
	} from "$core/components/ui/dialog/index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Label } from "$core/components/ui/label/index.js";
	import { Textarea } from "$core/components/ui/textarea/index.js";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "$core/components/ui/tabs/index.js";
	import {
		Save,
		Trash2,
		Settings,
		Info,
		AlertTriangle,
		CheckCircle2,
		Plus,
		Edit,
		FileText,
		User,
		Bell,
	} from "@lucide/svelte";

	let result = $state<string>("");
	let name = $state("John Doe");
	let email = $state("john@example.com");
	let bio = $state("");

	// Controlled dialog state examples
	let profileDialogOpen = $state(false);

	function handleSaveProfile() {
		result = `Profile saved: ${name}, ${email}`;
		profileDialogOpen = false;
	}

	function handleDelete() {
		result = "Item deleted successfully";
	}

	function handleCreatePost() {
		result = "Post created successfully";
	}
</script>

<div class="container mx-auto max-w-6xl space-y-8 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Dialog Component Demo</h1>
		<p class="text-muted-foreground">
			Comprehensive examples of the Dialog component with various sizes, variants, and use cases.
		</p>
	</div>

	<!-- Size Examples -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Sizes</h2>
			<p class="text-muted-foreground text-sm">Different dialog sizes for various use cases.</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Small</Button>
				</DialogTrigger>
				<DialogContent size="sm">
					<DialogHeader>
						<DialogTitle>Small Dialog</DialogTitle>
						<DialogDescription>
							Perfect for simple confirmations and alerts.
						</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">This is a small dialog (max-w-sm).</p>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button>Got it</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Default</Button>
				</DialogTrigger>
				<DialogContent size="default">
					<DialogHeader>
						<DialogTitle>Default Size Dialog</DialogTitle>
						<DialogDescription>The standard dialog size for most use cases.</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">
							This is the default size (max-w-lg), suitable for forms and general content.
						</p>
					</div>
					<DialogFooter>
						<Button>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Large</Button>
				</DialogTrigger>
				<DialogContent size="lg">
					<DialogHeader>
						<DialogTitle>Large Dialog</DialogTitle>
						<DialogDescription>More space for detailed content and complex forms.</DialogDescription>
					</DialogHeader>
					<div class="py-4 grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label>First Name</Label>
							<Input placeholder="John" />
						</div>
						<div class="space-y-2">
							<Label>Last Name</Label>
							<Input placeholder="Doe" />
						</div>
					</div>
					<DialogFooter>
						<Button>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Extra Large</Button>
				</DialogTrigger>
				<DialogContent size="xl">
					<DialogHeader>
						<DialogTitle>Extra Large Dialog</DialogTitle>
						<DialogDescription>
							Maximum space for complex layouts and data displays.
						</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">
							This is an extra large dialog (max-w-4xl), ideal for dashboards and complex
							interfaces.
						</p>
					</div>
					<DialogFooter>
						<Button>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Full Width</Button>
				</DialogTrigger>
				<DialogContent size="full">
					<DialogHeader>
						<DialogTitle>Full Width Dialog</DialogTitle>
						<DialogDescription>Nearly full viewport width for maximum space.</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">
							This dialog uses 90vw on desktop, providing maximum available space.
						</p>
					</div>
					<DialogFooter>
						<Button>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<!-- Variant Examples -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Variants</h2>
			<p class="text-muted-foreground text-sm">Different layout variants for different contexts.</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Default Layout</Button>
				</DialogTrigger>
				<DialogContent variant="default">
					<DialogHeader>
						<DialogTitle>Default Layout</DialogTitle>
						<DialogDescription>
							Left-aligned on desktop, centered on mobile (default behavior).
						</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm">This is the standard layout for most dialogs.</p>
					</div>
					<DialogFooter>
						<Button variant="outline">Cancel</Button>
						<Button>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Centered Layout</Button>
				</DialogTrigger>
				<DialogContent variant="centered" size="sm">
					<DialogHeader>
						<DialogTitle>Centered Layout</DialogTitle>
						<DialogDescription>All content centered on all screen sizes.</DialogDescription>
					</DialogHeader>
					<div class="py-4 text-center">
						<p class="text-sm">Perfect for alerts and confirmations.</p>
					</div>
					<DialogFooter>
						<Button>Acknowledge</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<!-- Practical Examples -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Practical Examples</h2>
			<p class="text-muted-foreground text-sm">Real-world use cases and implementations.</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<!-- Edit Profile with Controlled State -->
			<Dialog bind:open={profileDialogOpen}>
				<DialogTrigger>
					<Button>
						<Edit class="size-4 mr-2" />
						Edit Profile
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="name" class="text-end">Name</Label>
							<Input id="name" bind:value={name} class="col-span-3" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="email" class="text-end">Email</Label>
							<Input id="email" type="email" bind:value={email} class="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onclick={handleSaveProfile}>
							<Save class="size-4 mr-2" />
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Delete Confirmation -->
			<Dialog>
				<DialogTrigger>
					<Button variant="destructive">
						<Trash2 class="size-4 mr-2" />
						Delete
					</Button>
				</DialogTrigger>
				<DialogContent size="sm" variant="centered">
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete the item and remove it
							from our servers.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button variant="destructive" onclick={handleDelete}>
							<Trash2 class="size-4 mr-2" />
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Settings with Tabs -->
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">
						<Settings class="size-4 mr-2" />
						Settings
					</Button>
				</DialogTrigger>
				<DialogContent size="lg">
					<DialogHeader>
						<DialogTitle>Settings</DialogTitle>
						<DialogDescription>
							Manage your account settings and preferences here.
						</DialogDescription>
					</DialogHeader>
					<Tabs value="general" class="py-4">
						<TabsList class="grid w-full grid-cols-3">
							<TabsTrigger value="general">General</TabsTrigger>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="notifications">Notifications</TabsTrigger>
						</TabsList>
						<TabsContent value="general" class="space-y-4 py-4">
							<div class="space-y-2">
								<Label>Display Name</Label>
								<Input placeholder="Your display name" />
							</div>
							<div class="space-y-2">
								<Label>Language</Label>
								<Input placeholder="English" />
							</div>
						</TabsContent>
						<TabsContent value="account" class="space-y-4 py-4">
							<div class="space-y-2">
								<Label>Username</Label>
								<Input placeholder="johndoe" />
							</div>
							<div class="space-y-2">
								<Label>Email</Label>
								<Input type="email" placeholder="john@example.com" />
							</div>
						</TabsContent>
						<TabsContent value="notifications" class="space-y-4 py-4">
							<p class="text-sm text-muted-foreground">
								Configure how you receive notifications.
							</p>
						</TabsContent>
					</Tabs>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button>
							<Save class="size-4 mr-2" />
							Save Settings
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Create Post -->
			<Dialog>
				<DialogTrigger>
					<Button>
						<Plus class="size-4 mr-2" />
						Create Post
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Post</DialogTitle>
						<DialogDescription>Share your thoughts with the community.</DialogDescription>
					</DialogHeader>
					<div class="grid gap-4 py-4">
						<div class="space-y-2">
							<Label for="title">Title</Label>
							<Input id="title" placeholder="Post title" />
						</div>
						<div class="space-y-2">
							<Label for="content">Content</Label>
							<Textarea id="content" bind:value={bio} placeholder="Write your post..." rows={5} />
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button onclick={handleCreatePost}>
							<FileText class="size-4 mr-2" />
							Publish
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<!-- Alert-Style Dialogs -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Alert-Style Dialogs</h2>
			<p class="text-muted-foreground text-sm">Simple dialogs for alerts and notifications.</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<!-- Success Alert -->
			<Dialog>
				<DialogTrigger>
					<Button color="success">
						<CheckCircle2 class="size-4 mr-2" />
						Success
					</Button>
				</DialogTrigger>
				<DialogContent size="sm" variant="centered">
					<DialogHeader>
						<DialogTitle class="flex items-center justify-center gap-2">
							<CheckCircle2 class="size-5 text-success" />
							Success!
						</DialogTitle>
						<DialogDescription>Your changes have been saved successfully.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>
							<Button color="success">OK</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Warning Alert -->
			<Dialog>
				<DialogTrigger>
					<Button color="warning">
						<AlertTriangle class="size-4 mr-2" />
						Warning
					</Button>
				</DialogTrigger>
				<DialogContent size="sm" variant="centered">
					<DialogHeader>
						<DialogTitle class="flex items-center justify-center gap-2">
							<AlertTriangle class="size-5 text-warning" />
							Warning
						</DialogTitle>
						<DialogDescription>
							You have unsaved changes. Are you sure you want to continue?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Go Back</Button>
						</DialogClose>
						<DialogClose>
							<Button color="warning">Continue</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Info Alert -->
			<Dialog>
				<DialogTrigger>
					<Button color="info">
						<Info class="size-4 mr-2" />
						Information
					</Button>
				</DialogTrigger>
				<DialogContent size="sm" variant="centered">
					<DialogHeader>
						<DialogTitle class="flex items-center justify-center gap-2">
							<Info class="size-5 text-info" />
							Information
						</DialogTitle>
						<DialogDescription>
							Here's some important information you should know about.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>
							<Button color="info">Got it</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<!-- Special Features -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Special Features</h2>
			<p class="text-muted-foreground text-sm">
				Additional features and customization options.
			</p>
		</div>

		<div class="flex flex-wrap gap-3">
			<!-- No Close Button -->
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">No Close Button</Button>
				</DialogTrigger>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Important Action</DialogTitle>
						<DialogDescription>
							This dialog requires you to make a choice. You must select an action.
						</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">
							Without a close button, users must use one of the provided actions or press Escape.
						</p>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Decline</Button>
						</DialogClose>
						<DialogClose>
							<Button>Accept</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Scrollable Content -->
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Scrollable Content</Button>
				</DialogTrigger>
				<DialogContent size="lg">
					<DialogHeader>
						<DialogTitle>Terms and Conditions</DialogTitle>
						<DialogDescription>Please read through our terms and conditions.</DialogDescription>
					</DialogHeader>
					<div class="max-h-[400px] overflow-y-auto py-4">
						{#each Array(15) as _, i}
							<div class="mb-4">
								<h3 class="font-semibold text-sm mb-2">Section {i + 1}</h3>
								<p class="text-sm text-muted-foreground">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris.
								</p>
							</div>
						{/each}
					</div>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Decline</Button>
						</DialogClose>
						<Button>Accept</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<!-- Custom Close Actions -->
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Custom Close Actions</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Multiple Close Options</DialogTitle>
						<DialogDescription>
							This dialog can be closed in multiple ways with different actions.
						</DialogDescription>
					</DialogHeader>
					<div class="py-4">
						<p class="text-sm text-muted-foreground">
							Each button performs a different action before closing.
						</p>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline" onclick={() => (result = "Cancelled")}>Cancel</Button>
						</DialogClose>
						<DialogClose>
							<Button variant="outline" onclick={() => (result = "Saved as draft")}>
								Save Draft
							</Button>
						</DialogClose>
						<DialogClose>
							<Button onclick={() => (result = "Published")}>Publish</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<!-- Result Display -->
	{#if result}
		<section class="rounded-lg border bg-muted p-4">
			<div class="flex items-start gap-3">
				<Bell class="size-5 mt-0.5 text-muted-foreground" />
				<div class="flex-1">
					<p class="text-sm font-medium">Last Action:</p>
					<p class="text-sm text-muted-foreground">{result}</p>
				</div>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => (result = "")}
					class="size-6 p-0"
				>
					×
				</Button>
			</div>
		</section>
	{/if}

	<!-- Documentation Link -->
	<section class="rounded-lg border-2 border-dashed p-6 text-center">
		<h3 class="text-lg font-semibold mb-2">Documentation</h3>
		<p class="text-muted-foreground text-sm mb-4">
			Check out the full documentation for more details on using the Dialog component.
		</p>
		<Button variant="outline" onclick={() => window.open('/src/lib/components/ui/dialog/docs/DIALOG.md', '_blank')}>
			<FileText class="size-4 mr-2" />
			View Documentation
		</Button>
	</section>
</div>
