import React, { useState } from 'react'
import axios from 'axios'

import '../../styles/form.css'

const LoginForm = props => {
    const [inputs, setInputs] = useState({
        identifier: '',
        password: '',
    })
    const url = process.env.GATSBY_API_URL

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post(`${url}/auth/local`, {
                inputs,
            })
            .then(res => {
                // console.log(res)
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='identifier'>Username or Email</label>
                <input
                    type='text'
                    id='identifier'
                    name='identifier'
                    onChange={handleChange}
                    required
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={handleChange}
                    required
                />
            </form>
        </>
    )
}

export default LoginForm
