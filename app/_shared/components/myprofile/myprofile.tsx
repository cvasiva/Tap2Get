"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { Col, Row } from 'antd';
import { BsPersonFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import myprofilestyle from '../../../../styles/myprofile.module.scss'
interface ProfileData {
    Name: string;
    Mobile_number: string;
    Address: string;
    Mail_Id: string;
    WhatsupNumber: string;
    Pincode: string;
    City: string;
}
const Myprofile = () => {
    // const getdata: ProfileData = JSON.parse(localStorage.getItem('profiledeta') || '{}');
    const [myProfile, setMyProfile] = useState<ProfileData>();

    return (

        <div className={`${style.dashbordflex} m-auto`}>
            <div
                className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}
            >
                <div className={`${Style1.cardrest}`}>
                    <div className={Style1.itemcentermenu}>
                        <div className={`${Style1.toprestdetails} py-1`}>Myprofile</div>
                    </div>
                    <div className={Style1.overflowprofilemyprofile}>
                        <div className={`bg-[rgba(226, 245, 211, 0.38)] mt-3 border-[#D1D1D1] border-[1.5px] ${myprofilestyle.mybgborder}`}>
                            <Row>
                                <Col md={18}>
                                    <div className={myprofilestyle.myflex}>
                                        <div className={`${myprofilestyle.prfileround} pt-3 d-flex justify-content-center`}>
                                            <BsPersonFill className="w-75 h-75 text-[#74A650]" />
                                            {/*<img src={profilelogo1} alt="profilelogo1" style={{width:"100%"}}/>*/}
                                        </div>
                                        <div className="py-4">
                                            <div className={myprofilestyle.mynamefont}>{myProfile?.Name}</div>
                                            <div className={myprofilestyle.myownerfont}>Owner</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} className="text-end">
                                    <Link rel="preload" href="/ownerprofile" className='text-decoration-none'><div className="d-flex justify-content-end"><button className={`${myprofilestyle.mybtnedit} py-2 px-3`}><FaEdit /> Edit</button></div></Link>
                                </Col>
                            </Row>
                        </div>
                        <div className={`bg-[rgba(226, 245, 211, 0.38)] mt-3 border-[#D1D1D1] border-[1.5px] ${myprofilestyle.mybgborder}`}>
                            <Row>
                                <Col md={18}>
                                    <div className={myprofilestyle.mynamefont}>Personal Information</div>
                                    <Row>
                                        <Col md={12}>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>First Name</div>
                                                <div className={myprofilestyle.Kapilfont}>{myProfile?.Name}</div>
                                            </div>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Email address</div>
                                                <div className={myprofilestyle.Kapilfont}>{myProfile?.Mail_Id}</div>
                                            </div>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Bio</div>
                                                <div className={myprofilestyle.Kapilfont}>Owner</div>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Last Name </div>
                                                <div className={myprofilestyle.Kapilfont}>Anto</div>
                                            </div>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Phone number</div>
                                                <div className={myprofilestyle.Kapilfont}>{myProfile?.Mobile_number}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Link rel="preload" href="/ownerprofile" className='text-decoration-none'><div className="d-flex justify-content-end "><button className={`${myprofilestyle.mybtnedit} py-2 px-3`}><FaEdit /> Edit</button></div></Link>
                                </Col>
                            </Row>
                        </div>
                        <div className={`bg-[rgba(226, 245, 211, 0.38)] mt-3 border-[#D1D1D1] border-[1.5px] ${myprofilestyle.mybgborder}`}>
                            <Row>
                                <Col md={18}>
                                    <div className={myprofilestyle.mynamefont}>Address</div>
                                    <Row>
                                        <Col md={12}>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Country</div>
                                                <div className={myprofilestyle.Kapilfont}>India</div>
                                            </div>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>Postal code</div>
                                                <div className={myprofilestyle.Kapilfont}>{myProfile?.Pincode}</div>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="py-2">
                                                <div className={myprofilestyle.firstmyfont}>City / State</div>
                                                <div className={myprofilestyle.Kapilfont}>{myProfile?.City}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Link rel="preload" href="/ownerprofile" className='text-decoration-none'><div className="d-flex justify-content-end"><button className={`${myprofilestyle.mybtnedit} py-2 px-3`}><FaEdit /> Edit</button></div></Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Myprofile;
