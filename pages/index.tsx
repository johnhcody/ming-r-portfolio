import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import SplashImage from '../components/splash/SplashImage'
import NavBar from '../components/shared/Navbar'
import IndexFooter from '../components/splash/IndexFooter'
import Footer from '../components/shared/Footer'
import { useGetUser } from '../actions/user'

interface Props {

}

const Index: React.FC<Props> = props => {
    
const { data, loading } = useGetUser();

return (
            <>
            <BaseLayout loading={loading} data={data}>
                <SplashImage />
                <NavBar />
                <Footer />
                <IndexFooter />
            </BaseLayout>
            </>
    )
}



export default Index