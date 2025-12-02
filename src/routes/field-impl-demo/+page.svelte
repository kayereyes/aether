<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Textarea } from "$core/components/ui/textarea/index.js";
	import { Checkbox, CheckboxGroup } from "$core/components/ui/checkbox/index.js";
	import type { CheckboxGroupOption } from "$core/components/ui/checkbox/index.js";
	import { RadioGroup } from "$core/components/ui/radio/index.js";
	import type { RadioGroupOption } from "$core/components/ui/radio/index.js";
	import { Switch } from "$core/components/ui/switch/index.js";
	import {Select } from "$core/components/ui/select/index.js";
	import * as Field from "$core/components/ui/field/index.js";
	import {Card} from "$core/components/ui/card/index.js";
    // import Select from "$core/components/ui/select/select.svelte";

	// Form state
	let username = $state("");
	let email = $state("");
	let password = $state("");
	let bio = $state("");
	let country = $state("");
	let newsletter = $state(false);
	let notifications = $state(true);
	let plan = $state("");

	// Additional state for variant demos
	let phone = $state("");
	let ssn = $state("");
	let description = $state("");
	let agreeToTerms = $state(false);
	let darkMode = $state(false);

	// CheckboxGroup state
	let selectedFeatures = $state<string[]>([]);
	let selectedPreferences = $state<string[]>(["email"]);
	let selectedPermissions = $state<string[]>([]);

	// RadioGroup state
	let selectedPlan = $state("basic");
	let selectedTheme = $state("light");
	let selectedNotification = $state("email");
	let selectedPayment = $state("");
	let selectedSize = $state("medium");
	let selectedCluster = $state("kubernetes");

	// Validation state
	let errors = $state<Record<string, string>>({});

	// CheckboxGroup options
	const featureOptions: CheckboxGroupOption[] = [
		{ id: 'feature-api', label: 'API Access', value: 'api', description: 'Access to REST API' },
		{ id: 'feature-analytics', label: 'Analytics Dashboard', value: 'analytics', description: 'View detailed analytics' },
		{ id: 'feature-export', label: 'Data Export', value: 'export', description: 'Export data to CSV/JSON' },
		{ id: 'feature-webhooks', label: 'Webhooks', value: 'webhooks', description: 'Real-time event notifications' },
	];

	const preferenceOptions: CheckboxGroupOption[] = [
		{ id: 'pref-email', label: 'Email Updates', value: 'email' },
		{ id: 'pref-sms', label: 'SMS Notifications', value: 'sms' },
		{ id: 'pref-push', label: 'Push Notifications', value: 'push' },
		{ id: 'pref-newsletter', label: 'Monthly Newsletter', value: 'newsletter' },
	];

	const interestOptions: CheckboxGroupOption[] = [
		{ id: 'int-tech', label: '💻 Technology', value: 'technology' },
		{ id: 'int-design', label: '🎨 Design', value: 'design' },
		{ id: 'int-business', label: '📊 Business', value: 'business' },
		{ id: 'int-marketing', label: '📢 Marketing', value: 'marketing' },
	];

	const permissionOptions: CheckboxGroupOption[] = [
		{ id: 'perm-read', label: 'Read', value: 'read', description: 'View content' },
		{ id: 'perm-write', label: 'Write', value: 'write', description: 'Create and edit content' },
		{ id: 'perm-delete', label: 'Delete', value: 'delete', description: 'Remove content', disabled: true },
		{ id: 'perm-admin', label: 'Admin', value: 'admin', description: 'Full system access' },
	];

	// RadioGroup options
	const planRadioOptions: RadioGroupOption[] = [
		{ id: 'radio-plan-free', label: 'Free Plan', value: 'free', description: 'Basic features for personal use - $0/month' },
		{ id: 'radio-plan-basic', label: 'Basic Plan', value: 'basic', description: 'Essential features for small teams - $9/month' },
		{ id: 'radio-plan-pro', label: 'Pro Plan', value: 'pro', description: 'Advanced features for professionals - $29/month' },
		{ id: 'radio-plan-enterprise', label: 'Enterprise Plan', value: 'enterprise', description: 'Full features for large organizations - $99/month' },
	];

	const themeRadioOptions: RadioGroupOption[] = [
		{ id: 'radio-theme-light', label: '☀️ Light Theme', value: 'light', description: 'Bright and clear appearance' },
		{ id: 'radio-theme-dark', label: '🌙 Dark Theme', value: 'dark', description: 'Easy on the eyes at night' },
		{ id: 'radio-theme-auto', label: '🔄 Auto Theme', value: 'auto', description: 'Matches your system preferences' },
	];

	const notificationRadioOptions: RadioGroupOption[] = [
		{ id: 'radio-notify-email', label: 'Email', value: 'email' },
		{ id: 'radio-notify-sms', label: 'SMS', value: 'sms' },
		{ id: 'radio-notify-push', label: 'Push', value: 'push' },
		{ id: 'radio-notify-none', label: 'None', value: 'none' },
	];

	const paymentRadioOptions: RadioGroupOption[] = [
		{ id: 'radio-pay-credit', label: 'Credit Card', value: 'credit', description: 'Visa, Mastercard, Amex' },
		{ id: 'radio-pay-paypal', label: 'PayPal', value: 'paypal', description: 'Secure PayPal payment' },
		{ id: 'radio-pay-bank', label: 'Bank Transfer', value: 'bank', description: 'Direct bank transfer', disabled: true },
		{ id: 'radio-pay-crypto', label: 'Cryptocurrency', value: 'crypto', description: 'Bitcoin, Ethereum' },
	];

	const sizeRadioOptions: RadioGroupOption[] = [
		{ id: 'radio-size-xs', label: 'Extra Small', value: 'xs' },
		{ id: 'radio-size-sm', label: 'Small', value: 'small' },
		{ id: 'radio-size-md', label: 'Medium', value: 'medium' },
		{ id: 'radio-size-lg', label: 'Large', value: 'large' },
		{ id: 'radio-size-xl', label: 'Extra Large', value: 'xl' },
	];

	const clusterRadioOptions: RadioGroupOption[] = [
		{ id: 'cluster-k8s', label: 'Kubernetes', value: 'kubernetes', description: 'Run GPU workloads on a K8s configured cluster.' },
		{ id: 'cluster-vm', label: 'Virtual Machine', value: 'vm', description: 'Access a VM configured cluster to run GPU workloads.' },
	];

	// Form submission
	function handleSubmit(event: Event) {
		event.preventDefault();
		errors = {};

		// Simple validation
		if (!username) {
			errors.username = "Username is required";
		} else if (username.length < 3) {
			errors.username = "Username must be at least 3 characters";
		}

		if (!email) {
			errors.email = "Email is required";
		} else if (!email.includes("@")) {
			errors.email = "Please enter a valid email address";
		}

		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		if (!country) {
			errors.country = "Please select a country";
		}

		if (!plan) {
			errors.plan = "Please select a subscription plan";
		}

		// If no errors, show success
		if (Object.keys(errors).length === 0) {
			alert("Form submitted successfully!");
			console.log({
				username,
				email,
				password,
				bio,
				country,
				newsletter,
				notifications,
				plan,
			});
		}
	}

	function resetForm() {
		username = "";
		email = "";
		password = "";
		bio = "";
		country = "";
		newsletter = false;
		notifications = true;
		plan = "";
		errors = {};
	}

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "ca", label: "Canada" },
		{ value: "au", label: "Australia" },
		{ value: "de", label: "Germany" },
		{ value: "fr", label: "France" },
		{ value: "jp", label: "Japan" },
		{ value: "cn", label: "China" },
	];

	const plans = [
		{ value: "free", label: "Free - $0/month" },
		{ value: "basic", label: "Basic - $9/month" },
		{ value: "pro", label: "Pro - $29/month" },
		{ value: "enterprise", label: "Enterprise - $99/month" },
	];
