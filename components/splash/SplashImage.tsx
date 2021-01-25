import React, { useState } from 'react'
import Typed from 'react-typed'
import Image from 'next/image'

interface Props {

}


export const SplashImage = (props: Props) => {

    return (
        <div className="index-page-wrapper">
            <Typed
                strings={[
                    'I am a writer',
                    'I am a journalist',
                    'I am a storyteller',
                    'I am a leader']}
                typeSpeed={40}
                backSpeed={50}
                backDelay={1000}
                className="typed-text"
                loop
            />

        </div>
    )
}