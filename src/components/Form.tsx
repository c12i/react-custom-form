import * as React from 'react'

import { validators } from '../utils/validators'

interface IFormContext {
    fields: any
    errors: any
    setField?: (event: React.FormEvent, metadata: any) => void
    addField?: (data: any) => void
    validateField?: (id: string) => void
}

interface IFormState {
    fields: any
    errors: any
}

export const FormContext: React.Context<IFormContext> = React.createContext({
    fields: {},
    errors: {}
})

class Form extends React.Component {
    public state: IFormState = {
        fields: {},
        errors: {}
    }

    public setField = (event: React.ChangeEvent, { id, value }) => {
        event.persist()

        console.log('add/update field value!')

        const { fields } = this.state
        const field = fields[id]

        this.addField({
            field: {
                ...field,
                // @ts-ignore
                value: event ? event.currentTarget.value : value
            }
        })
    }

    public addField = ({ field }) => {
        const { id } = field

        field = {
            value: '',
            ...field
        }

        if (id) {
            this.setState((prevState: IFormState) => {
                return {
                    ...prevState,
                    fields: {
                        ...prevState.fields,
                        [id]: field
                    }
                }
            })
            return
        }

        throw new Error(`please add 'id' field to the input: ${field}`)
    }

    public validateField = (id: string) => {
        let error = ''

        const {
            value: fieldValue,
            validate,
            displayName,
            customRules = {}
        } = this.state.fields[id]
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
                        displayName || id
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
                    [id]: error
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

        return (
            <form action="">
                <FormContext.Provider value={formContext}>
                    {this.props.children}
                </FormContext.Provider>
            </form>
        )
    }
}

export default Form
