import React, { useState } from 'react'
import Typed from 'react-typed'
import Image from 'next/image'

interface Props {

}


const SplashImage:React.FC<Props> = (props: Props) => {

    return (
        <div className="index-page-wrapper">
            <Typed
                strings={[
                    'Local Wisdom',
                    'Environment',
                    'Sustainability',
                    'Creative Culture']}
                typeSpeed={40}
                backSpeed={50}
                backDelay={1000}
                className="typed-text"
                loop
            />

        </div>
    )
}

export default SplashImage;