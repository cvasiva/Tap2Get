"use client";
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Link from 'next/link';
import style from "../../../../styles/home.module.scss";
import Style1 from '../menu/menupage.module.scss';
import { FaChevronRight, FaEdit, FaRupeeSign, FaSave } from 'react-icons/fa';
import { BsXCircleFill } from 'react-icons/bs';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Col, Row } from 'antd';
import { LuArrowRightCircle, LuArrowLeftCircle } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { usePathname } from "next/navigation"
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import { RiCloseCircleFill } from 'react-icons/ri';
import { BsPauseCircle } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";
import "../orders/orders.scss"
interface ImageUpload {
    preview: string;
    loading: boolean;
    percentage: number;
    isPaused: boolean;
}
const Menueditor = () => {
    const menu = [
        { title: 'Item Availability', url: '/menu' },
        { title: 'Menu Editor', url: '/menueditor' },
        { title: 'History of menu changes', url: '/menuhistory' },
    ];
    const [categories, setCategories] = useState<Array<any>>([
        {
            id: 0,
            name: 'South Indian',
            submenu: [
                'South Indian',
                'Gulab Jumun',
                'Bread Halwa',
                'Rasmalai',
                'Moong Dal',
            ],
        },
        {
            id: 1,
            name: 'Dessert',
            submenu: [
                'Dessert',
                'Gulab Jumun',
                'Bread Halwa',
                'Rasmalai',
                'Moong Dal',
            ],
        },
        {
            id: 2,
            name: 'Lunch',
            submenu: [
                'Lunch',
                'Gulab Jumun',
                'Bread Halwa',
                'Rasmalai',
                'Moong Dal',
            ],
        },
        {
            id: 3,
            name: 'Combo',
            submenu: [
                'Combo',
                'Gulab Jumun',
                'Bread Halwa',
                'Rasmalai',
                'Moong Dal',
            ],
        },
        {
            id: 4,
            name: 'Ice Creams',
            submenu: [
                'Ice Creams',
                'Gulab Jumun',
                'Bread Halwa',
                'Rasmalai',
                'Moong Dal',
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
    const [page, setPage] = useState<number>(0);
    const [editedItemIndex, setEditedItemIndex] = useState<number | null>(null);
    const [editedItemValue, setEditedItemValue] = useState<string>('');
    const pathname = usePathname()
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
    const handleDeleteCategory = (categoryId: number) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        setSelectedCategory(null);
        setSelectedItems([]);
    };
    const handleEditItem = (index: number) => {
        setEditedItemIndex(index);
        setEditedItemValue(categories[selectedCategory!].submenu[index]);
    };
    const handleSaveEdit = () => {
        if (selectedCategory !== null && editedItemIndex !== null) {
            const updatedCategories = [...categories];
            updatedCategories[selectedCategory].submenu[editedItemIndex] = editedItemValue;
            setCategories(updatedCategories);
            setEditedItemIndex(null);
            setEditedItemValue('');
            setEditItem('');
            setPage(1);
        }
    };
    const handleAddCategory = () => {
        setIsNewCategory(true);
        setIsEditing(true);
        setIsAddingItem(false);
        setIsAddingCategory(true);
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
            setPage(1);
        }
    };
    useEffect(() => {
        const initialCategory = categories.find(
            (cat) => cat.name === ''
        );
        if (initialCategory) {
            setSelectedCategory(initialCategory.id);
            setSelectedItems(initialCategory.submenu);
        }
    }, [categories]);
    const handleSavechange = () => {
        setPage(0);
    };
    const handleClick = () => {
        setPage(page + 1);
    };
    const handleClickPrevious = () => {
        setPage(page - 1);
    };
    const [price, setPrice] = useState<string>("");
    const [packaging, setPackaging] = useState<string>("");
    const [gst, setGst] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({
        price: "",
        packaging: "",
        gst: "",
        isValidationFailed: "true",
    });
    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "price") {
            setPrice(value);
        } else if (name === "packaging") {
            setPackaging(value);
        } else {
            setGst(value);
        }
        setDisable(true)
    };
    const renderErrorMessage = (field: string) => {
        return (
            errorMessage.isValidationFailed === "true" &&
            errorMessage[field] !== "" && (
                <FormFeedback>
                    <span style={{ color: "red", fontWeight: "600" }}>
                        {errorMessage[field]}
                    </span>
                </FormFeedback>
            )
        );
    };
    const validateRegistrationForm = () => {
        let errorMessage = { price: "", packaging: "", gst: "", isValidationFailed: "false" };
        if (price === "") {
            errorMessage = {
                ...errorMessage,
                price: "Please enter the price",
                isValidationFailed: "true",
            };
        }
        if (packaging === "") {
            errorMessage = {
                ...errorMessage,
                packaging: "Please enter the packaging",
                isValidationFailed: "true",
            };
        }
        if (gst === "") {
            errorMessage = {
                ...errorMessage,
                gst: "Please enter the Gst",
                isValidationFailed: "true",
            };
        }
        return errorMessage;
    };
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validateForm = validateRegistrationForm();
        if (validateForm.isValidationFailed === "true") {
            setErrorMessage(validateForm);
        } else {
            setPage(2);
        }
    };
    const [profileImageFirst, setProfileImageFirst] = useState<File | null>(null);
    const [profileImageSecond, setProfileImageSecond] = useState<File | null>(null);
    const [previewImageFirst, setPreviewImageFirst] = useState<string | null>(null);
    const [previewImageSecond, setPreviewImageSecond] = useState<string | null>(null);
    const fileInputRefFirst = useRef<HTMLInputElement | null>(null);
    const fileInputRefSecond = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(0);
    const [percentageSecond, setPercentageSecond] = useState<number>(0);
    const handleImageChange = (file: File, idx: number) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (idx === 1) {
                setProfileImageFirst(file);
                setPreviewImageFirst(reader.result as string);
            } else if (idx === 2) {
                setProfileImageSecond(file);
                setPreviewImageSecond(reader.result as string);
            }
        };
        reader.readAsDataURL(file);
    };
    const handleImageRemove = (idx: number) => {
        if (idx === 1) {
            setProfileImageFirst(null);
            setPreviewImageFirst(null);
            setLoading(false);
            setPercentage(0);
        } else if (idx === 2) {
            setProfileImageSecond(null);
            setPreviewImageSecond(null);
            setLoading(false);
            setPercentageSecond(0);
        }
    };
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const handlePause = () => {
        setIsPaused(true);
    };
    const handleResume = () => {
        setIsPaused(false);
    };
    const cancelUpload = () => {
        setLoading(false);
        setPercentage(0);
    };
    const onButtonClick = (idx: number) => {
        if (idx === 1 && fileInputRefFirst.current) {
            fileInputRefFirst.current.click();
            setLoading(true);
            const interval = setInterval(() => {
                if (!isPaused) {
                    setPercentage(prevPercentage => {
                        const newPercentage = prevPercentage + 10;
                        if (newPercentage >= 100) {
                            clearInterval(interval);
                            setLoading(false);
                            return 100;
                        }
                        return newPercentage;
                    });
                }
            }, 1000);
        } else if (idx === 2 && fileInputRefSecond.current) {
            fileInputRefSecond.current.click();
            setLoading(true);
            const interval = setInterval(() => {
                if (!isPaused) {
                    setPercentageSecond(percentageSecond => {
                        const newPercentageSecond = percentageSecond + 10;
                        if (newPercentageSecond >= 100) {
                            clearInterval(interval);
                            setLoading(false);
                            return 100;
                        }
                        return newPercentageSecond;
                    });
                }
            }, 1000);
        }
    };
    const handleImageChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleImageChange(file, 1);
        }
    };
    const handleImageChangeSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleImageChange(file, 2);
        }
    };
    const startUpload = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setPercentage(prevPercentage => {
                const newPercentage = prevPercentage + 10;
                if (newPercentage >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    return 100;
                }
                return newPercentage;
            });
        }, 500);
    };
    const [veg, setVeg] = useState<boolean>(true)
    const [nonveg, setNonveg] = useState<boolean>(false)
    const [vegan, setVegan] = useState<boolean>(false)
    const handleveg = () => {
        setVeg(true)
        setNonveg(false)
        setVegan(false)
    }
    const handlenonveg = () => {
        setVeg(false)
        setNonveg(true)
        setVegan(false)
    }
    const handlevegan = () => {
        setVeg(false)
        setNonveg(false)
        setVegan(true)
    }
    const [quantity, setQuantity] = useState<string>("")
    const [select, setSelect] = useState<string>("")
    const [error, setError] = useState(false)
    const [errorselect, setErrorselect] = useState(false)
    const handleRadioChange = (e: any) => {
        const target = e.target;
        if (target.checked) {
            setQuantity(target.value);
            setError(false)
        }
    }
    const handleRadioselectChange = (e: any) => {
        const target = e.target;
        if (target.checked) {
            setSelect(target.value)
            setErrorselect(false)
        }
    }
    const handleSubit = () => {
        if (!quantity && !error) {
            setError(true)
        } if (!select && !errorselect) {
            setErrorselect(true)
        } else {
            setPage(3)
        }
    }
    const [variants, setVariants] = useState<{ option: string; price: any }[]>([]);
    const [newOption, setNewOption] = useState<string>('');
    const [newPrice, setNewPrice] = useState<any>();
    const [addQuantityVisible, setAddQuantityVisible] = useState<boolean>(false);
    const handleAdd = () => {
        setAddQuantityVisible(true);
    };
    const handleAddVariant = () => {
        setVariants([...variants, { option: newOption.trim(), price: newPrice }]);
        setNewOption('');
        setNewPrice('');
        setAddQuantityVisible(false);
    };
    const [variantsSelect, setVariantsSelect] = useState<{ select: string; price: any }[]>([]);
    const [newSelect, setNewSelect] = useState<string>('');
    const [newPriceSelect, setNewPriceSelect] = useState<any>();
    const [addSelectVisible, setAddSelectVisible] = useState<boolean>(false);
    const handleAddSelect = () => {
        setAddSelectVisible(true);
    };
    const handleAddSelectVariant = () => {
        setVariantsSelect([...variantsSelect, { select: newSelect.trim(), price: newPriceSelect }]);
        setNewSelect('');
        setNewPriceSelect('');
        setAddSelectVisible(false);
    };
    const [imageUploads, setImageUploads] = useState<ImageUpload[]>([]);
    const fileInputRefs = useRef<HTMLInputElement[]>([]);
    const intervalRefs = useRef<number[]>([]);
    const handleImageChangeindex = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUploads(prevImages => [
                    ...prevImages,
                    { preview: reader.result as string, loading: false, percentage: 0, isPaused: false }
                ]);
                // startInterval(prevImages.length);
            };
            reader.readAsDataURL(file);
        }
    };
    const startInterval = (index: number) => {
        const intervalId = window.setInterval(() => {
            setImageUploads(prevImages => {
                const newImages = [...prevImages];
                if (!newImages[index]) {
                    clearInterval(intervalId);
                    return newImages;
                }
                const currentPercentage = newImages[index].percentage;
                const updatedPercentage = currentPercentage < 100 ? currentPercentage + 1 : 100;
                newImages[index] = { ...newImages[index], percentage: updatedPercentage };
                return newImages;
            });
        }, 500);
        intervalRefs.current[index] = intervalId;
    };
    const handleImageRemoveindex = (index: number) => () => {
        clearInterval(intervalRefs.current[index]);
        setImageUploads(prevImages => prevImages.filter((_, i) => i !== index));
        intervalRefs.current = intervalRefs.current.filter((_, i) => i !== index);
    };
    const handleResumeindex = (index: number) => () => {
        startInterval(index);
        setImageUploads(prevImages => prevImages.map((upload, i) => (i === index ? { ...upload, isPaused: false } : upload)));
    };
    const handlePauseindex = (index: number) => () => {
        clearInterval(intervalRefs.current[index]);
        setImageUploads(prevImages => prevImages.map((upload, i) => (i === index ? { ...upload, isPaused: true } : upload)));
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
            {page === 0 && (
                <div className={Style1.menuflex}>
                    <div className={Style1.cardmenu18}>
                        <div className={Style1.itemcentermenu}>
                            <div className={`${Style1.toprestmenu} py-1`}>Category I 18</div>
                        </div>
                        <div
                            className={Style1.menuediterscroll}
                        >
                            <div className={Style1.addflex}>
                                <button
                                    className={Style1.addbtnrest}
                                    onClick={handleAddCategory}
                                    disabled={isAddingItem}
                                >
                                    + Add New
                                </button>
                                <Input
                                    className={Style1.menuinpu}
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
                                    <div className="mt-6 ms-2">
                                        {selectedCategory === cat.id && (
                                            <BsXCircleFill
                                                size={25}
                                                style={{ color: "#588A7A", cursor: "pointer" }}
                                                onClick={() => handleDeleteCategory(cat.id)}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={` ${selectedCategory === cat.id
                                            ? `${Style1.active} ${Style1.southmenuactive}`
                                            : `${Style1.southmenuedit}`
                                            }`}
                                        onClick={() => handleCategoryClick(cat.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="flex justify-between">
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
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isEditing && isAddingCategory && (
                                <>
                                    <div
                                        className={` ${selectedCategory
                                            ? `${Style1.active} ${Style1.southmenuedit}`
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
                            {selectedCategory !== null && (
                                <div>
                                    <div className={Style1.addflex}>
                                        <button
                                            className={Style1.addbtnrest}
                                            onClick={handleAddItem}
                                            disabled={isNewCategory}
                                        >
                                            + Add New
                                        </button>
                                        <Input
                                            className={Style1.menuinpuitem}
                                            placeholder="Search"
                                        />
                                    </div>
                                    {categories
                                        .find((item) => item.id === selectedCategory)
                                        ?.submenu.map((act: string, index: number) => (
                                            <div
                                                key={index}
                                                className={`${Style1.southmenuitem} ${selectedItems.includes(act) ? style.active : ''
                                                    }`}
                                            >
                                                {editedItemIndex === index ? (
                                                    <Input
                                                        type="text"
                                                        value={editedItemValue}
                                                        onChange={(e) => setEditedItemValue(e.target.value)}
                                                    />
                                                ) : (
                                                    <div>{act}</div>
                                                )}
                                                <div>
                                                    {editedItemIndex === index ? <>
                                                        <button
                                                            className={`${Style1.savebtnmenuedit} px-2 py-2`}
                                                            value={editedItemIndex}
                                                            onClick={handleSaveEdit}
                                                        >
                                                            Save
                                                        </button>
                                                    </> : <FaEdit onClick={() => handleEditItem(index)} style={{ cursor: 'pointer' }} />}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                            {isEditing && isAddingItem && (
                                <>
                                    <div
                                        className={` ${selectedCategory
                                            ? `${Style1.active} ${Style1.southmenuactiveitem}`
                                            : `${Style1.southmenuactiveitem}`
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
            )}
            {page === 1 && (
                <div className="px-2 pt-2">
                    <div className={Style1.cardmenudetails}>
                        <div className={Style1.itemcentermenu}>
                            <div className={`${Style1.toprestmenudetails} py-1`}>Item Details</div>
                        </div>
                        <div className="text-end">
                            <button className={`${Style1.Savebtnrest} px-2 mx-3`}>Save</button>
                        </div>
                        <div className={Style1.menuediterscrollBasic}>
                            <Row className={Style1.rowbasic}>
                                <Col className={Style1.colborderight} md={12}>
                                    <div className={Style1.basickmenufont}>Basic Details *</div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <div className={Style1.jamuncard}>
                                            <div className="border-bottom">
                                                <div className={`${Style1.jamunflex} py-3`}>
                                                    <div className={`${Style1.Gulabfontstyle} ms-3`}>
                                                        Gulab Jamun
                                                    </div>
                                                    <div className="d-flex gap-1 mx-3">
                                                        <button className={nonveg ? "vegfontbtnnonveg  px-2 py-1" : "nonvegfont px-2 py-1"} onClick={handlenonveg}>
                                                            Non-Veg
                                                        </button>
                                                        <button className={veg ? "vegfontbtn px-2 py-1" : "nonvegfont px-2 py-1"} onClick={handleveg}>
                                                            Veg
                                                        </button>
                                                        <button className={vegan ? "veganfontbtn px-2 py-1" : "nonvegfont px-2 py-1"} onClick={handlevegan}>
                                                            Vegan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {veg &&
                                                <TextArea
                                                    showCount
                                                    maxLength={500}
                                                    // onChange={onChange}
                                                    placeholder="Enter your text"
                                                    className="border-0 w-100"
                                                    style={{ height: "21vh", resize: "none" }} />}
                                            {nonveg &&
                                                <TextArea
                                                    showCount
                                                    maxLength={100}
                                                    // onChange={onChange}
                                                    placeholder="Enter your text"
                                                    className="border-0 w-100"
                                                    style={{ height: "21vh", resize: "none" }} />
                                            }
                                            {vegan &&
                                                <TextArea
                                                    showCount
                                                    maxLength={100}
                                                    // onChange={onChange}
                                                    placeholder="Enter your text"
                                                    className="border-0 w-100"
                                                    style={{ height: "21vh", resize: "none" }} />
                                            }
                                        </div>
                                    </div>
                                </Col>
                                <Col className={Style1.widthcolitem} md={12}>
                                    <Form onSubmit={submitForm}>
                                        <div className={`${Style1.basickmenufontitem}`}>
                                            Item Pricing *
                                        </div>
                                        <div className={`${Style1.pricemarginestart} mt-2`}>
                                            <FormGroup>
                                                <Label className={Style1.labelfontrest}>Price *</Label>
                                                <br />
                                                <Input
                                                    type="text"
                                                    className={`${Style1.inputprice}`}
                                                    placeholder="Price"
                                                    name="price"
                                                    onChange={handleData}
                                                    invalid={errorMessage.price === "" ? false : true}
                                                    value={price}
                                                    autoComplete="off"
                                                />
                                                {renderErrorMessage("price")}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className={Style1.labelfontrest}>Packaging *</Label>
                                                <br />
                                                <Input
                                                    type="text"
                                                    className={`${Style1.inputprice}`}
                                                    placeholder="packaging"
                                                    name="packaging"
                                                    onChange={handleData}
                                                    invalid={errorMessage.packaging === "" ? false : true}
                                                    value={packaging}
                                                    autoComplete="off"
                                                />
                                                {renderErrorMessage("packaging")}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className={Style1.labelfontrest}>GST *</Label>
                                                <br />
                                                <Input
                                                    type="text"
                                                    className={`${Style1.inputprice}`}
                                                    placeholder="gst"
                                                    name="gst"
                                                    onChange={handleData}
                                                    invalid={errorMessage.gst === "" ? false : true}
                                                    value={gst}
                                                    autoComplete="off"
                                                />
                                                {renderErrorMessage("gst")}
                                            </FormGroup>
                                        </div>
                                        <div className={Style1.submitcenter}>
                                            <button type='submit' className={disable ? `${Style1.submitbtnmenu} px-4 py-1` : ""}>
                                                {disable ? "Submit" : ""}
                                            </button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                            <button
                                className={`${Style1.nextbtn} py-2 px-3 d-flex gap-2`}
                                onClick={handleClick}
                            >
                                Next <LuArrowRightCircle className="fs-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {page === 2 && (
                <div className="px-2 pt-2">
                    <div className={Style1.cardmenudetails}>
                        <div className={Style1.itemcentermenu}>
                            <div className={`${Style1.toprestmenudetails} py-1`}>Item Details</div>
                        </div>
                        <div className="text-end">
                            <button className={`${Style1.Savebtnrest} px-2 mx-3`} onClick={handleSubit}>Save</button>
                        </div>
                        <div className="">
                            <Row className={Style1.rowbasic}>
                                <Col className={Style1.colborderight} md={12}>
                                    <div className={Style1.basickmenufont}>
                                        Variants of this item
                                    </div>
                                    <div className={`${Style1.createfont} pt-3 ${Style1.padinglike}`}>
                                        You can create different variations of this item like
                                        quantity, size, base/crust, etc. While placing
                                        order, customers will select exactly one of your
                                        defined variants.
                                    </div>
                                    <div className={`${Style1.quantitycard} mt-2 ${Style1.Quantitymargin}`}>
                                        <div className="d-flex justify-content-between">
                                            <div className={Style1.Quantityfont}>Quantity *</div>
                                            <div>
                                                <button className={`${Style1.addbtnmenuedit} px-2 mt-1`} onClick={handleAdd}>
                                                    + add
                                                </button>
                                            </div>
                                        </div>
                                        <div className={Style1.overflowbaby}>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioChange} checked={true} value="baby" name="quantity" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Baby <FaRupeeSign className="pt-2 fs-4" /> 0
                                                </div>
                                            </div>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioChange} checked={quantity === 'Regular'} value="Regular" name="quantity" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Regular <FaRupeeSign className="pt-2 fs-4" /> 57.00
                                                </div>
                                            </div>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioChange} checked={quantity === 'Family'} value="Family" name="quantity" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Family <FaRupeeSign className="pt-2 fs-4" /> 175.00
                                                </div>
                                            </div>
                                            {variants.map((variant, index) => (
                                                <div key={index} className="d-flex gap-1 mt-2">
                                                    <input type="radio" className={Style1.radiostyle} onChange={handleRadioChange} checked={quantity === `${variant.option}`} value={`${variant.option}`} name="quantity" />
                                                    <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                        {variant.option} <FaRupeeSign className="pt-2 fs-4" /> {variant.price}
                                                    </div>
                                                    {/* <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button> */}
                                                </div>
                                            ))}
                                        </div>
                                        {error && <div className='text-danger fw-bold'>Please Select</div>}
                                    </div>
                                    {addQuantityVisible &&
                                        <>
                                            <div className='py-1'>
                                                <div className={Style1.basickmenufont}>Add Quantity</div>
                                                <div className={`${Style1.Variantmargin}`}>
                                                    <div className="mt-2">
                                                        <label className={Style1.labelfontrest}>Variant Option</label>
                                                        <input type="text" className={Style1.inputrest} value={newOption} onChange={(e) => setNewOption(e.target.value)} placeholder="Enter Variant Option" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className={Style1.labelfontrest}>Variant Price</label>
                                                        <input type="number" className={Style1.inputrest} value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} placeholder="Enter Variant Price" />
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <button type="button" onClick={handleAddVariant} className={`${Style1.submitbtnmenu} px-4 py-1`}>Add Quantity</button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </Col>
                                <Col className="" md={12}>
                                    <div className={`${Style1.basickmenufont} ms-3`}>Add-ons</div>
                                    <div className={`${Style1.createfont} pt-3 ms-3`}>
                                        You can create different variations of this item add
                                        ons.
                                    </div>
                                    <div className={`${Style1.createfontof} pt-3 ms-4`}>
                                        You can create different variations of this item add
                                        ons.
                                    </div>
                                    <div className={`${Style1.quantitycard} mt-3 ${Style1.pricemarginestart1}`}>
                                        <div className="d-flex justify-content-between">
                                            <div className={Style1.Quantityfont}>Select</div>
                                            <div>
                                                <button className={`${Style1.addbtnmenuedit} px-2 mt-1`} onClick={handleAddSelect}>
                                                    + add
                                                </button>
                                            </div>
                                        </div>
                                        <div className={Style1.overflowbaby}>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioselectChange} checked={select == 'Ice_Cream'} value="Ice_Cream" name="Ice_Cream" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Ice Cream <FaRupeeSign className="pt-2 fs-4" /> 57.00
                                                </div>
                                            </div>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioselectChange} checked={select == 'Regularselect'} value="Regularselect" name="Regularselect" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Regular <FaRupeeSign className="pt-2 fs-4" /> 75.00
                                                </div>
                                            </div>
                                            <div className="d-flex gap-1 mt-2">
                                                <input type="radio" className={Style1.radiostyle} onChange={handleRadioselectChange} checked={select == 'Familyselect'} value="Familyselect" name="Familyselect" />
                                                <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                    Family <FaRupeeSign className="pt-2 fs-4" /> 20.00
                                                </div>
                                            </div>
                                            {variantsSelect.map((variant, index) => (
                                                <div key={index} className="d-flex gap-1 mt-2">
                                                    <input type="radio" className={Style1.radiostyle} onChange={handleRadioselectChange} checked={select === `${variant.select}`} value={`${variant.select}`} name="Familyselect" />
                                                    <div className={`d-flex gap-1 ${Style1.babyfontmenu}`}>
                                                        {variant.select} <FaRupeeSign className="pt-2 fs-4" /> {variant.price}
                                                    </div>
                                                    {/* <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button> */}
                                                </div>
                                            ))}
                                        </div>
                                        {errorselect && <div className='text-danger fw-bold'>Please Select</div>}
                                    </div>
                                    {addSelectVisible &&
                                        <>
                                            <div className='py-1'>
                                                <div className={`${Style1.basickmenufont} ms-3`}>Add Select</div>
                                                <div className={`${Style1.Variantmargin}`}>
                                                    <div className="mt-2">
                                                        <label className={Style1.labelfontrest}>Variant Option</label>
                                                        <input type="text" className={Style1.inputrest} value={newSelect} onChange={(e) => setNewSelect(e.target.value)} placeholder="Enter Variant Option" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className={Style1.labelfontrest}>Variant Price</label>
                                                        <input type="number" className={Style1.inputrest} value={newPriceSelect} onChange={(e) => setNewPriceSelect(Number(e.target.value))} placeholder="Enter Variant Price" />
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <button type="button" onClick={handleAddSelectVariant} className={`${Style1.submitbtnmenu} px-4 py-1`}>Add Select</button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {/* <div className={`${Style1.submitcenter} mt-2`}>
                                            <button onClick={handleSubit} className={`${Style1.submitbtnmenu} px-4 py-1`}>
                                                Submit
                                            </button>
                                        </div> */}
                                </Col>
                            </Row>
                        </div>
                        <div className="d-flex justify-content-center gap-3 my-3">
                            <button
                                className={`${Style1.nextbtn} py-2 px-3 d-flex gap-2`}
                                onClick={handleClickPrevious}
                            >
                                <LuArrowLeftCircle className="fs-4" /> Previous
                            </button>
                            <button
                                className={`${Style1.nextbtn} py-2 px-3 d-flex gap-2`}
                                onClick={handleClick}
                            >
                                Next <LuArrowRightCircle className="fs-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {page === 3 && (
                <div className="px-2 pt-2">
                    <div className={Style1.cardmenudetails}>
                        <div className={Style1.itemcentermenu}>
                            <div className={`${Style1.toprestmenudetails} py-1`}>Item Details</div>
                        </div>
                        <div className="text-end">
                            <button
                                className={`${Style1.submitbtnmenu} px-3 mx-3 py-1`}
                                onClick={handleSavechange}
                            >
                                Save
                            </button>
                        </div>
                        <div className={Style1.menuediterscrollBasic}>
                            <Row className={Style1.rowbasic}>
                                <Col className={Style1.colborderight} md={12}>
                                    <div className={`${Style1.basickmenufont} mt-4`}>Item Image</div>
                                    <div className={`${Style1.createfont} pt-3 pb-4 ${Style1.Quantitymargin}`}>
                                        Select a good quality image of this item.
                                    </div>
                                    {/* <div className="d-flex justify-content-center">
                                        <div className={`${Style1.browscard} py-5`}>
                                            <div className="d-flex justify-content-center">
                                                <div className={Style1.Uploadfont}>
                                                    {previewImageFirst ? (
                                                        <div>
                                                            {!loading && <>
                                                                <Image src={previewImageFirst} alt="Preview" width={"80"} height={"50"} />
                                                                <button onClick={() => handleImageRemove(1)} className='text-center'>Remove</button>
                                                            </>}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <FiUploadCloud className="fs-1 ms-4" />
                                                            <input
                                                                type="file"
                                                                ref={fileInputRefFirst}
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={handleImageChangeFirst}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="pointer">Upload Image 1</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`${Style1.dargfont} py-1 text-center`} onClick={() => onButtonClick(1)} style={{ cursor: "pointer" }}>
                                                Drag & Drop to upload or{" "}
                                                <span className={Style1.brosefont}>Browse</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* {previewImageFirst && (
                                        <div className="d-flex justify-content-center">
                                            <div className={`${Style1.Uploadingstyle} d-flex justify-content-between my-2`}>
                                                <div className='d-flex gap-2'>
                                                    <div className='py-1'><Image src={previewImageFirst} alt="Preview" width={"50"} height={"50"} /></div>
                                                    <div className='py-1'>
                                                        <div className='fs-6 fw-bold'>{loading ? "Uploading...": "successfully uploaded"}</div>
                                                        <div className={`${Style1.dargfont} d-flex gap-2`}>
                                                            <div>File Png</div>
                                                            <div>{percentage}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex gap-1 py-1'>
                                                    {isPaused ? (
                                                        <button onClick={handleResume}><BsPlayCircle className='CheckCircleuplode' size={30} /></button>
                                                    ) : (
                                                        <button onClick={handlePause}><BsPauseCircle className='CheckCircleuplode' size={30} /></button>
                                                    )}
                                                    <button onClick={()=>handleImageRemove(1)}><RiCloseCircleFill className='CheckCirclecloseuplode' size={30} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )} */}
                                    <div className="d-flex justify-content-center">
                                        <div className={`${Style1.browscard} py-5`}>
                                            <div className="d-flex justify-content-center">
                                                <div className={Style1.Uploadfont}>
                                                    {imageUploads.map((upload, index) => (
                                                        <div key={index}>
                                                            <Image src={upload.preview} alt="Preview" width={80} height={50} />
                                                            {/* <button onClick={handleImageRemove(index)} className='text-center'>Remove</button> */}
                                                        </div>
                                                    ))}
                                                    {imageUploads.length < 3 && (
                                                        <>
                                                            <FiUploadCloud className="fs-1 ms-4" />
                                                            <input
                                                                type="file"
                                                                ref={(ref) => {
                                                                    if (ref) fileInputRefs.current.push(ref);
                                                                }}
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={handleImageChangeindex(fileInputRefs.current.length - 1)}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="pointer" onClick={() => fileInputRefs.current[fileInputRefs.current.length - 1].click()}>Upload Image</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`${Style1.dargfont} py-1 text-center`} onClick={() => fileInputRefs.current[fileInputRefs.current.length - 1].click()} style={{ cursor: "pointer" }}>
                                                Drag & Drop to upload or{" "}
                                                <span className={Style1.brosefont}>Browse</span>
                                            </div>
                                        </div>
                                    </div>
                                    {imageUploads.map((upload, index) => (
                                        <div className="d-flex justify-content-center" key={index}>
                                            <div className={`${Style1.Uploadingstyle} d-flex justify-content-between my-2`}>
                                                <div className='d-flex gap-2'>
                                                    <div className='py-1'><Image src={upload.preview} alt="Preview" width={30} height={30} /></div>
                                                    <div className='py-1'>
                                                        <div className='fs-6 fw-bold'>{upload.loading ? "Uploading..." : "Successfully uploaded"}</div>
                                                        {/* <div className={`${Style1.dargfont} d-flex gap-2`}>
                                                                <div>File Png</div>
                                                                <div>{upload.percentage}%</div>
                                                            </div> */}
                                                    </div>
                                                </div>
                                                <div className='d-flex gap-1 py-1'>
                                                    {/* {upload.isPaused ? (
                                                            <button onClick={handleResumeindex(index)}><BsPlayCircle className='CheckCircleuplode' size={30} /></button>
                                                        ) : (
                                                            <button onClick={handlePauseindex(index)}><BsPauseCircle className='CheckCircleuplode' size={30} /></button>
                                                        )} */}
                                                    <button onClick={handleImageRemoveindex(index)} className='pointer fs-6 fw-bold'>
                                                        {/* <RiCloseCircleFill className='CheckCirclecloseuplode' size={30} /> */}
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Col>
                                <Col className="" md={12}>
                                    <div
                                        className={`${Style1.createfontof} ms-3 mt-4`}
                                    // style={{ visibility: "hidden" }}
                                    >
                                        Add-ons{" "}
                                    </div>
                                    <div className={`${Style1.createfont} pt-3 ${Style1.pricemarginestart1} pb-4 ms-2`}>
                                        Select a good quality image of this item (Optional).
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className={`${Style1.browscard} py-5`}>
                                            <div className="d-flex justify-content-center">
                                                <div className={Style1.Uploadfont}>
                                                    {previewImageSecond ? (
                                                        <div>
                                                            {!loading && <>
                                                                <Image src={previewImageSecond} alt="Preview" width={"80"} height={"50"} />
                                                                <button onClick={() => handleImageRemove(2)} className='text-center'>Remove</button>
                                                            </>}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <FiUploadCloud className="fs-1 ms-4" />
                                                            <input
                                                                type="file"
                                                                ref={fileInputRefSecond}
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={handleImageChangeSecond}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="pointer" onClick={() => onButtonClick(2)}>Upload Image 2</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`${Style1.dargfont} py-1 text-center`} onClick={() => onButtonClick(2)} style={{ cursor: "pointer" }}>
                                                Drag & Drop to upload or{" "}
                                                <span className={Style1.brosefont}>Browse</span>
                                            </div>
                                        </div>
                                    </div>
                                    {loading && previewImageSecond && (
                                        <div className="d-flex justify-content-center">
                                            <div className={`${Style1.Uploadingstyle} d-flex justify-content-between my-2`}>
                                                <div className='d-flex gap-2'>
                                                    <div className='py-1'><Image src={previewImageSecond} alt="Preview" width={"50"} height={"50"} /></div>
                                                    <div className='py-1'>
                                                        <div className='fs-6 fw-bold'>Uploading...</div>
                                                        <div className={`${Style1.dargfont} d-flex gap-2`}>
                                                            <div>File Png</div>
                                                            <div>{percentageSecond}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex gap-1 py-1'>
                                                    {isPaused ? (
                                                        <button onClick={handleResume}><BsPlayCircle className='CheckCircleuplode' size={30} /></button>
                                                    ) : (
                                                        <button onClick={handlePause}><BsPauseCircle className='CheckCircleuplode' size={30} /></button>
                                                    )}
                                                    <button onClick={cancelUpload}><RiCloseCircleFill className='CheckCirclecloseuplode' size={30} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </div>
                        <div className="d-flex justify-content-center gap-3 my-3">
                            <button
                                className={`${Style1.nextbtn} py-2 px-3 d-flex gap-2`}
                                onClick={handleClickPrevious}
                            >
                                <LuArrowLeftCircle className="fs-4" /> Previous
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};
export default Menueditor;
