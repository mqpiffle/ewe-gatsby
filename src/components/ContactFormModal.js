import React, { useState } from 'react'
import axios from 'axios'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import '../styles/contact-form.css'

const ContactFormModal = ({ dialogRef, closeModal }) => {
    const [inputs, setInputs] = useState({})
    const [submitted, setSubmitted] = useState(false)
    // const [textarea, setTextarea] = useState('Your message here.')

    const handleChange = e => {
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
                setSubmitted(true)
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
            {!submitted ? (
                <>
                    <h2 className='modal-title'>
                        I would be delighted to hear from you about becoming
                        your coding and design expert.
                    </h2>
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
                                autoFocus
                                required
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
                                required
                            />
                        </div>
                        <div className='contact-form__section'>
                            <label htmlFor='message'>Message:</label>
                            <textarea
                                type='text'
                                name='message'
                                id='message'
                                value={inputs.message || ''}
                                rows='7'
                                maxLength={200}
                                placeholder='Please describe your opportunity in 200 characters or fewer...'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='contact-form__checkbox'>
                            <input
                                type='checkbox'
                                id='agree'
                                required
                            />
                            <label htmlFor='agree'>
                                I agree to receive emails from
                                eric@ericelsner.com. Your info will not be sold
                                or used for any other purpose besides direct
                                correspondence.
                            </label>
                        </div>
                        <input
                            className='btn'
                            type='submit'
                            value='Submit'
                        />
                    </form>
                </>
            ) : (
                <h2>
                    Thank you for your inquiry! Please allow up to 24 hours for
                    a human to respond.
                </h2>
            )}
        </dialog>
    )
}

export default ContactFormModal
