"use client";
import React from 'react';
import style from '../../../../styles/home.module.scss';
import { Col, Row } from 'antd';
import { IoSettingsSharp } from "react-icons/io5";
import settingsstyle from "../../../../styles/setting.module.scss"
import Style1 from '../menu/menupage.module.scss';
import { BiSolidLockOpen } from "react-icons/bi";
import { MdSms } from "react-icons/md";
import { IoCodeWorkingSharp } from "react-icons/io5";
import { RiAdvertisementLine } from "react-icons/ri";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Settings = () => {
    return (

        <div className={`${style.dashbordflex} m-auto`}>
            <div
                className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}
            >
                <div className={`${Style1.cardrest}`}>
                    <div className={Style1.itemcentermenu}>
                        <div className={`${Style1.toprestSettings} py-1`}>Settings</div>
                    </div>
                    <div className={settingsstyle.overflowsetting}>
                        <Row className={settingsstyle.marginsettings}>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={6}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><IoSettingsSharp className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={18} className="px-1">
                                            <div className={settingsstyle.Generalfont}>General Setting</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={6}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><LiaFileInvoiceDollarSolid className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={18} className="px-1">
                                            <div className={settingsstyle.Generalfont}>Billing plan</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={6}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><MdSms className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={18} className="px-1">
                                            <div className={settingsstyle.Generalfont}>SMS Setting</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className={settingsstyle.marginsettings}>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={5}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><IoCodeWorkingSharp className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={19} className="px-1">
                                            <div className={settingsstyle.Generalfont}>Market intellgence Setting</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={6}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><RiAdvertisementLine className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={18} className="px-1">
                                            <div className={settingsstyle.Generalfont}>Advertising</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={8} className="px-1" style={{ cursor: "pointer" }}>
                                <div className={settingsstyle.settingcard}>
                                    <Row>
                                        <Col md={6}>
                                            <div className={`${settingsstyle.iconcard}  d-flex justify-content-center`}><BiSolidLockOpen className="h-100 w-75" /></div>
                                        </Col>
                                        <Col md={18} className="px-1">
                                            <div className={settingsstyle.Generalfont}>Security Setting</div>
                                            <div className={settingsstyle.Viewfontsetting}>View and update your store detials</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settings;
