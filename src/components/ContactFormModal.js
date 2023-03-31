import React, { useState } from 'react'
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import '../styles/contact-form.css'

const ContactFormModal = ({ dialogRef, closeModal }) => {
    const [inputs, setInputs] = useState({})
    // const [textarea, setTextarea] = useState('Your message here.')

    const handleChange = e => {
        e.persist()
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    // const handleTextChange = e => {
    //     e.persist()
    //     setTextarea(e.target.value)
    // }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post('http://localhost:1337/api/ezforms/submit', {
                formData: inputs,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <dialog
            ref={dialogRef}
            onCancel={closeModal}
        >
            <div className='modal-header'>
                <Icon
                    path={mdiClose}
                    size={2}
                    className='icon'
                    onClick={closeModal}
                />
            </div>
            <h2 className='modal-title'>I would be happy to hear from you.</h2>
            <form
                action=''
                method='POST'
                onSubmit={handleSubmit}
                className='contact-form'
            >
                <div className='contact-form__section'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={inputs.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='contact-form__section'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={inputs.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='contact-form__section'>
                    <label htmlFor='message'>Message:</label>
                    <textarea
                        type='text'
                        name='message'
                        id='message'
                        value={inputs.message || ''}
                        rows='5'
                        onChange={handleChange}
                    />
                </div>
                <input
                    className='btn'
                    type='submit'
                    value='Submit'
                />
            </form>
        </dialog>
    )
}

export default ContactFormModal
