import * as React from 'react'

import { validators } from '../utils/validators'

interface IFormContext {
    fields: any
    errors: any
    setField?: (event: React.FormEvent, metadata: any) => void
    addField?: (data: any) => void
    validateField?: (name: string) => void
}

interface IFormState {
    fields: any
    errors: any
}

interface IFormProps {
    onFinish: (values: any) => void
    onError: (err: any) => void
}

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
            field: {
                ...field,
                // @ts-ignore
                value: event ? event.currentTarget.value : value
            }
        })
    }

    public addField = ({ field }) => {
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
            for (const rule in rules) {
                const ruleName = rules[rule]
                const validation = validators[ruleName] || customRules[ruleName]
                const isRuleSatisfied =
                    ruleName !== 'required' && !fieldValue
                        ? true
                        : validation.rule().test(fieldValue.toString())

                if (!isRuleSatisfied) {
                    error = validation.formatter.apply(null, [
                        displayName || name
                    ])
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

    render() {
        const { fields, errors } = this.state

        const formContext: IFormContext = {
            fields,
            errors,
            setField: this.setField,
            addField: this.addField,
            validateField: this.validateField
        }

        const values = Object.entries(fields).reduce((acc: any, curr: any) => {
            acc = { ...acc, [curr[0]]: curr[1].value }
            return acc
        }, {})

        const fieldErrors = Object.values(errors).some((val) => val !== '')

        return (
            <FormContext.Provider value={formContext}>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        if (fieldErrors) {
                            this.props.onError(errors)
                            return
                        }
                        this.props.onFinish(values)
                    }}
                >
                    {this.props.children}
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form
