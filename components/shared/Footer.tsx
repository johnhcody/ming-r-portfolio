import React, { useState } from 'react'
import { useGetUser } from '../../actions/user'

interface Props {

}


const Footer:React.FC<Props> = (props: Props) => {

    const { data, loading } = useGetUser();
    return (
        <>
        <div className="h-28"></div>
        <div className="h-28"></div>
        <div className="footer-wrapper w-full mt-96">
            <div className="icons-wrapper">
                <a href="https://www.facebook.com/mingyaisiri"><i className="fab fa-facebook-f"></i></a>
                <a href="https://instagram.com/mingkwn?igshid=1u0twlot1lt36"><i className="fab fa-instagram"></i></a>
                <a href="mailto:mingkwn@gmail.com?subject=Getting%20in%20Touch"><i className="fas fa-envelope-open-text"></i></a>
            </div>
            <div className="bottom-text-wrappe flex flex-col items-center justify-center">
                <p>	&copy; Mingkwan Rattanakot 2021 </p>
                {!data ? <a className="text-blue" href="api/login">Admin Login</a> : data && data.name == "john.haner.cody@gmail.com" ? <a className="text-blue" href="api/logout">Logout</a> : null}
            </div>
        </div>
        </>
    )
}

export default Footer;