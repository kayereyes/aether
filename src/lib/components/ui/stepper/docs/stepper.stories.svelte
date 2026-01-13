<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stepper, StepperStep, StepperSeparator } from "../index.js";
	import { fn } from "storybook/test";
	import { User, CreditCard, CheckCircle, ShoppingCart, Package, Settings } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "Components/Stepper",
		component: Stepper,
		tags: ["autodocs"],
		argTypes: {
			orientation: {
				control: { type: "select" },
				options: ["horizontal", "vertical"],
				description: "Layout orientation of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "horizontal" },
				},
			},
			size: {
				control: { type: "select" },
				options: ["xs", "sm", "default", "lg"],
				description: "Size of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			variant: {
				control: { type: "select" },
				options: ["default", "outline", "ghost", "flat"],
				description: "Visual variant of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			activeStep: {
				control: { type: "number" },
				description: "Current active step (0-based index)",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "0" },
				},
			},
			clickable: {
				control: { type: "boolean" },
				description: "Allow clicking steps to navigate",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			onStepClick: {
				control: false,
				table: { disable: true },
			},
			children: {
				control: false,
				table: { disable: true },
			},
			ref: {
				control: false,
				table: { disable: true },
			},
			class: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			onStepClick: fn(),
		},
	});
</script>

<Story name="Default">
	<Stepper>
		<StepperStep step={0} label="Step 1" description="Choose a plan" />
		<StepperSeparator />
		<StepperStep step={1} label="Step 2" description="Enter details" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" description="Confirm" />
	</Stepper>
</Story>

<Story name="Horizontal">
	<Stepper orientation="horizontal" activeStep={1}>
		<StepperStep step={0} label="Account" description="Create your account" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Profile" description="Complete your profile" />
		<StepperSeparator />
		<StepperStep step={2} label="Finish" description="Review and finish" />
	</Stepper>
</Story>

<Story name="Vertical">
	<Stepper orientation="vertical" activeStep={1}>
		<StepperStep step={0} label="Personal Info" description="Enter your basic information" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Address" description="Add your address details" />
		<StepperSeparator />
		<StepperStep step={2} label="Review" description="Review and submit" />
	</Stepper>
</Story>

<Story name="Extra Small Size">
	<Stepper size="xs" activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
</Story>

<Story name="Small Size">
	<Stepper size="sm" activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
</Story>

<Story name="Default Size">
	<Stepper size="default" activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
</Story>

<Story name="Large Size">
	<Stepper size="lg" activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
</Story>

<Story name="Outline Variant">
	<Stepper variant="outline" activeStep={1}>
		<StepperStep step={0} label="Start" description="Begin the process" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Middle" description="In progress" />
		<StepperSeparator />
		<StepperStep step={2} label="End" description="Complete" />
	</Stepper>
</Story>

<Story name="Ghost Variant">
	<Stepper variant="ghost" activeStep={1}>
		<StepperStep step={0} label="Start" description="Begin the process" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Middle" description="In progress" />
		<StepperSeparator />
		<StepperStep step={2} label="End" description="Complete" />
	</Stepper>
</Story>

<Story name="Flat Variant">
	<Stepper variant="flat" activeStep={1}>
		<StepperStep step={0} label="Personal Info" description="Completed" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Education" description="Completed" />
		<StepperSeparator />
		<StepperStep step={2} label="Company" description="Pending" />
		<StepperSeparator />
		<StepperStep step={3} label="Testing" description="Pending" />
		<StepperSeparator />
		<StepperStep step={4} label="Review" description="Pending" />
	</Stepper>
</Story>

<Story name="With Icons">
	<Stepper activeStep={1}>
		<StepperStep step={0} icon={User} label="Account" description="Create account" />
		<StepperSeparator completed />
		<StepperStep step={1} icon={CreditCard} label="Payment" description="Add payment" />
		<StepperSeparator />
		<StepperStep step={2} icon={CheckCircle} label="Done" description="All set!" />
	</Stepper>
</Story>

<Story name="Clickable">
	<Stepper clickable activeStep={1}>
		<StepperStep step={0} label="Step 1" description="First step" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" description="Second step" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" description="Third step" />
	</Stepper>
</Story>

<Story name="Numbers Only">
	<Stepper activeStep={2}>
		<StepperStep step={0} />
		<StepperSeparator completed />
		<StepperStep step={1} />
		<StepperSeparator completed />
		<StepperStep step={2} />
		<StepperSeparator />
		<StepperStep step={3} />
	</Stepper>
</Story>

<Story name="Checkout Process">
	<Stepper orientation="vertical" activeStep={1} size="lg">
		<StepperStep step={0} icon={ShoppingCart} label="Cart" description="Review your items" completed />
		<StepperSeparator completed />
		<StepperStep step={1} icon={CreditCard} label="Payment" description="Enter payment details" />
		<StepperSeparator />
		<StepperStep step={2} icon={Package} label="Shipping" description="Choose shipping method" />
		<StepperSeparator />
		<StepperStep step={3} icon={CheckCircle} label="Confirm" description="Review and place order" />
	</Stepper>
</Story>

<Story name="All Completed">
	<Stepper activeStep={3}>
		<StepperStep step={0} label="Step 1" completed />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" completed />
		<StepperSeparator completed />
		<StepperStep step={2} label="Step 3" completed />
		<StepperSeparator completed />
		<StepperStep step={3} label="Step 4" />
	</Stepper>
</Story>

<Story name="Vertical Large">
	<Stepper orientation="vertical" size="lg" activeStep={1}>
		<StepperStep step={0} icon={Settings} label="Configuration" description="Set up your preferences" />
		<StepperSeparator completed />
		<StepperStep step={1} icon={User} label="Profile" description="Complete your profile information" />
		<StepperSeparator />
		<StepperStep step={2} icon={CheckCircle} label="Finish" description="Review and complete setup" />
	</Stepper>
</Story>

<Story name="Simple Three Steps">
	<Stepper activeStep={0}>
		<StepperStep step={0} label="Start" />
		<StepperSeparator />
		<StepperStep step={1} label="Progress" />
		<StepperSeparator />
		<StepperStep step={2} label="Complete" />
	</Stepper>
</Story>
