# Input OTP Component

An accessible one-time password (OTP) input component with copy/paste functionality, built on top of Bits UI's PinInput.

## Features

- **3 Visual Variants**: default, outline, underline
- **3 Sizes**: sm, default, lg
- **Flexible Grouping**: Split digits into groups with automatic separators
- **Pattern Validation**: Restrict input to specific character patterns
- **Copy/Paste Support**: Full clipboard functionality
- **Complete Callback**: Get notified when all slots are filled
- **Error State**: Visual feedback for validation errors
- **Full TypeScript Support**: Complete type safety and IntelliSense
- **Accessibility**: Built on accessible Bits UI primitives

## Usage

### Basic Usage

```svelte
<script>
  import { InputOTP } from "$core/components/ui/input-otp";
  
  let value = $state("");
</script>

<InputOTP maxlength={6} groups={2} bind:value />
```

### Variants

```svelte
<InputOTP maxlength={6} variant="default" groups={2} />
<InputOTP maxlength={6} variant="outline" groups={2} />
<InputOTP maxlength={6} variant="underline" groups={2} />
```

### Sizes

```svelte
<InputOTP maxlength={6} size="sm" groups={1} />
<InputOTP maxlength={6} size="default" groups={1} />
<InputOTP maxlength={6} size="lg" groups={1} />
```

### Groups Configuration

Control how the OTP digits are grouped:

```svelte
<!-- Single group (no separator) -->
<InputOTP maxlength={6} groups={1} />

<!-- Two groups: 3-3 -->
<InputOTP maxlength={6} groups={2} />

<!-- Three groups: 2-2-2 -->
<InputOTP maxlength={6} groups={3} />

<!-- Hide separator even with multiple groups -->
<InputOTP maxlength={6} groups={2} showSeparator={false} />
```

### Pattern Validation

Restrict input to specific character patterns using regex strings:

```svelte
<script>
  import { InputOTP } from "$core/components/ui/input-otp";
  import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<!-- Digits only (0-9) -->
<InputOTP maxlength={6} pattern={REGEXP_ONLY_DIGITS} />

<!-- Alphanumeric (letters and numbers) -->
<InputOTP maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} />

<!-- Custom pattern -->
<InputOTP maxlength={6} pattern="^[A-Z0-9]+$" />
```

### Complete Callback

Get notified when all OTP slots are filled:

```svelte
<script>
  import { InputOTP } from "$core/components/ui/input-otp";
  
  let otpValue = $state("");
  
  function handleComplete(value: string) {
    console.log("OTP Complete:", value);
    // Trigger verification...
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  onComplete={handleComplete}
/>
```

### Error State

Display validation errors with visual feedback:

```svelte
<script>
  import { InputOTP } from "$core/components/ui/input-otp";
  
  let otpValue = $state("");
  let hasError = $state(false);
  
  function handleErrorChange(error: boolean) {
    console.log("Error state:", error);
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  error={hasError}
  onError={handleErrorChange}
/>
{#if hasError}
  <p class="text-destructive text-sm mt-1">Invalid verification code</p>
{/if}
```

### Disabled State

```svelte
<InputOTP maxlength={6} groups={2} disabled />
```

### Value Change Callback

Track every value change:

```svelte
<script>
  import { InputOTP } from "$core/components/ui/input-otp";
  
  let otpValue = $state("");
  
  function handleValueChange(value: string) {
    console.log("Current value:", value);
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  onValueChange={handleValueChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxlength` | `number` | **required** | Maximum length of the OTP input |
| `value` | `string` | `""` | Current OTP value (bindable) |
| `variant` | `"default" \| "outline" \| "underline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of input slots |
| `groups` | `number` | `1` | Number of groups to split the input into |
| `showSeparator` | `boolean` | `true` (when groups > 1) | Show separator between groups |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `pattern` | `string` | `undefined` | Regex pattern string to validate input |
| `error` | `boolean` | `false` | Whether the input has an error state |
| `onComplete` | `(value: string) => void` | `undefined` | Callback when all slots are filled |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when value changes |
| `onError` | `(hasError: boolean) => void` | `undefined` | Callback when error state changes |
| `class` | `string` | `undefined` | Additional CSS classes |

## Primitive Components

For more control, you can use the primitive components directly:

```svelte
<script>
  import * as InputOTP from "$core/components/ui/input-otp";
</script>

<InputOTP.Root maxlength={6} variant="default" size="default">
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Primitive Components

| Component | Description |
|-----------|-------------|
| `InputOTP.Root` | The root container that provides context |
| `InputOTP.Group` | Groups slots together visually |
| `InputOTP.Slot` | Individual input slot for a single character |
| `InputOTP.Separator` | Visual separator between groups |

## Accessibility

- Built on [Bits UI PinInput](https://bits-ui.com/docs/components/pin-input) accessible primitives
- Proper focus management and keyboard navigation
- Supports `aria-invalid` for error states
- Screen reader friendly

## Pattern Constants

Bits UI provides helpful pattern constants:

```svelte
<script>
  import { 
    REGEXP_ONLY_DIGITS,           // "^\\d+$"
    REGEXP_ONLY_CHARS,            // "^[a-zA-Z]+$"
    REGEXP_ONLY_DIGITS_AND_CHARS  // "^[a-zA-Z0-9]+$"
  } from "bits-ui";
</script>
```
