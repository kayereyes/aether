<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const inputVariants = tv({
		base: [
			"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			"focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
		],
		variants: {
			variant: {
				default: "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50",
				outline: "border-2 border-input bg-background hover:border-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50",
				filled: "border-transparent bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
				ghost: "border-transparent bg-transparent hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
				underline: "border-0 border-b-2 border-input rounded-none px-0 bg-transparent focus-visible:border-b-primary focus-visible:ring-0",
			},
			size: {
				sm: "h-8 px-2 text-xs",
				default: "h-9 px-3 text-sm",
				lg: "h-10 px-4 text-base",
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				size: "sm",
				class: "h-6",
			},
			{
				variant: "underline",
				size: "lg", 
				class: "h-12",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type InputVariant = VariantProps<typeof inputVariants>["variant"];
	export type InputSize = VariantProps<typeof inputVariants>["size"];

	// Mask patterns
	export type MaskPattern = {
		/** Regular expression to validate input characters */
		pattern: RegExp;
		/** Placeholder text to show the expected format */
		placeholder: string;
		/** Optional function to transform/format the input value */
		transform?: (value: string) => string;
		/** Optional maximum length for the input */
		maxLength?: number;
	};

	// Helper function to create common mask patterns
	export function createMask(config: {
		/** Characters allowed in input (e.g., 'd' for digits, 'a' for letters, 'x' for alphanumeric) */
		format: string;
		/** Placeholder showing the expected format */
		placeholder: string;
		/** Optional separators to insert at specific positions */
		separators?: { position: number; char: string }[];
		/** Case transformation: 'upper', 'lower', or 'none' */
		case?: 'upper' | 'lower' | 'none';
	}): MaskPattern {
		// Build regex pattern based on format string
		let regexPattern = '^[';
		if (config.format.includes('d')) regexPattern += '\\d';
		if (config.format.includes('a')) regexPattern += 'a-zA-Z';
		if (config.format.includes('x')) regexPattern += '\\da-zA-Z';
		if (config.format.includes('s')) regexPattern += '\\s';
		
		// Add separator characters if defined
		if (config.separators) {
			config.separators.forEach(sep => {
				regexPattern += `\\${sep.char}`;
			});
		}
		regexPattern += ']*$';

		return {
			pattern: new RegExp(regexPattern),
			placeholder: config.placeholder,
			maxLength: config.placeholder.length,
			transform: (value: string) => {
				let result = value;
				
				// Apply case transformation
				if (config.case === 'upper') result = result.toUpperCase();
				if (config.case === 'lower') result = result.toLowerCase();
				
				// Apply separators
				if (config.separators) {
					config.separators.forEach(sep => {
						if (result.length > sep.position) {
							const before = result.slice(0, sep.position);
							const after = result.slice(sep.position);
							if (!before.endsWith(sep.char)) {
								result = before + sep.char + after;
							}
						}
					});
				}
				
				return result;
			}
		};
	}

	export const maskPatterns: Record<string, MaskPattern> = {
		phone: {
			pattern: /^[\d\s\-\(\)\+]*$/,
			placeholder: "(555) 123-4567",
			maxLength: 14,
			transform: (value: string) => {
				// Remove all non-digits
				const digits = value.replace(/\D/g, '');
				if (digits.length <= 3) return digits;
				if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
				return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
			}
		},
		ssn: {
			pattern: /^[\d\-]*$/,
			placeholder: "123-45-6789",
			maxLength: 11,
			transform: (value: string) => {
				const digits = value.replace(/\D/g, '');
				if (digits.length <= 3) return digits;
				if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
				return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
			}
		},
		creditCard: {
			pattern: /^[\d\s]*$/,
			placeholder: "1234 5678 9012 3456",
			maxLength: 19,
			transform: (value: string) => {
				const digits = value.replace(/\D/g, '');
				return digits.replace(/(.{4})/g, '$1 ').trim();
			}
		},
		date: {
			pattern: /^[\d\/]*$/,
			placeholder: "MM/DD/YYYY",
			maxLength: 10,
			transform: (value: string) => {
				const digits = value.replace(/\D/g, '');
				if (digits.length <= 2) return digits;
				if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
				return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
			}
		},
		time: {
			pattern: /^[\d:]*$/,
			placeholder: "HH:MM",
			maxLength: 5,
			transform: (value: string) => {
				const digits = value.replace(/\D/g, '');
				if (digits.length <= 2) return digits;
				return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
			}
		}
	};

	export type MaskType = keyof typeof maskPatterns;
</script>

<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$core/utils.js";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	interface Props extends WithElementRef<Omit<HTMLInputAttributes, "type" | "size">> {
		variant?: InputVariant;
		size?: InputSize;
		/** 
		 * Input mask - can be a predefined mask name or a custom MaskPattern object.
		 * Predefined masks: 'phone', 'ssn', 'creditCard', 'date', 'time'
		 * Custom mask: { pattern: RegExp, placeholder: string, transform?: function }
		 */
		mask?: MaskType | MaskPattern;
		type?: InputType;
		class?: string;
		"data-slot"?: string;
	}

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		variant = "default",
		size = "default",
		mask,
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();

	const classes = $derived(inputVariants({ variant, size }));

	// Handle masked input
	function handleInput(event: Event) {
		if (!mask) return;
		
		const target = event.target as HTMLInputElement;
		const currentValue = target.value;
		
		const maskConfig = typeof mask === 'string' ? maskPatterns[mask] : mask;
		
		// Check max length if specified
		if (maskConfig.maxLength && currentValue.length > maskConfig.maxLength) {
			target.value = value || '';
			return;
		}
		
		// Test against pattern
		if (!maskConfig.pattern.test(currentValue)) {
			// Revert to previous valid value
			target.value = value || '';
			return;
		}
		
		// Apply transformation if provided
		if (maskConfig.transform) {
			const transformedValue = maskConfig.transform(currentValue);
			target.value = transformedValue;
			value = transformedValue;
		} else {
			value = currentValue;
		}
	}

	// Get placeholder - use mask placeholder if available
	const placeholderText = $derived(() => {
		if (!mask) return restProps.placeholder;
		const maskConfig = typeof mask === 'string' ? maskPatterns[mask] : mask;
		return maskConfig.placeholder || restProps.placeholder;
	});
</script>

<input
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(classes, className)}
	{type}
	bind:value
	placeholder={placeholderText()}
	oninput={handleInput}
	{...restProps}
/>
