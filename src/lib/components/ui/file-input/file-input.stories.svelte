<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInput from "./file-input.svelte";

	const { Story } = defineMeta({
		title: 'Components/FileInput',
		component: FileInput,
		tags: ['autodocs'],
		argTypes: {
			// Main props we want to control
			variant: {
				control: { type: 'select' },
				options: ['default', 'filled', 'ghost'],
				description: 'Visual variant of the file input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'default', 'lg'],
				description: 'Size of the file input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			regularMode: {
				control: { type: 'boolean' },
				description: 'Use traditional file input UI instead of drag-and-drop',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the file input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			maxFiles: {
				control: { type: 'number' },
				description: 'Maximum number of files allowed',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (unlimited)' },
				},
			},
			maxSize: {
				control: { type: 'number' },
				description: 'Maximum file size in bytes',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (no limit)' },
				},
			},
			acceptedTypes: {
				control: { type: 'object' },
				description: 'Array of accepted file types',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: 'undefined (all types)' },
				},
			},
			showFileList: {
				control: { type: 'boolean' },
				description: 'Whether to show the list of selected files',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text for regular mode',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Choose files...' },
				},
			},
			dragDropText: {
				control: { type: 'text' },
				description: 'Text shown in drag-and-drop area',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Drop files here or click to browse' },
				},
			},
			browseText: {
				control: { type: 'text' },
				description: 'Text for the browse button',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Browse files' },
				},
			},
			
			// Hide unwanted props from controls
			class: {
				control: false,
				table: { disable: true },
			},
			id: {
				control: false,
				table: { disable: true },
			},
			name: {
				control: false,
				table: { disable: true },
			},
			onFileChange: {
				control: false,
				table: { disable: true },
			},
			onFileRemove: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			variant: 'default',
			size: 'default',
			regularMode: false,
			disabled: false,
			showFileList: true,
			dragDropText: 'Drop files here or click to browse',
			browseText: 'Browse files',
			placeholder: 'Choose files...',
		},
		
		parameters: {
			layout: 'centered',
			docs: {
				extractArgTypes: false, // Disable automatic prop extraction
			},
		},
	});


</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Disabled" args={{ disabled: true, dragDropText: 'File upload disabled' }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: 'default' }} />
<Story name="Filled Variant" args={{ variant: 'filled' }} />
<Story name="Ghost Variant" args={{ variant: 'ghost' }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: 'sm' }} />
<Story name="Default Size" args={{ size: 'default' }} />
<Story name="Large Size" args={{ size: 'lg' }} />

<!-- Regular Mode -->
<Story name="Regular Mode Default" args={{ regularMode: true, placeholder: 'Choose files...' }} />
<Story name="Regular Mode Filled" args={{ regularMode: true, variant: 'filled', placeholder: 'Choose files...' }} />
<Story name="Regular Mode Ghost" args={{ regularMode: true, variant: 'ghost', placeholder: 'Choose files...' }} />

<!-- File Constraints -->
<Story name="Single File Only" args={{ 
  maxFiles: 1, 
  dragDropText: 'Drop a single file here or click to browse' 
}} />
<Story name="Images Only" args={{ 
  acceptedTypes: ['image/*'], 
  maxSize: 2097152,
  dragDropText: 'Drop images here (Max 2MB)'
}} />
<Story name="Documents Only" args={{ 
  acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'], 
  maxFiles: 3,
  dragDropText: 'Drop up to 3 documents here'
}} />
<Story name="PDF Only Single" args={{ 
  acceptedTypes: ['.pdf'], 
  maxFiles: 1, 
  maxSize: 10485760,
  dragDropText: 'Drop a PDF file here (Max 10MB)'
}} />

<!-- Regular Mode with Constraints -->
<Story name="Regular Single PDF" args={{ 
  regularMode: true,
  acceptedTypes: ['.pdf'], 
  maxFiles: 1,
  placeholder: 'Choose PDF file...'
}} />

<!-- Without File List -->
<Story name="No File List" args={{ showFileList: false }} />

