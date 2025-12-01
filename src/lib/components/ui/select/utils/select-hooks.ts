import type { SelectOption, SelectOptionGroup } from './select-types.js';

/**
 * Hook for finding an option by value from options or groups
 * 
 * @param options - Direct options array
 * @param groups - Grouped options array
 * @returns Function to find option by value
 */
export function useFindOption(options: SelectOption[], groups: SelectOptionGroup[]) {
	return function findOptionByValue(searchValue: string): SelectOption | undefined {
		// Search in direct options
		const directOption = options.find(opt => opt.value === searchValue);
		if (directOption) return directOption;

		// Search in groups
		for (const group of groups) {
			const groupOption = group.options.find(opt => opt.value === searchValue);
			if (groupOption) return groupOption;
		}
		
		return undefined;
	};
}

/**
 * Hook for getting display value based on selection
 * 
 * @param value - Current value (string or string[])
 * @param multiple - Whether multiple selection is enabled
 * @param placeholder - Placeholder text
 * @param findOption - Function to find option by value
 * @returns Display value string
 */
export function useDisplayValue(
	value: string | string[] | undefined,
	multiple: boolean,
	placeholder: string,
	findOption: (value: string) => SelectOption | undefined
) {
	return function getDisplayValue(): string {
		if (!value) return placeholder;
		
		if (multiple && Array.isArray(value)) {
			if (value.length === 0) return placeholder;
			if (value.length === 1) {
				const option = findOption(value[0]);
				return option?.label || value[0];
			}
			return `${value.length} selected`;
		}
		
		const singleValue = value as string;
		const option = findOption(singleValue);
		return option?.label || singleValue;
	};
}
