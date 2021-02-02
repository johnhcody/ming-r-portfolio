import React from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Footer } from '../components/shared/Footer'
import { useLanguage } from '../context/languageContext'
import { useGetUser } from '../actions/user'

interface Props {

}

const About: React.FC<Props> = props => {

    const engLang = useLanguage();

    const { loading, data } = useGetUser();

    return (
        <>
            <BaseLayout data={data} loading={loading}>
                <div className="about-wrapper">
                    <div className="title-wrapper">
                        <h1>About Me!</h1>
                    </div>
                    <div className="bio-wrapper">
                        {engLang == false ? <p>อดีต Urban Designer ผู้รักการเดินทางสำรวจโลกกว้าง สนใจงานออกแบบเชิงพฤติกรรมมนุษย์ และยุทธศาสตร์การพัฒนาประเทศ เชื่อว่าทุกการเปลี่ยนแปลงเริ่มต้นจากน้ำหยดเล็กที่ไหลมารวมกัน</p> : <p>Former Urban Designer who loves to explore the world Interested in human behavior design And national development strategy It is believed that every change starts with a small droplet flowing together.</p>}
                    </div>
                </div>
            </BaseLayout>
            <Footer />
            </>
        )
}

export default About