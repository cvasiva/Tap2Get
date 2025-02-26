"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { usePathname } from "next/navigation"
import { Input } from 'reactstrap';
import { FaChevronRight, FaEdit } from 'react-icons/fa';
import { FaAnglesRight } from 'react-icons/fa6';

const Menuhistory: React.FC = () => {
    const menu = [
        { title: 'Item Availability', url: '/menu' },
        { title: 'Menu Editor', url: '/menueditor' },
        { title: 'History of menu changes', url: '/menuhistory' },
    ];
    const pathname = usePathname()
    const [categories, setCategories] = useState<Array<any>>([
        {
            id: 0,
            name: 'All Changes',
            submenu: [
                'Gulab Jamun',
                'Rasmalai',
            ],
            btntype: "APPROVED"
        },
        {
            id: 1,
            name: 'Approved',
            submenu: [
                'Gulab Jamun',
                'Rasmalai',
            ],
            btntype: "APPROVED"
        },
        {
            id: 2,
            name: 'Rejected by Tap2get',
            submenu: [
                'Beef Briyani',
                'Fruit Beer',
            ],
            btntype: "REJECTED"
        },
        {
            id: 3,
            name: 'Cancelled',
            submenu: [
                'Hot Burger',
            ],
            btntype: "CANCELLED"
        },
    ]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    const [editCategory, setEditCategory] = useState<string>('');
    const [editItem, setEditItem] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
    const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
        setEditCategory('');
        setIsEditing(false);
        setIsAddingItem(false);
        if (categoryId !== selectedCategory) {
            const selectedCategoryItems =
                categories.find((cat) => cat.id === categoryId)?.submenu || [];
            setSelectedItems(selectedCategoryItems);
        } else {
            setSelectedItems([]);
        }
    };
    const handleSaveEditCategory = (category: any) => {
        if (isNewCategory) {
            setCategories((prev) => [
                ...prev,
                { id: prev.length, name: editCategory, submenu: [] },
            ]);
        } else {
            setCategories((prev) => {
                const updatedCategories = prev.map((cat) => {
                    if (cat.id === category.id) {
                        return { ...cat, name: editCategory };
                    }
                    return cat;
                });
                return updatedCategories;
            });
        }
        setEditCategory('');
        setIsEditing(false);
        setIsNewCategory(false);
        setIsAddingCategory(false);
    };
    const handleAddItem = () => {
        setIsAddingItem(true);
        setIsEditing(true);
        setIsNewCategory(false);
        setIsAddingCategory(false);
    };
    const handleAddNewItem = () => {
        if (editItem.trim() !== '') {
            setCategories((prev) => {
                const updatedCategories = prev.map((cat) => {
                    if (cat.id === selectedCategory) {
                        return { ...cat, submenu: [...cat.submenu, editItem] };
                    }
                    return cat;
                });
                return updatedCategories;
            });
            setEditItem('');
        }
    };
    useEffect(() => {
        const initialCategory = categories.find(
            (cat) => cat.name === 'Approved'
        );
        if (initialCategory) {
            setSelectedCategory(initialCategory.id);
            setSelectedItems(initialCategory.submenu);
        }
    }, [categories]);

    const getColorByType = (type: string) => {
        switch (type) {
            case "APPROVED":
                return "#588A7A";
            case "REJECTED":
                return "#D88282";
            case "CANCELLED":
                return "#EEA443";
            default:
                return "#000000";
        }
    };

    return (

        <div className={`${style.dashbordflex} m-auto`}>
            <div
                className={`${style.contentPart} bg-[#F4F8E2] border-[#D1D1D1] border-[1.5px] ${Style1.menuwidth}`}
            >
                <div className={style.cardmenu}>
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
                <div className={Style1.menuflex}>
                    <div className={Style1.cardmenu18}>
                        <div className={Style1.itemcentermenu}>
                            <div className={`${Style1.toprestmenu} py-1`}>Category I 18</div>
                        </div>
                        <div
                            className={Style1.menuediterscroll}
                        >
                            <div className={Style1.addflex} style={{ visibility: "hidden" }}>
                                <div></div>
                                <Input
                                    className={Style1.menuinpuitem}
                                    placeholder="Search"
                                />
                            </div>
                            {categories.map((cat, index) => (
                                <div
                                    key={index}
                                    className={
                                        selectedCategory === cat.id
                                            ? `${Style1.activeiconsouth}`
                                            : ""
                                    }
                                >
                                    <div
                                        className={` ${selectedCategory === cat.id
                                            ? `${Style1.active} ${Style1.southmenuactive}`
                                            : `${Style1.southmenuedit}`
                                            }`}
                                    >
                                        <div className="flex justify-between"
                                            onClick={() => handleCategoryClick(cat.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div
                                                className={
                                                    selectedCategory === cat.id ? `${Style1.active}` : ""
                                                }
                                            >
                                                {cat.name}
                                            </div>
                                            <div>
                                                <FaChevronRight
                                                    size={20}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {selectedCategory === cat.id && (
                                        <div className="mt-6">
                                            <FaAnglesRight size={25}
                                                style={{ color: "#588A7A", cursor: "pointer" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isEditing && isAddingCategory && (
                                <>
                                    <div
                                        className={` ${selectedCategory
                                            ? `${Style1.active} ${Style1.southmenuactive}`
                                            : `${Style1.southmenuedit}`
                                            }`}
                                    >
                                        <div className={`${Style1.Entermenunamefont} py-1 mb-1`}>
                                            Enter Your Menu
                                        </div>
                                        <div className="d-flex justify-content-between gap-2">
                                            <Input
                                                type="text"
                                                value={editCategory}
                                                onChange={(e) =>
                                                    setEditCategory(e.target.value)
                                                }
                                                className={`${Style1.menuinpuedit}`}
                                            />
                                            <button
                                                className={`${Style1.savebtnmenuedit} px-3`}
                                                onClick={() =>
                                                    handleSaveEditCategory(selectedCategory)
                                                }
                                            >
                                                {isNewCategory ? "save" : <FaEdit />}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                {/* <button
                                    className={Style1.addbtnrest}
                                    onClick={handleAddItem}
                                    disabled={isNewCategory}
                                >
                                    + Add New
                                </button> */}
                                <Input
                                    className={Style1.menuinpuitem}
                                    placeholder="Search"
                                />
                            </div>
                            {selectedCategory !== null && (
                                <div>
                                    {categories
                                        .find((item) => item.id === selectedCategory)
                                        ?.submenu.map((act: string, index: number) => (
                                            <div
                                                key={index}
                                                className={`${Style1.southmenuitemHistory} ${selectedItems.includes(act) ? `${Style1.active}` : ""
                                                    }`}
                                            >
                                                <div className='d-flex'>
                                                    <div className={`${Style1.addednewbtn} py-2 px-1`}>
                                                        <div className={`${Style1.addednewbtn1} py-2 px-1`}>New Item Added</div>
                                                    </div>
                                                    <div className={`${Style1.specialstyle} my-3`}>
                                                        <div className={Style1.Gulabfont}>{act}</div>
                                                        <div className={Style1.Todayspecial}>Today special </div>
                                                        <div className={`${Style1.Reffont} pt-4`} >Ref ID  :  35610689</div>
                                                    </div>
                                                </div>
                                                <div className={Style1.histortmy}>
                                                    <button className={`${Style1.APPROVEDbtn} py-2 px-4`} style={{ background: getColorByType(categories.find(cat => cat.id === selectedCategory)?.btntype || '') }}>{categories.find(cat => cat.id === selectedCategory)?.btntype}</button>
                                                    <div className={Style1.timeonmenu}>on 2023-05-25  09:05 p.m</div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                            {isEditing && isAddingItem && (
                                <>
                                    <div
                                        className={` ${selectedCategory
                                            ? `${Style1.active} ${Style1.southmenuactive}`
                                            : `${Style1.southmenuedit}`
                                            }`}
                                    >
                                        <div className={`${Style1.Entermenunamefont} py-1 mb-1`}>
                                            Enter New Item
                                        </div>
                                        <div className="d-flex justify-content-between gap-2">
                                            <Input
                                                type="text"
                                                value={editItem}
                                                onChange={(e) => setEditItem(e.target.value)}
                                                className=""
                                            />
                                            <button
                                                className={`${Style1.savebtnmenuedit} px-3`}
                                                onClick={handleAddNewItem}
                                            >
                                                Enter
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Menuhistory;
