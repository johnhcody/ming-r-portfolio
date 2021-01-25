import { Header } from '../shared/Header'
import { Footer } from '../shared/Footer'
import Head from 'next/head'

import React from 'react'

interface Props {
    
}

const BaseLayout = (props: Props) => {
  const {children, user, loading} = props;
    return (
        <>
          <Head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossOrigin="anonymous"></link>
          </Head>
          <Header user={user} loading={loading}/>  
          {children}
        </>
    )
}

export default BaseLayout;