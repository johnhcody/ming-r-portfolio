import React, { useState } from 'react'
import Link from 'next/link'
//import Modal from '../modal';
import Modal from 'react-modal';
import Image from 'next/image'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage, useLanguageUpdate } from '../../context/languageContext'
import { useGetUser } from '../../actions/user'

interface Props {
    
}


export const Header = (props: Props) => {
    const engLang = useLanguage();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {data, loading} = useGetUser();
    const openModal = () => {
        setModalIsOpen(true);
        // document.body.style.overflow = "hidden"; 
        // document.body.style.height = "100%"; 
    }

    const closeModal = () => { 
        setModalIsOpen(false);
        // document.body.style.overflow = "auto"; 
        // document.body.style.height = "auto"; 
    }



    const LogoutLink = () => <a className="pt-2" href="/api/logout">Logout</a>
    
    return (
        <div className="header-wrapper">
            <Link href="/">
                <a> M.R. </a>
            </Link>
            <div className="header-right-wrapper">
                <i onClick={openModal} className="fas fa-bars"></i>
                {modalIsOpen ? null : <LanguageToggle />}
                {/* <LanguageToggle /> */}
                {data && data.name == "john.haner.cody@gmail.com" ?  <LogoutLink /> : null}

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
                    bottom: '0px',
                    background: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '50px'
                }
            }}>
                {
                    engLang ? <div className="modal-link-wrapper">
                        <Link  href="/about">
                            <a onClick={closeModal} > About </a>
                        </Link>
                        <Link href="/portfolio">
                            <a onClick={closeModal} > Articles </a>
                        </Link>
                        <Link href="/blog">
                            <a onClick={closeModal} > Blog </a>
                        </Link>
                        <Link href="/projects">
                            <a onClick={closeModal} > Projects </a>
                        </Link>
                        <Link href="/cv">
                            <a onClick={closeModal} > Contact </a>
                        </Link>
                        <a></a>
                    </div> : <div className="modal-link-wrapper">
                            <Link href="/about">
                                <a onClick={closeModal} > เกี่ยวกับมิ่งขวัญ </a>
                            </Link>
                            <Link href="/portfolio">
                                <a onClick={closeModal} > บทความ </a>
                            </Link>
                            <Link href="/blog">
                                <a onClick={closeModal} > บล็อก </a>
                            </Link>
                            <Link href="/projects">
                                <a onClick={closeModal} > โครงการ </a>
                            </Link>
                            <Link href="/cv">
                                <a onClick={closeModal} > ติดต่อ </a>
                            </Link>
                            <a></a>
                        </div>
                }
            </Modal>
        </div>
    )
}

export default Header;
