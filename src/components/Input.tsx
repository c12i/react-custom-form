import * as React from 'react'
import styled from 'styled-components'

import { FormContext } from './Form'
import { ICustomInputProps } from './interfaces/input'

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Input: React.FC<ICustomInputProps> = ({ validationRules, ...rest }) => {
    const { name } = rest
    const { fields, errors, setField, addField, validateField } =
        React.useContext(FormContext)

    const field = fields[name] ?? {}
    const { value = '' } = field

    React.useEffect(() => {
        addField({ ...rest, customRules: { ...validationRules } })
    }, [])

    React.useEffect(() => {
        if (value) {
            validateField(name)
        }
    }, [value])

    return (
        <InputWrapper>
            <input
                type="text"
                value={field && value}
                onChange={(event) => setField(event, field)}
                onBlur={() => validateField(name)}
                {...rest}
            />
            {errors[name] && <small>{errors[name]}</small>}
        </InputWrapper>
    )
}

export default Input
