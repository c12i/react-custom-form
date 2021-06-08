import * as React from 'react'
import styled from 'styled-components'

import { FormContext } from './Form'
import { ICustomInputProps } from './interfaces/input'

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Input: React.FC<ICustomInputProps> = ({ customRules, ...rest }) => {
    const { name } = rest
    const { fields, errors, setField, addField, validateField } =
        React.useContext(FormContext)
    const inputRef = React.useRef()

    const field = fields[name] ?? {}
    const { value = '' } = field

    React.useEffect(() => {
        addField({ ...rest, customRules: { ...customRules } })
    }, [])

    React.useEffect(() => {
        if (field.value) {
            validateField(name)
        }
    }, [value])

    return (
        <FormWrapper>
            <input
                type="text"
                value={field && value}
                onChange={(event) => setField(event, field)}
                onBlur={() => validateField(name)}
                ref={inputRef}
                {...rest}
            />
            {errors[name] && <small>{errors[name]}</small>}
        </FormWrapper>
    )
}

export default Input
