# Input Component

A flexible input component with support for variants, sizes, and input masking functionality.

## Features

- **5 Visual Variants**: default, outline, filled, ghost, underline
- **3 Sizes**: sm, default, lg
- **Input Masking**: Built-in patterns for phone, SSN, credit card, date, and time
- **Custom Masks**: Support for custom mask patterns
- **Full TypeScript Support**: Complete type safety and IntelliSense
- **Accessibility**: ARIA attributes and proper focus management
- **File Input Support**: Special styling for file inputs

## Usage

### Basic Usage

```svelte
<script>
  import { Input } from "$core/components/ui/input";
  
  let value = $state("");
</script>

<Input bind:value placeholder="Enter text..." />
```

### Variants

```svelte
<Input variant="default" placeholder="Default input" />
<Input variant="outline" placeholder="Outline input" />
<Input variant="filled" placeholder="Filled input" />
<Input variant="ghost" placeholder="Ghost input" />
<Input variant="underline" placeholder="Underline input" />
```

### Sizes

```svelte
<Input size="sm" placeholder="Small input" />
<Input size="default" placeholder="Default input" />
<Input size="lg" placeholder="Large input" />
```

### Input Masking

#### Built-in Masks

```svelte
<Input mask="phone" bind:value={phoneValue} />
<Input mask="ssn" bind:value={ssnValue} />
<Input mask="creditCard" bind:value={cardValue} />
<Input mask="date" bind:value={dateValue} />
<Input mask="time" bind:value={timeValue} />
```

#### Custom Masks

You can create custom masks for specialized input formats:

```svelte
<script>
  import { Input, createMask } from "$core/components/ui/input";
  
  // Manual custom mask
  const licensePlateMask = {
    pattern: /^[A-Z0-9\-]*$/,
    placeholder: "ABC-1234",
    maxLength: 8,
    transform: (value) => {
      const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return clean.length > 3 ? `${clean.slice(0, 3)}-${clean.slice(3)}` : clean;
    }
  };
  
  // Using the helper function
  const productCodeMask = createMask({
    format: 'dx',  // d=digits, x=alphanumeric, a=letters, s=space
    placeholder: 'PROD-12345',
    separators: [{ position: 4, char: '-' }],
    case: 'upper'
  });
  
  let plateValue = $state("");
  let productValue = $state("");
</script>

<Input mask={licensePlateMask} bind:value={plateValue} />
<Input mask={productCodeMask} bind:value={productValue} />
```

#### Advanced Custom Mask Examples

**Hex Color Input:**
```svelte
<Input 
  mask={{
    pattern: /^#[A-Fa-f0-9]*$/,
    placeholder: '#FF5733',
    maxLength: 7,
    transform: (value) => {
      let clean = value.replace(/[^A-Fa-f0-9]/g, '');
      if (clean.length > 0 && !value.startsWith('#')) {
        clean = '#' + clean;
      }
      return clean.toUpperCase();
    }
  }}
/>
```

**MAC Address Input:**
```svelte
<Input 
  mask={{
    pattern: /^[A-Fa-f0-9:]*$/,
    placeholder: 'AA:BB:CC:DD:EE:FF',
    maxLength: 17,
    transform: (value) => {
      const clean = value.toUpperCase().replace(/[^A-F0-9]/g, '');
      return clean.replace(/(.{2})(?=.)/g, '$1:');
    }
  }}
/>
```

**IP Address Input:**
```svelte
<Input 
  mask={{
    pattern: /^[\d\.]*$/,
    placeholder: '192.168.1.1',
    maxLength: 15,
    transform: (value) => {
      const parts = value.split('.');
      return parts.map(part => {
        const num = parseInt(part);
        return isNaN(num) || num > 255 ? part.slice(0, -1) : part;
      }).join('.');
    }
  }}
/>
```

### Combining Props

```svelte
<Input 
  variant="outline"
  size="lg" 
  mask="phone"
  bind:value={phoneValue}
/>
```

## Available Masks

| Mask Type | Pattern | Placeholder | Description |
|-----------|---------|-------------|-------------|
| `phone` | Numbers, spaces, dashes, parentheses | `(555) 123-4567` | US phone number format |
| `ssn` | Numbers and dashes | `123-45-6789` | Social Security Number |
| `creditCard` | Numbers and spaces | `1234 5678 9012 3456` | Credit card number with spaces |
| `date` | Numbers and slashes | `MM/DD/YYYY` | Date in MM/DD/YYYY format |
| `time` | Numbers and colons | `HH:MM` | Time in 24-hour format |

## Mask Configuration

Custom masks can be defined with the following structure:

```typescript
type MaskPattern = {
  pattern: RegExp;           // Regex to validate input characters
  placeholder: string;       // Placeholder text showing expected format
  transform?: (value: string) => string; // Optional formatting function
  maxLength?: number;        // Optional maximum input length
};
```

### Helper Function

The `createMask` helper function simplifies creating common mask patterns:

```typescript
import { createMask } from "$core/components/ui/input";

const customMask = createMask({
  format: 'dx',              // d=digits, a=letters, x=alphanumeric, s=space
  placeholder: 'A1B-234',
  separators: [              // Optional separators
    { position: 3, char: '-' }
  ],
  case: 'upper'             // 'upper', 'lower', or 'none'
});
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "filled" \| "ghost" \| "underline"` | `"default"` | Visual variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Input size |
| `mask` | `MaskType \| MaskPattern` | `undefined` | Input mask configuration |
| `value` | `string` | `""` | Input value (bindable) |
| `placeholder` | `string` | `""` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `type` | `string` | `"text"` | HTML input type |
| `class` | `string` | `""` | Additional CSS classes |

## Styling

The component uses Tailwind CSS classes and supports customization through the `class` prop. Each variant has its own styling approach:

- **Default**: Standard border with focus ring
- **Outline**: Thicker border with hover effects
- **Filled**: Background color instead of border
- **Ghost**: Minimal styling, transparent background
- **Underline**: Bottom border only, clean minimal look

## Accessibility

- Proper ARIA attributes for form controls
- Focus management and keyboard navigation
- Screen reader compatible
- High contrast support

## Examples

See the [Input Demo](/input-demo) page for interactive examples of all variants, sizes, and mask functionality.