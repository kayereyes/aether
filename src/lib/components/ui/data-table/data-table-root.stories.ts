import type { Meta, StoryObj } from "@storybook/sveltekit";
import { createRawSnippet } from "svelte";
import DataTable from "./data-table-root.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import DataTableColumnHeader from "./data-table-column-header.svelte";
import type { ColumnDef, HeaderContext, CellContext } from "./index.js";
import { renderComponent, renderSnippet } from "./index.js";

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
		cell: ({ row }: CellContext<Payment, unknown>) => {
			const actionsSnippet = createRawSnippet<[{ id: string }]>((getId) => {
				const { id } = getId();
				return {
					render: () => `
						<div class="text-center">
							<button 
								class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
								onclick="navigator.clipboard.writeText('${id}')"
								title="Copy ID"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
							</button>
						</div>
					`
				};
			});
			return renderSnippet(actionsSnippet, { id: row.original.id });
		}
	}
];

const meta = {
	title: "UI/DataTable",
	component: DataTable,
	tags: ["autodocs"],
	argTypes: {
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
		filterPlaceholder: "Filter emails..."
	}
};

export const WithFewerRows: Story = {
	args: {
		data: sampleData.slice(0, 5),
		columns: createColumns() as any,
		filterColumn: "email",
		filterPlaceholder: "Filter emails..."
	}
};

export const StatusFilter: Story = {
	args: {
		data: sampleData,
		columns: createColumns() as any,
		filterColumn: "status",
		filterPlaceholder: "Filter by status..."
	}
};