</script>

<div class="container mx-auto max-w-4xl space-y-8 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Field.Field Component (Slot-Based)</h1>
		<p class="text-muted-foreground">
			Simplified field component using slots for maximum flexibility. Pass any form control as a child.
		</p>
	</div>

	<hr class="border-border" />

	<!-- Basic Form Example -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Complete Form Example</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				A full form using Field.Field with form controls passed as slots.
			</p>
		</div>

		<form onsubmit={handleSubmit} class="rounded-lg border bg-card p-6">
			<Field.Set>
				<Field.Legend>Account Information</Field.Legend>
				<Field.Description>
					Create your account by filling out the information below.
				</Field.Description>

				<Field.Separator />

				<Field.Group class="gap-6">
					<!-- Username Input -->
					<Field.Field
						label="Username"
						description="Choose a unique username for your account."
						required
						error={errors.username}
					>
						<Input id="username" error={!!errors.username} bind:value={username} placeholder="johndoe" required />
					</Field.Field>

					<!-- Email Input -->
					<Field.Field
						label="Email"
						description="We'll never share your email with anyone."
						required
						error={errors.email}
					>
						<Input id="email" error={!!errors.email} type="email" bind:value={email} placeholder="you@example.com" required />
					</Field.Field>

					<!-- Password Input -->
					<Field.Field
						label="Password"
						description="Must be at least 8 characters long."
						required
						error={errors.password}
					>
						<Input id="password" error={!!errors.password} type="password" bind:value={password} placeholder="••••••••" required />
					</Field.Field>

					<!-- Bio Textarea -->
					<Field.Field label="Bio" description="Tell us a little about yourself.">
						<Textarea
							id="bio"
							bind:value={bio}
							placeholder="I am a..."
							rows={4}
						/>
					</Field.Field>

					<!-- Country Select -->
					<Field.Field
						label="Country"
						description="Select your country of residence."
						required
						error={errors.country}
					>
					 <Select bind:value={country} placeholder="Select a country..." options={countries} error={!!errors.country} />
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<Field.Set>
				<Field.Legend>Preferences</Field.Legend>

				<Field.Group  class="gap-4">
					<!-- Newsletter Checkbox -->
					<Field.Field
						label="Newsletter subscription"
						description="Receive weekly updates about new features."
						orientation="horizontal"
					>
						<Checkbox id="newsletter" bind:checked={newsletter} />
					</Field.Field>

					<!-- Notifications Switch -->
					<Field.Field
						label="Enable notifications"
						description="Get notified about important updates."
						orientation="horizontal"
					>
						<Switch id="notifications" bind:checked={notifications} />
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<Field.Set>
				<Field.Legend>Subscription Plan</Field.Legend>
				<Field.Description>Choose the plan that works best for you.</Field.Description>

				<Field.Separator />

				<Field.Group>
					<Field.Field
						label="Plan"
						description="Select your subscription tier."
						required
						error={errors.plan}
					>
					<Select bind:value={plan} required options={plans} placeholder="Select a plan..." error={!!errors.plan} />
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<div class="flex gap-4">
				<Button type="submit">Submit</Button>
				<Button type="button" variant="outline" onclick={resetForm}>Reset</Button>
			</div>
		</form>
	</section>

	<!-- Input Variants Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Variants</h2>
			<p class="text-muted-foreground">Different visual styles for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<Field.Field label="Default Variant">
					<Input id="input-default" placeholder="Default style" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Outline Variant">
					<Input id="input-outline" placeholder="Outline style" variant="outline" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Filled Variant">
					<Input id="input-filled" placeholder="Filled style" variant="filled" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Ghost Variant">
					<Input id="input-ghost" placeholder="Ghost style" variant="ghost" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Underline Variant">
					<Input id="input-underline" placeholder="Underline style" variant="underline" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Input Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Sizes</h2>
			<p class="text-muted-foreground">Different size options for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card>
				<Field.Field label="Small Size">
					<Input id="input-sm" placeholder="Small input" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size">
					<Input id="input-default-size" placeholder="Default input" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size">
					<Input id="input-lg" placeholder="Large input" size="lg" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Input Masks Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Masks</h2>
			<p class="text-muted-foreground">Formatted input fields with automatic masking</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field label="Phone Number">
					<Input id="phone-mask" bind:value={phone} placeholder="(555) 555-5555" mask="phone" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Social Security Number">
					<Input id="ssn-mask" bind:value={ssn} placeholder="***-**-****" mask="ssn" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Credit Card">
					<Input id="creditcard-mask" placeholder="**** **** **** ****" mask="creditCard" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Date">
					<Input id="date-mask" placeholder="MM/DD/YYYY" mask="date" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Textarea Variants and Features Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Textarea Variants & Features</h2>
			<p class="text-muted-foreground">Different styles and features for textarea fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field label="Default Textarea">
					<Textarea id="textarea-default" placeholder="Enter your text..." variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Outline Textarea">
					<Textarea id="textarea-outline" placeholder="Enter your text..." variant="outline" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="With Character Counter" description="Maximum 200 characters">
					<Textarea
						id="textarea-counter"
						bind:value={description}
						placeholder="Enter your text..."
						maxLength={200}
						showCount
					/>
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Auto-Resize" description="Automatically grows with content">
					<Textarea
						id="textarea-autoresize"
						placeholder="Start typing..."
						autoResize
						minRows={2}
						maxRows={6}
					/>
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Vertical Resize">
					<Textarea id="textarea-resize-vertical" placeholder="Resize vertically only" resize="vertical" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="No Resize">
					<Textarea id="textarea-resize-none" placeholder="Cannot be resized" resize="none" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Checkbox Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Checkbox Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for checkbox fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<Field.Field label="Default Variant" orientation="horizontal">
					<Checkbox id="checkbox-default-variant" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Destructive Variant" orientation="horizontal">
					<Checkbox id="checkbox-destructive" variant="destructive" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Success Variant" orientation="horizontal">
					<Checkbox id="checkbox-success" variant="success" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Warning Variant" orientation="horizontal">
					<Checkbox id="checkbox-warning" variant="warning" />
				</Field.Field>
			</Card>
		</div>

		<div class="grid gap-6 md:grid-cols-4">
			<Card>
				<Field.Field label="Small Size" orientation="horizontal">
					<Checkbox id="checkbox-sm" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size" orientation="horizontal">
					<Checkbox id="checkbox-default-size" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size" orientation="horizontal">
					<Checkbox id="checkbox-lg" size="lg" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Extra Large" orientation="horizontal">
					<Checkbox id="checkbox-xl" size="xl" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- CheckboxGroup Examples Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">CheckboxGroup with Field Component</h2>
			<p class="text-muted-foreground">Multiple checkbox selection with Field wrapper for labels, descriptions, and error handling</p>
		</div>

		<div class="space-y-8">
			<!-- Basic CheckboxGroup -->
			<Card>
				<Field.Field
					label="Select Features"
					description="Choose the features you want to enable for your account."
				>
					<CheckboxGroup
						options={featureOptions}
						bind:values={selectedFeatures}
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None'}</p>
				</div>
			</Card>

			<!-- CheckboxGroup Orientations -->
			<div class="grid gap-6 md:grid-cols-2">
				<Card>
					<Field.Field
						label="Vertical Layout"
						description="Default vertical orientation"
					>
						<CheckboxGroup
							options={interestOptions}
							values={[]}
							orientation="vertical"
						/>
					</Field.Field>
				</Card>

				<Card>
					<Field.Field
						label="Horizontal Layout"
						description="Horizontal orientation for inline display"
					>
						<CheckboxGroup
							options={interestOptions}
							values={[]}
							orientation="horizontal"
						/>
					</Field.Field>
				</Card>
			</div>

			<!-- CheckboxGroup with Error State -->
			<Card>
				<Field.Field
					label="User Permissions"
					description="Select at least one permission to continue."
					required
					error={selectedPermissions.length === 0 ? "Please select at least one permission" : undefined}
				>
					<CheckboxGroup
						options={permissionOptions}
						bind:values={selectedPermissions}
						error={selectedPermissions.length === 0}
						required
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedPermissions.length > 0 ? selectedPermissions.join(', ') : 'None'}</p>
				</div>
			</Card>


			<!-- CheckboxGroup in Form Context -->
			<Card class="bg-muted/50">
				<Field.Set>
					<Field.Legend>Account Setup</Field.Legend>
					<Field.Description>Configure your account features and preferences</Field.Description>
					
					<Field.Separator />
					
					<Field.Group class="gap-6">
						<Field.Field
							label="Enable Features"
							description="Select the features you want to use"
						>
							<CheckboxGroup
								options={featureOptions}
								bind:values={selectedFeatures}
								size="default"
							/>
						</Field.Field>

						<Field.Field
							label="Communication Preferences"
							description="How should we contact you?"
						>
							<CheckboxGroup
								options={preferenceOptions}
								bind:values={selectedPreferences}
								variant="default"
							/>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</Card>
		</div>
	</section>

	<!-- RadioGroup Examples Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">RadioGroup with Field Component</h2>
			<p class="text-muted-foreground">Single selection radio groups with Field wrapper for labels, descriptions, and error handling</p>
		</div>

		<div class="space-y-8">
			<!-- Basic RadioGroup -->
			<Card>
				<Field.Field
					label="Choose Your Plan"
					description="Select the subscription plan that best fits your needs."
				>
					<RadioGroup
						options={planRadioOptions}
						bind:value={selectedPlan}
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedPlan || 'None'}</p>
				</div>
			</Card>

			<!-- RadioGroup with Default Value -->
			<Card>
				<Field.Field
					label="Theme Preference"
					description="Choose your preferred color theme."
				>
					<RadioGroup
						options={themeRadioOptions}
						bind:value={selectedTheme}
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedTheme}</p>
				</div>
			</Card>

			<!-- RadioGroup Orientations -->
			<div class="grid gap-6 md:grid-cols-2">
				<Card>
					<Field.Field
						label="Vertical Layout"
						description="Default vertical orientation"
					>
						<RadioGroup
							options={themeRadioOptions}
							value="light"
							orientation="vertical"
						/>
					</Field.Field>
				</Card>

				<Card>
					<Field.Field
						label="Horizontal Layout"
						description="Horizontal orientation for inline display"
					>
						<RadioGroup
							options={notificationRadioOptions}
							value="email"
							orientation="horizontal"
						/>
					</Field.Field>
				</Card>
			</div>

			<!-- RadioGroup with Error State -->
			<Card>
				<Field.Field
					label="Payment Method"
					description="Select your preferred payment method."
					required
					error={!selectedPayment ? "Please select a payment method" : undefined}
				>
					<RadioGroup
						options={paymentRadioOptions}
						bind:value={selectedPayment}
						error={!selectedPayment}
						required
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedPayment || 'None'}</p>
				</div>
			</Card>


			<!-- RadioGroup in Form Context -->
			<Card class="bg-muted/50">
				<Field.Set>
					<Field.Legend>Product Configuration</Field.Legend>
					<Field.Description>Configure your product preferences</Field.Description>
					
					<Field.Separator />
					
					<Field.Group class="gap-6">
						<Field.Field
							label="Select Size"
							description="Choose your preferred size"
						>
							<RadioGroup
								options={sizeRadioOptions}
								bind:value={selectedSize}
								radioSize="default"
							/>
						</Field.Field>

						<Field.Field
							label="Notification Method"
							description="How would you like to be notified?"
						>
							<RadioGroup
								options={notificationRadioOptions}
								bind:value={selectedNotification}
								variant="default"
							/>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</Card>

			<!-- Card-Style RadioGroup Example -->
			<Card>
				<Field.Field
					label="Select Cluster Type"
					description="Choose how you want to run your GPU workloads."
				>
					<RadioGroup
						options={clusterRadioOptions}
						bind:value={selectedCluster}
						isCard={true}
						radioSize="default"
					/>
				</Field.Field>
				<div class="mt-4 rounded-md bg-muted p-3">
					<p class="text-sm font-medium">Selected: {selectedCluster}</p>
				</div>
			</Card>
		</div>
	</section>

	<!-- Switch Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Switch Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for switch fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field
					label="Default Variant"
					description="Standard switch style"
					orientation="horizontal"
				>
					<Switch id="switch-default-variant" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Success Variant"
					description="Success-themed switch"
					orientation="horizontal"
				>
					<Switch id="switch-success" variant="success" />
				</Field.Field>
			</Card>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card>
				<Field.Field label="Small Size" orientation="horizontal">
					<Switch id="switch-sm" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size" orientation="horizontal">
					<Switch id="switch-default-size" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size" orientation="horizontal">
					<Switch id="switch-lg" size="lg" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Horizontal Layout Examples -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Horizontal Layouts</h2>
			<p class="text-muted-foreground">Fields with horizontal orientation</p>
		</div>

		<div class="grid gap-6">
			<Card>
				<Field.Field
					label="Email notifications"
					description="Receive updates via email"
					orientation="horizontal"
				>
					<Switch id="email-notifications" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="I agree to terms"
					description="You must agree to continue"
					orientation="horizontal"
				>
					<Checkbox id="agree-terms" bind:checked={agreeToTerms} />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Dark mode"
					description="Toggle dark mode theme"
					orientation="horizontal"
				>
					<Switch id="dark-mode" bind:checked={darkMode} variant="success" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Error States -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Error States</h2>
			<p class="text-muted-foreground">Fields displaying validation errors</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field
					label="Username"
					description="Enter a unique username"
					error="This username is already taken"
					required
				>
					<Input id="error-input" placeholder="username" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Email"
					error="Please enter a valid email address"
					required
				>
					<Input id="error-email" type="email" placeholder="email@example.com" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Card Component Variants Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Card Component Variants</h2>
			<p class="text-muted-foreground">Different visual styles and configurations for the Card component</p>
		</div>

		<!-- Card with Header Actions -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Cards with Actions</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<Card title="User Profile" description="Manage your profile settings">
					{#snippet headerAction()}
						<Button variant="ghost" size="sm">Edit</Button>
					{/snippet}
					<Field.Field label="Display Name">
						<Input id="display-name" value="John Doe" />
					</Field.Field>
				</Card>

				<Card title="Notification Settings" description="Configure how you receive alerts">
					{#snippet headerAction()}
						<Button variant="ghost" size="sm">Reset</Button>
					{/snippet}
					<Field.Field label="Email Notifications" orientation="horizontal">
						<Switch id="email-notif" checked />
					</Field.Field>
				</Card>
			</div>
		</div>

		<!-- Card with Footer -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Cards with Footers</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<Card title="Delete Account" description="This action cannot be undone" variant="outline">
					<p class="text-sm text-muted-foreground">
						Deleting your account will permanently remove all your data from our servers.
					</p>
					{#snippet footer()}
						<Button variant="outline" size="sm" class="mr-2">Cancel</Button>
						<Button variant="destructive" size="sm">Delete Account</Button>
					{/snippet}
				</Card>

				<Card title="Save Changes" description="Update your preferences" variant="elevated">
					<Field.Field label="Username">
						<Input id="save-username" value="johndoe" />
					</Field.Field>
					{#snippet footer()}
						<div class="flex-1 text-xs text-muted-foreground">Last saved: 5 mins ago</div>
						<Button size="sm">Save</Button>
					{/snippet}
				</Card>
			</div>
		</div>

		<!-- Complex Example -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Complex Card Example</h3>
			<Card 
				title="Team Subscription" 
				description="Manage your team plan and billing"
				variant="elevated"
				hover
			>
				{#snippet headerAction()}
					<Button variant="outline" size="sm">Upgrade</Button>
				{/snippet}

				<div class="space-y-4">
					<div class="grid gap-4 md:grid-cols-2">
						<Field.Field label="Plan Type">
							<Select bind:value={plan} options={plans} placeholder="Select a plan..." />
						</Field.Field>

						<Field.Field label="Team Size">
							<Input id="team-size" type="number" value="5" />
						</Field.Field>
					</div>

					<Field.Field label="Auto-renew subscription" orientation="horizontal">
						<Switch id="auto-renew" checked variant="success" />
					</Field.Field>
				</div>

				{#snippet footer()}
					<div class="flex-1">
						<p class="text-xs text-muted-foreground">Next billing date: Dec 1, 2025</p>
					</div>
					<Button variant="outline" size="sm" class="mr-2"> View Invoice</Button>
					<Button size="sm">Update Plan</Button>
				{/snippet}
			</Card>
		</div>
	</section>
</div>
