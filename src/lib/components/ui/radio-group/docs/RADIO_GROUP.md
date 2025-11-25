# RadioGroup Component

A flexible radio group component that allows users to select one option from a set of choices. Built on top of bits-ui primitives with support for different variants, sizes, and layouts.

## Features

- **Variants**: Multiple visual styles (default, card, inline)
- **Sizes**: Three size options (sm, default, lg) 
- **Flexible Layout**: Supports vertical and horizontal arrangements
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Complete type safety with exported types
- **Responsive**: Adapts to different screen sizes and contexts

## Installation

```bash
npm install bits-ui @lucide/svelte tailwind-variants
```

## Usage

### Basic Radio Group

```svelte
<script>
  import { RadioGroup, RadioGroupItem } from "$core/components/ui/radio-group";
  
  let selectedValue = $state("option1");
</script>

<RadioGroup bind:value={selectedValue}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="opt1" />
    <label for="opt1" class="text-sm font-medium">Option 1</label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="opt2" />
    <label for="opt2" class="text-sm font-medium">Option 2</label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option3" id="opt3" />
    <label for="opt3" class="text-sm font-medium">Option 3</label>
  </div>
</RadioGroup>
```

### Card Variant for Complex Options

```svelte
<script>
  import { RadioGroup, RadioGroupItem } from "$core/components/ui/radio-group";
  
  let selectedPlan = $state("pro");
</script>

<RadioGroup variant="card" bind:value={selectedPlan}>
  <div class="flex items-center space-x-3 p-4">
    <RadioGroupItem variant="card" value="free" id="plan-free" />
    <div class="grid gap-1.5 leading-none">
      <label for="plan-free" class="text-sm font-medium cursor-pointer">
        Free Plan
      </label>
      <p class="text-xs text-muted-foreground">
        Basic features for personal use
      </p>
    </div>
  </div>
  <div class="flex items-center space-x-3 p-4">
    <RadioGroupItem variant="card" value="pro" id="plan-pro" />
    <div class="grid gap-1.5 leading-none">
      <label for="plan-pro" class="text-sm font-medium cursor-pointer">
        Pro Plan
      </label>
      <p class="text-xs text-muted-foreground">
        Advanced features for professionals
      </p>
    </div>
  </div>
</RadioGroup>
```

### Inline Variant for Compact Choices

```svelte
<script>
  import { RadioGroup, RadioGroupItem } from "$core/components/ui/radio-group";
  
  let theme = $state("auto");
</script>

<RadioGroup variant="inline" bind:value={theme}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem variant="inline" value="light" id="theme-light" />
    <label for="theme-light" class="text-sm font-medium cursor-pointer">Light</label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem variant="inline" value="dark" id="theme-dark" />
    <label for="theme-dark" class="text-sm font-medium cursor-pointer">Dark</label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem variant="inline" value="auto" id="theme-auto" />
    <label for="theme-auto" class="text-sm font-medium cursor-pointer">Auto</label>
  </div>
</RadioGroup>
```

### Different Sizes

```svelte
<!-- Small -->
<RadioGroup variant="default" size="sm" bind:value={selection}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem size="sm" value="small1" id="small1" />
    <label for="small1" class="text-xs font-medium">Small Option</label>
  </div>
</RadioGroup>

<!-- Large -->
<RadioGroup variant="default" size="lg" bind:value={selection}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem size="lg" value="large1" id="large1" />
    <label for="large1" class="text-base font-medium">Large Option</label>
  </div>
</RadioGroup>
```

## Components

### RadioGroup

The main container component that manages the radio group state and layout.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Currently selected value (bindable) |
| `variant` | `"default" \| "card" \| "inline"` | `"default"` | Visual variant of the radio group |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the radio group and spacing |
| `class` | `string` | `undefined` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the entire radio group |

#### Data Attributes

- `data-slot="radio-group"` - Identifies the radio group container
- `data-variant` - Current variant value
- `data-size` - Current size value

### RadioGroupItem

Individual radio button component within the group.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Value for this radio option |
| `variant` | `"default" \| "card" \| "inline"` | `"default"` | Visual variant matching the group |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the radio button |
| `id` | `string` | `undefined` | HTML id for label association |
| `disabled` | `boolean` | `false` | Disable this specific option |
| `class` | `string` | `undefined` | Additional CSS classes |

#### Data Attributes

- `data-slot="radio-group-item"` - Identifies the radio item
- `data-variant` - Current variant value
- `data-size` - Current size value

## Variants

### Default (`default`)
- Standard vertical layout with basic styling
- Clean, minimal appearance
- Best for most form applications
- Grid layout with consistent spacing

### Card (`card`)
- Card-style layout with background and border
- Enhanced visual grouping
- Perfect for options with descriptions or complex content
- Rounded corners and padding for emphasis

### Inline (`inline`)
- Horizontal layout for compact options
- Grid flow in columns with auto-sizing
- Ideal for simple choices that fit on one line
- Increased horizontal spacing between options

## Sizes

### Small (`sm`)
- Compact radio buttons (12px / size-3)
- Reduced spacing (8px / gap-2)
- Smaller indicator icon (6px / size-1.5)
- Best for dense layouts or secondary options

### Default (`default`)
- Standard radio buttons (16px / size-4)
- Normal spacing (12px / gap-3)
- Standard indicator icon (8px / size-2)
- Recommended for most use cases

### Large (`lg`)
- Larger radio buttons (20px / size-5)
- Increased spacing (16px / gap-4)
- Bigger indicator icon (10px / size-2.5)
- Better for accessibility and touch interfaces

## Examples

### Settings Panel

