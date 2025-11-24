<script lang="ts">
	import * as Avatar from "./index";
	import { cn } from "$core/utils";
	import type { Snippet } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";

	const avatarVariants = tv({
		slots: {
			root: "relative flex shrink-0 overflow-hidden",
			image: "aspect-square size-full object-cover",
			fallback: "flex size-full items-center justify-center font-medium uppercase",
		},
		variants: {
			size: {
				xs: {
					root: "size-6 text-[10px]",
				},
				sm: {
					root: "size-8 text-xs",
				},
				default: {
					root: "size-10 text-sm",
				},
				lg: {
					root: "size-12 text-base",
				},
				xl: {
					root: "size-14 text-lg",
				},
				"2xl": {
					root: "size-16 text-xl",
				},
			},
			shape: {
				circle: {
					root: "rounded-full",
				},
				square: {
					root: "rounded-md",
				},
				rounded: {
					root: "rounded-lg",
				},
			},
		variant: {
			default: {
				root: "",
			},
			bordered: {
				root: "ring-2 ring-offset-background ring-offset-2",
			},
			solid: {
				root: "",
			},
		},
		color: {
			default: {
				fallback: "bg-muted text-muted-foreground",
			},
			primary: {
				fallback: "bg-primary text-primary-foreground",
			},
			secondary: {
				fallback: "bg-secondary text-secondary-foreground",
			},
			success: {
				fallback: "bg-success text-white",
			},
			warning: {
				fallback: "bg-warning text-white",
			},
			danger: {
				fallback: "bg-danger text-white",
			},
			info: {
				fallback: "bg-blue-500 text-white",
			},
			purple: {
				fallback: "bg-purple-500 text-white",
			},
			pink: {
				fallback: "bg-pink-500 text-white",
			},
			gradient: {
				fallback: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
			},
		},
	},
	compoundVariants: [
		// Bordered + Default color
		{
			variant: "bordered",
			color: "default",
			class: {
				root: "ring-foreground",
			},
		},
		// Bordered + Primary color
		{
			variant: "bordered",
			color: "primary",
			class: {
				root: "ring-primary",
			},
		},
		// Bordered + Secondary color
		{
			variant: "bordered",
			color: "secondary",
			class: {
				root: "ring-secondary/20",
			},
		},
		// Bordered + Success color
		{
			variant: "bordered",
			color: "success",
			class: {
				root: "ring-success/50",
			},
		},
		// Bordered + Warning color
		{
			variant: "bordered",
			color: "warning",
			class: {
				root: "ring-warning/50",
			},
		},
		// Bordered + Danger color
		{
			variant: "bordered",
			color: "danger",
			class: {
				root: "ring-danger/50",
			},
		},
		// Bordered + Info color
		{
			variant: "bordered",
			color: "info",
			class: {
				root: "ring-blue-500/50",
			},
		},
		// Bordered + Purple color
		{
			variant: "bordered",
			color: "purple",
			class: {
				root: "ring-purple-500/50",
			},
		},
		// Bordered + Pink color
		{
			variant: "bordered",
			color: "pink",
			class: {
				root: "ring-pink-500/50",
			},
		},
		// Bordered + Gradient color
		{
			variant: "bordered",
			color: "gradient",
			class: {
				root: "ring-purple-500/10",
			},
		},
		// Bordered + Square shape
		{
			variant: "bordered",
			shape: "square",
			class: {
				root: "rounded-md",
				image: "rounded-md",
				fallback: "rounded-md",
			},
		},
		// Bordered + Rounded shape
		{
			variant: "bordered",
			shape: "rounded",
			class: {
				root: "rounded-lg",
				image: "rounded-lg",
				fallback: "rounded-lg",
			},
		},
	],
	defaultVariants: {
		size: "default",
		shape: "circle",
		variant: "default",
		color: "default",
	},
});	type AvatarVariants = VariantProps<typeof avatarVariants>;

	interface Props {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: AvatarVariants["size"];
		shape?: AvatarVariants["shape"];
		variant?: AvatarVariants["variant"];
		color?: AvatarVariants["color"];
		class?: string;
		imageClass?: string;
		fallbackClass?: string;
		customFallback?: Snippet;
		delayMs?: number;
	}

	let {
		src,
		alt = "",
		fallback,
		size = "default",
		shape = "circle",
		variant = "default",
		color = "default",
		class: className,
		imageClass,
		fallbackClass,
		customFallback,
		delayMs = 0,
	}: Props = $props();

	const styles = $derived(avatarVariants({ size, shape, variant, color }));

	// Generate initials from fallback text
	const initials = $derived(
		fallback
			? fallback
					.split(" ")
					.map((word) => word[0])
					.join("")
					.toUpperCase()
					.slice(0, 2)
			: ""
	);
</script>

<Avatar.Root class={cn(styles.root(), className)}>
	{#if src}
		<Avatar.Image {src} {alt} class={cn(styles.image(), imageClass)} />
	{/if}
	<Avatar.Fallback class={cn(styles.fallback(), fallbackClass)}>
		{#if customFallback}
			{@render customFallback()}
		{:else if initials}
			{initials}
		{:else}
			<svg
				class="size-1/2 text-muted-foreground/40"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
				/>
			</svg>
		{/if}
	</Avatar.Fallback>
</Avatar.Root>
