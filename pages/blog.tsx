import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Footer } from '../components/shared/Footer'
import { useLanguage, useLanguageUpdate } from '../context/languageContext'
import { useGetUser } from '../actions/user'
import axios from 'axios'

interface Props {

}
interface State {

}

const Blog = (props: Props) => {

    const engLang = useLanguage();
    const toggleLang = useLanguageUpdate();

    const { loading, data } = useGetUser();

    return (
        <>
            <BaseLayout data={data} loading={loading}>
                <div className="h-screen">
                </div>
                
                </BaseLayout>
            <Footer />
            </>
        )
}

Blog.getInitialProps = async () => {
    const res = await axios.get('/api/blogs');
    const blogs = res.data['data'];
    return blogs;
}

export default Blog