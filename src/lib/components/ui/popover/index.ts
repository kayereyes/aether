import { Popover as PopoverPrimitive } from "bits-ui";
import Content, {
	type PopoverContentVariant,
	type PopoverContentSize,
	type PopoverContentAnimation,
	popoverContentVariants,
} from "./popover-content.svelte";
import Trigger, {
	type PopoverTriggerVariant,
	type PopoverTriggerSize,
	popoverTriggerVariants,
} from "./popover-trigger.svelte";

const Root = PopoverPrimitive.Root;
const Close = PopoverPrimitive.Close;
const Arrow = PopoverPrimitive.Arrow;

// Export variant arrays for Storybook and other use cases
const ContentVariants: PopoverContentVariant[] = Object.keys(
	popoverContentVariants.variants.variant
) as PopoverContentVariant[];
const ContentSizes: PopoverContentSize[] = Object.keys(
	popoverContentVariants.variants.size
) as PopoverContentSize[];
const ContentAnimations: PopoverContentAnimation[] = Object.keys(
	popoverContentVariants.variants.animation
) as PopoverContentAnimation[];

const TriggerVariants: PopoverTriggerVariant[] = Object.keys(
	popoverTriggerVariants.variants.variant
) as PopoverTriggerVariant[];
const TriggerSizes: PopoverTriggerSize[] = Object.keys(
	popoverTriggerVariants.variants.size
) as PopoverTriggerSize[];

export {
	Root,
	Content,
	Trigger,
	Close,
	Arrow,
	//
	Root as Popover,
	Content as PopoverContent,
	Trigger as PopoverTrigger,
	Close as PopoverClose,
	Arrow as PopoverArrow,
	//
	popoverContentVariants,
	popoverTriggerVariants,
	ContentVariants,
	ContentSizes,
	ContentAnimations,
	TriggerVariants,
	TriggerSizes,
};

// Export types
export type {
	PopoverContentVariant,
	PopoverContentSize,
	PopoverContentAnimation,
	PopoverTriggerVariant,
	PopoverTriggerSize,
};
