import React, { useState } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'

interface Props {

}


const IndexFooter:React.FC<Props> = (props: Props) => {

    const {data, loading} = useGetUser();
    if (!data) {
        return (
            <div className="login-wrapper">
                <a className="font-sans" href="api/login">Admin Login</a>
            </div>
        )
    } else if (data && data.name == "john.haner.cody@gmail.com"){
        return (
            <div className="login-wrapper">
                <a  className="font-sans" href="api/logout">Logout</a>
            </div>
            )
    } else {
        console.log('login logic failed')
    }
}

export default IndexFooter;
