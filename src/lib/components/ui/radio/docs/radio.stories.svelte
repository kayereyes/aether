<script context="module" lang="ts">
  import { defineMeta} from '@storybook/addon-svelte-csf';
	import { Radio , type RadioProps} from "$core/components/ui/radio";

    type Args = {
        size?: RadioProps["size"];
        variant?: RadioProps["variant"];
        disabled?: RadioProps["disabled"];
        label?: RadioProps["label"];
        description?: RadioProps["description"];
        error?: RadioProps["error"];
    };
  const { Story } = defineMeta({
    title: 'Components/Radio/Single',
    // component: Radio,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of the radio button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the radio button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the radio button is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label text for the radio button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      description: {
        control: { type: 'text' },
        description: 'Description text below the label',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      error: {
        control: { type: 'boolean' },
        description: 'Error state - when true, applies error styling via aria-invalid',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      onError: {
        control: false,
        description: 'Callback function called when error state changes',
        table: {
          type: { summary: '(error: boolean) => void' },
        },
      },
      
      // Hide unwanted props from controls
      class: {
        control: false,
        table: { disable: true },
      },
      ref: {
        control: false,
        table: { disable: true },
      },
      id: {
        control: false,
        table: { disable: true },
      },
      name: {
        control: false,
        table: { disable: true },
      },
      value: {
        control: false,
        table: { disable: true },
      },
      // Hide any other internal props
    },
    args: {
      disabled: false,
      size: 'default',
      variant: 'default',
      label: undefined,
      description: undefined,
      error: false,
    },
    
    parameters: {
      docs: {
        extractArgTypes: false, // Disable automatic prop extraction
      },
    },
  });
</script>

{#snippet template(args: Args )}
    <Radio {...args} />
{/snippet}

<!-- Basic States -->
<Story name="Default"  {template} />
<Story name="Error State" {template} args={{ error: true, label: "Select option", description: "This field is required" }} />
<Story name="Error Checked" {template} args={{ error: true, label: "Invalid selection" }} />

<!-- With Labels -->
<Story name="With Label" {template} args={{ label: "Accept terms and conditions" }} />
<Story name="With Description" {template} args={{ 
  label: "Enable notifications", 
  description: "Get notified about updates and new features" 
}} />

<!-- Sizes -->
<Story name="Small" {template} args={{ size: 'sm', label: 'Small radio button' }} />
<Story name="Large" {template} args={{ size: 'lg', label: 'Large radio button' }} />
<Story name="Extra Large" {template} args={{ size: 'xl', label: 'Extra large radio button' }} />

<!-- Variants -->
<Story name="Destructive" {template} args={{ 
  variant: 'destructive', 
  label: 'Delete all data',
  description: 'This action cannot be undone'
}} />
<Story name="Success" {template} args={{ 
  variant: 'success', 
  label: 'Mark as completed',
  description: 'This will mark the task as done'
}} />
<Story name="Warning" {template} args={{ 
  variant: 'warning', 
  label: 'Proceed with caution',
  description: 'This action requires attention'
}} />

<Story name="Disabled Checked" {template} args={{ 
  disabled: true,
  label: 'Disabled checked',
  description: 'This radio button is disabled and checked'
}} />

<!-- Complex Example -->
<Story name="Option Item" {template} args={{ 
  size: 'default',
  label: 'Premium Plan',
  description: 'All features included for $29/month'
}} />

<!-- <Story name="All Sizes Comparison">
  {#snippet template()}
    <div class="space-y-4">
      <Radio size="sm" label="Small" description="Size: sm" />
      <Radio size="default" label="Default" description="Size: default" />
      <Radio size="lg" label="Large" description="Size: lg" />
      <Radio size="xl" label="Extra Large" description="Size: xl" />
    </div>
  {/snippet}
</Story>

<Story name="All Variants Comparison">
  {#snippet template()}
    <div class="space-y-4">
      <Radio variant="default" label="Default Variant"  />
      <Radio variant="destructive" label="Destructive Variant"  />
      <Radio variant="success" label="Success Variant"  />
      <Radio variant="warning" label="Warning Variant"  />
    </div>
  {/snippet}
</Story> -->
