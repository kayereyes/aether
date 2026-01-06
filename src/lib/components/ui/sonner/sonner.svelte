<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const toasterVariants = tv({
		base: "",
		variants: {
			position: {
				"top-left": "",
				"top-center": "",
				"top-right": "",
				"bottom-left": "",
				"bottom-center": "",
				"bottom-right": "",
			},
			expand: {
				true: "",
				false: "",
			},
			richColors: {
				true: "",
				false: "",
			},
			closeButton: {
				true: "",
				false: "",
			},
		},
		defaultVariants: {
			position: "bottom-right",
			expand: false,
			richColors: true,
			closeButton: false,
		},
	});

	export type ToasterVariant = VariantProps<typeof toasterVariants>;
	export type ToasterPosition = NonNullable<ToasterVariant["position"]>;
</script>

<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import InfoIcon from "@lucide/svelte/icons/info";
	import Loader2Icon from "@lucide/svelte/icons/loader-2";
	import OctagonXIcon from "@lucide/svelte/icons/octagon-x";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import BellIcon from "@lucide/svelte/icons/bell";

	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import type { Snippet } from "svelte";

	interface Props extends Omit<SonnerProps, "theme"> {
		/** Position of the toaster on the screen */
		position?: ToasterPosition;
		/** Whether toasts expand on hover */
		expand?: boolean;
		/** Enable rich colors for different toast types */
		richColors?: boolean;
		/** Show close button on toasts */
		closeButton?: boolean;
		/** Duration in milliseconds before auto-dismiss (0 = no auto-dismiss) */
		duration?: number;
		/** Gap between toasts in pixels */
		gap?: number;
		/** Maximum number of visible toasts */
		visibleToasts?: number;
		/** Custom loading icon */
		loadingIcon?: Snippet;
		/** Custom success icon */
		successIcon?: Snippet;
		/** Custom error icon */
		errorIcon?: Snippet;
		/** Custom info icon */
		infoIcon?: Snippet;
		/** Custom warning icon */
		warningIcon?: Snippet;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		position = "bottom-right",
		expand = false,
		richColors = true,
		closeButton = false,
		duration = 4000,
		gap = 14,
		visibleToasts = 3,
		loadingIcon,
		successIcon,
		errorIcon,
		infoIcon,
		warningIcon,
		class: className,
		...restProps
	}: Props = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group {className ?? ''}"
	{position}
	{expand}
	{richColors}
	{closeButton}
	{duration}
	{gap}
	{visibleToasts}
	toastOptions={{
		classes: {
			toast: "group toast bg-background text-foreground border-border shadow-lg rounded-lg",
			title: "font-semibold text-foreground",
			description: "text-muted-foreground text-sm",
			actionButton: "bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/90",
			cancelButton: "bg-muted text-muted-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80",
			closeButton: "bg-background text-foreground border-border hover:bg-muted",
			success: "!bg-success/10 !text-green-900 !border-success dark:!bg-success/10 dark:!text-green-200 dark:!border-success/80",
			error: "!bg-danger/10 !text-red-900 !border-danger/30 dark:!bg-danger/10 dark:!text-red-200 dark:!border-danger/80",
			warning: "!bg-warning/10 !text-yellow-900 !border-warning dark:!bg-warning/10 dark:!text-yellow-200 dark:!border-warning/80",
			info: "!bg-blue-50 !text-blue-900 !border-blue-200 dark:!bg-blue-950 dark:!text-blue-100 dark:!border-blue-800",
			loading: "!bg-muted !text-muted-foreground !border-border",
		},
	}}
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
>
	{#snippet loadingIcon()}
		{#if loadingIcon}
			{@render loadingIcon()}
		{:else}
			<Loader2Icon class="size-4 animate-spin" />
		{/if}
	{/snippet}
	{#snippet successIcon()}
		{#if successIcon}
			{@render successIcon()}
		{:else}
			<CircleCheckIcon class="size-4" />
		{/if}
	{/snippet}
	{#snippet errorIcon()}
		{#if errorIcon}
			{@render errorIcon()}
		{:else}
			<OctagonXIcon class="size-4" />
		{/if}
	{/snippet}
	{#snippet infoIcon()}
		{#if infoIcon}
			{@render infoIcon()}
		{:else}
			<InfoIcon class="size-4" />
		{/if}
	{/snippet}
	{#snippet warningIcon()}
		{#if warningIcon}
			{@render warningIcon()}
		{:else}
			<TriangleAlertIcon class="size-4" />
		{/if}
	{/snippet}
</Sonner>
