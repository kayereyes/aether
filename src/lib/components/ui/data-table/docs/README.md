# Data Table

A powerful, flexible data table component built with TanStack Table and Svelte 5.

## Features

- ✅ **Sorting** - Click column headers to sort
- ✅ **Filtering** - Search and filter data
- ✅ **Pagination** - Navigate through large datasets
- ✅ **Row Selection** - Select individual or all rows
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Customizable** - Full control over rendering

## Installation

The DataTable component is already included in the UI library. It uses `@tanstack/table-core` for table functionality.

## Basic Usage

```svelte
<script lang="ts">
  import { DataTable, type ColumnDef } from "$lib/components/ui/data-table";
  
  type User = {
    id: string;
    name: string;
    email: string;
  };
  
  const data: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];
  
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];
</script>

<DataTable {data} {columns} />
```

## Components

### DataTable

The main table component that handles all table logic and rendering.

**Props:**
- `data: TData[]` - Array of data objects
- `columns: ColumnDef<TData, TValue>[]` - Column definitions
- `filterColumn?: string` - Column to filter (default: "email")
- `filterPlaceholder?: string` - Filter input placeholder (default: "Filter...")

### DataTableCheckbox

A checkbox component for row selection.

**Props:**
- `checked?: boolean` - Checkbox state
- `onCheckedChange?: (checked: boolean) => void` - Change handler
- All standard checkbox props

### DataTableColumnHeader

A sortable column header with an arrow icon.

**Props:**
- `title: string` - Header text
- `onclick?: () => void` - Click handler for sorting
- All standard button props

## Column Definitions

### Basic Column

```ts
{
  accessorKey: "name",
  header: "Name",
}
```

### Sortable Column

```ts
import { DataTableColumnHeader, renderComponent } from "$lib/components/ui/data-table";

{
  accessorKey: "email",
  header: ({ column }) =>
    renderComponent(DataTableColumnHeader, {
      title: "Email",
      onclick: column.getToggleSortingHandler(),
    }),
}
```

### Custom Cell Rendering

```ts
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table";

{
  accessorKey: "amount",
  header: "Amount",
  cell: ({ row }) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    
    const cellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
      const { amount } = getAmount();
      const formatted = formatter.format(amount);
      return {
        render: () => `<div class="font-medium">${formatted}</div>`,
      };
    });
    
    return renderSnippet(cellSnippet, { amount: row.original.amount });
  },
}
```

### Selection Column

```ts
import { DataTableCheckbox, renderComponent } from "$lib/components/ui/data-table";

{
  id: "select",
  header: ({ table }) =>
    renderComponent(DataTableCheckbox, {
      checked: table.getIsAllPageRowsSelected(),
      indeterminate:
        table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
      onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all",
    }),
  cell: ({ row }) =>
    renderComponent(DataTableCheckbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(!!value),
      "aria-label": "Select row",
    }),
  enableSorting: false,
  enableHiding: false,
}
```

## Advanced Examples

### Complete Table with All Features

```svelte
<script lang="ts">
  import { createRawSnippet } from "svelte";
  import {
    type ColumnDef,
    type HeaderContext,
    type CellContext,
    DataTable,
    DataTableCheckbox,
    DataTableColumnHeader,
    renderComponent,
    renderSnippet,
  } from "$lib/components/ui/data-table";

  type Payment = {
    id: string;
    amount: number;
    status: "Pending" | "Processing" | "Success" | "Failed";
    email: string;
  };

  const data: Payment[] = [
    // ... your data
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }: HeaderContext<Payment, unknown>) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all",
        }),
      cell: ({ row }: CellContext<Payment, unknown>) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row",
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: CellContext<Payment, unknown>) => {
        const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
          const { status } = getStatus();
          return {
            render: () => `<div class="capitalize">${status}</div>`,
          };
        });
        return renderSnippet(statusSnippet, {
          status: row.original.status,
        });
      },
    },
    {
      accessorKey: "email",
      header: ({ column }: HeaderContext<Payment, unknown>) =>
        renderComponent(DataTableColumnHeader, {
          title: "Email",
          onclick: column.getToggleSortingHandler(),
        }),
      cell: ({ row }: CellContext<Payment, unknown>) => {
        const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
          const { email } = getEmail();
          return {
            render: () => `<div class="lowercase">${email}</div>`,
          };
        });
        return renderSnippet(emailSnippet, {
          email: row.original.email,
        });
      },
    },
    {
      accessorKey: "amount",
      header: () => {
        const headerSnippet = createRawSnippet(() => ({
          render: () => `<div class="text-end">Amount</div>`,
        }));
        return renderSnippet(headerSnippet);
      },
      cell: ({ row }: CellContext<Payment, unknown>) => {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        const cellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
          const { amount } = getAmount();
          const formatted = formatter.format(amount);
          return {
            render: () => `<div class="text-end font-medium">${formatted}</div>`,
          };
        });
        return renderSnippet(cellSnippet, {
          amount: row.original.amount,
        });
      },
    },
  ];
</script>

<DataTable 
  {data} 
  {columns} 
  filterColumn="email" 
  filterPlaceholder="Filter emails..." 
/>
```

## Customization

### Custom Filter Column

Change which column is filtered:

```svelte
<DataTable 
  {data} 
  {columns} 
  filterColumn="status" 
  filterPlaceholder="Filter by status..." 
/>
```

### Custom Styling

The DataTable uses Tailwind CSS classes. You can customize the appearance by:

1. Modifying the component classes directly
2. Using the `class` prop on sub-components
3. Overriding in your global CSS

## TypeScript Support

All components are fully typed. Use the exported types:

```ts
import type {
  ColumnDef,
  HeaderContext,
  CellContext,
  PaginationState,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "$lib/components/ui/data-table";
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | Required | Array of data objects |
| `columns` | `ColumnDef<TData, TValue>[]` | Required | Column definitions |
| `filterColumn` | `string` | `"email"` | Column to filter |
| `filterPlaceholder` | `string` | `"Filter..."` | Filter input placeholder |

### Column Definition

| Property | Type | Description |
|----------|------|-------------|
| `accessorKey` | `string` | Key to access data in row object |
| `header` | `string \| ((context: HeaderContext) => any)` | Header text or render function |
| `cell` | `(context: CellContext) => any` | Cell render function |
| `enableSorting` | `boolean` | Enable sorting for this column |
| `enableHiding` | `boolean` | Allow hiding this column |
| `id` | `string` | Unique column identifier |

## Demo

Visit `/data-table-demo` to see a live demonstration with sample payment data.

## Resources

- [TanStack Table Documentation](https://tanstack.com/table/v8/docs/introduction)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
