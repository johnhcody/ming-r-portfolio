import React, { useState } from 'react'
import Link from 'next/link'
//import Modal from '../modal';
import Modal from 'react-modal';
import Image from 'next/image'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage, useLanguageUpdate } from '../../context/languageContext'

interface Props {
    
}


export const Header = (props: Props) => {
    const engLang = useLanguage();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {user, loading} = props;
    const openModal = () => {
        setModalIsOpen(true);
        document.body.style.overflow = "hidden"; 
        document.body.style.height = "100%"; 
        
    }

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = "auto"; 
        document.body.style.height = "auto"; 
    }

    const LogoutLink = () => <a href="/api/logout">Logout</a>
    
    return (
        <div className="header-wrapper">
            <Link href="/">
                <a> M.R. </a>
            </Link>
            <div className="header-right-wrapper">
                <i onClick={openModal} className="fas fa-bars"></i>
                {modalIsOpen ? null : <LanguageToggle />}
                {user == "john.haner.cody@gmail.com" ?  <LogoutLink /> : null}

            </div>
            <Modal className="modal" ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} closeTimeoutMS={1000} style={{
                overlay: {
                    backgroundColor: 'transparent'
                },
                content: {
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0px',
                    top: '40px',
                    left: '0px',
                    right: '0px',
                    bottom: '40px',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '50px'
                }
            }}>
                {
                    engLang ? <div className="modal-link-wrapper">
                        <Link href="/about">
                            <a> About </a>
                        </Link>
                        <Link href="/portfolio">
                            <a> Articles </a>
                        </Link>
                        <Link href="/cv">
                            <a> Contact </a>
                        </Link>
                        <a></a>
                    </div> : <div className="modal-link-wrapper">
                            <Link href="/about">
                                <a> เกี่ยวกับมิ่งขวัญ </a>
                            </Link>
                            <Link href="/portfolio">
                                <a> บทความ </a>
                            </Link>
                            <Link href="/cv">
                                <a> ติดต่อ </a>
                            </Link>
                            <a></a>
                        </div>
                }
            </Modal>
        </div>
    )
}


