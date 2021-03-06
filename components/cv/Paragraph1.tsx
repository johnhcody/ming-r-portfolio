import React from 'react'

interface Props {
    
}

const Paragraph1: React.FC<Props> = props => {

        return (
            <>
            <div className="flex flex-col justify-center items-center lg:flex-row py-12">
                {/* <div className="md:min-w-max w-auto"> */}
                    <img className="w-auto md:max-h-72 max-h-60 min-h-32 md:pl-12" src="https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/cliff.jpg" alt=""/>
                {/* </div> */}
                    <div className="p-6 flex flex-col w-4/5 font-sans">
                        <h2 className="text-center text-4xl pb-8">Great Title</h2>
                        <p className="flex px-4 leading-normal">Nullam finibus laoreet justo, quis facilisis mauris suscipit sit amet. Nunc tempus neque enim, et tempus est lacinia nec. Fusce facilisis nulla in nibh cursus, non ullamcorper nisl interdum. Integer vestibulum feugiat justo, vel suscipit dui ornare sed. Nunc at est arcu. Fusce maximus elit quis orci venenatis, non elementum arcu semper. Duis suscipit vulputate ligula, ut tempor elit. Fusce lacinia, est eget imperdiet luctus, mauris lacus rutrum lectus, et luctus felis arcu id purus. Proin mi mi, tempus ut orci pretium, hendrerit aliquet ex. In eget metus ac est vehicula hendrerit. Nulla eu consequat quam. Nulla sodales pharetra eros vel pretium.</p>
                    </div>
            </div>
            </>
        )
    
}


export default Paragraph1;