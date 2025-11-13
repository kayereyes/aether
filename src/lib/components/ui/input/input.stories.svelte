<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Input from "./input.svelte";
    
    const { Story } = defineMeta({
        title: 'Components/Input',
        component: Input,
        tags: ['autodocs'],
        argTypes: {
            // Main props we want to control
            variant: {
                control: { type: 'select' },
                options: ['default', 'outline', 'filled', 'ghost', 'underline'],
                description: 'Visual variant of the input',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            size: {
                control: { type: 'select' },
                options: ['sm', 'default', 'lg'],
                description: 'Size of the input',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            type: {
                control: { type: 'select' },
                options: ['text', 'email', 'password', 'number', 'tel', 'url'],
                description: 'HTML input type',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'text' },
                },
            },
            mask: {
                control: { type: 'select' },
                options: [undefined, 'phone', 'ssn', 'creditCard', 'date', 'time'],
                description: 'Input mask pattern for formatting (predefined masks or custom MaskPattern object)',
                table: {
                    type: { summary: 'MaskType | MaskPattern | undefined' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            disabled: {
                control: { type: 'boolean' },
                description: 'Whether the input is disabled',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            placeholder: {
                control: { type: 'text' },
                description: 'Placeholder text',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            value: {
                control: { type: 'text' },
                description: 'Input value',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            
            // Hide unwanted props from controls
            class: {
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
            required: {
                control: false,
                table: { disable: true },
            },
            readonly: {
                control: false,
                table: { disable: true },
            },
            autocomplete: {
                control: false,
                table: { disable: true },
            },
            onInput: {
                control: false,
                table: { disable: true },
            },
            onChange: {
                control: false,
                table: { disable: true },
            },
        },
        args: {
            variant: 'default',
            size: 'default',
            type: 'text',
            disabled: false,
            placeholder: 'Enter text...',
        },
        
        parameters: {
            layout: 'centered',
            docs: {
                extractArgTypes: false, // Disable automatic prop extraction
            },
        },
    });




</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Disabled" args={{ disabled: true, value: 'Cannot edit this', placeholder: 'Disabled input' }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: 'default', placeholder: 'Default variant' }} />
<Story name="Outline Variant" args={{ variant: 'outline', placeholder: 'Outline variant' }} />
<Story name="Filled Variant" args={{ variant: 'filled', placeholder: 'Filled variant' }} />
<Story name="Ghost Variant" args={{ variant: 'ghost', placeholder: 'Ghost variant' }} />
<Story name="Underline Variant" args={{ variant: 'underline', placeholder: 'Underline variant' }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: 'sm', placeholder: 'Small input' }} />
<Story name="Default Size" args={{ size: 'default', placeholder: 'Default input' }} />
<Story name="Large Size" args={{ size: 'lg', placeholder: 'Large input' }} />

<!-- Input Types -->
<Story name="Email Input" args={{ type: 'email', placeholder: 'Enter email address' }} />
<Story name="Password Input" args={{ type: 'password', placeholder: 'Enter password' }} />
<Story name="Number Input" args={{ type: 'number', placeholder: 'Enter number' }} />
<Story name="Telephone Input" args={{ type: 'tel', placeholder: 'Enter phone number' }} />
<Story name="URL Input" args={{ type: 'url', placeholder: 'Enter website URL' }} />

<!-- Input Masks -->
<Story name="Phone Mask" args={{ mask: 'phone', placeholder: '(555) 123-4567' }} />
<Story name="SSN Mask" args={{ mask: 'ssn', placeholder: '123-45-6789' }} />
<Story name="Credit Card Mask" args={{ mask: 'creditCard', placeholder: '1234 5678 9012 3456' }} />
<Story name="Date Mask" args={{ mask: 'date', placeholder: 'MM/DD/YYYY' }} />
<Story name="Time Mask" args={{ mask: 'time', placeholder: 'HH:MM' }} />
<Story name="Custom Mask" args={{ 
  mask: {
    pattern: /^#[A-Fa-f0-9]*$/,
    placeholder: '#FF5733',
    maxLength: 7,
    transform: (value) => {
      if (!value.startsWith('#')) return '#' + value;
      return value.toUpperCase();
    }
  },
  placeholder: 'Hex color'
}} />

<Story name="Large Underline Password" args={{ 
  variant: 'underline', 
  size: 'lg', 
  type: 'password', 
  placeholder: 'Enter secure password' 
}} />


