<script lang="ts">
	import { FileInput, type FileInputVariant, type FileInputSize } from "$core/components/ui/file-input/index.js";
	
	let basicFiles = $state<FileList | null>(null);
	let imageFiles = $state<FileList | null>(null);
	let documentFiles = $state<FileList | null>(null);
	let singleFile = $state<FileList | null>(null);
	
	let errorMessage = $state<string>("");
	
	const variants: FileInputVariant[] = ["default", "filled", "ghost"];
	const sizes: FileInputSize[] = ["sm", "default", "lg"];
	
	function handleError(error: string) {
		errorMessage = error;
		setTimeout(() => { errorMessage = ""; }, 5000);
	}
	
	function handleFilesChange(files: FileList | null) {
		console.log("Files changed:", files ? Array.from(files).map(f => f.name) : "none");
	}
</script>

<div class="container mx-auto py-10 space-y-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">File Input Component Demo</h1>
		<p class="text-muted-foreground">
			Drag and drop file upload component with validation and multiple variants.
		</p>
	</div>

	{#if errorMessage}
		<div class="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
			{errorMessage}
		</div>
	{/if}

	<!-- UI Modes -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">UI Modes</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">Drag & Drop Mode (Default)</label>
				<FileInput 
					bind:files={basicFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Regular File Input Mode</label>
				<FileInput 
					regularMode={true}
					bind:files={basicFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>
		</div>
	</section>

	<!-- Basic Variants -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Variants (Drag & Drop)</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each variants as variant}
				<div class="space-y-2">
					<label class="text-sm font-medium capitalize">{variant}</label>
					<FileInput 
						{variant}
						bind:files={basicFiles}
						onFilesChange={handleFilesChange}
						onError={handleError}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- Regular Mode Variants -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Variants (Regular Mode)</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each variants as variant}
				<div class="space-y-2">
					<label class="text-sm font-medium capitalize">{variant}</label>
					<FileInput 
						{variant}
						regularMode={true}
						placeholder="Choose files..."
						bind:files={basicFiles}
						onFilesChange={handleFilesChange}
						onError={handleError}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- Sizes -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes (Drag & Drop)</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each sizes as size}
				<div class="space-y-2">
					<label class="text-sm font-medium capitalize">{size}</label>
					<FileInput 
						{size}
						bind:files={basicFiles}
						onFilesChange={handleFilesChange}
						onError={handleError}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- Regular Mode Sizes -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes (Regular Mode)</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each sizes as size}
				<div class="space-y-2">
					<label class="text-sm font-medium capitalize">{size}</label>
					<FileInput 
						{size}
						regularMode={true}
						placeholder="Choose files..."
						bind:files={basicFiles}
						onFilesChange={handleFilesChange}
						onError={handleError}
					/>
				</div>
			{/each}
		</div>
	</section>

	<!-- File Type Restrictions -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">File Type Restrictions</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">Images Only</label>
				<FileInput 
					variant="filled"
					acceptedTypes={["image/*"]}
					maxSize={2 * 1024 * 1024}
					bind:files={imageFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
				<p class="text-xs text-muted-foreground">
					Only image files, max 2MB each
				</p>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Documents</label>
				<FileInput 
					variant="filled"
					acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
					maxFiles={3}
					bind:files={documentFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
				<p class="text-xs text-muted-foreground">
					PDF, Word, or text files only, max 3 files
				</p>
			</div>
		</div>
	</section>

	<!-- Single File Upload -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Single File Upload</h2>
		<div class="max-w-md">
			<label class="text-sm font-medium">Profile Picture</label>
			<FileInput 
				variant="ghost"
				size="lg"
				maxFiles={1}
				acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
				maxSize={1024 * 1024}
				dragDropText="Drop your profile picture here"
				browseText="Choose profile picture"
				bind:files={singleFile}
				onFilesChange={handleFilesChange}
				onError={handleError}
			/>
			<p class="text-xs text-muted-foreground mt-2">
				JPEG, PNG, or WebP only, max 1MB
			</p>
		</div>
	</section>

	<!-- States -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">States</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">Disabled</label>
				<FileInput 
					disabled
					dragDropText="File upload is disabled"
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">No File List</label>
				<FileInput 
					showFileList={false}
					dragDropText="Files won't be shown below"
					bind:files={basicFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>
		</div>
	</section>

	<!-- Combined Examples -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Advanced Examples</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">Large Filled Upload (Multiple)</label>
				<FileInput 
					variant="filled"
					size="lg"
					maxFiles={5}
					maxSize={10 * 1024 * 1024}
					dragDropText="Drop up to 5 files here"
					browseText="Browse files (max 10MB each)"
					bind:files={basicFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Small Ghost CSV Upload</label>
				<FileInput 
					variant="ghost"
					size="sm"
					maxFiles={1}
					acceptedTypes={[".csv", ".xlsx"]}
					dragDropText="Drop CSV or Excel file"
					browseText="Choose spreadsheet"
					bind:files={singleFile}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>
		</div>
	</section>

	<!-- Regular Mode Examples -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Regular Mode Examples</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<label class="text-sm font-medium">Resume Upload (Regular)</label>
				<FileInput 
					variant="filled"
					regularMode={true}
					maxFiles={1}
					acceptedTypes={[".pdf", ".doc", ".docx"]}
					maxSize={5 * 1024 * 1024}
					placeholder="Choose your resume..."
					bind:files={singleFile}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Multiple Documents (Regular)</label>
				<FileInput 
					variant="default"
					regularMode={true}
					maxFiles={10}
					acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
					placeholder="Select documents..."
					bind:files={documentFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Image Upload (Regular, Ghost)</label>
				<FileInput 
					variant="ghost"
					size="lg"
					regularMode={true}
					maxFiles={3}
					acceptedTypes={["image/*"]}
					maxSize={2 * 1024 * 1024}
					placeholder="Choose images..."
					bind:files={imageFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>

			<div class="space-y-2">
				<label class="text-sm font-medium">Small Regular Input</label>
				<FileInput 
					variant="default"
					size="sm"
					regularMode={true}
					acceptedTypes={[".txt", ".csv"]}
					placeholder="Select file..."
					showFileList={false}
					bind:files={basicFiles}
					onFilesChange={handleFilesChange}
					onError={handleError}
				/>
			</div>
		</div>
	</section>

	<!-- File Information Display -->
	{#if basicFiles && basicFiles.length > 0}
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Selected Files Information</h2>
			<div class="bg-muted p-4 rounded-lg">
				<h3 class="font-medium mb-2">Files:</h3>
				<ul class="space-y-1 text-sm">
					{#each Array.from(basicFiles) as file}
						<li class="flex justify-between">
							<span>{file.name}</span>
							<span class="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</div>