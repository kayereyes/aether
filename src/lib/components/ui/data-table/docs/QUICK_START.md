# DataTable Quick Start Guide

## 1. Import the Component

```svelte
<script lang="ts">
  import { DataTable, type ColumnDef } from "$lib/components/ui/data-table";
</script>
```

## 2. Define Your Data Type

```ts
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
```

## 3. Create Your Data

```ts
const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  // ... more data
];
```

## 4. Define Columns

```ts
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
```

## 5. Render the Table

```svelte
<DataTable 
  data={users} 
  {columns}
  filterColumn="name"
  filterPlaceholder="Search by name..." 
/>
```

## That's it! 🎉

Your table now has:
- Pagination
- Sorting (click headers)
- Search filtering
- Column visibility toggle

## Add Row Selection

```ts
import { 
  DataTable, 
  DataTableCheckbox,
  type ColumnDef,
  type HeaderContext,
  type CellContext,
  renderComponent 
} from "$lib/components/ui/data-table";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }: HeaderContext<User, unknown>) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
      }),
    cell: ({ row }: CellContext<User, unknown>) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
      }),
  },
  // ... other columns
];
```

## Add Sortable Columns

```ts
import { DataTableColumnHeader, renderComponent } from "$lib/components/ui/data-table";

{
  accessorKey: "name",
  header: ({ column }: HeaderContext<User, unknown>) =>
    renderComponent(DataTableColumnHeader, {
      title: "Name",
      onclick: column.getToggleSortingHandler(),
    }),
}
```

## Custom Cell Rendering

```ts
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table";

{
  accessorKey: "role",
  header: "Role",
  cell: ({ row }: CellContext<User, unknown>) => {
    const roleSnippet = createRawSnippet<[{ role: string }]>((getRole) => {
      const { role } = getRole();
      const color = role === "Admin" ? "text-red-500" : "text-blue-500";
      return {
        render: () => `<span class="font-semibold ${color}">${role}</span>`,
      };
    });
    return renderSnippet(roleSnippet, { role: row.original.role });
  },
}
```

## Full Example

See `/data-table-demo` for a complete working example with all features!
