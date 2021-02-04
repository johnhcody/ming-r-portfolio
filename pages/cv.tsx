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
        if (window.pageYOffset > 47) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }


    const [width, setWidth] = useState(null);
        function handleWindowSizeChange() {
                setWidth(window.innerWidth);
            }

    useEffect(() => {
        if (typeof window !== 'undefined') setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

        let isMobile: boolean = (width <= 768);


        return (
            <>
            <BaseLayout loading={loading} data={data}>
                {scrolled && !isMobile? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <h1 className="flex justify-center text-4xl font-sans pt-24 pb-12" >Read about my Experience</h1>
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
