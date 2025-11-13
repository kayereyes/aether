<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const fileInputVariants = tv({
		slots: {
			container: [
				"relative border-2 border-dashed rounded-lg transition-colors cursor-pointer",
				"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
			],
			input: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
			content: "flex flex-col items-center justify-center p-6 text-center",
			icon: "mb-4 text-muted-foreground",
			text: "mb-2 text-sm text-muted-foreground",
			subtext: "text-xs text-muted-foreground",
			fileList: "mt-4 space-y-2",
			fileItem: "flex items-center justify-between p-2 bg-muted rounded text-sm",
			fileName: "flex-1 truncate",
			fileSize: "text-xs text-muted-foreground ml-2",
			removeButton: "ml-2 text-destructive hover:text-destructive/80",
			regularInput: [
				"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm",
				"transition-colors placeholder:text-muted-foreground",
				"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
			],
			regularContainer: "space-y-2"
		},
		variants: {
			variant: {
				default: {
					container: "border-input bg-background hover:border-muted-foreground/50",
					regularInput: "border-input bg-background hover:border-muted-foreground/50",
				},
				filled: {
					container: "border-muted bg-muted/50 hover:bg-muted/80",
					regularInput: "border-transparent bg-muted hover:bg-muted/80",
				},
				ghost: {
					container: "border-transparent bg-transparent hover:bg-muted/50",
					regularInput: "border-transparent bg-transparent hover:bg-muted/50",
				},
			},
			size: {
				sm: {
					container: "min-h-[80px]",
					content: "p-4",
					text: "text-xs",
					subtext: "text-xs",
					regularInput: "h-8 px-2 text-xs",
				},
				default: {
					container: "min-h-[120px]",
					content: "p-6",
					text: "text-sm",
					subtext: "text-xs",
					regularInput: "h-9 px-3 text-sm",
				},
				lg: {
					container: "min-h-[160px]",
					content: "p-8",
					text: "text-base",
					subtext: "text-sm",
					regularInput: "h-10 px-4 text-base",
				},
			},
			state: {
				default: {},
				dragover: {
					container: "border-primary bg-primary/5 border-solid",
				},
				error: {
					container: "border-destructive bg-destructive/5",
				},
				disabled: {
					container: "opacity-50 cursor-not-allowed",
					input: "cursor-not-allowed",
				},
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			state: "default",
		},
	});

	export type FileInputVariant = VariantProps<typeof fileInputVariants>["variant"];
	export type FileInputSize = VariantProps<typeof fileInputVariants>["size"];
	export type FileInputState = VariantProps<typeof fileInputVariants>["state"];
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$core/utils.js";
	import UploadIcon from "@lucide/svelte/icons/upload";
	import XIcon from "@lucide/svelte/icons/x";
	import FileIcon from "@lucide/svelte/icons/file";

	interface Props extends WithElementRef<Omit<HTMLInputAttributes, "type" | "size">> {
		variant?: FileInputVariant;
		size?: FileInputSize;
		files?: FileList | null;
		maxFiles?: number;
		maxSize?: number; // in bytes
		acceptedTypes?: string[];
		showFileList?: boolean;
		dragDropText?: string;
		browseText?: string;
		regularMode?: boolean; // Use regular file input UI instead of drag-and-drop
		placeholder?: string; // For regular mode
		class?: string;
		"data-slot"?: string;
		onFilesChange?: (files: FileList | null) => void;
		onError?: (error: string) => void;
	}

	let {
		ref = $bindable(null),
		variant = "default",
		size = "default",
		files = $bindable(null),
		maxFiles = undefined,
		maxSize = undefined,
		acceptedTypes = undefined,
		showFileList = true,
		dragDropText = "Drop files here or click to browse",
		browseText = "Browse files",
		regularMode = false,
		placeholder = "Choose file...",
		class: className,
		"data-slot": dataSlot = "file-input",
		onFilesChange,
		onError,
		disabled = false,
		...restProps
	}: Props = $props();

	let isDragOver = $state(false);
	let currentState: FileInputState = $state("default");
	let internalFiles = $state<File[]>([]);

	const classes = $derived(fileInputVariants({ variant, size, state: currentState }));

	// Update state based on conditions
	$effect(() => {
		if (disabled) {
			currentState = "disabled";
		} else if (isDragOver && !regularMode) {
			currentState = "dragover";
		} else {
			currentState = "default";
		}
	});

	// Sync internal files with FileList
	$effect(() => {
		if (files) {
			internalFiles = Array.from(files);
		} else {
			internalFiles = [];
		}
	});

	function validateFiles(fileList: FileList): string | null {
		const filesArray = Array.from(fileList);
		
		// Check max files
		if (maxFiles && filesArray.length > maxFiles) {
			return `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`;
		}

		// Check file types
		if (acceptedTypes && acceptedTypes.length > 0) {
			for (const file of filesArray) {
				const isValidType = acceptedTypes.some(type => {
					if (type.startsWith('.')) {
						return file.name.toLowerCase().endsWith(type.toLowerCase());
					}
					return file.type.match(type.replace('*', '.*'));
				});
				
				if (!isValidType) {
					return `File type not accepted: ${file.name}`;
				}
			}
		}

		// Check file sizes
		if (maxSize) {
			for (const file of filesArray) {
				if (file.size > maxSize) {
					return `File too large: ${file.name} (${formatFileSize(file.size)} > ${formatFileSize(maxSize)})`;
				}
			}
		}

		return null;
	}

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const selectedFiles = input.files;
		
		if (!selectedFiles) return;

		const error = validateFiles(selectedFiles);
		if (error) {
			onError?.(error);
			currentState = "error";
			setTimeout(() => { currentState = "default"; }, 3000);
			return;
		}

		files = selectedFiles;
		onFilesChange?.(selectedFiles);
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (!disabled && !regularMode) {
			isDragOver = true;
		}
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		if (regularMode) return;
		
		// Only set isDragOver to false if we're leaving the container entirely
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = event.clientX;
		const y = event.clientY;
		
		if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
			isDragOver = false;
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
		
		if (disabled || regularMode) return;

		const droppedFiles = event.dataTransfer?.files;
		if (!droppedFiles) return;

		const error = validateFiles(droppedFiles);
		if (error) {
			onError?.(error);
			currentState = "error";
			setTimeout(() => { currentState = "default"; }, 3000);
			return;
		}

		files = droppedFiles;
		onFilesChange?.(droppedFiles);
	}

	function removeFile(index: number) {
		const updatedFiles = internalFiles.filter((_, i) => i !== index);
		
		// Create a new FileList-like object
		const dataTransfer = new DataTransfer();
		updatedFiles.forEach(file => dataTransfer.items.add(file));
		
		files = dataTransfer.files;
		onFilesChange?.(dataTransfer.files);
	}

	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	// Get accepted file types for input accept attribute
	const acceptAttribute = $derived(() => {
		if (!acceptedTypes) return undefined;
		return acceptedTypes.join(',');
	});
