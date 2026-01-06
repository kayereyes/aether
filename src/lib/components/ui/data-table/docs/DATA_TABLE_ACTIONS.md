# DataTableActions Component

A flexible, reusable actions dropdown menu for data table rows.

## Features

- ✅ Generic and customizable
- ✅ Built-in copy to clipboard action
- ✅ Support for custom actions
- ✅ Full snippet support for complete customization
- ✅ TypeScript typed

## Basic Usage

### Simple Copy Action

```svelte
<script lang="ts">
  import { DataTableActions } from "$lib/components/ui/data-table";
</script>

{@render renderComponent(DataTableActions, { 
  id: row.original.id 
})}
```

### Custom Label

```svelte
{@render renderComponent(DataTableActions, {
  id: row.original.id,
  copyLabel: "Copy payment ID"
})}
```

### Custom Actions

```svelte
{@render renderComponent(DataTableActions, {
  id: row.original.id,
  copyLabel: "Copy ID",
  actions: [
    {
      label: "View details",
      onclick: () => handleView(row.original)
    },
    {
      label: "Edit",
      onclick: () => handleEdit(row.original)
    },
    {
      label: "Delete",
      onclick: () => handleDelete(row.original.id),
      disabled: !canDelete
    }
  ]
})}
```

### Without Copy Action

```svelte
{@render renderComponent(DataTableActions, {
  showCopy: false,
  actions: [
    {
      label: "View",
      onclick: () => console.log("View")
    },
    {
      label: "Edit",
      onclick: () => console.log("Edit")
    }
  ]
})}
```

### Using Row Data

```svelte
{@render renderComponent(DataTableActions, {
  row: row.original,  // Will use row.id for copy action
  actions: [
    {
      label: "View customer",
      onclick: () => viewCustomer(row.original)
    }
  ]
})}
```

### Complete Custom Content

```svelte
{@render renderComponent(DataTableActions, {}, {
  children: () => `
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item onclick={handleAction1}>Custom Action 1</DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleAction2}>Custom Action 2</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Label>Danger Zone</DropdownMenu.Label>
      <DropdownMenu.Item onclick={handleDelete} class="text-destructive">
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  `
})}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `row` | `any` | `undefined` | The entire row data object (will use `row.id` for copy) |
| `id` | `string` | `undefined` | Specific ID to copy |
| `actions` | `ActionItem[]` | `[]` | Array of custom action items |
| `copyLabel` | `string` | `"Copy ID"` | Label for the copy action |
| `showCopy` | `boolean` | `true` | Whether to show the copy action |
| `children` | `Snippet` | `undefined` | Custom content snippet for complete control |

### ActionItem Type

```ts
type ActionItem = {
  label: string;
  onclick?: () => void;
  disabled?: boolean;
};
```

## Examples in Column Definitions

### Payment Table

```ts
{
  id: "actions",
  enableHiding: false,
  cell: ({ row }: CellContext<Payment, unknown>) =>
    renderComponent(DataTableActions, {
      id: row.original.id,
      copyLabel: "Copy payment ID",
      actions: [
        {
          label: "View details",
          onclick: () => viewPayment(row.original.id)
        },
        {
          label: "Refund",
          onclick: () => handleRefund(row.original),
          disabled: row.original.status === "Failed"
        }
      ]
    })
}
```

### User Table

```ts
{
  id: "actions",
  cell: ({ row }: CellContext<User, unknown>) =>
    renderComponent(DataTableActions, {
      row: row.original,
      copyLabel: "Copy user ID",
      actions: [
        {
          label: "View profile",
          onclick: () => router.push(`/users/${row.original.id}`)
        },
        {
          label: "Send email",
          onclick: () => openEmailModal(row.original.email)
        },
        {
          label: "Deactivate",
          onclick: () => deactivateUser(row.original.id),
          disabled: row.original.role === "Admin"
        }
      ]
    })
}
```

### Product Table

```ts
{
  id: "actions",
  cell: ({ row }: CellContext<Product, unknown>) =>
    renderComponent(DataTableActions, {
      id: row.original.sku,
      copyLabel: "Copy SKU",
      actions: [
        {
          label: "Edit product",
          onclick: () => editProduct(row.original)
        },
        {
          label: "Duplicate",
          onclick: () => duplicateProduct(row.original)
        },
        {
          label: "Archive",
          onclick: () => archiveProduct(row.original.id)
        }
      ]
    })
}
```

## Customization

The component uses the standard `DropdownMenu` component, so all its styling and behaviors apply. You can:

1. Use the `actions` prop for simple menus
2. Use the `children` snippet for complete control
3. Combine both approaches for complex scenarios

## Accessibility

- Includes `sr-only` text for screen readers
- Keyboard navigable
- ARIA labels supported through dropdown menu component
