import * as React from 'react'

import GlobalStyles from './components/GlobalStyles'
import Form from './components/Form'
import Input from './components/Input'

const App: React.FC<any> = () => {
    const customRules = {
        weirdRule: {
            rule() {
                return {
                    test(fieldValue: string) {
                        return fieldValue === 'weird'
                    }
                }
            },
            formatter(name: string) {
                return `${name} can have only one value: weird`
            }
        }
    }

    return (
        <div>
            <GlobalStyles />
            <h2>Our Form</h2>
            <hr />
            <Form
                onFinish={(values) => console.log(values)}
                onError={(err) => console.log(err)}
            >
                <Input
                    name="email"
                    customRules={customRules}
                    validate="weirdRule"
                />
                <Input name="userName" validate="required|numeric" />
                <button type="submit">submit</button>
            </Form>
        </div>
    )
}

export default App
