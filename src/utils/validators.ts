export const validators = {
    required: {
        rule: () => /\S/,
        formatter(fieldName: string) {
            return `${fieldName} is required.`
        }
    },
    numeric: {
        rule: () => /^\d+$/,
        formatter(fieldName: string) {
            return `${fieldName} should contain only numbers.`
        }
    }
}
