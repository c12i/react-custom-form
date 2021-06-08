import * as React from 'react'

import { FormContext } from './Form'

interface ICustomInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
    customRules?: Record<string, any>
    validate?: string
}

const Input: React.FC<ICustomInputProps> = ({ customRules, ...rest }) => {
    const { name } = rest
    const { fields, setField, addField, validateField } =
        React.useContext(FormContext)

    const field = fields[name] ?? {}
    const { value = '' } = field

    React.useEffect(() => {
        addField({
            field: { ...rest, customRules: { ...customRules } },
            value: ''
        })
    }, [])

    React.useEffect(() => {
        if (field.value !== undefined) {
            validateField(name)
        }
    }, [value])

    return (
        <input
            type="text"
            value={field && value}
            onChange={(event) => setField(event, field)}
            {...rest}
        />
    )
}

export default Input
