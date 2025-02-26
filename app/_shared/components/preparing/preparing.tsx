"use client";
import React, { useEffect, useState } from 'react';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { usePathname, useRouter } from "next/navigation"
import "../orders/orders.scss"
import { Input } from 'reactstrap';
import Link from 'next/link';
import { FiPrinter } from "react-icons/fi";
import Image from 'next/image';
import { FaIndianRupeeSign } from 'react-icons/fa6';
interface ArrivalTime {
    start: number;
    end: number;
}
const Preparing = () => {
    const pathname = usePathname()
    const router = useRouter()
    const menu = [
        { title: 'New', url: '/orders' },
        { title: 'Preparing', url: '/preparing' },
        { title: 'Ready', url: '/ready' },
        { title: 'Post Orders', url: '/postorders' },
    ];
    const [page, setPage] = useState<number>(0)
    const [categories, setCategories] = useState<Array<any>>([
        {
            id: 0,
            name: '5412',
            imageites: ['biriyani.png', 'Chicken.png', 'greapitem.png'],
            itemfor: '3 item for',
            money: '542',
            time: '10',
            itemsadd: ['basmati rice... ', 'Very spiece'],
            itemsmoney: [
                '230.00',
                '200.00',
                '170.00',
            ],
            submenu: [
                'Chicken Briyani',
                'Chilly peri- peri Chicken',
                'Grapes Juice',
            ],
        },
        {
            id: 1,
            name: '2415',
            imageites: ['biriyani.png', 'Chicken.png'],
            itemfor: '2 item for',
            money: '170',
            time: '9',
            itemsadd: ['basmati rice... ', 'Very spiece'],
            itemsmoney: [
                '230.00',
                '200.00',
            ],
            submenu: [
                'Chicken Briyani',
                'Chilly peri- peri Chicken',
            ],
        },
        {
            id: 2,
            name: '8542',
            imageites: ['biriyani.png', 'Chicken.png', 'greapitem.png', 'biriyani.png', 'Chicken.png'],
            itemfor: '5 item for',
            money: '850',
            time: '5',
            itemsadd: ['basmati rice... ', 'Very spiece', '', 'basmati rice... ', 'Very spiece'],
            itemsmoney: [
                '230.00',
                '200.00',
                '170.00',
                '230.00',
                '200.00',
            ],
            submenu: [
                'Chicken Briyani',
                'Chilly peri- peri Chicken',
                'Grapes Juice',
                'Chicken Briyani',
                'Chilly peri- peri Chicken',
            ],
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
    const [updatedCat, setUpdatedCat] = useState<Array<string>>([]);

    const handleCategoryClick = (categoryId: any) => {
        let array = []
        setSelectedCategory(categoryId.id === selectedCategory ? null : categoryId.id);
        setUpdatedCat(categoryId)
        setEditCategory('');
        setIsEditing(false);
        setIsAddingItem(false);
        if (categoryId.id !== selectedCategory) {
            const selectedCategoryItems =
                categories.find((cat) => cat.id === categoryId.id)?.submenu || [];
            setSelectedItems(selectedCategoryItems);
        } else {
            setSelectedItems([]);
        }
    };
    // const handleSaveEditCategory = (category: any) => {
    //     if (isNewCategory) {
    //         setCategories((prev) => [
    //             ...prev,
    //             { id: prev.length, name: editCategory, submenu: [] },
    //         ]);
    //     } else {
    //         setCategories((prev) => {
    //             const updatedCategories = prev.map((cat) => {
    //                 if (cat.id === category.id) {
    //                     return { ...cat, name: editCategory };
    //                 }
    //                 return cat;
    //             });
    //             return updatedCategories;
    //         });
    //     }
    //     setEditCategory('');
    //     setIsEditing(false);
    //     setIsNewCategory(false);
    //     setIsAddingCategory(false);
    // };
    // const handleAddItem = () => {
    //     setIsAddingItem(true);
    //     setIsEditing(true);
    //     setIsNewCategory(false);
    //     setIsAddingCategory(false);
    // };
    // const handleAddNewItem = () => {
    //     if (editItem.trim() !== '') {
    //         setCategories((prev) => {
    //             const updatedCategories = prev.map((cat) => {
    //                 if (cat.id === selectedCategory) {
    //                     return { ...cat, submenu: [...cat.submenu, editItem] };
    //                 }
    //                 return cat;
    //             });
    //             return updatedCategories;
    //         });
    //         setEditItem('');
    //     }
    // };
    useEffect(() => {
        const initialCategory = categories.find(
            (cat) => cat.name === '5412'
        );
        if (initialCategory) {
            setSelectedCategory(initialCategory.id);
            setSelectedItems(initialCategory.submenu);
        }
    }, [categories]);

    const handleFoodReadt = () => {
        router.push('/ready')
        localStorage.setItem('selectedcat', JSON.stringify(updatedCat))
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
                                {categories.map((cat, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleCategoryClick(cat)}
                                        className={
                                            selectedCategory === cat.id
                                                ? "activeiconorder"
                                                : "unactiveiconorder"
                                        }
                                    >
                                        <div
                                            className={
                                                selectedCategory === cat.id ? `${Style1.active}` : ""
                                            }
                                        >
                                            <div className='idnuberfont'>{cat.name}</div>
                                            <div className='orderfont1 d-flex'>{cat.itemfor} <FaIndianRupeeSign className='pt-1' /> {cat.money}</div>
                                            <div className='orderfonttimepreparing pt-2'>Received {cat.time} minutes ago</div>
                                        </div>
                                        <div>
                                            <div>   <input
                                                type="range"
                                                disabled
                                                min={0}
                                                max={23}
                                                step={1}
                                                value={arrivalTime.start}
                                            />
                                            </div>
                                            <div className='arivedfont'>10min</div>
                                            <div>  <input
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
                                ))}
                            </div>
                        </div>
                        <div className={Style1.cardmenu181}>
                            <div className={Style1.itemcentermenu}>
                                <div className={`${Style1.toprestmenuitem} py-1`}>Preparing</div>
                            </div>
                            {selectedCategory !== null && (
                                <div >
                                    <div className='preparingflex'>
                                        <div>
                                            <div className='prebtnflex'>
                                                <div className='fontordernumber'># 1452187224{categories.find(cat => cat.id === selectedCategory)?.name}</div>
                                                <div><button className='Preparingbtn px-3'>PREPARING</button></div>
                                            </div>
                                            <div className='orderfont1 d-flex'>{categories.find(cat => cat.id === selectedCategory)?.itemfor}    <FaIndianRupeeSign className='pt-1' />  {categories.find(cat => cat.id === selectedCategory)?.money}</div>
                                        </div>
                                        <div>
                                            <div className='d-flex justify-content-end'><FiPrinter size={30} /></div>
                                            <div className='orderfonttimepreparing pt-2'>25-05-2023  7:20</div>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className='menuediterscrollorders'>
                                        {categories
                                            .find((item) => item.id === selectedCategory)
                                            ?.submenu.map((act: string, index: number) => (
                                                <>
                                                    <div >
                                                        <div className='Chickenordermenu' key={index}>
                                                            <div className='d-flex gap-2 my-1'>
                                                                <div><Image src={require(`../../../_assets/images/${categories.find(cat => cat.id === selectedCategory)?.imageites[index]}`)} alt="biriyani" width={"50"} height={"50"} /></div>
                                                                <div>
                                                                    <div className='orderfont1'>{act}</div>
                                                                    <div className='orderfonttimepreparing d-flex pt-1'><FaIndianRupeeSign className='pt-1' /> {categories.find(cat => cat.id === selectedCategory)?.itemsmoney[index]} X 1</div>
                                                                    <div className='orderfonttimepreparing pt-1'>{categories.find(cat => cat.id === selectedCategory)?.itemsadd[index]}</div>
                                                                </div>
                                                            </div>
                                                            <div className='fw-bold fs-6 my-2'>X 1</div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                    </div>

                                    <div className='d-flex justify-content-center'>
                                        <div className='pretimeorder'>
                                            <div className='Executeflex'>
                                                <div className='border-end w-100'>
                                                    <div className='orderfont1'>Pre Time</div>
                                                    <div className='orderfonttimepreparing py-2'>{categories.find(cat => cat.id === selectedCategory)?.time} min LEFT</div>
                                                </div>
                                                <div className='border-end w-100'>
                                                    <div className='orderfont1'>Delivery Execute</div>
                                                    <div className='orderfonttimepreparing py-2'>Arrived</div>
                                                </div>
                                                <div className='w-100'>
                                                    <div className='orderfont1'>Grand Total</div>
                                                    <div className='d-flex orderfonttimepreparing py-2'> <FaIndianRupeeSign className='pt-1' /> {categories.find(cat => cat.id === selectedCategory)?.money}.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='Stockflexorder my-3'>
                                        <button className='markbtn py-1'>Mark out of Stock</button>
                                        <button className='Foodbtn py-1' onClick={handleFoodReadt}>Food Ready</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Preparing;
