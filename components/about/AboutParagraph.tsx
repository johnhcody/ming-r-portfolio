import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../context/languageContext'

interface Props {
    
}

const AboutParagraph: React.FC<Props> = props => {

    const engLang = useLanguage();

        return (
            <>
            <div className="flex flex-col justify-center items-center lg:flex-row py-12">
                    <img className="w-auto md:max-h-72 max-h-60 min-h-32 md:pl-12" src="https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/about-placeholder.png" alt=""/>
                    <div className="p-6 flex flex-col w-4/5">
                        {engLang == true ? <h2 className="text-center text-4xl pb-8">My Experience</h2>: <h2 className="text-center text-4xl pb-8">ประสบการณ์ของฉัน</h2>}
                        {/* <p className="flex px-4">Nullam finibus laoreet justo, quis facilisis mauris suscipit sit amet. Nunc tempus neque enim, et tempus est lacinia nec. Fusce facilisis nulla in nibh cursus, non ullamcorper nisl interdum. Integer vestibulum feugiat justo, vel suscipit dui ornare sed. Nunc at est arcu. Fusce maximus elit quis orci venenatis, non elementum arcu semper. Duis suscipit vulputate ligula, ut tempor elit. Fusce lacinia, est eget imperdiet luctus, mauris lacus rutrum lectus, et luctus felis arcu id purus. Proin mi mi, tempus ut orci pretium, hendrerit aliquet ex. In eget metus ac est vehicula hendrerit. Nulla eu consequat quam. Nulla sodales pharetra eros vel pretium.</p> */}
                        {engLang == true ? <p>Former Urban Designer who loves to explore the world Interested in human behavior design And national development strategy It is believed that every change starts with a small droplet flowing together.</p> : <p>อดีต Urban Designer ผู้รักการเดินทางสำรวจโลกกว้าง สนใจงานออกแบบเชิงพฤติกรรมมนุษย์ และยุทธศาสตร์การพัฒนาประเทศ เชื่อว่าทุกการเปลี่ยนแปลงเริ่มต้นจากน้ำหยดเล็กที่ไหลมารวมกัน</p>}
                    </div>
            </div>
            </>
        )
    
}


export default AboutParagraph;