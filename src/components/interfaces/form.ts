import { ValidationRules } from './input'

export interface IField extends React.InputHTMLAttributes<HTMLInputElement> {
    customRules?: ValidationRules
    validate?: string
    displayName?: string
}

export interface IFormFields {
    [name: string]: IField
}

export interface IFormContext {
    fields: IFormFields
    errors: Record<string, string>
    setField?: (event: React.FormEvent, field: any) => void
    addField?: (field: IField) => void
    validateField?: (name: string) => void
}

export interface IFormState {
    fields: IFormFields
    errors: Record<string, any>
}

export interface IFormProps {
    onFinish: (values: any) => void
    onError: (err: any) => void
}
