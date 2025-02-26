"use client";
import { useState, useEffect } from "react";
import { FormGroup, Input } from "reactstrap";
import Style1 from "../menu/menupage.module.scss";
import style from "../../../../styles/home.module.scss";
interface SubMenuItem {
    id: number;
    southitem: string;
    submenu: string[];
    itemmoney: string[];
}
const Todayspecial: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectCheck, setSelectCheck] = useState<number[]>([]);
    const soutMenu: SubMenuItem[] = [
        {
            id: 0,
            southitem: "South Indian",
            submenu: ["South Indian", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
        {
            id: 1,
            southitem: "Dessert",
            submenu: ["Dessert", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
        {
            id: 2,
            southitem: "Lunch",
            submenu: ["Lunch", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
        {
            id: 3,
            southitem: "Combo",
            submenu: ["Combo", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
        {
            id: 5,
            southitem: "icecreams",
            submenu: ["icecreams", "Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
        {
            id: 6,
            southitem: "icecreams",
            submenu: ["Gulab Jumun", "Bread Halwa", "Rasmalai", "Moong Dal", "icecreams"],
            itemmoney: ["₹450.00", "₹450.00", "₹450.00", "₹450.00", "₹450.00"],
        },
    ];
    const handleFormChange = (id: number) => {
        setSelectCheck((prev) => {
            const isChecked = prev.includes(id);
            const updatedItems = isChecked ? prev.filter((item) => item !== id) : [...prev, id];
            setSelectedItems(updatedItems);
            return updatedItems;
        });
    };
    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };
    useEffect(() => {
        const southIndianCategory = soutMenu.find((item) => item.southitem === "Lunch");
        if (southIndianCategory) {
            setSelectedCategory(southIndianCategory.id);
        }
    }, []);
    return (
        <div className={`${style.dashbordflex} m-auto`}>
            <div className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}>
                <div className={style.cardmenu}>
                    <div className={Style1.menuflex}>
                        <div className={`${Style1.cardmenu18}`}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenu} py-1`}>Category I 18</div>
                            </div>
                            <div
                                className={Style1.todayspecialscroll}
                            >
                                <div className={`${Style1.addflex} justify-content-end`} style={{ visibility: "hidden" }}>
                                    <Input
                                        className={Style1.menuinpu}
                                        placeholder="Search"
                                    />
                                </div>
                                {soutMenu.map((p, index) => (
                                    <div
                                        key={index}
                                        style={{ cursor: "pointer" }}
                                        className={` ${selectedCategory === p.id
                                            ? ` ${Style1.active} ${Style1.southmenuactivemenu} `
                                            : `${Style1.southmenu}`
                                            }`}
                                        onClick={() => handleCategoryClick(p.id)}
                                    >
                                        <div className={selectedCategory === p.id ? `${Style1.active} py-1` : "py-1"} >
                                            {p.southitem}
                                        </div>
                                        <FormGroup switch>
                                            <Input
                                                type="switch"
                                                role="switch"
                                                className={Style1.switchinput}
                                                key={index}
                                                onChange={() => handleFormChange(p.id)}
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
                                className={Style1.todayspecialscroll}
                            >
                                <div className={`${Style1.addflex} justify-content-end`}>
                                    <Input
                                        className={Style1.menuinpu}
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
                                                            <div>
                                                                <div>{act}</div>
                                                                <div style={{ fontSize: "10px" }}>{soutMenu.find(cat => cat.id === selectedCategory)?.itemmoney[index]}</div>
                                                            </div>
                                                            <FormGroup switch>
                                                                <Input
                                                                    type="switch"
                                                                    role="switch"
                                                                    className={Style1.switchinput}
                                                                    checked={true}
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
export default Todayspecial;
