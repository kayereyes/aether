<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'card', 'inline'],
        description: 'Visual variant of the radio group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the radio group and items',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      value: {
        control: { type: 'text' },
        description: 'Currently selected value',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      class: {
        control: { type: 'text' },
        description: 'Additional CSS classes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
    },
    parameters: {
      docs: {
        description: {
          component: 'A radio group component that allows users to select one option from a set of choices. Supports different variants and sizes.',
        },
        extractArgTypes: false,
      },
    },
    args: {
      variant: 'default',
      size: 'default',
      value: '',
    },
  });
</script>

<Story name="Default">
  <RadioGroup variant="default" size="default" value="option1">
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option1" id="option1" />
      <label for="option1" class="text-sm font-medium leading-none">Option 1</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option2" id="option2" />
      <label for="option2" class="text-sm font-medium leading-none">Option 2</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option3" id="option3" />
      <label for="option3" class="text-sm font-medium leading-none">Option 3</label>
    </div>
  </RadioGroup>
</Story>

<Story name="Variants">
  <div class="space-y-8">
    <div>
      <h3 class="mb-4 text-sm font-medium">Default Variant</h3>
      <RadioGroup variant="default" value="default1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="default1" id="default1" />
          <label for="default1" class="text-sm font-medium leading-none">Default Option 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="default2" id="default2" />
          <label for="default2" class="text-sm font-medium leading-none">Default Option 2</label>
        </div>
      </RadioGroup>
    </div>
    
    <div>
      <h3 class="mb-4 text-sm font-medium">Card Variant</h3>
      <RadioGroup variant="card" value="card1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="card" value="card1" id="card1" />
          <label for="card1" class="text-sm font-medium leading-none">Card Option 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="card" value="card2" id="card2" />
          <label for="card2" class="text-sm font-medium leading-none">Card Option 2</label>
        </div>
      </RadioGroup>
    </div>
    
    <div>
      <h3 class="mb-4 text-sm font-medium">Inline Variant</h3>
      <RadioGroup variant="inline" value="inline1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="inline1" id="inline1" />
          <label for="inline1" class="text-sm font-medium leading-none">Inline 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="inline2" id="inline2" />
          <label for="inline2" class="text-sm font-medium leading-none">Inline 2</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="inline3" id="inline3" />
          <label for="inline3" class="text-sm font-medium leading-none">Inline 3</label>
        </div>
      </RadioGroup>
    </div>
  </div>
</Story>

<Story name="Sizes">
  <div class="space-y-8">
    <div>
      <h3 class="mb-4 text-sm font-medium">Small Size</h3>
      <RadioGroup variant="default" size="sm" value="small1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="sm" value="small1" id="small1" />
          <label for="small1" class="text-xs font-medium leading-none">Small Option 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="sm" value="small2" id="small2" />
          <label for="small2" class="text-xs font-medium leading-none">Small Option 2</label>
        </div>
      </RadioGroup>
    </div>
    
    <div>
      <h3 class="mb-4 text-sm font-medium">Default Size</h3>
      <RadioGroup variant="default" size="default" value="medium1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="default" value="medium1" id="medium1" />
          <label for="medium1" class="text-sm font-medium leading-none">Default Option 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="default" value="medium2" id="medium2" />
          <label for="medium2" class="text-sm font-medium leading-none">Default Option 2</label>
        </div>
      </RadioGroup>
    </div>
    
    <div>
      <h3 class="mb-4 text-sm font-medium">Large Size</h3>
      <RadioGroup variant="default" size="lg" value="large1">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="lg" value="large1" id="large1" />
          <label for="large1" class="text-base font-medium leading-none">Large Option 1</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" size="lg" value="large2" id="large2" />
          <label for="large2" class="text-base font-medium leading-none">Large Option 2</label>
        </div>
      </RadioGroup>
    </div>
  </div>
</Story>

<Story name="Form Example">
  <div class="space-y-6">
    <div>
      <h3 class="mb-3 text-base font-semibold">Choose your plan</h3>
      <RadioGroup variant="card" value="pro">
        <div class="flex items-center space-x-3 p-3">
          <RadioGroupItem variant="card" value="free" id="plan-free" />
          <div class="grid gap-1.5 leading-none">
            <label for="plan-free" class="text-sm font-medium leading-none">
              Free Plan
            </label>
            <p class="text-xs text-muted-foreground">
              Basic features for personal use
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3 p-3">
          <RadioGroupItem variant="card" value="pro" id="plan-pro" />
          <div class="grid gap-1.5 leading-none">
            <label for="plan-pro" class="text-sm font-medium leading-none">
              Pro Plan
            </label>
            <p class="text-xs text-muted-foreground">
              Advanced features for professionals
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3 p-3">
          <RadioGroupItem variant="card" value="enterprise" id="plan-enterprise" />
          <div class="grid gap-1.5 leading-none">
            <label for="plan-enterprise" class="text-sm font-medium leading-none">
              Enterprise Plan
            </label>
            <p class="text-xs text-muted-foreground">
              Full features for large teams
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  </div>
</Story>

<Story name="Settings Example">
  <div class="space-y-6">
    <div>
      <h3 class="mb-3 text-base font-semibold">Notification Preferences</h3>
      <RadioGroup variant="default" size="default" value="email">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="email" id="notify-email" />
          <label for="notify-email" class="text-sm font-medium leading-none">Email notifications</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="push" id="notify-push" />
          <label for="notify-push" class="text-sm font-medium leading-none">Push notifications</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="sms" id="notify-sms" />
          <label for="notify-sms" class="text-sm font-medium leading-none">SMS notifications</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="default" value="none" id="notify-none" />
          <label for="notify-none" class="text-sm font-medium leading-none">No notifications</label>
        </div>
      </RadioGroup>
    </div>
    
    <div>
      <h3 class="mb-3 text-base font-semibold">Theme Selection</h3>
      <RadioGroup variant="inline" size="default" value="auto">
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="light" id="theme-light" />
          <label for="theme-light" class="text-sm font-medium leading-none">Light</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="dark" id="theme-dark" />
          <label for="theme-dark" class="text-sm font-medium leading-none">Dark</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem variant="inline" value="auto" id="theme-auto" />
          <label for="theme-auto" class="text-sm font-medium leading-none">Auto</label>
        </div>
      </RadioGroup>
    </div>
  </div>
</Story>

<Story name="Playground" args={{ variant: 'default', size: 'default', value: 'option1' }}>
  <RadioGroup variant="default" size="default" value="option1">
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option1" id="playground-1" />
      <label for="playground-1" class="text-sm font-medium leading-none">Option 1</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option2" id="playground-2" />
      <label for="playground-2" class="text-sm font-medium leading-none">Option 2</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="default" size="default" value="option3" id="playground-3" />
      <label for="playground-3" class="text-sm font-medium leading-none">Option 3</label>
    </div>
  </RadioGroup>
</Story>