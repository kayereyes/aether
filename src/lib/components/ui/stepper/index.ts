import Root from "./stepper.svelte";
import Step from "./stepper-step.svelte";
import Separator from "./stepper-separator.svelte";

export {
	Root,
	Step,
	Separator,
	//
	Root as Stepper,
	Step as StepperStep,
	Separator as StepperSeparator,
};

export type {
	StepperOrientation,
	StepperSize,
	StepperVariant,
	StepperVariants,
	StepState,
} from "./stepper-variants.js";
