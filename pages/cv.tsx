import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Footer } from '../components/shared/Footer'
import { useGetUser } from '../actions/user'


interface Props {
    
}
interface State {
    
}

const Cv = (props: Props) => {

    const { loading, data } = useGetUser();
        return (
            <>
            <BaseLayout loading={loading} data={data}>
            
            </BaseLayout>
            <Footer />
            </>
        )
    
}

export default Cv
