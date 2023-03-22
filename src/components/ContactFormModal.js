import React, { useRef, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import '../styles/contact-form.css'

const ContactFormModal = ({ dialogRef, closeModal }) => {
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
                className='contact-form'
            >
                <div className='contact-form__section'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                    />
                </div>
                <div className='contact-form__section'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                    />
                </div>
                <div className='contact-form__section'>
                    <label htmlFor='comment'>Comment:</label>
                    <textarea
                        type='text'
                        name='comment'
                        id='comment'
                        rows='5'
                    />
                </div>
                <button
                    className='btn'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </dialog>
    )
}

export default ContactFormModal
