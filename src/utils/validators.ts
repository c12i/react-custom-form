import { ValidationRules } from '~components/interfaces/input'

export const validators: ValidationRules = {
    required: {
        rule: () => /./,
        formatter(fieldName: string) {
            return `${fieldName} is required.`
        }
    },

    numeric: {
        rule: () => /^\d+$/,
        formatter(fieldName: string) {
            return `${fieldName} should contain only numbers.`
        }
    },

    email: {
        rule: () =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        formatter(fieldName: string) {
            return `${fieldName} is not valid`
        }
    }
}
