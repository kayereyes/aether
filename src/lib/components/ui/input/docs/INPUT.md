# Input Component

A flexible input component with built-in support for InputGroup addons through props, eliminating the need for manual InputGroup wrapping.

## Features

- 🎯 **Prop-Based Addons**: Add icons, text, and buttons via simple props
- 🔄 **Auto-Wrapping**: Automatically wraps with InputGroup when addons are present
- 🎨 **Full Flexibility**: Supports custom snippets for complete control
- ♿ **Accessible**: Built on top of InputGroup with ARIA support
- 🎭 **Type-Safe**: Full TypeScript support with exported types
- 🔗 **Compatible**: Works with all existing Input features (masks, variants, etc.)

## Installation

The component is part of the input package:

```bash
pnpm dlx shadcn-svelte@latest add input
```

## Basic Usage

```svelte
<script lang="ts">
  import { Input } from '$core/components/ui/input';
  import { Search } from '@lucide/svelte';
</script>

<Input placeholder="Search...">
  {#snippet startIcon()}
    <Search class="size-4" />
  {/snippet}
</Input>
```

## Props Reference

### Base Props

All props from the standard `Input` component are supported:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Bindable input value |
| `type` | `InputType` | `"text"` | Input type |
| `variant` | `InputVariant` | `"default"` | Visual variant |
| `size` | `InputSize` | `"default"` | Input size |
| `mask` | `MaskType \| MaskPattern` | - | Input mask configuration |
| `error` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `placeholder` | `string` | - | Placeholder text |
| `class` | `string` | - | Additional CSS classes |

### Addon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `startIcon` | `Snippet` | - | Icon snippet at the start |
| `endIcon` | `Snippet` | - | Icon snippet at the end |
| `startText` | `string \| Snippet` | - | Text at the start (string or snippet) |
| `endText` | `string \| Snippet` | - | Text at the end (string or snippet) |
| `startButton` | `Snippet` | - | Button snippet at the start |
| `endButton` | `Snippet` | - | Button snippet at the end |
| `startAddon` | `Snippet` | - | Custom start addon (overrides icon/text/button) |
| `endAddon` | `Snippet` | - | Custom end addon (overrides icon/text/button) |
| `startAddonAlign` | `InputGroupAddonAlign` | `"inline-start"` | Start addon alignment |
| `endAddonAlign` | `InputGroupAddonAlign` | `"inline-end"` | End addon alignment |
| `groupClassName` | `string` | - | Additional classes for InputGroup wrapper |

## Examples

### Icon Addons

```svelte
<script lang="ts">
  import { Input } from '$core/components/ui/input';
  import { Search, Mail, Lock } from '@lucide/svelte';
</script>

<!-- Start Icon -->
<Input placeholder="Search...">
  {#snippet startIcon()}
    <Search class="size-4" />
  {/snippet}
</Input>

<!-- End Icon -->
<Input type="email" placeholder="Enter email">
  {#snippet endIcon()}
    <Mail class="size-4" />
  {/snippet}
</Input>

<!-- Both Icons -->
<Input placeholder="Secure input">
  {#snippet startIcon()}
    <Lock class="size-4" />
  {/snippet}
  {#snippet endIcon()}
    <span class="text-xs text-muted-foreground">Encrypted</span>
  {/snippet}
</Input>
```

### Text Addons

Text addons can be simple strings or custom snippets.

```svelte
<!-- String Text -->
<Input
  placeholder="example.com"
  startText="https://"
  endText=".com"
/>

<!-- Currency -->
<Input
  type="number"
  placeholder="0.00"
  startText="$"
  endText="USD"
/>

<!-- Email Domain -->
<Input
  placeholder="username"
  endText="@company.com"
/>

<!-- Custom Text Snippet -->
<Input placeholder="Enter value">
  {#snippet startText()}
    <span class="font-bold text-primary">$</span>
  {/snippet}
</Input>
```

### Button Addons

Add interactive buttons for actions.

```svelte
<script lang="ts">
  import { Input } from '$core/components/ui/input';
  import { InputGroupButton } from '$core/components/ui/input-group';
  import { Search, Copy, Send, Eye, EyeOff } from '@lucide/svelte';

  let showPassword = $state(false);
  let searchValue = $state('');
</script>

<!-- Search Button -->
<Input placeholder="Search...">
  {#snippet endButton()}
    <InputGroupButton size="xs">
      Search
    </InputGroupButton>
  {/snippet}
</Input>

<!-- Icon Button -->
<Input readonly value="https://example.com">
  {#snippet endButton()}
    <InputGroupButton size="icon-xs" onclick={() => navigator.clipboard.writeText('https://example.com')}>
      <Copy class="size-4" />
    </InputGroupButton>
  {/snippet}
</Input>

<!-- Password Toggle -->
<Input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password"
>
  {#snippet endButton()}
    <InputGroupButton
      size="icon-xs"
      variant="ghost"
      onclick={() => showPassword = !showPassword}
    >
      {#if showPassword}
        <EyeOff class="size-4" />
      {:else}
        <Eye class="size-4" />
      {/if}
    </InputGroupButton>
  {/snippet}
</Input>

<!-- Clear Button (Conditional) -->
<Input bind:value={searchValue} placeholder="Type to search...">
  {#if searchValue}
    {#snippet endButton()}
      <InputGroupButton
        size="icon-xs"
        variant="ghost"
        onclick={() => searchValue = ''}
      >
        <span class="text-lg">×</span>
      </InputGroupButton>
    {/snippet}
  {/if}
</Input>
```

### Combined Addons

