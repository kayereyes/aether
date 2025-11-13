<script lang="ts">
	import { Input, createMask, type InputVariant, type InputSize, type MaskType } from "$core/components/ui/input/index.js";
	
	let basicValue = $state("");
	let phoneValue = $state("");
	let ssnValue = $state("");
	let creditCardValue = $state("");
	let dateValue = $state("");
	let timeValue = $state("");
	
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
					<label class="text-sm font-medium capitalize">{variant}</label>
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
					<label class="text-sm font-medium capitalize">{size}</label>
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
			<div class="space-y-2">
				<label class="text-sm font-medium">Phone Number</label>
				<Input 
					mask="phone"
					bind:value={phoneValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {phoneValue}</p>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Social Security Number</label>
				<Input 
					mask="ssn"
					bind:value={ssnValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {ssnValue}</p>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Credit Card</label>
				<Input 
					mask="creditCard"
					bind:value={creditCardValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {creditCardValue}</p>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Date</label>
				<Input 
					mask="date"
					bind:value={dateValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {dateValue}</p>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Time</label>
				<Input 
					mask="time"
					bind:value={timeValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {timeValue}</p>
			</div>
		</div>
	</section>

	<!-- Combined Examples -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Combined Variants & Masks</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<label class="text-sm font-medium">Large Outlined Phone Input</label>
				<Input 
					variant="outline"
					size="lg"
					mask="phone"
					bind:value={phoneValue}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Small Filled Date Input</label>
				<Input 
					variant="filled"
					size="sm"
					mask="date"
					bind:value={dateValue}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Ghost SSN Input</label>
				<Input 
					variant="ghost"
					mask="ssn"
					bind:value={ssnValue}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Underline Credit Card Input</label>
				<Input 
					variant="underline"
					mask="creditCard"
					bind:value={creditCardValue}
				/>
			</div>
		</div>
	</section>

	<!-- States -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">States</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="space-y-2">
				<label class="text-sm font-medium">Disabled</label>
				<Input 
					placeholder="Disabled input"
					disabled
					value="Cannot edit this"
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Invalid (aria-invalid)</label>
				<Input 
					placeholder="Invalid input"
					aria-invalid="true"
					bind:value={basicValue}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Required</label>
				<Input 
					placeholder="Required input"
					required
					bind:value={basicValue}
				/>
			</div>
		</div>
	</section>

	<!-- Custom Masks -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Masks</h2>
		<p class="text-muted-foreground">
			Examples of custom mask patterns for specialized input formats.
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">License Plate (ABC-1234)</label>
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
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Product Code (PROD-12345)</label>
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
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Hex Color (#FF5733)</label>
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
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">IP Address (192.168.1.1)</label>
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
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">MAC Address (AA:BB:CC:DD:EE:FF)</label>
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
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">ISBN (978-0-123456-78-9)</label>
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
			</div>
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