<script>
  import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";

  let selectedPlan = $state("pro");
  let notificationPreference = $state("email");
  let themeSelection = $state("auto");
  let deliveryMethod = $state("standard");
  let paymentMethod = $state("credit");
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

  <!-- Basic Variants -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Variants</h2>
    
    <div class="grid gap-8 md:grid-cols-3">
      <div>
        <h3 class="text-lg font-medium mb-4">Default Variant</h3>
        <RadioGroup variant="default" value="option1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="option1" id="default-1" />
            <label for="default-1" class="text-sm font-medium leading-none">Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="option2" id="default-2" />
            <label for="default-2" class="text-sm font-medium leading-none">Option 2</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="option3" id="default-3" />
            <label for="default-3" class="text-sm font-medium leading-none">Option 3</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Card Variant</h3>
        <RadioGroup variant="card" value="card1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="card" value="card1" id="card-1" />
            <label for="card-1" class="text-sm font-medium leading-none">Card Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="card" value="card2" id="card-2" />
            <label for="card-2" class="text-sm font-medium leading-none">Card Option 2</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="card" value="card3" id="card-3" />
            <label for="card-3" class="text-sm font-medium leading-none">Card Option 3</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Inline Variant</h3>
        <RadioGroup variant="inline" value="inline1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="inline1" id="inline-1" />
            <label for="inline-1" class="text-sm font-medium leading-none">Inline 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="inline2" id="inline-2" />
            <label for="inline-2" class="text-sm font-medium leading-none">Inline 2</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="inline3" id="inline-3" />
            <label for="inline-3" class="text-sm font-medium leading-none">Inline 3</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Sizes</h2>
    
    <div class="grid gap-8 md:grid-cols-3">
      <div>
        <h3 class="text-lg font-medium mb-4">Small Size</h3>
        <RadioGroup variant="default" size="sm" value="small1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="sm" value="small1" id="small-1" />
            <label for="small-1" class="text-xs font-medium leading-none">Small Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="sm" value="small2" id="small-2" />
            <label for="small-2" class="text-xs font-medium leading-none">Small Option 2</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Default Size</h3>
        <RadioGroup variant="default" size="default" value="medium1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="default" value="medium1" id="medium-1" />
            <label for="medium-1" class="text-sm font-medium leading-none">Medium Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="default" value="medium2" id="medium-2" />
            <label for="medium-2" class="text-sm font-medium leading-none">Medium Option 2</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Large Size</h3>
        <RadioGroup variant="default" size="lg" value="large1">
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="lg" value="large1" id="large-1" />
            <label for="large-1" class="text-base font-medium leading-none">Large Option 1</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" size="lg" value="large2" id="large-2" />
            <label for="large-2" class="text-base font-medium leading-none">Large Option 2</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  </section>

  <!-- Interactive Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Interactive Examples</h2>
    
    <div class="grid gap-8 md:grid-cols-2">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Choose Your Plan</h3>
        <p class="text-sm text-muted-foreground">Selected: <Badge variant="secondary">{selectedPlan}</Badge></p>
        <RadioGroup variant="card" bind:value={selectedPlan}>
          <div class="flex items-center space-x-3 p-4">
            <RadioGroupItem variant="card" value="free" id="plan-free" />
            <div class="grid gap-1.5 leading-none">
              <label for="plan-free" class="text-sm font-medium leading-none cursor-pointer">
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
              <label for="plan-pro" class="text-sm font-medium leading-none cursor-pointer">
                Pro Plan
              </label>
              <p class="text-xs text-muted-foreground">
                Advanced features for professionals
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-4">
            <RadioGroupItem variant="card" value="enterprise" id="plan-enterprise" />
            <div class="grid gap-1.5 leading-none">
              <label for="plan-enterprise" class="text-sm font-medium leading-none cursor-pointer">
                Enterprise Plan
              </label>
              <p class="text-xs text-muted-foreground">
                Full features for large teams
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">Notification Settings</h3>
        <p class="text-sm text-muted-foreground">Current: <Badge variant="outline">{notificationPreference}</Badge></p>
        <RadioGroup variant="default" bind:value={notificationPreference}>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="email" id="notify-email" />
            <label for="notify-email" class="text-sm font-medium leading-none cursor-pointer">📧 Email notifications</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="push" id="notify-push" />
            <label for="notify-push" class="text-sm font-medium leading-none cursor-pointer">📱 Push notifications</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="sms" id="notify-sms" />
            <label for="notify-sms" class="text-sm font-medium leading-none cursor-pointer">💬 SMS notifications</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="default" value="none" id="notify-none" />
            <label for="notify-none" class="text-sm font-medium leading-none cursor-pointer">🔕 No notifications</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  </section>

  <!-- Advanced Examples -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Advanced Use Cases</h2>
    
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-4">Theme Selection (Inline)</h3>
        <p class="text-sm text-muted-foreground mb-4">Theme: <Badge variant="ghost">{themeSelection}</Badge></p>
        <RadioGroup variant="inline" bind:value={themeSelection}>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="light" id="theme-light" />
            <label for="theme-light" class="text-sm font-medium leading-none cursor-pointer">☀️ Light</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="dark" id="theme-dark" />
            <label for="theme-dark" class="text-sm font-medium leading-none cursor-pointer">🌙 Dark</label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem variant="inline" value="auto" id="theme-auto" />
            <label for="theme-auto" class="text-sm font-medium leading-none cursor-pointer">🔄 Auto</label>
          </div>
        </RadioGroup>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <h3 class="text-lg font-medium mb-4">Delivery Method</h3>
          <p class="text-sm text-muted-foreground mb-4">Method: <Badge variant="success">{deliveryMethod}</Badge></p>
          <RadioGroup variant="default" size="sm" bind:value={deliveryMethod}>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="sm" value="standard" id="delivery-standard" />
              <label for="delivery-standard" class="text-sm font-medium leading-none cursor-pointer">🚚 Standard (5-7 days)</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="sm" value="express" id="delivery-express" />
              <label for="delivery-express" class="text-sm font-medium leading-none cursor-pointer">⚡ Express (2-3 days)</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="sm" value="overnight" id="delivery-overnight" />
              <label for="delivery-overnight" class="text-sm font-medium leading-none cursor-pointer">🚀 Overnight</label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Payment Method</h3>
          <p class="text-sm text-muted-foreground mb-4">Payment: <Badge variant="info">{paymentMethod}</Badge></p>
          <RadioGroup variant="default" size="lg" bind:value={paymentMethod}>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="lg" value="credit" id="payment-credit" />
              <label for="payment-credit" class="text-base font-medium leading-none cursor-pointer">💳 Credit Card</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="lg" value="paypal" id="payment-paypal" />
              <label for="payment-paypal" class="text-base font-medium leading-none cursor-pointer">🅿️ PayPal</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="default" size="lg" value="bank" id="payment-bank" />
              <label for="payment-bank" class="text-base font-medium leading-none cursor-pointer">🏦 Bank Transfer</label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  </section>

  <!-- Form Example -->
  <section class="space-y-6">
    <h2 class="text-2xl font-semibold">Form Integration</h2>
    
    <div class="bg-muted/50 p-6 rounded-lg space-y-6">
      <h3 class="text-lg font-medium">Order Configuration</h3>
      
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <h4 class="font-medium mb-3">Plan</h4>
          <RadioGroup variant="card" bind:value={selectedPlan}>
            <div class="flex items-center space-x-3 p-3">
              <RadioGroupItem variant="card" value="free" id="form-plan-free" />
              <div>
                <label for="form-plan-free" class="text-sm font-medium cursor-pointer">Free</label>
                <p class="text-xs text-muted-foreground">$0/month</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3">
              <RadioGroupItem variant="card" value="pro" id="form-plan-pro" />
              <div>
                <label for="form-plan-pro" class="text-sm font-medium cursor-pointer">Pro</label>
                <p class="text-xs text-muted-foreground">$10/month</p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h4 class="font-medium mb-3">Billing Cycle</h4>
          <RadioGroup variant="inline" value="monthly">
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="inline" value="monthly" id="billing-monthly" />
              <label for="billing-monthly" class="text-sm font-medium cursor-pointer">Monthly</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem variant="inline" value="yearly" id="billing-yearly" />
              <label for="billing-yearly" class="text-sm font-medium cursor-pointer">Yearly</label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div class="flex gap-4">
        <Button variant="default">Continue</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  </section>

  <!-- Usage Notes -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Usage Guidelines</h2>
    <div class="bg-muted/50 p-6 rounded-lg space-y-4">
      <div>
        <h3 class="font-medium">Variants</h3>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code>default</code> - Standard vertical layout with basic styling</li>
          <li><code>card</code> - Card-style layout with background and border</li>
          <li><code>inline</code> - Horizontal layout for compact options</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium">Sizes</h3>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code>sm</code> - Small radio buttons and tighter spacing</li>
          <li><code>default</code> - Standard size for most use cases</li>
          <li><code>lg</code> - Larger radio buttons for better accessibility</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium">Best Practices</h3>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Use the card variant for options with descriptions or complex content</li>
          <li>Use the inline variant for simple, short options that fit horizontally</li>
          <li>Always provide proper labels and consider accessibility</li>
          <li>Group related options together logically</li>
        </ul>
      </div>
    </div>
  </section>
</div>