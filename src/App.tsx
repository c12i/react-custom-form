import * as React from 'react'
import styled from 'styled-components'

import GlobalStyles from './components/GlobalStyles'
import Form from './components/Form'
import Input from './components/Input'

const Layout = styled.div`
    h2 {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 60%;

        input {
            height: 2.5rem;
            border: solid 1px #888;
            border-radius: 6px;
            padding-left: 0.5rem;
            margin: 0.3rem 0;
        }

        small {
            color: #d43636;
        }

        button {
            width: 30%;
            height: 2.5rem;
            background: #333;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin: 0.5rem 0;

            &:hover {
                background: #888;
            }
        }
    }
`

const App: React.FC<any> = () => {
    const customRules = {
        wooga: {
            rule: () => /^wooga\.(\S)+$/,
            formatter(fieldName: string) {
                return `${fieldName} should start with wooga.`
            }
        }
    }

    return (
        <Layout>
            <GlobalStyles />
            <h2>Sample Form</h2>
            <Form
                onFinish={(values) => alert(JSON.stringify(values))}
                onError={(err) => console.error(err)}
            >
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
                    name="city"
                    validate="required"
                    placeholder="Enter your city*"
                />

                <Input
                    name="country"
                    validate="required"
                    placeholder="Enter your country*"
                />

                <Input
                    name="age"
                    validate="numeric"
                    placeholder="Enter your age - Optional"
                />
                <button type="submit">submit</button>
            </Form>
        </Layout>
    )
}

export default App
