"use client";
import React, { useEffect, useState } from "react";
import {
    FaAngleLeft,
    FaUserCog,
    FaDropbox,
    FaQuestionCircle,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineSettings,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
// import logo from "@/app/_assets/images/logo.png";
import logo from "../../../_assets/images/logo.png";
import offer from "../../../_assets/images/offer.png";
import bglogoside from "../../../_assets/images/bglogoside.png"
import orderbike from "../../../_assets/images/orderbike.png"
import "./sidemenu.module.scss"
import { _frontEndService } from "../../services/front-end/fron-end.service";
import { useRouter } from 'next/router';
interface Menu {
    title: string;
    icon: JSX.Element;
    link: string;
    submenus?: Menu[];
}
const SideNavbar = () => {
    const [open, setOpen] = useState<boolean>(true);
    const menu: Menu[] = [
        { title: "Dashboard", icon: <MdOutlineSpaceDashboard />, link: "/dashboard" },
        {
            title: "Menu", icon: <FaUserCog />, link: "/menu", submenus: [{ title: "Menu Editor", icon: <FaAngleLeft />, link: "/menueditor" },
            { title: "Menu History", icon: <FaAngleLeft />, link: "/menuhistory" },]
        },
        {
            title: "Profile",
            icon: <FontAwesomeIcon icon={faUserGroup} />,
            link: "/profile", submenus: [{ title: "Restaurant Owner Information", icon: <FaAngleLeft />, link: "/ownerprofile" }]
        },
        { title: "Orders", icon: <FaDropbox />, link: "/orders", submenus: [{ title: "Preparing", icon: <FaAngleLeft />, link: "/preparing" }, { title: "Ready", icon: <FaAngleLeft />, link: "/ready" }, { title: "Postorders", icon: <FaAngleLeft />, link: "/postorders" }] },
        { title: "Settings", icon: <MdOutlineSettings />, link: "/settings" },
        { title: "Help", icon: <FaQuestionCircle />, link: "/help" },
    ];
    const pathname = usePathname()
    return (
        <>
            <div>
                <div
                    className={`${open ? "w-72" : "w-20"
                        } hidden lg:block duration-300 p-3 h-screen relative`}
                >
                    <div
                        className={`logo mx-auto text-center bg-[#ffffff12] rounded-3xl ${!open ? "px-1 py-1 min-h-fit" : "px-0"
                            }`}
                    >
                        <Image
                            className={`${!open ? "w-full" : "max-w-[100px] w-full mx-auto"} ${!open && "rotate-[360deg]"
                                } duration-500 cursor-pointer hover:rotate-[360deg] hover:scale-110`}
                            src={logo}
                            alt="logo"
                        />
                        <p
                            className={`text-white origin-center text-[11px] duration-300 ${!open ? "scale-0 hidden" : "pb-2 block"
                                }`}
                        >
                            for business
                        </p>
                    </div>
                    <hr className="my-2 border-[#65a18e] border-[1.5px] shadow-sm" />
                    <ul className={`${open ? "px-4" : "px-1"} sidemenuC `}>
                        {menu?.map((menu, index) => (
                            <Link
                                key={index}
                                rel="preload"
                                href={menu.link}
                                passHref
                                className="text-decoration-none"
                            >
                                <li
                                    className={
                                        pathname === menu.link || (menu.submenus && menu.submenus.some(submenu => submenu.link === pathname))
                                            ? "text-[#588A7A] text-sm font-medium flex items-center border-2 border-transparent rounded-md gap-x-4 cursor-pointer mt-3 p-2 duration-150 bg-[#F6FFEF] hover:border-[#ABD28E] hover:text-[#588A7A] justify-center hover:scale-105 hover:shadow-[0px_2px_3px_#5b8c7d]"
                                            : "text-[#FFF] text-sm font-medium flex items-center border-2 border-transparent rounded-md gap-x-4 cursor-pointer mt-3 p-2 duration-150 hover:bg-[#FFF] hover:border-[#ABD28E] hover:text-[#588A7A] justify-center hover:scale-105 hover:shadow-[0px_2px_3px_#5b8c7d]"
                                    }
                                >
                                    <span className="text-2xl block float-left sideIcon">
                                        {menu.icon ? menu.icon : <FaAngleLeft />}
                                    </span>
                                    <span
                                        className={`text-base font-medium flex-1 ${!open && "hidden"
                                            }`}
                                    >
                                        {menu.title}
                                    </span>
                                </li>
                            </Link>
                        ))}
                        <ul className={`${open ? "px-2" : "px-0"} mb-3 `}>
                            <Link rel="preload" href="/todayspecial" className="text-decoration-none">
                                <li
                                    className={`todayspl text-white text-sm font-medium flex items-center bg-[#6fa27a5e] w-100 rounded-md gap-x-4 cursor-pointer mt-3 p-0 duration-150 justify-center hover:scale-110 hover:shadow-[-1px_3px_11px_#3c6256] border-2  ${open ? "border-[#74C870]" : "border-transparent"
                                        }`}
                                >
                                    <span
                                        className={`cursor-pointer my-3 whitespace-nowrap ${!open && "hidden"
                                            }`}
                                    >
                                        {" "}
                                        Today Special{" "}
                                    </span>
                                    <span className="text-2xl block float-right">
                                        <Image className="max-w-[45px]" src={offer} alt="offer" />
                                    </span>
                                </li>
                            </Link>
                        </ul>
                    </ul>
                    <div className="d-flex gap-1">
                        {!open ? "" : <div><Image src={bglogoside} alt="bglogoside" width={"80"} style={{ marginTop: "-2rem", marginLeft: "-1rem" }} /> </div>}
                        {!open ? "" : <div><Image src={orderbike} alt="orderbike" width={"80"} className="orderbike" /> </div>}
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="logout cursor-pointer position-fixed text-nowrap pb-2" style={{ bottom: "0%" }}>
                            <FontAwesomeIcon
                                icon={faSignOut}
                                className="text-2xl text-white float-left sideIcon"
                            />{" "}
                            <span
                                className={`text-base font-medium flex-1 text-white ms-2 ${!open && "hidden"
                                    }`}
                            >
                                Log out
                            </span>
                        </div>
                    </div>
                    <FaAngleLeft
                        size={35}
                        className={`absolute -right-3 py-2 px-1 w-[25px] top-2/4 bg-[#E2F6D3] text-[#588A7A] rounded-md cursor-pointer border-2 border-[#588A7A] hover:border-[#E2F6D3] hover:text-[#E2F6D3] hover:bg-[#588A7A] duration-300 hover:shadow-md ${!open && "rotate-180"
                            }`}
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="block lg:hidden">
                    <Disclosure as="nav">
                        <Disclosure.Button className="absolute top-3 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-[#ABD28E] hover:bg-gray-[#5b8e7e] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                            <GiHamburgerMenu
                                className="block lg:hidden h-6 w-6"
                                aria-hidden="true"
                            />
                        </Disclosure.Button>
                        <div className="py-6 px-2 h-screen bg-[#5f9683] z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 shadow-[0px_5px_11px_#487164]">
                            <div className="flex flex-col justify-start item-center">
                                <div
                                    className={`logo  text-center bg-[#ffffff12] rounded-3xl ${!open ? "px-1 py-1 min-h-fit" : "px-0"
                                        }`}
                                >
                                    <Image
                                        className={`${!open ? "w-full" : "max-w-[100px] w-full mx-auto"
                                            } ${!open && "rotate-[360deg]"
                                            } duration-500 cursor-pointer hover:rotate-[360deg] hover:scale-110`}
                                        src={logo}
                                        alt="logo"
                                    />
                                    <p
                                        className={`text-white origin-center text-[11px] duration-300 ${!open ? "scale-0 hidden" : "pb-2 block"
                                            }`}
                                    >
                                        for business
                                    </p>
                                </div>
                                <hr className="my-2 border-[#65a18e] border-[1.5px] shadow-sm" />
                                <ul className={`${open ? "px-4" : "px-1"} sidemenuC `}>
                                    {menu.map((menu, index) => (
                                        <Link
                                            key={index}
                                            rel="preload"
                                            href={menu.link}
                                            passHref
                                            className="text-decoration-none"
                                        >
                                            <li
                                                className={pathname === `${menu.link}` ? "text-[#588A7A] text-sm font-medium flex items-center border-2 border-transparent rounded-md gap-x-4 cursor-pointer mt-3 p-2 duration-150 bg-[#F6FFEF] hover:border-[#ABD28E] hover:text-[#588A7A] justify-center hover:scale-105 hover:shadow-[0px_2px_3px_#5b8c7d]"
                                                    : "text-[#FFF] text-sm font-medium flex items-center border-2 border-transparent rounded-md gap-x-4 cursor-pointer mt-3 p-2 duration-150 hover:bg-[#FFF] hover:border-[#ABD28E] hover:text-[#588A7A] justify-center hover:scale-105 hover:shadow-[0px_2px_3px_#5b8c7d]"
                                                }
                                            // onClick={() => handleMenuClick(menu.title)}
                                            >
                                                <span className="text-2xl block float-left sideIcon">
                                                    {menu.icon ? menu.icon : <FaAngleLeft />}
                                                </span>
                                                <span
                                                    className={`text-base font-medium flex-1 ${!open && "hidden"
                                                        }`}
                                                >
                                                    {menu.title}
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                    <ul className={`${open ? "px-2" : "px-0"} mb-3 `}>
                                        <Link rel="preload" href="/todayspecial" className="text-decoration-none">
                                            <li
                                                className={`todayspl text-white text-sm font-medium flex items-center bg-[#6fa27a5e] w-100 rounded-md gap-x-4 cursor-pointer mt-3 p-0 duration-150 justify-center hover:scale-110 hover:shadow-[-1px_3px_11px_#3c6256] border-2  ${open ? "border-[#74C870]" : "border-transparent"
                                                    }`}
                                            >
                                                <span
                                                    className={`cursor-pointer my-3 px-2 whitespace-nowrap ${!open && "hidden"
                                                        }`}
                                                >
                                                    {" "}
                                                    Today Special{" "}
                                                </span>
                                                <span className="text-2xl block float-right">
                                                    <Image className="max-w-[45px]" src={offer} alt="offer" />
                                                </span>
                                            </li>
                                        </Link>
                                    </ul>
                                </ul>
                                <div className="logout duration-200 text-center cursor-pointer">
                                    <FontAwesomeIcon
                                        icon={faSignOut}
                                        className="max-w-[30px] w-full faSignOut rotate-180"
                                    />{" "}
                                    <span
                                        className={`text-base font-medium flex-1 text-white ${!open && "hidden"
                                            }`}
                                    >
                                        Log out
                                    </span>
                                </div>
                                {/* <div className=" my-4 border-b border-gray-100 pb-4">
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Settings
                                    </h3>
                                </div>
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        More
                                    </h3>
                                </div>
                            </div>
                            <div className=" my-4">
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Logout
                                    </h3>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </Disclosure>
                </div>
            </div>
        </>
    );
};
export { SideNavbar };
