"use client";
import React, { useEffect, useState } from 'react';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { usePathname, useRouter } from "next/navigation"
import "../orders/orders.scss"
import { Input } from 'reactstrap';
import Link from 'next/link';
import { FiPrinter } from "react-icons/fi";
import biriyani from "../../../_assets/images/biriyani.png";
import Image from 'next/image';
import { FaIndianRupeeSign } from 'react-icons/fa6';
interface ArrivalTime {
    start: number;
    end: number;
}
const Ready = () => {
    // const getdata = JSON.parse(localStorage.getItem('selectedcat') || '{}')
    const pathname = usePathname()
    const menu = [
        { title: 'New', url: '/orders' },
        { title: 'Preparing', url: '/preparing' },
        { title: 'Ready', url: '/ready' },
        { title: 'Post Orders', url: '/postorders' },
    ];
    // const [categories, setCategories] = useState<Array<any>>([getdata]);
    const router = useRouter()
    const handleFoodReadt = () => {
        router.push('/postorders')
    }
    const [arrivalTime, setArrivalTime] = useState<ArrivalTime>({ start: 12, end: 14 });

    useEffect(() => {
        const fetchArrivalTime = async () => {
            const fetchedArrivalTime = { start: 10, end: 15 };
            setArrivalTime(fetchedArrivalTime);
        };

        fetchArrivalTime();
    }, []);
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
                <div className={style.cardmenu}>
                    <div className={Style1.menuflex}>
                        <div className={`${Style1.cardmenu18}`}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenuOrder} py-1`}>Order</div>
                            </div>
                            <div className={Style1.menuediterscrollPreparing}>
                                <div className={`${Style1.addflex} justify-content-end`}>
                                    <Input
                                        className={Style1.menuinpu}
                                        placeholder="Search"
                                    />
                                </div>
                                {/* {categories.map((cat, index) => ( */}
                                <div className={"activeiconorder"}>
                                    <div className={`${Style1.active}`}>
                                        <div className='idnuberfont'>
                                            {/* {cat.name} */}
                                        </div>
                                        <div className='orderfont1 d-flex'>
                                            {/* {cat.itemfor} */}
                                            <FaIndianRupeeSign className='pt-1' />
                                            {/* {cat.money} */}
                                        </div>
                                        <div className='orderfonttimepreparing pt-2'>Received
                                            {/* {cat.time} */}
                                            minutes ago</div>
                                    </div>
                                    <div>
                                        <div><input
                                            type="range"
                                            disabled
                                            min={0}
                                            max={23}
                                            step={1}
                                            value={arrivalTime.start}
                                        /></div>
                                        <div className='arivedfont'>10min</div>
                                        <div><input
                                            type="range"
                                            disabled
                                            min={0}
                                            max={23}
                                            step={1}
                                            value={arrivalTime.end}
                                        /></div>
                                        <div className='arivedfont'>Arrived</div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </div>
                        </div>
                        <div className={Style1.cardmenu181}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenuitem} py-1`}>Ready</div>
                            </div>
                            <div>
                                <div className='preparingflex'>
                                    <div>
                                        <div className='prebtnflex'>
                                            <div className='fontordernumber'># 1452187224
                                                {/* {categories[0]?.name} */}
                                            </div>
                                            <div><button className='Readybtn px-4'>Ready</button></div>
                                        </div>
                                        <div className='orderfont1 d-flex'>
                                            {/* {categories[0]?.itemfor} */}
                                            <FaIndianRupeeSign className='pt-1' />
                                            {/* {categories[0]?.money} */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-end'><FiPrinter size={30} /></div>
                                        <div className='orderfonttimepreparing pt-2'>25-05-2023  7:20</div>
                                    </div>
                                </div>
                                <hr />
                                <div className='menuediterscrollorders'>
                                    {/* {categories[0]?.submenu.map((act: string, index: number) => ( */}
                                    <>
                                        <div className='Chickenordermenu'>
                                            <div className='d-flex gap-2 my-1'>
                                                <div><Image src={biriyani} alt="biriyani" width={"50"} /></div>
                                                <div>
                                                    <div className='orderfont1'>
                                                        {/* {act} */}
                                                    </div>
                                                    <div className='orderfonttimepreparing d-flex pt-1'><FaIndianRupeeSign className='pt-1' />
                                                        {/* {categories[0]?.itemsmoney[index]} */}
                                                        X 1</div>
                                                    <div className='orderfonttimepreparing pt-1'>
                                                        {/* {categories[0]?.itemsadd[index]} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='fw-bold fs-6 my-2'>X 1</div>
                                        </div>
                                    </>
                                    {/* ))} */}
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <div className='pretimeorder'>
                                        <div className='Executeflex'>
                                            <div className='border-end w-100'>
                                                <div className='orderfont1'>Pre Time</div>
                                                <div className='orderfonttimepreparing py-2'>
                                                    {/* {categories[0]?.time} */}
                                                    min LEFT</div>
                                            </div>
                                            <div className='border-end w-100'>
                                                <div className='orderfont1'>Delivery Execute</div>
                                                <div className='orderfonttimepreparing py-2'>Arrived</div>
                                            </div>
                                            <div className='w-100'>
                                                <div className='orderfont1'>Grand Total</div>
                                                <div className='d-flex orderfonttimepreparing py-2'> <FaIndianRupeeSign className='pt-1' />
                                                    {/* {categories[0]?.money} */}
                                                    .00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='Stockflexorder my-3'>
                                    <button className='markbtn py-1'>Mark out of Stock</button>
                                    <button className='Foodbtn  py-1' onClick={handleFoodReadt}>Ready to Pick</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Ready;
