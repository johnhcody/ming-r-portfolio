import React from 'react'

interface Props {
    
}

const DownloadCv: React.FC<Props> = props => {

        return (
            <>
            
            <div className="flex justify-center py-2 text-blue-900">
                <a href="https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/CV_Mingkwan_Rattanakot.pdf" download>
                    <span className="text-blue hover:text-yellow-500">
                    <i className="fas fa-cloud-download-alt fa-3x" ></i>
                    </span>
                </a>
            </div>
            </>
        )
    
}

export default DownloadCv;