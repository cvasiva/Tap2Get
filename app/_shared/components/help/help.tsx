"use client";
import React, { useState } from 'react';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import "../help/help.scss"
import { Col, Row } from 'reactstrap';
import house from '../../../_assets/images/house.png'
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa6";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
const Help = () => {
    const [page, setPage] = useState<number>(0)
    const handleClick = () => {
        setPage(1)
    }
    const [toggle1, setToggle1] = useState(false);
    const handledropdown = () => {
        setToggle1(!toggle1);
    };
    return (

        <div className={`${style.dashbordflex} m-auto`}>
            <div
                className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}
            >
                <div className={`${Style1.cardrest}`}>
                    <div className={Style1.itemcentermenu}>
                        <div className={`${Style1.toprestHelp} py-1`}>Help</div>
                    </div>
                    {page === 0 && <>
                        <div className='overflowhelp'>
                            <div className='fs-5 fw-bold ms-5 py-4'>Please Select What you Need Help With</div>
                            <Row>
                                <Col md={6}>
                                    <div className='ismyhelp' onClick={handleClick} style={{ cursor: "pointer" }}>
                                        <Row>
                                            <Col className='' md={2}>
                                                <div>
                                                    <Image src={house} alt='house' />
                                                </div>
                                            </Col>
                                            <Col className='' md={8}>
                                                <div className='fonthelpOutlet'>Is My Outlet Open on Tap2Get ?</div>
                                                <div className='helpfontFind'>Find out if your outlet is open or closed for
                                                    orders now</div>
                                            </Col>
                                            <Col className='' md={2}>
                                                <div className='d-flex justify-content-center py-4'><FaArrowRight size={30} style={{ color: "#CAE3B7" }} /></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='ismyhelp'>
                                        <Row>
                                            <Col className='' md={2}>
                                                <div>
                                                    <Image src={house} alt='house' />
                                                </div>
                                            </Col>
                                            <Col className='' md={8}>
                                                <div className='fonthelpOutlet'>Is My Outlet Open on Tap2Get ?</div>
                                                <div className='helpfontFind'>Find out if your outlet is open or closed for
                                                    orders now</div>
                                            </Col>
                                            <Col className='' md={2}>
                                                <div className='d-flex justify-content-center py-4'><FaArrowRight size={30} style={{ color: "#CAE3B7" }} /></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='ismyhelp'>
                                        <Row>
                                            <Col className='' md={2}>
                                                <div>
                                                    <Image src={house} alt='house' />
                                                </div>
                                            </Col>
                                            <Col className='' md={8}>
                                                <div className='fonthelpOutlet'>Is My Outlet Open on Tap2Get ?</div>
                                                <div className='helpfontFind'>Find out if your outlet is open or closed for
                                                    orders now</div>
                                            </Col>
                                            <Col className='' md={2}>
                                                <div className='d-flex justify-content-center py-4'><FaArrowRight size={30} style={{ color: "#CAE3B7" }} /></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={6}></Col>
                            </Row>



                        </div>
                    </>}
                    {page === 1 && <>
                        <div className='selectflexhelp'>
                            <div className='outletcardhelp'>
                                <div className='fs-5 fw-bold'>Select an Outlet to Proceed</div>
                                <div style={{ background: "#FFF", borderRadius: "9px" }} className='mt-5'>
                                    <div className='d-flex justify-content-between px-3 my-2 py-1 towncard'>
                                        <div>White town ,Pondicherry </div>
                                        <div>
                                            <div
                                                className="pointer py-2"
                                                style={{ transition: "all 1m ease" }}
                                                onClick={(e) => handledropdown()}
                                            >
                                                {toggle1 ? (
                                                    <BsChevronDown className=" fw-bold fs-5" />
                                                ) : (

                                                    <BsChevronUp className=" fw-bold fs-5" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {!toggle1 && (
                                        <div
                                            className="content_bspan"
                                            style={{ padding: "0.5rem" }}
                                        >
                                            <div className='Peramburfont py-2'>- Perambur , Chennai</div>
                                            <div className='Peramburfont py-2'>- Moolakulam  , Annai therasa street , pondy 10</div>
                                            <div className='Peramburfont py-2'>- Perambur , Chennai</div>
                                            <div className='Peramburfont py-2'>- Moolakulam  , Annai therasa street , pondy 10</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='outletcardhelp1'>
                                <div className='fs-5 fw-bold'>Select an order to Proceed</div>
                                <div className='ms-3 py-2'>Select order for which you are facing issue</div>
                                <div className='d-flex justify-content-center my-2'>
                                    <div className='hitkatcard'>
                                        <div>
                                            <div className='text-end pickhelp'>Picked Up</div>
                                            <div className='fonthelpOutlet ms-3'># 4512</div>
                                            <div className='helpfontFind ms-3'>5:32 PM | Kit kat shake </div>
                                            <div className='text-end pickhelp'>₹ 152.00</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center my-2'>
                                    <div className='hitkatcard'>
                                        <div>
                                            <div className='text-end pickhelp'>Picked Up</div>
                                            <div className='fonthelpOutlet ms-3'># 4512</div>
                                            <div className='helpfontFind ms-3'>5:32 PM | Kit kat shake </div>
                                            <div className='text-end pickhelp'>₹ 152.00</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center my-2'>
                                    <div className='hitkatcard'>
                                        <div>
                                            <div className='text-end pickhelp'>Picked Up</div>
                                            <div className='fonthelpOutlet ms-3'># 4512</div>
                                            <div className='helpfontFind ms-3'>5:32 PM | Kit kat shake </div>
                                            <div className='text-end pickhelp'>₹ 152.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
};
export default Help;
