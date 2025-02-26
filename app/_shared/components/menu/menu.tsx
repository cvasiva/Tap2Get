"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"
import Link from "next/link";
import { FormGroup, Input } from "reactstrap";
import Style1 from "./menupage.module.scss";
import style from "../../../../styles/home.module.scss";
interface MenuItem {
    title: string;
    url: string;
}
interface SubMenuItem {
    id: number;
    southitem: string;
    submenu: string[];
}
const Menu: React.FC = () => {
    const pathname = usePathname()
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectCheck, setSelectCheck] = useState<number[]>([]);
    const menu: MenuItem[] = [
        { title: "Item Availability", url: "/menu" },
        { title: "Menu Editor", url: "/menueditor" },
        { title: "History of menu changes", url: "/menuhistory" },
    ];
    const soutMenu: SubMenuItem[] = [
        {
            id: 0,
            southitem: "South Indian",
            submenu: ["South Indian", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
        },
        {
            id: 1,
            southitem: "Dessert",
            submenu: ["Dessert", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
        },
        {
            id: 2,
            southitem: "Lunch",
            submenu: ["Lunch", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
        },
        {
            id: 3,
            southitem: "Combo",
            submenu: ["Combo", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
        },
        {
            id: 5,
            southitem: "icecreams",
            submenu: ["icecreams", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
        },
        {
            id: 6,
            southitem: "icecreams",
            submenu: ["Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal", "icecreams"],
        },
    ];
    // const handleFormChange = (id: number) => {
    //   setSelectCheck((prev) => {
    //     const isChecked = prev.includes(id);
    //     const updatedItems = isChecked ? prev.filter((item) => item !== id) : [...prev, id];
    //     setSelectedItems(updatedItems);
    //     return updatedItems;
    //   });
    // };
    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };
    useEffect(() => {
        const southIndianCategory = soutMenu.find((item) => item.southitem === "South Indian");
        if (southIndianCategory) {
            setSelectedCategory(southIndianCategory.id);
        }
    }, []);
    return (
        <div className={`${style.dashbordflex} m-auto`}>
            <div className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}>
                <div className={style.cardmenu}>
                    <div className={style.btnflex}>
                        {menu.map((item, index) => (
                            <div key={index}>
                                <Link rel="preload" href={item.url}>
                                    <button
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
                        ))}
                    </div>
                    <div className={Style1.menuflex}>
                        <div className={Style1.cardmenu18}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenu} py-1`}>Category I 18</div>
                            </div>
                            <div
                                className={Style1.menuediterscroll}
                            >
                                <div className={Style1.addflex}>
                                    {/* <button className={Style1.addbtnrest}>+ Add New</button> */}
                                    <div></div>
                                    <Input
                                        className={Style1.menuinpu}
                                        placeholder="Search"
                                    />
                                </div>
                                {soutMenu.map((p, index) => (
                                    <div
                                        key={index}
                                        className={` ${selectedCategory === p.id
                                            ? ` ${Style1.active} ${Style1.southmenuactivemenu} `
                                            : `${Style1.southmenu}`
                                            }`}
                                        onClick={() => handleCategoryClick(p.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className={selectedCategory === p.id ? `${Style1.active} py-1` : "py-1"}>
                                            {p.southitem}
                                        </div>
                                        <FormGroup switch>
                                            <Input
                                                type="switch"
                                                role="switch"
                                                className={Style1.switchinput}
                                            // key={index}
                                            // onChange={() => handleFormChange(p.id)}
                                            />
                                        </FormGroup>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style1.cardmenu181}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenuitem} py-1`}>Item I 5</div>
                            </div>
                            <div
                                className={Style1.menuediterscroll}
                            >
                                <div className={Style1.addflex}>
                                    <div></div>
                                    {/* <button className={Style1.addbtnrest}>+ Add New</button> */}
                                    <Input
                                        className={Style1.menuinpuitem}
                                        placeholder="Search"
                                    />
                                </div>
                                {selectedCategory !== null && (
                                    <div>
                                        {selectedCategory !== null && (
                                            <div>
                                                {soutMenu
                                                    .find((item) => item.id === selectedCategory)
                                                    ?.submenu.map((act: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className={`${Style1.southmenuitem} ${selectedItems.includes(index) ? `${Style1.active}` : ""
                                                                }`}
                                                        >
                                                            <div className="py-1">{act}</div>
                                                            <FormGroup switch>
                                                                <Input
                                                                    type="switch"
                                                                    role="switch"
                                                                    className={Style1.switchinput}
                                                                // checked={true}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Menu;
