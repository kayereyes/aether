<script lang="ts">
	import { Input, createMask, type InputVariant, type InputSize, type MaskType } from "$core/components/ui/input/index.js";
	import * as Field from "$core/components/ui/field/index.js";
	
	let basicValue = $state("");
	let phoneValue = $state("");
	let ssnValue = $state("");
	let creditCardValue = $state("");
	let dateValue = $state("");
	let timeValue = $state("");
	let emailValue = $state("");
	let usernameValue = $state("");
	
	// Error states
	let emailError = $derived(emailValue.length > 0 && !emailValue.includes("@"));
	let usernameError = $derived(usernameValue.length > 0 && usernameValue.length < 3);
	
	const variants: InputVariant[] = ["default", "outline", "filled", "ghost", "underline"];
	const sizes: InputSize[] = ["sm", "default", "lg"];
</script>

<div class="container mx-auto py-10 space-y-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Input Component Demo</h1>
		<p class="text-muted-foreground">
			Showcasing different variants, sizes, and mask functionality for the Input component.
		</p>
	</div>

	<!-- Basic Variants -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Variants</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each variants as variant}
				<div class="space-y-2">
					<p class="text-sm font-medium capitalize">{variant}</p>
					<Input 
						{variant}
						placeholder="Enter text..."
						bind:value={basicValue}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- Sizes -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			{#each sizes as size}
				<div class="space-y-2">
					<p class="text-sm font-medium capitalize">{size}</p>
					<Input 
						{size}
						placeholder="Enter text..."
						bind:value={basicValue}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- Masked Inputs -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Masked Inputs</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Field.Field label="Phone Number">
				<Input 
					mask="phone"
					bind:value={phoneValue}
				/>
				{#if phoneValue}
					<Field.Description>Value: {phoneValue}</Field.Description>
				{/if}
			</Field.Field>

			<Field.Field label="Social Security Number">
				<Input 
					mask="ssn"
					bind:value={ssnValue}
				/>
				{#if ssnValue}
					<Field.Description>Value: {ssnValue}</Field.Description>
				{/if}
			</Field.Field>

			<Field.Field label="Credit Card">
				<Input 
					mask="creditCard"
					bind:value={creditCardValue}
				/>
				{#if creditCardValue}
					<Field.Description>Value: {creditCardValue}</Field.Description>
				{/if}
			</Field.Field>

			<Field.Field label="Date">
				<Input 
					mask="date"
					bind:value={dateValue}
				/>
				{#if dateValue}
					<Field.Description>Value: {dateValue}</Field.Description>
				{/if}
			</Field.Field>

			<Field.Field label="Time">
				<Input 
					mask="time"
					bind:value={timeValue}
				/>
				{#if timeValue}
					<Field.Description>Value: {timeValue}</Field.Description>
				{/if}
			</Field.Field>
		</div>
	</section>

	<!-- Error States -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Error States</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Field.Field 
				label="Email Address"
				error={emailError ? "Please enter a valid email address" : undefined}
				required
			>
				<Input 
					placeholder="Email address..."
					bind:value={emailValue}
					error={emailError}
					type="email"
				/>
			</Field.Field>

			<Field.Field 
				label="Username"
				error={usernameError ? "Username must be at least 3 characters" : undefined}
				required
			>
				<Input 
					variant="outline"
					placeholder="Username..."
					bind:value={usernameValue}
					error={usernameError}
				/>
			</Field.Field>

			<Field.Field 
				label="Phone Number"
				error="Invalid phone number format"
			>
				<Input 
					mask="phone"
					error={true}
				/>
			</Field.Field>

			<Field.Field 
				label="Large Input"
				error="This field cannot be empty"
			>
				<Input 
					size="lg"
					placeholder="Large input with error..."
					error={true}
				/>
			</Field.Field>
		</div>
	</section>

	<!-- Combined Examples -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Combined Variants & Masks</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Field.Field label="Large Outlined Phone Input">
				<Input 
					variant="outline"
					size="lg"
					mask="phone"
					bind:value={phoneValue}
				/>
			</Field.Field>

			<Field.Field label="Small Filled Date Input">
				<Input 
					variant="filled"
					size="sm"
					mask="date"
					bind:value={dateValue}
				/>
			</Field.Field>

			<Field.Field label="Ghost SSN Input">
				<Input 
					variant="ghost"
					mask="ssn"
					bind:value={ssnValue}
				/>
			</Field.Field>

			<Field.Field label="Underline Credit Card Input">
				<Input 
					variant="underline"
					mask="creditCard"
					bind:value={creditCardValue}
				/>
			</Field.Field>
		</div>
	</section>

	<!-- States -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">States</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Field.Field label="Disabled">
				<Input 
					placeholder="Disabled input"
					disabled
					value="Cannot edit this"
				/>
			</Field.Field>

			<Field.Field label="Read-only">
				<Input 
					placeholder="Read-only input"
					readonly
					value="Read-only value"
				/>
			</Field.Field>

			<Field.Field label="Required" required>
				<Input 
					placeholder="Required input"
					required
					bind:value={basicValue}
				/>
			</Field.Field>
		</div>
	</section>

	<!-- Custom Masks -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Masks</h2>
		<p class="text-muted-foreground">
			Examples of custom mask patterns for specialized input formats.
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<Field.Field 
				label="License Plate"
				description="Format: ABC-1234"
			>
				<Input 
					mask={{
						pattern: /^[A-Z0-9\-\s]*$/,
						placeholder: 'ABC-1234',
						maxLength: 8,
						transform: (value) => {
							const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
							return clean.length > 3 ? `${clean.slice(0, 3)}-${clean.slice(3)}` : clean;
						}
					}}
				/>
			</Field.Field>

			<Field.Field 
				label="Product Code"
				description="Format: PROD-12345"
			>
				<Input 
					mask={{
						pattern: /^[A-Z0-9\-]*$/,
						placeholder: 'PROD-12345',
						maxLength: 10,
						transform: (value) => {
							const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
							return clean.length > 0 ? `PROD-${clean}` : clean;
						}
					}}
				/>
			</Field.Field>

			<Field.Field 
				label="Hex Color"
				description="Format: #FF5733"
			>
				<Input 
					mask={{
						pattern: /^#[A-Fa-f0-9]*$/,
						placeholder: '#FF5733',
						maxLength: 7,
						transform: (value) => {
							let clean = value.replace(/[^A-Fa-f0-9]/g, '');
							if (clean.length > 0 && !value.startsWith('#')) {
								clean = '#' + clean;
							}
							return clean.toUpperCase();
						}
					}}
				/>
			</Field.Field>

			<Field.Field 
				label="IP Address"
				description="Format: 192.168.1.1"
			>
				<Input 
					mask={{
						pattern: /^[\d\.]*$/,
						placeholder: '192.168.1.1',
						maxLength: 15,
						transform: (value) => {
							const parts = value.split('.');
							return parts.map(part => {
								const num = parseInt(part);
								return isNaN(num) || num > 255 ? part.slice(0, -1) : part;
							}).join('.');
						}
					}}
				/>
			</Field.Field>

			<Field.Field 
				label="MAC Address"
				description="Format: AA:BB:CC:DD:EE:FF"
			>
				<Input 
					mask={{
						pattern: /^[A-Fa-f0-9:]*$/,
						placeholder: 'AA:BB:CC:DD:EE:FF',
						maxLength: 17,
						transform: (value) => {
							const clean = value.toUpperCase().replace(/[^A-F0-9]/g, '');
							return clean.replace(/(.{2})(?=.)/g, '$1:');
						}
					}}
				/>
			</Field.Field>

			<Field.Field 
				label="ISBN"
				description="Format: 978-0-123456-78-9"
			>
				<Input 
					mask={{
						pattern: /^[\d\-]*$/,
						placeholder: '978-0-123456-78-9',
						maxLength: 17,
						transform: (value) => {
							const digits = value.replace(/\D/g, '');
							if (digits.length <= 3) return digits;
							if (digits.length <= 4) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
							if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 4)}-${digits.slice(4)}`;
							if (digits.length <= 12) return `${digits.slice(0, 3)}-${digits.slice(3, 4)}-${digits.slice(4, 10)}-${digits.slice(10)}`;
							return `${digits.slice(0, 3)}-${digits.slice(3, 4)}-${digits.slice(4, 10)}-${digits.slice(10, 12)}-${digits.slice(12, 13)}`;
						}
					}}
				/>
			</Field.Field>
		</div>

		<div class="mt-6 p-4 bg-muted rounded-lg">
			<h3 class="font-semibold mb-2">Custom Mask Usage:</h3>
			<pre class="text-sm"><code>{`<Input 
  mask={{
    pattern: /^[A-Z0-9\\-]*$/,
    placeholder: 'ABC-1234',
    maxLength: 8,
    transform: (value) => {
      const clean = value.toUpperCase();
      return clean.length > 3 
        ? \`\${clean.slice(0, 3)}-\${clean.slice(3)}\` 
        : clean;
    }
  }}
/>`}</code></pre>
		</div>
	</section>


</div>