</script>

{#if regularMode}
	<!-- Regular File Input Mode -->
	<div class={cn(classes.regularContainer(), className)} data-slot={dataSlot}>
		<input
			bind:this={ref}
			type="file"
			class={cn(classes.regularInput())}
			accept={acceptAttribute()}
			multiple={maxFiles !== 1}
			{disabled}
			{placeholder}
			onchange={handleFileChange}
			{...restProps}
		/>
		
		{#if acceptedTypes || maxSize || maxFiles}
			<div class="text-xs text-muted-foreground">
				{#if acceptedTypes}
					Accepted: {acceptedTypes.join(', ')} • 
				{/if}
				{#if maxSize}
					Max size: {formatFileSize(maxSize)} • 
				{/if}
				{#if maxFiles && maxFiles > 1}
					Max files: {maxFiles}
				{:else if maxFiles === 1}
					Single file only
				{/if}
			</div>
		{/if}
		
		{#if currentState === "error"}
			<div class="text-xs text-destructive">
				Error uploading files
			</div>
		{/if}
	</div>
{:else}
	<!-- Drag and Drop Mode -->
	<div 
		class={cn(classes.container(), className)}
		data-slot={dataSlot}
		role="button"
		tabindex="0"
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
	>
		<input
			bind:this={ref}
			type="file"
			class={classes.input()}
			accept={acceptAttribute()}
			multiple={maxFiles !== 1}
			{disabled}
			onchange={handleFileChange}
			{...restProps}
		/>
		
		<div class={classes.content()}>
			<UploadIcon class={cn(classes.icon(), size === "sm" ? "size-6" : size === "lg" ? "size-10" : "size-8")} />
			
			{#if currentState === "dragover"}
				<div class={classes.text()}>
					Drop files here
				</div>
			{:else if currentState === "error"}
				<div class={cn(classes.text(), "text-destructive")}>
					Error uploading files
				</div>
			{:else}
				<div class={classes.text()}>
					{dragDropText}
				</div>
				<div class={classes.subtext()}>
					{browseText}
					{#if acceptedTypes}
						• {acceptedTypes.join(', ')}
					{/if}
					{#if maxSize}
						• Max {formatFileSize(maxSize)}
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if showFileList && internalFiles.length > 0}
	<div class={classes.fileList()}>
		{#each internalFiles as file, index (file.name + file.size)}
			<div class={classes.fileItem()}>
				<FileIcon class="size-4 mr-2 text-muted-foreground" />
				<span class={classes.fileName()}>{file.name}</span>
				<span class={classes.fileSize()}>{formatFileSize(file.size)}</span>
				<button
					type="button"
					class={classes.removeButton()}
					onclick={() => removeFile(index)}
					aria-label="Remove {file.name}"
				>
					<XIcon class="size-4" />
				</button>
			</div>
		{/each}
	</div>
{/if}