"use client";
import React, { useEffect, useState } from 'react';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { usePathname, useRouter } from "next/navigation"
import "../orders/orders.scss"
import { FaCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Col, Row } from 'antd';
import Image from 'next/image';
import orderprofile from "../../../_assets/images/orderprofile.png"
import biriyani from "../../../_assets/images/biriyani.png"
import Chicken from "../../../_assets/images/Chicken.png"
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from 'next/link';
import { MdOutlineTimer } from "react-icons/md";
interface Orders {
    id: number;
    item: string;
}
const Orders = () => {
    const pathname = usePathname()
    const menu = [
        { title: 'New', url: '/orders' },
        { title: 'Preparing', url: '/preparing' },
        { title: 'Ready', url: '/ready' },
        { title: 'Post Orders', url: '/postorders' },
    ];
    const order: Orders[] = [
        {
            id: 0,
            item: "Chicken Briyani",
        },
        {
            id: 1,
            item: "Chicken Briyani",
        },
        {
            id: 2,
            item: "Chicken Briyani",
        },
        {
            id: 3,
            item: "Chicken Briyani",
        },
        {
            id: 4,
            item: "Chicken Briyani",
        },
        {
            id: 5,
            item: "Chicken Briyani",
        },
        {
            id: 6,
            item: "Chicken Briyani",
        },
    ];
    const router = useRouter()
    const handlenext = () => {
        router.push('/preparing')
    }
    const text = ' basmati rice, chicken thighs, hung curd, onion, tomato, milk, saffron';

    const [orderlist, setOrderlist] = useState<{ [key: number]: boolean }>({});
    const handledropdown = (item: Orders) => {
        setOrderlist((prevOrder) => ({ ...prevOrder, [item.id]: !prevOrder[item.id] }));
    };
    useEffect(() => {
        if (Object.keys(orderlist).length === 0) {
            const val: { [key: number]: boolean } = {};
            order.forEach((v) => (val[v.id] = false));
            setOrderlist(val);
        }
    }, [order, orderlist]);
    return (

        <div className={`${style.dashbordflex} m-auto`}>
            <div
                className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}
            >
                <div className={style.cardmenu}>
                    <div className='ordercard'>
                        <div className={style.btnflex}>
                            {menu.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Link rel="preload" href={item.url}>
                                            <button
                                                key={index}
                                                className={
                                                    pathname === `${item.url}`
                                                        ? `${style.Restaurantbtn} py-2 px-4`
                                                        : `${style.Restaurantbtnunactive} px-4 py-2`
                                                }
                                            >
                                                {item.title}
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={`${Style1.cardrest}`}>
                    <div className={Style1.itemcentermenu}>
                        <div className="py-1 orderliststyle">Order List</div>
                    </div>
                    <div className='orderslistflex'>
                        <div className='cardorderlist'>
                            <div className=''>
                                <div className='cardorder5 py-2'> <div className='d-flex justify-content-end text-end'><FaCheckCircle className='CheckCircle' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='cardorderclose py-2'> <div className='d-flex justify-content-end text-end'><RiCloseCircleFill className='CheckCircleclose' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='cardorderTimer py-2'> <div className='d-flex justify-content-end text-end'><MdOutlineTimer className='CheckCircleTimer' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='cardorder5 py-2'> <div className='d-flex justify-content-end text-end'><FaCheckCircle className='CheckCircle' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='cardorderclose py-2'> <div className='d-flex justify-content-end text-end'><RiCloseCircleFill className='CheckCircleclose' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='cardorderTimer py-2'> <div className='d-flex justify-content-end text-end'><MdOutlineTimer className='CheckCircleTimer' size={30} /></div>
                                    <div>#5412</div>
                                </div>
                                <div className='py-3' style={{ visibility: "hidden" }}><div>#5412</div></div>
                            </div>

                        </div>
                        <div className='cardorderlist1'>
                            <Row>
                                {order?.map((p: any, i: number) => {
                                    return (
                                        <>
                                            <Col md={8} key={i}>
                                                <div className='orderchicken'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='ms-2'>
                                                            <div className='orderfont'>Order #5412</div>
                                                            <div className='orderfonttime'>15 feb 2023 , 05:45 PM</div>
                                                        </div>
                                                        <div><Image src={orderprofile} alt="orderprofile" width={"40"} /></div>
                                                    </div>
                                                    <div className='Chickenscroll'>
                                                        <div className='d-flex gap-1 my-4'>
                                                            <div><Image src={biriyani} alt="biriyani" width={"100"} /></div>
                                                            <div className='ms-2'>
                                                                <div className='orderfont1'>{p.item} </div>
                                                                <div className='orderfonttime1 d-flex'><FaIndianRupeeSign className='pt-1' />  230.00 X 1</div>
                                                                <div className='orderfonttime1'>
                                                                    {orderlist[p.id] ? text : text.slice(0, 50)}
                                                                    <span
                                                                        onClick={() => handledropdown(p)}
                                                                        className="read-or-hide"
                                                                        style={{ cursor: "pointer", color: "#74a650" }}
                                                                    >
                                                                        {orderlist[p.id] ? " show less" : "...read more"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex gap-1 my-4'>
                                                            <div><Image src={Chicken} alt="Chicken" width={"50"} /></div>
                                                            <div className='ms-2'>
                                                                <div className='orderfont1'>Chilly peri- peri Chicken </div>
                                                                <div className='orderfonttime1 d-flex'><FaIndianRupeeSign className='pt-1' /> 230.00 X 1</div>
                                                                <div className='orderfonttime1'>Very spiece</div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='d-flex gap-1 my-4'>
                                                            <div><Image src={Chicken} alt="Chicken" width={"50"} /></div>
                                                            <div className='ms-2'>
                                                                <div className='orderfont1'>Chilly peri- peri Chicken </div>
                                                                <div className='orderfonttime1 d-flex'><FaIndianRupeeSign className='pt-1' /> 230.00 X 1</div>
                                                                <div className='orderfonttime1'>Very spiece</div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                    <div className='d-flex justify-content-between my-2'>
                                                        <div className='orderfont d-flex ms-2 py-1'><FaIndianRupeeSign className='pt-1' /> 542.00</div>
                                                        <div className='d-flex gap-2'>
                                                            <button className=' Closebtnorder px-1'><AiOutlineClose className='' size={30} /></button>
                                                            <button className='checkbtnorder px-1' onClick={handlenext}><FaCheck className='' size={30} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col >
                                        </>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Orders;
