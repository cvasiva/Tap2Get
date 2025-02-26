"use client";
import React, { useEffect, useState } from "react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineSettings,
    MdNotificationsActive,
} from "react-icons/md";

import style from "./Notification.module.scss"
import { BsX } from "react-icons/bs";
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Link from "next/link";
import profilelogo1 from "../../../_assets/images/profilelogo1.png"


interface Notification {
    id: number;
    name: string;
    order: string;
    description: string;
}



export const Tap2GetNotification = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [toggle, setToggle] = useState<boolean>(false);
    const [order, setOrder] = useState<{ [key: number]: boolean }>({});
    const [username, setUsername] = useState<string>('');
    useEffect(() => {
        setUsername('Joe Biden');
    }, []);

    const notification: Notification[] = [
        {
            id: 0,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
    ]

    const handledropdown = (item: Notification) => {
        setOrder((prevOrder) => ({ ...prevOrder, [item.id]: !prevOrder[item.id] }));
    };

    return (

        <>

            <div className="flex flex-wrap justify-center align-middle items-center md:justify-end">
                <div className="w-1/5 w-md-1/5 flex justify-end justify-md-end pointer">
                    <MdNotificationsActive
                        size={50}
                        className="FaRegBell w-3/5 border-[2px] text-[#96C872] py-2 my-2 mx-2 rounded-lg border-[#ABD28E] cursor-pointer max-w-[50px] w-full duration-150 hover:text-[#588A7A]"
                        onClick={() => setToggle(!toggle)}
                    />
                </div>

                <div
                    className={toggle ? `${style.responsive_nav} py-6 px-2 bg-[#5f9683] z-20 fixed shadow-[0px_5px_11px_#487164]` : ""}
                >
                    {toggle &&
                        <>
                            <div className="d-flex justify-content-between">

                                <div className={`px-3 pb-2 ${style.notifont}`}>
                                    Notification
                                </div>
                                <div>
                                    <BsX
                                        size={40}
                                        onClick={() => setToggle(!toggle)}
                                        style={{ cursor: 'pointer', marginTop: "-0.5rem" }}
                                    />
                                </div>
                            </div>

                            {notification.map((item, index) => {
                                return (
                                    <>
                                        <div className={style.carddniyal} key={item.id}>
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="flex gap-3 mt-2">
                                                        <div>
                                                            <Image
                                                                    src={profilelogo1}
                                                                    alt="profilelogo1"
                                                                    width={55}
                                                                />
                                                        </div>
                                                        <div className="">
                                                            <div className={style.Danial_font}>
                                                                {item.name}
                                                            </div>
                                                            <div className={style.m5font}>
                                                                you have get order ,{' '}
                                                                <span className={style.pizfont}>
                                                                    {item.order}
                                                                </span>{' '}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <button
                                                        className={`${style.Assbtn} px-3 py-1 my-4`}
                                                        onClick={(e) => handledropdown(item)}
                                                    >
                                                        {' '}
                                                        {order[item.id] ? (
                                                            <FaEyeSlash />
                                                        ) : (
                                                            <FaEye />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            {order[item.id] && (
                                                <div>
                                                    <hr />
                                                    <div
                                                        className={`${style.content_bspan} my-2 text-start px-2`}
                                                    >
                                                        {' '}
                                                        {item.description}{' '}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                );
                            })}
                        </>}
                </div>
                <div
                    className={`${style.widthprofile} FaUser  bg-white p-2 border-[1.5px] border-[#8C8C8C] rounded-full flex align-middle items-center duration-150 hover:scale-105 hover:shadown-[0px_0px_9px_#5a8d7d73] pointer`}
                >
                    <Link href="myprofile" rel="preload" className='flex text-decoration-none'>
                        <FaUser
                            size={35}
                            className="FaUsericon text-[#8C8C8C] border-[1px] border-[#8C8C8C] p-1.5 rounded-full mx-2"
                        />
                        <span className="text-black py-1">
                            {username}
                        </span>
                    </Link>
                </div>

            </div>
        </>
    );
};
