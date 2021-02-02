import React, { useState } from 'react'

interface Props {

}


const Footer:React.FC<Props> = (props: Props) => {


    return (
        <div className="footer-wrapper">
            <div className="icons-wrapper">
                <a href="https://www.facebook.com/mingyaisiri"><i className="fab fa-facebook-f"></i></a>
                <a href="https://instagram.com/mingkwn?igshid=1u0twlot1lt36"><i className="fab fa-instagram"></i></a>
                <a href="mailto:mingkwn@gmail.com?subject=Getting%20in%20Touch"><i className="fas fa-envelope-open-text"></i></a>
            </div>
            <div className="bottom-text-wrapper">
                <p>	&copy; Mingkwan Rattanakot 2021 </p>
            </div>
        </div>
    )
}

export default Footer;