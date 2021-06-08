type CanTest = { test: (val: string) => boolean }

export interface Validators {
    rule: () => RegExp | CanTest
    formatter: (fieldName: string) => string
}

export interface ValidationRules {
    [name: string]: Validators
}

export interface ICustomInputProps
    extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'onChange'> {
    customRules?: ValidationRules
    validate?: string
    displayName?: string
}
