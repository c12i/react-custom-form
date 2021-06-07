import * as React from 'react'

import GlobalStyles from './components/GlobalStyles'
import Form from './components/Form'
import Input from './components/Input'

const App: React.FC<any> = () => {
    const customRules = {
        weirdRule: {
            rule() {
                return {
                    test(fieldValue) {
                        return fieldValue === 'weird'
                    }
                }
            },
            formatter(id) {
                return `${id} can have only one value: weird`
            }
        }
    }

    return (
        <div>
            <GlobalStyles />
            <h2>Our Form</h2>
            <hr />
            <Form>
                <Input
                    id="email"
                    customRules={customRules}
                    validate="weirdRule"
                />
                <Input id="userName" validate="numeric" />
            </Form>
        </div>
    )
}

export default App
