import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Footer } from '../components/shared/Footer'
import { useGetUser } from '../actions/user'
import Paragraph1 from '../components/cv/Paragraph1'
import DownloadCv from '../components/cv/DownloadCv'


interface Props {
    
}

const Cv: React.FC<Props> = props => {

    const { loading, data } = useGetUser();
        return (
            <>
            <BaseLayout loading={loading} data={data}>
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
