<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const radioGroupVariants = tv({
		base: "grid gap-3",
		variants: {
			variant: {
				default: "",
				card: "bg-card border border-border rounded-lg p-4",
				inline: "grid-flow-col auto-cols-max gap-6",
			},
			size: {
				sm: "gap-2",
				default: "gap-3",
				lg: "gap-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type RadioGroupVariant = VariantProps<typeof radioGroupVariants>["variant"];
	export type RadioGroupSize = VariantProps<typeof radioGroupVariants>["size"];
</script>

<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn } from "$core/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		variant = "default",
		size = "default",
		...restProps
	}: RadioGroupPrimitive.RootProps & {
		variant?: RadioGroupVariant;
		size?: RadioGroupSize;
	} = $props();
</script>

<RadioGroupPrimitive.Root
	bind:ref
	bind:value
	data-slot="radio-group"
	class={cn("grid gap-3", className)}
	{...restProps}
/>
