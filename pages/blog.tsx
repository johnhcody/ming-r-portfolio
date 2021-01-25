import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { useGetUser } from '../actions/user'

interface Props {
    
}
interface State {
    
}

const Cv = (props: Props) => {
    const { loading, data } = useGetUser();

    return (
        <BaseLayout data={data} loading={loading}>
            <h1>hello from the blog page</h1>
        </BaseLayout>
    )
    
}

export default Blog;
