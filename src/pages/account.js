import React from 'react'
import { Link } from 'gatsby'
import { useAuth0 } from '@auth0/auth0-react'
/*  Import the withAuthenticationRequired HOC  */
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Layout from '../components/shared/Layout'

const Account = () => {
    /*  Access user from the useAuth0 hook  */
    const { user } = useAuth0()
    return (
        <Layout>
            <nav>
                {/*  Link to homepage */}
                <Link to='/'>Home</Link>
                {/*  Display users email */}
                <p>Email: {user.email}</p>
            </nav>
        </Layout>
    )
}

/*  Wrap the component in the withAuthenticationRequired handler  */
export default withAuthenticationRequired(Account)