```svelte
<script>
  let notifications = $state("email");
</script>

<div class="space-y-4">
  <h3 class="text-lg font-medium">Notification Preferences</h3>
  <RadioGroup bind:value={notifications}>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="email" id="notify-email" />
      <label for="notify-email" class="text-sm font-medium cursor-pointer">
        📧 Email notifications
      </label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="push" id="notify-push" />
      <label for="notify-push" class="text-sm font-medium cursor-pointer">
        📱 Push notifications
      </label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="none" id="notify-none" />
      <label for="notify-none" class="text-sm font-medium cursor-pointer">
        🔕 No notifications
      </label>
    </div>
  </RadioGroup>
</div>
```

### Pricing Plans

```svelte
<script>
  let selectedPlan = $state("pro");
</script>

<div class="space-y-4">
  <h3 class="text-lg font-medium">Choose Your Plan</h3>
  <RadioGroup variant="card" bind:value={selectedPlan}>
    <div class="flex items-center space-x-3 p-4">
      <RadioGroupItem variant="card" value="free" id="plan-free" />
      <div class="flex-1">
        <label for="plan-free" class="text-sm font-medium cursor-pointer">
          Free Plan
        </label>
        <p class="text-xs text-muted-foreground">$0/month</p>
        <p class="text-xs text-muted-foreground">Basic features</p>
      </div>
    </div>
    <div class="flex items-center space-x-3 p-4">
      <RadioGroupItem variant="card" value="pro" id="plan-pro" />
      <div class="flex-1">
        <label for="plan-pro" class="text-sm font-medium cursor-pointer">
          Pro Plan
        </label>
        <p class="text-xs text-muted-foreground">$10/month</p>
        <p class="text-xs text-muted-foreground">Advanced features</p>
      </div>
    </div>
  </RadioGroup>
</div>
```

### Quick Toggle Options

```svelte
<script>
  let viewMode = $state("list");
</script>

<div class="space-y-2">
  <label class="text-sm font-medium">View Mode</label>
  <RadioGroup variant="inline" bind:value={viewMode}>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="list" id="view-list" />
      <label for="view-list" class="text-sm cursor-pointer">📋 List</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="grid" id="view-grid" />
      <label for="view-grid" class="text-sm cursor-pointer">⚏ Grid</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="table" id="view-table" />
      <label for="view-table" class="text-sm cursor-pointer">📊 Table</label>
    </div>
  </RadioGroup>
</div>
```

## Styling

The component uses Tailwind CSS and tailwind-variants for styling. Customization options:

### CSS Variables

```css
:root {
  --color-primary: /* indicator fill color */
  --color-border-input: /* border color */
  --color-ring: /* focus ring color */
  --color-card: /* card variant background */
  --color-border: /* card variant border */
}
```

### Custom Variants

```typescript
// Extend the radioGroupVariants
export const customRadioGroupVariants = tv({
  extend: radioGroupVariants,
  variants: {
    variant: {
      ...radioGroupVariants.variants.variant,
      custom: "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl",
    },
  },
});
```

## Accessibility

- **Keyboard Navigation**: Arrow keys navigate between options, Space selects
- **Screen Readers**: Proper ARIA roles and state announcements
- **Focus Management**: Clear visual focus indicators
- **Labels**: Proper label association with `for` attributes
- **Group Context**: Radio group role provides context to assistive technology

### ARIA Attributes

- `role="radiogroup"` - Applied to the RadioGroup container
- `role="radio"` - Applied to each RadioGroupItem
- `aria-checked` - Indicates the checked state
- `aria-disabled` - Indicates disabled state

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to/from the radio group |
| `Arrow Keys` | Navigate between radio options |
| `Space` | Select the focused radio option |

## TypeScript

```typescript
import type { 
  RadioGroupVariant, 
  RadioGroupSize,
  RadioGroupItemVariant,
  RadioGroupItemSize 
} from "$core/components/ui/radio-group";

// Group variant and size types
type GroupVariant = RadioGroupVariant; // "default" | "card" | "inline"
type GroupSize = RadioGroupSize; // "sm" | "default" | "lg"

// Item variant and size types
type ItemVariant = RadioGroupItemVariant; // "default" | "card" | "inline"  
type ItemSize = RadioGroupItemSize; // "sm" | "default" | "lg"
```

## Best Practices

1. **Consistent Variants**: Use the same variant for both RadioGroup and RadioGroupItem
2. **Proper Labels**: Always provide clear, descriptive labels
3. **Logical Grouping**: Group related options together
4. **Default Selection**: Consider providing a sensible default value
5. **Validation**: Implement proper form validation for required fields
6. **Accessibility**: Test with keyboard navigation and screen readers

## Form Integration

```svelte
<script>
  import { RadioGroup, RadioGroupItem } from "$core/components/ui/radio-group";
  
  let formData = $state({
    plan: "free",
    billing: "monthly",
    notifications: "email"
  });
  
  function handleSubmit() {
    console.log("Form data:", formData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-6">
    <div>
      <label class="text-sm font-medium">Plan</label>
      <RadioGroup variant="card" bind:value={formData.plan}>
        <!-- options -->
      </RadioGroup>
    </div>
    
    <div>
      <label class="text-sm font-medium">Billing</label>
      <RadioGroup variant="inline" bind:value={formData.billing}>
        <!-- options -->
      </RadioGroup>
    </div>
    
    <button type="submit">Submit</button>
  </div>
</form>
```

## Common Patterns

### Multi-step Forms
Use card variant for plan selection and preference screens.

### Settings Panels  
Use default variant for configuration options.

### Quick Filters
Use inline variant for view modes and sorting options.

### Surveys
Use appropriate variant based on question complexity.