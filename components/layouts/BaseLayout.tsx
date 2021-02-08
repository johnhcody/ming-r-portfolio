import { Header } from '../shared/Header'
import Head from 'next/head'

import React from 'react'

interface Props {
    data: { nickname: string, name: string, picture: string, updated_at: string };
    loading: boolean;
}

const BaseLayout:React.FC<Props> = ({ children, data, loading }) => {

  return (
        <>
          <Head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
          </Head>
          {/* <Header data={data} loading={loading}/>   */}
          <Header {...data} {...loading}/>  
          {children}
        </>
    )
}

export default BaseLayout;