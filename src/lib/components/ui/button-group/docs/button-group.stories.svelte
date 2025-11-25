<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "$core/components/ui/button-group";
  import { Button } from "$core/components/ui/button";
  import { fn } from 'storybook/test';
  import type { ButtonGroupVariant } from "$core/components/ui/button-group/button-group.svelte";

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['bg', 'ghost'],
        description: 'Visual variant of the button group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'bg' },
        },
      },
      orientation: {
        control: { type: 'select' },
        options: ['horizontal', 'vertical'],
        description: 'Layout orientation of the button group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'horizontal' },
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
          component: 'A flexible button group component that supports different variants and orientations. Can contain buttons, text labels, and separators.',
        },
        extractArgTypes: false,
      },
    },
    args: {
      variant: 'bg',
      orientation: 'horizontal',
    },
  });
</script>

<Story name="Default">
  <ButtonGroup variant="bg" orientation="horizontal">
    <Button variant="outline">First</Button>
    <Button variant="outline">Second</Button>
    <Button variant="outline">Third</Button>
  </ButtonGroup>
</Story>

<Story name="Ghost Variant">
  <div class="space-y-4">
    <div>
      <h3 class="mb-2 text-sm font-medium">Background Variant</h3>
      <ButtonGroup variant="bg">
        <Button variant="outline">Copy</Button>
        <Button variant="outline">Paste</Button>
        <Button variant="outline">Cut</Button>
      </ButtonGroup>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-medium">Ghost Variant</h3>
      <ButtonGroup variant="ghost">
        <Button variant="ghost">Copy</Button>
        <Button variant="ghost">Paste</Button>
        <Button variant="ghost">Cut</Button>
      </ButtonGroup>
    </div>
  </div>
</Story>

<Story name="With Text Labels">
  <ButtonGroup variant="bg">
    <ButtonGroupText variant="bg">Actions</ButtonGroupText>
    <Button variant="outline">Save</Button>
    <Button variant="outline">Delete</Button>
    <Button variant="outline">Cancel</Button>
  </ButtonGroup>
</Story>

<Story name="With Separators">
  <ButtonGroup variant="bg">
    <Button variant="outline">File</Button>
    <ButtonGroupSeparator />
    <Button variant="outline">Edit</Button>
    <Button variant="outline">View</Button>
    <ButtonGroupSeparator />
    <Button variant="outline">Help</Button>
  </ButtonGroup>
</Story>

<Story name="Vertical Orientation">
  <ButtonGroup orientation="vertical" variant="bg">
    <Button variant="outline">Top</Button>
    <Button variant="outline">Middle</Button>
    <Button variant="outline">Bottom</Button>
  </ButtonGroup>
</Story>

<Story name="Complex Example">
  <div class="space-y-4">
    <div>
      <h3 class="mb-2 text-sm font-medium">Toolbar with Text and Separators</h3>
      <ButtonGroup variant="bg">
        <ButtonGroupText variant="bg">Format</ButtonGroupText>
        <Button variant="outline" size="sm">Bold</Button>
        <Button variant="outline" size="sm">Italic</Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm">Align Left</Button>
        <Button variant="outline" size="sm">Center</Button>
        <Button variant="outline" size="sm">Align Right</Button>
      </ButtonGroup>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-medium">Ghost Variant with Icons</h3>
      <ButtonGroup variant="ghost">
        <ButtonGroupText variant="ghost">Tools</ButtonGroupText>
        <Button variant="ghost" size="sm">🔧</Button>
        <Button variant="ghost" size="sm">⚙️</Button>
        <Button variant="ghost" size="sm">🔍</Button>
      </ButtonGroup>
    </div>
  </div>
</Story>

<Story name="Mixed Button Variants">
  <ButtonGroup variant="bg">
    <Button variant="default">Primary</Button>
    <Button variant="outline">Secondary</Button>
    <Button variant="ghost">Tertiary</Button>
  </ButtonGroup>
</Story>