Mix icons, text, and buttons for rich interfaces.

```svelte
<!-- Price Input with Icon and Text -->
<Input
  type="number"
  placeholder="0.00"
>
  {#snippet startIcon()}
    <DollarSign class="size-4" />
  {/snippet}
  {#snippet endText()}
    <span class="text-xs text-muted-foreground">USD</span>
  {/snippet}
</Input>

<!-- Secure Input with Multiple Elements -->
<Input
  type="number"
  placeholder="0.00"
  startText="$"
>
  {#snippet endIcon()}
    <Lock class="size-4 text-green-600" />
  {/snippet}
  {#snippet endText()}
    <span class="text-xs text-muted-foreground">Secure</span>
  {/snippet}
</Input>

<!-- API Key with Copy -->
<Input value="sk_live_..." readonly>
  {#snippet startIcon()}
    <Lock class="size-4" />
  {/snippet}
  {#snippet endButton()}
    <InputGroupButton size="icon-xs">
      <Copy class="size-4" />
    </InputGroupButton>
  {/snippet}
</Input>
```

### Custom Addons

For complete control, use `startAddon` and `endAddon` which override individual icon/text/button props.

```svelte
<!-- Custom Start Addon -->
<Input placeholder="Enter value">
  {#snippet startAddon()}
    <div class="flex items-center gap-2">
      <div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
      <span class="text-xs font-medium">Live</span>
    </div>
  {/snippet}
</Input>

<!-- Custom End Addon with Multiple Buttons -->
<Input placeholder="Type your message...">
  {#snippet endAddon()}
    <div class="flex items-center gap-1">
      <InputGroupButton size="icon-xs" variant="ghost">
        <span>😀</span>
      </InputGroupButton>
      <InputGroupButton size="icon-xs" variant="default">
        <Send class="size-4" />
      </InputGroupButton>
    </div>
  {/snippet}
</Input>
```

### States

All input states work seamlessly with addons.

```svelte
<!-- Error State -->
<Input
  value="invalid@"
  error={true}
  placeholder="Enter email"
>
  {#snippet startIcon()}
    <Mail class="size-4" />
  {/snippet}
</Input>

<!-- Disabled -->
<Input
  value="Disabled"
  disabled
  startText="$"
/>

<!-- Readonly -->
<Input
  value="Read-only"
  readonly
>
  {#snippet endIcon()}
    <Lock class="size-4" />
  {/snippet}
</Input>
```

### With Input Masks

Combine with input mask functionality.

```svelte
<script lang="ts">
  import { Input } from '$core/components/ui/input';
  import { Phone, CreditCard } from '@lucide/svelte';
</script>

<!-- Phone Number with Icon -->
<Input
  mask="phone"
  placeholder="(555) 555-5555"
>
  {#snippet startIcon()}
    <Phone class="size-4" />
  {/snippet}
</Input>

<!-- Credit Card with Icon -->
<Input
  mask="creditCard"
  placeholder="1234 5678 9012 3456"
>
  {#snippet startIcon()}
    <CreditCard class="size-4" />
  {/snippet}
</Input>
```

### Alignment Options

Control addon alignment using the alignment props.

```svelte
<!-- Block Start (Above Input) -->
<Input
  placeholder="Enter message"
  startAddonAlign="block-start"
>
  {#snippet startAddon()}
    <div class="flex justify-between w-full px-3 py-2 border-b">
      <span class="text-sm font-medium">Message</span>
      <span class="text-xs text-muted-foreground">0/500</span>
    </div>
  {/snippet}
</Input>

<!-- Block End (Below Input) -->
<Input
  placeholder="Type here..."
  endAddonAlign="block-end"
>
  {#snippet endAddon()}
    <div class="flex justify-between w-full px-3 py-2 border-t">
      <span class="text-xs text-muted-foreground">Markdown supported</span>
      <InputGroupButton size="xs">Send</InputGroupButton>
    </div>
  {/snippet}
</Input>
```

## When to Use

**Use Input with addon props when:**
- You need a simple input with icons, text, or buttons
- You want cleaner, more declarative code
- You're building forms with many similar inputs
- You need quick prototyping

**Use InputGroup directly when:**
- You need complex nested structures
- You're using Textarea instead of Input
- You need very custom layout control
- You want to use other InputGroup-specific components

## Type Exports

```typescript
import type {
  InputWithAddonsProps,
  InputGroupAddonAlign
} from '$core/components/ui/input';
```

## Comparison with InputGroup

### Before (InputGroup)
```svelte
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search class="size-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### After (Input with Addons)
```svelte
<Input placeholder="Search...">
  {#snippet startIcon()}
    <Search class="size-4" />
  {/snippet}
  {#snippet endButton()}
    <InputGroupButton size="xs">Search</InputGroupButton>
  {/snippet}
</Input>
```

## Accessibility

- Maintains all accessibility features from InputGroup
- Proper ARIA attributes for error states
- Focus management handled automatically
- Icon buttons should include `aria-label` attributes

## Best Practices

1. **Use Simple Strings for Text**: When possible, use string props instead of snippets for better performance
2. **Consistent Icon Sizing**: Use `class="size-4"` for icons to maintain consistency
3. **Button Sizes**: Use `size="icon-xs"` for icon-only buttons, `size="xs"` for text buttons
4. **Accessibility**: Always include `aria-label` on icon buttons
5. **Error Handling**: Combine with the `error` prop for validation feedback

## Related Components

- **Input**: Base input component
- **InputGroup**: Manual input group composition
- **Field**: Form field wrapper with label and error messages
