<script lang="ts">
	import { createRawSnippet } from "svelte";
	import {
		type ColumnDef,
		type HeaderContext,
		type CellContext,
		DataTable,
		DataTableCheckbox,
		DataTableColumnHeader,
		DataTableActions,
		renderComponent,
		renderSnippet
	} from "$lib/components/ui/data-table/index.js";

	type Payment = {
		id: string;
		amount: number;
		status: "Pending" | "Processing" | "Success" | "Failed";
		email: string;
	};

	const data: Payment[] = [
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
		},
		{
			id: "u1v2w3x4",
			amount: 290,
			status: "Pending",
			email: "diana.miller@example.com"
		},
		{
			id: "y5z6a7b8",
			amount: 775,
			status: "Processing",
			email: "edward.jones@yahoo.com"
		}
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
</script>

<div class="container mx-auto py-10">
	<h1 class="mb-8 text-3xl font-bold">Data Table Demo</h1>
	<DataTable {data} {columns} filterColumn="email" filterPlaceholder="Filter emails..." />
</div>
