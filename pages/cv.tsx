import React, { useState, useEffect } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import Footer from '../components/shared/Footer'
import { useGetUser } from '../actions/user'
import Paragraph1 from '../components/cv/Paragraph1'
import DownloadCv from '../components/cv/DownloadCv'
import NavBar from '../components/shared/Navbar'

interface Props {
    
}

const Cv: React.FC<Props> = props => {

    const { loading, data } = useGetUser();

    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
      }, []);

      const handleScroll = () => {
        if (window.pageYOffset > 47 && window.pageYOffset < 900) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const [ hidden, setHidden ] = useState(false);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, []);

    const handleResize = () => {
        if (window.innerWidth <= 700) {
            setHidden(true);
        } else {
            setHidden(false)
        }
    }


        return (
            <>
            <BaseLayout loading={loading} data={data}>
                {scrolled && !hidden? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <Paragraph1 />    
                <Paragraph1 />    
                <Paragraph1 />    
                <Paragraph1 />    
                <DownloadCv />
            </BaseLayout>
            <Footer />
            </>
        )
    
}

export default Cv
