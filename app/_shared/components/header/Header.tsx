"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { FaEyeSlash, FaEye, FaUser } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { Disclosure } from '@headlessui/react';
// import style from '@/styles/home.module.scss';
import style from '../../../../styles/home.module.scss';
import headerStyles from './Header.module.scss';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdNotificationsActive } from "react-icons/md";
import { Tap2GetNotification } from "../../../_shared/components/notification/Notification";
interface Notification {
    id: number;
    name: string;
    order: string;
    description: string;
}
interface HeadingProps {
    title: string
}
const Header = () => {
    const [username, setUsername] = useState<string>('');
    useEffect(() => {
        setUsername('Joe Biden');
    }, []);
    const [toggle, setToggle] = useState<boolean>(false);
    const [order, setOrder] = useState<{ [key: number]: boolean }>({});
    const notification: Notification[] = [
        {
            id: 0,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
        {
            id: 1,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
        {
            id: 2,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
        {
            id: 3,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
        {
            id: 4,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
        {
            id: 5,
            name: "Danial",
            order: "chicken Pizza",
            description:
                "Lorem ipsum When a user activates a theme, they have an expectation of seeing their photos, theirs shop, their contributors and all of their content with a new style or twist.",
        },
    ];
    const handledropdown = (item: Notification) => {
        setOrder((prevOrder) => ({ ...prevOrder, [item.id]: !prevOrder[item.id] }));
    };
    useEffect(() => {
        if (Object.keys(order).length === 0) {
            const val: { [key: number]: boolean } = {};
            notification.forEach((v) => (val[v.id] = false));
            setOrder(val);
        }
    }, [notification, order]);
    const pathname = usePathname();

    let selectedTitle = '';

    switch (pathname) {
        case "/dashboard":
            selectedTitle = "Dashboard";
            break;
        case "/menu":
            selectedTitle = "Menu";
            break;
        case "/menueditor":
            selectedTitle = "Menu";
            break;
        case "/menuhistory":
            selectedTitle = "Menu";
            break;
        case "/profile":
            selectedTitle = "Profile";
            break;
        case "/ownerprofile":
            selectedTitle = "Profile";
            break;
        case "/orders":
            selectedTitle = "Order";
            break;
        case "/preparing":
            selectedTitle = "Order";
            break;
        case "/ready":
            selectedTitle = "Order";
            break;
        case "/postorders":
            selectedTitle = "Order";
            break;
        case "/settings":
            selectedTitle = "Setting";
            break;
        case "/help":
            selectedTitle = "Help";
            break;
        case "/todayspecial":
            selectedTitle = "Today Special";
            break;
        case "/myprofile":
            selectedTitle = "My Profile";
            break;
        default:
            break;
    }
    return (
        <div className={`${style.rondedhedr} px-6 py-3 bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px]`}>
            <div className="flex flex-wrap justify-between align-middle items-center">
                <div className="w-full md:w-3/6 textdashboard md:text-center">
                    <h1 className={`text-[#4C4C4C] ${style.proflefont} font-bold`}>
                        {selectedTitle}
                    </h1>
                </div>
                <div className="w-full md:w-3/6 m-auto">
                    <Tap2GetNotification />
                </div>
            </div>
        </div>
    )
}
export default Header