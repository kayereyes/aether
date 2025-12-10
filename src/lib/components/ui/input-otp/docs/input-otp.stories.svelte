<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import InputOTP from "../input-otp.svelte";
    import Field from '../../field/field.svelte';

    
    const { Story } = defineMeta({
        title: 'Components/InputOTP',
        component: InputOTP,
        tags: ['autodocs'],
        argTypes: {
            maxlength: {
                control: { type: 'number', min: 1, max: 12 },
                description: 'Maximum length of the OTP input',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '6' },
                },
            },
            variant: {
                control: { type: 'select' },
                options: ['default', 'outline', 'underline'],
                description: 'Visual variant of the input slots',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            size: {
                control: { type: 'select' },
                options: ['sm', 'default', 'lg'],
                description: 'Size of the input slots',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            groups: {
                control: { type: 'number', min: 1, max: 6 },
                description: 'Number of groups to split the input into',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '1' },
                },
            },
            showSeparator: {
                control: { type: 'boolean' },
                description: 'Show separator between groups (defaults to true when groups > 1)',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true when groups > 1' },
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
            error: {
                control: { type: 'boolean' },
                description: 'Error state - applies error styling to all slots',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            pattern: {
                control: { type: 'text' },
                description: 'Regex pattern string to validate input characters',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            value: {
                control: { type: 'text' },
                description: 'Current OTP value',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: '""' },
                },
            },
        },
        args: {
            maxlength: 6,
            variant: 'default',
            size: 'default',
            groups: 2,
            disabled: false,
            error: false,
        },
        
        parameters: {
            layout: 'centered',
            docs: {
                extractArgTypes: false,
            },
        },
    });

</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Single Group" args={{ groups: 1 }} />
<Story name="Two Groups" args={{ groups: 2 }} />
<Story name="Three Groups" args={{ groups: 3 }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Error State" args={{ error: true }} />
<Story name="Without Separator" args={{ groups: 2, showSeparator: false }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: 'default', groups: 2 }} />
<Story name="Outline Variant" args={{ variant: 'outline', groups: 2 }} />
<Story name="Underline Variant" args={{ variant: 'underline', groups: 2 }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: 'sm', groups: 1 }} />
<Story name="Default Size" args={{ size: 'default', groups: 1 }} />
<Story name="Large Size" args={{ size: 'lg', groups: 1 }} />



<!-- Different Lengths -->
<Story name="Four Digits" args={{maxlength: 4, groups: 1 }} />
<Story name="Six Digits" args={{ maxlength: 6, groups: 2 }} />
<Story name="Eight Digits" args={{ maxlength: 8, groups: 2 }} />

<!-- Pattern Validation -->
<Story name="Digits Only" args={{ maxlength: 6, groups: 1, pattern: '^\\d+$' }} />
<Story name="Alphanumeric" args={{ maxlength: 6, groups: 1, pattern: '^[a-zA-Z0-9]+$' }} />

<!-- Combinations -->
<Story name="Large Outline Two Groups" args={{ 
    variant: 'outline', 
    size: 'lg', 
    groups: 2 
}} />
<Story name="Small Underline Three Groups" args={{ 
    variant: 'underline', 
    size: 'sm', 
    groups: 3 
}} />



<Story name="With Field Component" >
    {#snippet template()}
        <Field label="Input OTP" error={"Invalid OTP"}>
            <InputOTP maxlength={6} groups={2} variant="outline" size="lg" error={true} />
        </Field>
    {/snippet}
</Story>