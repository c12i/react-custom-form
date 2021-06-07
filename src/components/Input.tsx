import * as React from 'react'

import { FormContext } from './Form'

const Input = (props: any) => {
    const { id } = props
    const { fields, errors, setField, addField, validateField } =
        React.useContext(FormContext)

    const field = fields[id] || {}
    const fieldError = errors[id] || {}

    console.log(fieldError)

    const { value = '' } = field

    React.useEffect(() => {
        addField({
            field: { ...props },
            value: ''
        })
    }, [])

    React.useEffect(() => {
        if (field.value !== undefined) {
            validateField(id)
        }
    }, [value])

    return (
        <input
            type="text"
            value={field && value}
            onChange={(event) => setField(event, field)}
        />
    )
}

export default Input
