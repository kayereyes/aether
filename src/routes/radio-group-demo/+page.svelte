<script lang="ts">
  import { RadioGroup } from "$core/components/ui/radio";
  import type { RadioGroupOption } from "$core/components/ui/radio";
  import * as Field from "$core/components/ui/field";
  import { Badge } from "$core/components/ui/badge";
  import { Button } from "$core/components/ui/button";

  let selectedPlan = $state("pro");
  let notificationPreference = $state("email");
  let themeSelection = $state("auto");
  let deliveryMethod = $state("standard");
  let paymentMethod = $state("credit");
  let errorSelection = $state("");
  
  // Error states
  let planError = $derived(!selectedPlan);

  // Sample options
  const basicOptions: RadioGroupOption[] = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];

  const planOptions: RadioGroupOption[] = [
    { id: "free", label: "Free", value: "free", description: "$0/month - Basic features" },
    { id: "pro", label: "Pro", value: "pro", description: "$29/month - Advanced features" },
    { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month - Full features" },
  ];

  const notificationOptions: RadioGroupOption[] = [
    { id: "email", label: "Email", value: "email", description: "Receive notifications via email" },
    { id: "sms", label: "SMS", value: "sms", description: "Receive notifications via text message" },
    { id: "push", label: "Push", value: "push", description: "Receive push notifications" },
    { id: "none", label: "None", value: "none", description: "Don't receive notifications", disabled: true },
  ];

  const themeOptions: RadioGroupOption[] = [
    { id: "light", label: "Light", value: "light" },
    { id: "dark", label: "Dark", value: "dark" },
    { id: "auto", label: "Auto", value: "auto" },
  ];
</script>

<svelte:head>
  <title>Radio Group Demo - Aether UI</title>
</svelte:head>

<div class="container mx-auto p-8 space-y-12">
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">Radio Group Demo</h1>
    <p class="text-lg text-muted-foreground">
      Demonstration of the RadioGroup component with different variants, sizes, and practical use cases.
    </p>
  </div>

  <!-- Basic Usage -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Basic Usage</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <RadioGroup
        options={basicOptions}
        bind:value={themeSelection}
        label="Choose an option"
        description="Select one option from the list"
      />

      <RadioGroup
        options={themeOptions}
        bind:value={themeSelection}
        label="Theme Selection"
        description="Choose your preferred theme"
        onValueChange={(val) => console.log('Theme changed:', val)}
      />
    </div>
  </section>

  <!-- With Descriptions -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">With Descriptions</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <RadioGroup
        options={planOptions}
        bind:value={selectedPlan}
        label="Subscription Plan"
        description="Select your pricing tier"
        radioSize="lg"
      />

      <RadioGroup
        options={notificationOptions}
        bind:value={notificationPreference}
        label="Notification Preferences"
        description="How would you like to be notified?"
      />
    </div>
  </section>

  <!-- Orientations -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Orientations</h2>
    
    <div class="grid gap-8">
      <div>
        <h3 class="text-lg font-medium mb-4">Vertical (Default)</h3>
        <RadioGroup
          options={basicOptions}
          bind:value={themeSelection}
          orientation="vertical"
          label="Vertical Layout"
        />
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Horizontal</h3>
        <RadioGroup
          options={themeOptions}
          bind:value={themeSelection}
          orientation="horizontal"
          label="Horizontal Layout"
        />
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Sizes</h2>
    
    <div class="grid gap-8 md:grid-cols-3">
      <RadioGroup
        options={basicOptions.slice(0, 2)}
        value="option1"
        radioSize="sm"
        label="Small Radio"
      />

      <RadioGroup
        options={basicOptions.slice(0, 2)}
        value="option1"
        radioSize="default"
        label="Default Radio"
      />

      <RadioGroup
        options={basicOptions.slice(0, 2)}
        value="option1"
        radioSize="lg"
        label="Large Radio"
      />
    </div>
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Variants</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <RadioGroup
        options={basicOptions}
        value="option1"
        variant="default"
        label="Default Variant"
      />

      <RadioGroup
        options={basicOptions}
        value="option1"
        variant="destructive"
        label="Destructive Variant"
      />

      <RadioGroup
        options={basicOptions}
        value="option1"
        variant="success"
        label="Success Variant"
      />

      <RadioGroup
        options={basicOptions}
        value="option1"
        variant="warning"
        label="Warning Variant"
      />
    </div>
  </section>

  <!-- Error States -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Error States</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <RadioGroup
        options={basicOptions}
        bind:value={errorSelection}
        label="Required Selection"
        description="Please select an option"
        error={!errorSelection}
        required
      />

      <RadioGroup
        options={planOptions}
        value=""
        label="Plan Selection (Error)"
        description="Selection required"
        error={true}
        radioSize="lg"
      />
    </div>
  </section>

  <!-- With Field Component -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">With Field Component</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <Field.Field
        label="Choose Your Plan"
        description="Select the plan that fits your needs"
        required
      >
        <RadioGroup
          options={planOptions}
          bind:value={selectedPlan}
        />
      </Field.Field>

      <Field.Field
        label="Notification Preference"
        description="How would you like to be notified?"
        error={!notificationPreference ? "Please select a notification method" : undefined}
      >
        <RadioGroup
          options={notificationOptions}
          bind:value={notificationPreference}
          error={!notificationPreference}
        />
      </Field.Field>
    </div>
    
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">
        Selected Plan: <Badge variant="secondary">{selectedPlan}</Badge>
      </p>
      <p class="text-sm text-muted-foreground">
        Notification: <Badge variant="outline">{notificationPreference}</Badge>
      </p>
    </div>
  </section>

  <!-- Interactive Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Interactive Examples</h2>
    
    <div class="grid gap-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Theme Selection</h3>
        <p class="text-sm text-muted-foreground">Current theme: <Badge variant="outline">{themeSelection}</Badge></p>
        <RadioGroup
          options={themeOptions}
          bind:value={themeSelection}
          orientation="horizontal"
        />
      </div>
    </div>
  </section>

  <!-- Disabled State -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Disabled State</h2>
    
    <RadioGroup
      options={basicOptions}
      value="option2"
      label="Disabled Radio Group"
      description="This group is disabled"
      disabled
    />
  </section>
</div>