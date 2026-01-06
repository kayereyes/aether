export { default as FlexRender } from "./flex-render.svelte";
export { default as DataTable } from "./data-table-root.svelte";
export { default as DataTableCheckbox } from "./data-table-checkbox.svelte";
export { default as DataTableColumnHeader } from "./data-table-column-header.svelte";
export { default as DataTableActions } from "./data-table-actions.svelte";
export { renderComponent, renderSnippet } from "./render-helpers.js";
export { createSvelteTable } from "./data-table.svelte.js";

// Re-export commonly used types from @tanstack/table-core
export type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	RowSelectionState,
	SortingState,
	VisibilityState,
	Table,
	Column,
	Row,
	Cell,
	HeaderContext,
	CellContext,
} from "@tanstack/table-core";

// Re-export commonly used functions from @tanstack/table-core
export {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/table-core";
