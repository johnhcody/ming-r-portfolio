import React from 'react'

interface Props {
    
}

const DownloadCv: React.FC<Props> = props => {

        return (
            <>
            
            <div className="flex justify-center py-6 text-blue-900">
                <a href="public/CV_Mingkwan_Rattanakot 2021.pdf" download>
                    <span className="text-blue hover:text-yellow-500">
                    <i className="fas fa-cloud-download-alt fa-3x" ></i>
                    </span>
                </a>
            </div>
            </>
        )
    
}

export default DownloadCv;