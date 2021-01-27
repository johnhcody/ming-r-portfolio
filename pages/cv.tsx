import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { Footer } from '../components/shared/Footer'
import Image from 'next/image'
import { useLanguage, useLanguageUpdate } from '../context/languageContext'
import { useGetUser } from '../actions/user'


interface Props {
    
}
interface State {
    
}

const Cv = (props: Props) => {
    const engLang = useLanguage();
    const toggleLang = useLanguageUpdate();
    const { loading, data } = useGetUser();
        return (
            <>
            <BaseLayout loading={loading} data={data}>
            <div className="about-wrapper">
                <div className="title-wrapper">
                    <h1>Thanks for taking a look at my CV</h1>
                </div>
                <div className="cv-block-wrapper">
                    <div className="img-and-text-wrapper">
                    <Image
                        src="/thailand.png"
                        height={200}
                        width={200}
                        ></Image>
                    <h2>Nat Geo</h2>
                    </div>
                            {engLang == true ? <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam. Elementum nibh tellus molestie nunc non. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nam at lectus urna duis convallis convallis tellus. Dictum sit amet justo donec. Ut tortor pretium viverra suspendisse potenti nullam. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Ligula ullamcorper malesuada proin libero nunc consequat. Pretium lectus quam id leo in vitae turpis.</p> : <p>จากนั้นไม่กี่ปีต่อมา รัฐบาลพม่าเริ่มเปลี่ยนแปลงระบบการศึกษา ส่งผลกระทบต่อมหาวิทยาลัย ทำให้การหยุดชะงักของปีการศึกษาเพิ่มมากขึ้น ดร.ซินเธีย ที่จบชั้นมัธยมปลายในปีนี้ต้องรอเวลาเกือบปี กว่าจะได้เข้าวิทยาลัยประจำภูมิภาค ที่ซึ่งเธอต้องเรียนอีก 2 ปีจึงจะเริ่มการศึกษาที่โรงเรียนแพทย์ได้  “ในช่วงที่เรียนแพทย์ ดิฉันและเพื่อนๆ เดินทางกลับไปเยี่ยมครอบครัวปีละสองครั้ง และทุกครั้งบนรถไฟและเรือที่เราโดยสาร มักมีคนหนุ่มสาวและวัยรุ่นที่ลาออกจากการเรียน ดิฉันมีเพื่อนที่ต้องลาออกจากโรงเรียนตั้งแต่มัธยมและมหาวิทยาลัย เพราะพวกเขาต้องทำงานหนัก เพื่อหารายได้ช่วยเหลือครอบครัว”</p>}
                </div>
                <div className="cv-block-wrapper">
                    <div className="img-and-text-wrapper">
                        <Image
                            src="/thailand.png"
                            height={200}
                            width={200}
                        ></Image>
                        <h2>Read the Cloud</h2>
                            </div>
                            {engLang == true ? <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam. Elementum nibh tellus molestie nunc non. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nam at lectus urna duis convallis convallis tellus. Dictum sit amet justo donec. Ut tortor pretium viverra suspendisse potenti nullam. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Ligula ullamcorper malesuada proin libero nunc consequat. Pretium lectus quam id leo in vitae turpis.</p> : <p>จากนั้นไม่กี่ปีต่อมา รัฐบาลพม่าเริ่มเปลี่ยนแปลงระบบการศึกษา ส่งผลกระทบต่อมหาวิทยาลัย ทำให้การหยุดชะงักของปีการศึกษาเพิ่มมากขึ้น ดร.ซินเธีย ที่จบชั้นมัธยมปลายในปีนี้ต้องรอเวลาเกือบปี กว่าจะได้เข้าวิทยาลัยประจำภูมิภาค ที่ซึ่งเธอต้องเรียนอีก 2 ปีจึงจะเริ่มการศึกษาที่โรงเรียนแพทย์ได้  “ในช่วงที่เรียนแพทย์ ดิฉันและเพื่อนๆ เดินทางกลับไปเยี่ยมครอบครัวปีละสองครั้ง และทุกครั้งบนรถไฟและเรือที่เราโดยสาร มักมีคนหนุ่มสาวและวัยรุ่นที่ลาออกจากการเรียน ดิฉันมีเพื่อนที่ต้องลาออกจากโรงเรียนตั้งแต่มัธยมและมหาวิทยาลัย เพราะพวกเขาต้องทำงานหนัก เพื่อหารายได้ช่วยเหลือครอบครัว”</p>}
                        </div>
                        
                <div className="cv-block-wrapper">
                    <div className="img-and-text-wrapper">
                        <Image
                            src="/thailand.png"
                            height={200}
                            width={200}
                        ></Image>
                        <h2>A Day Bulletin</h2>
                            </div>
                            {engLang == true ? <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam. Elementum nibh tellus molestie nunc non. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nam at lectus urna duis convallis convallis tellus. Dictum sit amet justo donec. Ut tortor pretium viverra suspendisse potenti nullam. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Ligula ullamcorper malesuada proin libero nunc consequat. Pretium lectus quam id leo in vitae turpis.</p> : <p>จากนั้นไม่กี่ปีต่อมา รัฐบาลพม่าเริ่มเปลี่ยนแปลงระบบการศึกษา ส่งผลกระทบต่อมหาวิทยาลัย ทำให้การหยุดชะงักของปีการศึกษาเพิ่มมากขึ้น ดร.ซินเธีย ที่จบชั้นมัธยมปลายในปีนี้ต้องรอเวลาเกือบปี กว่าจะได้เข้าวิทยาลัยประจำภูมิภาค ที่ซึ่งเธอต้องเรียนอีก 2 ปีจึงจะเริ่มการศึกษาที่โรงเรียนแพทย์ได้  “ในช่วงที่เรียนแพทย์ ดิฉันและเพื่อนๆ เดินทางกลับไปเยี่ยมครอบครัวปีละสองครั้ง และทุกครั้งบนรถไฟและเรือที่เราโดยสาร มักมีคนหนุ่มสาวและวัยรุ่นที่ลาออกจากการเรียน ดิฉันมีเพื่อนที่ต้องลาออกจากโรงเรียนตั้งแต่มัธยมและมหาวิทยาลัย เพราะพวกเขาต้องทำงานหนัก เพื่อหารายได้ช่วยเหลือครอบครัว”</p>}
                        </div>
                <div className="icons-wrapper">
                    <a href="public/CV_Mingkwan_Rattanakot 2021.pdf" download><i className="fas fa-cloud-download-alt"></i></a>
                </div>
            </div>
            </BaseLayout>
            <Footer />
            </>
        )
    
}

export default Cv
