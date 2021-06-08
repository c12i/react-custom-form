import * as React from 'react'

import { validators } from '../utils/validators'
import { IField, IFormContext, IFormProps, IFormState } from './interfaces/form'

export const FormContext: React.Context<IFormContext> = React.createContext({
    fields: {},
    errors: {}
})

class Form extends React.Component<IFormProps> {
    public state: IFormState = {
        fields: {},
        errors: {}
    }

    public setField = (event: React.ChangeEvent, { name, value }) => {
        event.persist()

        const { fields } = this.state
        const field = fields[name]

        this.addField({
            ...field,
            // @ts-ignore - sorry TypeScript Gods
            value: event ? event.currentTarget.value : value
        })
    }

    public addField = (field: IField) => {
        const { name } = field

        field = {
            value: '',
            ...field
        }

        if (name) {
            this.setState((prevState: IFormState) => {
                return {
                    ...prevState,
                    fields: {
                        ...prevState.fields,
                        [name]: field
                    }
                }
            })
            return
        }

        throw new Error(`please add 'name' field to the input: ${field}`)
    }

    public validateField = (name: string) => {
        let error = ''

        const {
            value: fieldValue,
            validate,
            displayName,
            customRules = {}
        } = this.state.fields[name]
        const rules = validate ? validate.split('|') : ''

        if (rules.length) {
            for (const rule in rules as any) {
                const ruleName = rules[rule]
                const validation = validators[ruleName] || customRules[ruleName]
                const isRuleSatisfied =
                    ruleName !== 'required' && !fieldValue
                        ? true
                        : validation.rule().test(fieldValue.toString())

                if (!isRuleSatisfied) {
                    error = validation.formatter(displayName || name)
                }

                if (error !== '') {
                    break
                }
            }

            this.setState((prevState: IFormState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [name]: error
                }
            }))
        }
    }

    private getFieldErrors = () => {
        return Object.values(this.state.errors).some((val) => val !== '')
    }

    private getFieldValues = () => {
        return Object.entries(this.state.fields).reduce(
            (acc: any, curr: any) => {
                acc = { ...acc, [curr[0]]: curr[1].value }
                return acc
            },
            {}
        )
    }

    render() {
        const { fields, errors } = this.state
        const { onFinish, onError } = this.props

        const formContext: IFormContext = {
            fields,
            errors,
            setField: this.setField,
            addField: this.addField,
            validateField: this.validateField
        }

        return (
            <FormContext.Provider value={formContext}>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        Object.keys(this.getFieldValues()).forEach((key) => {
                            this.validateField(key)
                        })
                        if (this.getFieldErrors()) {
                            onError(errors)
                            return
                        }
                        onFinish(this.getFieldValues())
                        return
                    }}
                >
                    {this.props.children}
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form
