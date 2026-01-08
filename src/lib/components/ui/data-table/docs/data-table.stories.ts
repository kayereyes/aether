import type { Meta, StoryObj } from "@storybook/sveltekit";
import { createRawSnippet } from "svelte";
import DataTable from "../data-table-root.svelte";
import DataTableCheckbox from "../data-table-checkbox.svelte";
import DataTableColumnHeader from "../data-table-column-header.svelte";
import DataTableActions from "../data-table-actions.svelte";
import type { ColumnDef, HeaderContext, CellContext } from "../index.js";
import { renderComponent, renderSnippet } from "../index.js";

type Payment = {
	id: string;
	amount: number;
	status: "Pending" | "Processing" | "Success" | "Failed";
	email: string;
};

const sampleData: Payment[] = [
	{
		id: "m5gr84i9",
		amount: 316,
		status: "Success",
		email: "ken99@yahoo.com"
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "Success",
		email: "Abe45@gmail.com"
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "Processing",
		email: "Monserrat44@gmail.com"
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "Success",
		email: "Silas22@gmail.com"
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "Failed",
		email: "carmella@hotmail.com"
	},
	{
		id: "a1b2c3d4",
		amount: 450,
		status: "Pending",
		email: "john.doe@example.com"
	},
	{
		id: "e5f6g7h8",
		amount: 920,
		status: "Success",
		email: "jane.smith@gmail.com"
	},
	{
		id: "i9j0k1l2",
		amount: 350,
		status: "Processing",
		email: "bob.wilson@yahoo.com"
	},
	{
		id: "m3n4o5p6",
		amount: 680,
		status: "Failed",
		email: "alice.brown@hotmail.com"
	},
	{
		id: "q7r8s9t0",
		amount: 530,
		status: "Success",
		email: "charlie.davis@gmail.com"
	}
];

const createColumns = (): ColumnDef<Payment>[] => [
	{
		id: "select",
		header: ({ table }: HeaderContext<Payment, unknown>) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate:
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all"
			}),
		cell: ({ row }: CellContext<Payment, unknown>) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				"aria-label": "Select row"
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }: CellContext<Payment, unknown>) => {
			const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
				const { status } = getStatus();
				return {
					render: () => `<div class="capitalize">${status}</div>`
				};
			});
			return renderSnippet(statusSnippet, {
				status: row.original.status
			});
		}
	},
	{
		accessorKey: "email",
		header: ({ column }: HeaderContext<Payment, unknown>) =>
			renderComponent(DataTableColumnHeader, {
				title: "Email",
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }: CellContext<Payment, unknown>) => {
			const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
				const { email } = getEmail();
				return {
					render: () => `<div class="lowercase">${email}</div>`
				};
			});
			return renderSnippet(emailSnippet, {
				email: row.original.email
			});
		}
	},
	{
		accessorKey: "amount",
		header: () => {
			const amountHeaderSnippet = createRawSnippet(() => {
				return {
					render: () => `<div class="text-end">Amount</div>`
				};
			});
			return renderSnippet(amountHeaderSnippet);
		},
		cell: ({ row }: CellContext<Payment, unknown>) => {
			const formatter = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD"
			});
			const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
				const { amount } = getAmount();
				const formatted = formatter.format(amount);
				return {
					render: () => `<div class="text-end font-medium">${formatted}</div>`
				};
			});
			return renderSnippet(amountCellSnippet, {
				amount: row.original.amount
			});
		}
	},
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
						onclick: () => console.log("View details for", row.original.id)
					},
					{
						label: "Edit payment",
						onclick: () => console.log("Edit payment", row.original.id)
					},
					{
						label: "Delete",
						onclick: () => console.log("Delete payment", row.original.id)
					}
				]
			})
	}
];

const meta = {
	title: "UI/DataTable",
	component: DataTable,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "striped", "bordered", "compact"],
			description: "Visual style variant"
		},
		selectionMode: {
			control: "select",
			options: ["multi", "single", "none"],
			description: "Row selection mode"
		},
		pageSize: {
			control: "number",
			description: "Number of rows per page"
		},
		showFilter: {
			control: "boolean",
			description: "Show filter input"
		},
		showColumnToggle: {
			control: "boolean",
			description: "Show column visibility toggle"
		},
		showPagination: {
			control: "boolean",
			description: "Show pagination controls"
		},
		showPageSizeSelector: {
			control: "boolean",
			description: "Show page size selector"
		},
		showRowSelection: {
			control: "boolean",
			description: "Show row selection count"
		},
		expandable: {
			control: "boolean",
			description: "Enable row expansion"
		},
		filterColumn: {
			control: "text",
			description: "The column to filter by"
		},
		filterPlaceholder: {
			control: "text",
			description: "Placeholder text for the filter input"
		}
	}
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		filterColumn: "email",
		filterPlaceholder: "Filter emails...",
		pageSize: 5,
		variant: "default",
		selectionMode: "multi"
	}
};

export const Striped: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		variant: "striped",
		pageSize: 5
	}
};

export const Bordered: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		variant: "bordered",
		pageSize: 5
	}
};

export const Compact: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		variant: "compact",
		pageSize: 8
	}
};

export const SingleSelect: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		selectionMode: "single",
		pageSize: 5
	}
};

export const NoSelection: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		selectionMode: "none",
		pageSize: 5
	}
};

export const CustomPageSize: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		pageSize: 3,
		pageSizeOptions: [3, 5, 10, 20],
		filterColumn: "email",
		filterPlaceholder: "Filter emails..."
	}
};

export const Minimal: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		showFilter: false,
		showColumnToggle: false,
		showRowSelection: false,
		pageSize: 5
	}
};

export const NoPagination: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		showPagination: false,
		pageSize: 100
	}
};

export const StatusFilter: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		filterColumn: "status",
		filterPlaceholder: "Filter by status...",
		pageSize: 5
	}
};
