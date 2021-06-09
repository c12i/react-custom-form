# React Custom Form

This is a very simple set of react `Form` and `Input` components.
The components provide a developer friendly API to get you up an running with your form with minimal set up.

**demo**
https://collinsmuriuki.github.io/react-custom-form/

## Features

-   Custom `Form` component
-   Custom `Input` component - only `text` variant for now
-   Inbuilt and custom input validation through `ValidationRules`

## Demo

Below is a code snippet on how to use the components.

```javascript
import { Form, Input } from './components'

const App = () => {
    const customRules = {
        wooga: {
            rule: () => /^wooga\.(\S)+$/,
            formatter(fieldName: string) {
                return `${fieldName} should start with wooga.`
            }
        }
    }

    return (
        <Form onFinish={(values) => alert(JSON.stringify(values))}>
            <Input
                name="username"
                customRules={customRules}
                validate="wooga|required"
                placeholder="Enter your username*"
            />
            <Input
                name="email"
                validate="email|required"
                placeholder="Enter your email*"
            />
            <Input
                name="age"
                validate="numeric"
                placeholder="Enter your age - Optional"
            />
            <button type="submit">submit</button>
        </Form>
    )
}
```

## Documentation

### `Form`

The `Form` component manages the state of it's children via the `ContextApi` which provides the state to the form's child `Input` components.

```js
const formContext: IFormContext = {
    fields,
    errors,
    setField: this.setField,
    addField: this.addField,
    validateField: this.validateField
}
```

The form state keeps track of all the fields and errors, which are a map of the `Input` name to it's DOM + custom props and the validation errors respectively.

The `setField` and `addField` methods are called from the `Input` components for updating the input state and handling the `onChange` event. The `validateField` is also called on the `Input` component each time the input's value property changes to directly check the validation rules and append an error message to the input's `errors` map property.

If an error is present for a particular input, it is rendered underneath the `input` element as `small` tag. In addition, the `validateField` method is also called for each `Input` field to handle `onSubmit` events, calling the user's optional `onError` callback when an error occurs.

`onSubmit` events are handled by passing a callback to the `onFinish` prop, the callback contains all the `Input` values mapped to the their respective `name` prop.

### `Input`

This component manipulates the `IFormContext` methods as well as plucking the field and error maps for the component through the `name` prop that's passed into it.
When initially rendered the component will call the `addField` and `validateField` context methods via `useEffect`. With the latter watching any changes to the `value` prop and re-rendering the component every time it change.

```js
React.useEffect(() => {
    addField({ ...rest, customRules: { ...validationRules } })
}, [])

React.useEffect(() => {
    if (field.value) {
        validateField(name)
    }
}, [value])
```

The `onChange` event by making a call to the `setField` context method.
Validation is done by handling the `onBlur` event, where we make the call to the `validateField` context method.

Ultimately, we end up having this:

```js
const Input: React.FC<ICustomInputProps> = ({ validationRules, ...rest }) => {
    const { name } = rest
    const { fields, errors, setField, addField, validateField } =
        React.useContext(FormContext)

    const field = fields[name] ?? {}
    const { value } = field

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
```

### Validation

Validation is handled by passing down both the `validate` (contains the validation constraints) and `validationRules`, both of which are optional props.
The `validationRules` is expected to implement the following interfaces:

```js
type CanTest = { test: (val: string) => boolean }

interface Validators {
    rule: () => RegExp | CanTest
    formatter: (fieldName: string) => string
}

export interface ValidationRules {
    [name: string]: Validators
}
```

The `Form` component handles the validation logic by iterating over validators and making the calls to the necessary `validationRules` methods defined, inserting the error string returned from the `formatter` to the form's error map.

Here are some more examples from the inbuilt validators:

```js
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
            return `${fieldName} is a valid`
        }
    }
}
```

## Run Locally

Clone the project

```bash
  https://github.com/collinsmuriuki/react-custom-form.git
```

Go to the project directory

```bash
  cd custom-form
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Authors

-   [@collinsmuriuki](https://www.github.com/collinsmuriuki)
