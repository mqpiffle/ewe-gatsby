import React, { useRef, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import '../styles/contact-form.css'

const ContactFormModal = ({ dialogRef, closeModal }) => {
    console.log('closeModal', closeModal)
    // const dialogRef = useRef(null)
    // // const lastActiveElement = useRef(null)

    // console.log('open', open)
    // useEffect(() => {
    //     const node = dialogRef.current
    //     if (open) {
    //         // lastActiveElement.current = document.activeElement
    //         node.showModal()
    //     } else {
    //         node.close()
    //         // lastActiveElement.current.focus()
    //     }
    // }, [open])

    // useEffect(() => {
    //     const dialogNode = dialogRef.current
    //     const handleCancel = event => {
    //         event.preventDefault()
    //         onRequestClose()
    //     }
    //     dialogNode.addEventListener('cancel', handleCancel)
    //     return () => {
    //         dialogNode.removeEventListener('cancel', handleCancel)
    //     }
    // }, [onRequestClose])

    return (
        <dialog ref={dialogRef}>
            <div className='modal-header'>
                <Icon
                    path={mdiClose}
                    size={2}
                    color='var(--clr-highlight2)'
                    onClick={closeModal}
                />
            </div>
            <h2>I would be happy to hear from you.</h2>
            <form
                action=''
                method='POST'
                className='contact-form'
            >
                <input
                    type='text'
                    value='name'
                />
                <input
                    type='email'
                    value='email'
                />
                <input
                    type='text'
                    value='comment'
                />
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
