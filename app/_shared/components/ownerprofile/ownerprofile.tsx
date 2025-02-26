/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Col, Row } from 'antd';
import { FiUploadCloud } from "react-icons/fi";
import { Form, FormFeedback, FormGroup, Input } from 'reactstrap';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { HttpService } from '@/lib/http.service';
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';
import { RiCloseCircleFill } from 'react-icons/ri';
import Image from 'next/image';
interface Country {
    isd_code: string | number;
    name: string;
    code:string | number;
  }
interface FormData {
    Name: string;
    Mobile_number: string;
    Address: string;
    Mail_Id: string;
    WhatsupNumber: string;
    Pincode: string;
    City: string;
    isValidationFailed: boolean;
}
interface RegistrationFields {
    NAME: string;
    MOBILE_NUMBER: string;
    ADDRESS: string;
    MAIL_ID: string;
    WHATSAPPNUMBER: string;
    PINCODE: string;
    CITY: string;
}
interface ErrorMessage {
    Name: string;
    Mobile_number: string;
    Address: string;
    Mail_Id: string;
    WhatsupNumber: string;
    Pincode: string;
    City: string;
    isValidationFailed: boolean;
}
const Ownerprofile = () => {
    const menu = [
        { title: 'Restaurant Information', url: '/profile' },
        { title: 'Restaurant Owner Information', url: '/ownerprofile' },
    ];
    const DEFAULT_REG_FORM: FormData = {
        Name: '',
        Mobile_number: '',
        Address: '',
        Mail_Id: '',
        WhatsupNumber: '',
        Pincode: '',
        City: '',
        isValidationFailed: false
    };
    const REGISTRATION_FIELDS: RegistrationFields = {
        NAME: 'Name',
        MOBILE_NUMBER: 'Mobile_number',
        ADDRESS: 'Address',
        MAIL_ID: 'Mail_Id',
        WHATSAPPNUMBER: 'WhatsupNumber',
        PINCODE: 'Pincode',
        CITY: 'City',
    };
    const [personalInfo, setPersonalInfo] = useState<FormData>(DEFAULT_REG_FORM);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(DEFAULT_REG_FORM);
    const router = useRouter();
    const renderErrorMessage = (field: keyof FormData) => {
        return errorMessage.isValidationFailed && errorMessage[field] !== '' && (
            <FormFeedback>
                {errorMessage[field]}
            </FormFeedback>
        );
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === REGISTRATION_FIELDS.PINCODE) {
            matchLength(name, value, 6);
        } else {
            setPersonalInfo({
                ...personalInfo,
                [name]: value
            });
        }
    };
    const matchLength = (name: string, value: string, length: number) => {
        if (value.length <= length) {
            setPersonalInfo({
                ...personalInfo,
                [name]: value
            });
        }
    };
    const validateRegistrationForm = () => {
        let formData = personalInfo;
        let errorMessage = { ...DEFAULT_REG_FORM, isValidationFailed: false };
        if (formData.Name.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Name: 'Please enter the Name',
                isValidationFailed: true
            };
        }
        if (formData.Mobile_number.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Mobile_number: 'Please fill the Mobile number',
                isValidationFailed: true
            };
        } else if (!/^\d{10}$/.test(formData.Mobile_number.trim())) {
            errorMessage = {
                ...errorMessage,
                Mobile_number: 'Please enter a valid 10-digit Mobile number',
                isValidationFailed: true
            };
        }
        if (formData.Address.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Address: 'Please enter the Address',
                isValidationFailed: true
            };
        }
        if (formData.Mail_Id.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Mail_Id: 'Please enter the Mail Id',
                isValidationFailed: true
            };
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Mail_Id.trim())) {
            errorMessage = {
                ...errorMessage,
                Mail_Id: 'Please enter a valid Email address',
                isValidationFailed: true
            };
        }
        if (formData.WhatsupNumber.trim() === '') {
            errorMessage = {
                ...errorMessage,
                WhatsupNumber: 'Please enter the Whatsapp Number',
                isValidationFailed: true
            };
        } else if (!/^\d{10}$/.test(formData.WhatsupNumber.trim())) {
            errorMessage = {
                ...errorMessage,
                WhatsupNumber: 'Please enter a valid 10-digit Whatsapp number',
                isValidationFailed: true
            };
        }
        if (formData.Pincode.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Pincode: 'Please enter the Pincode',
                isValidationFailed: true
            };
        } else if (!/^\d{6}$/.test(formData.Pincode.trim())) {
            errorMessage = {
                ...errorMessage,
                Pincode: 'Please enter a valid 6-digit Pincode',
                isValidationFailed: true
            };
        }
        if (formData.City.trim() === '') {
            errorMessage = {
                ...errorMessage,
                City: 'Please enter the City',
                isValidationFailed: true
            };
        }
        return errorMessage;
    };
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validateForm = validateRegistrationForm();
        if (validateForm.isValidationFailed) {
            setErrorMessage(validateForm);
        } else {
            localStorage.setItem('profiledeta', JSON.stringify(personalInfo));
            router.push('/myprofile');
        }
    };
    const pathname = usePathname()
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(0);
    const [percentageSecond, setPercentageSecond] = useState<number>(0);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageRemove = () => {
        setProfileImage(null);
        setPreviewImage(null);
    };
    const onButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
    const [countryData, setCountryData] = useState<{ data: Country[] }>({ data: [] });
    const _httpService = new HttpService();
  
    useEffect(() => {
      _httpService.get<{ data: Country[] }>("https://ums-prod-api-gateway.mangodune-0ce75861.centralindia.azurecontainerapps.io/countries?limit=0&offset=0", { limit: 0, offset: 0 })
        .then((response) => setCountryData(response))
        .catch((error: Error) => console.error("Error fetching countries:", error));
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
                                        className={pathname === `${item.url}` ? `${style.Restaurantbtn} py-2 px-4` : `${style.Restaurantbtnunactive} px-4 py-2`}
                                    >
                                        {item.title}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Style1.cardrest}>
                    <div className={Style1.itemcentermenu}>
                        <div className={`${Style1.toprestRestaurant} py-1`}>Restaurant Information</div>
                    </div>
                    <Form onSubmit={(e) => submitForm(e)}>
                        <div className={Style1.overflowprofile}>
                            <div className='d-flex justify-content-between pt-2'>
                                <div className={`${Style1.onerfontstyle} pb-4`}>Owner details</div>
                                {/* <div className='text-end'>
                                        <button className={`${Style1.Savebtnrest} px-3 py-1 mx-2`} type='submit'>Save</button>
                                    </div> */}
                            </div>
                            <Row className={`${Style1.margirowrest} mt-1`}>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Name</label><br />
                                        <FormGroup>
                                            <Input
                                                className={Style1.inputrest}
                                                type="text"
                                                name={REGISTRATION_FIELDS.NAME}
                                                onChange={handleChange}
                                                value={personalInfo.Name}
                                                invalid={errorMessage.Name !== ''}
                                            />
                                            {renderErrorMessage('Name')}
                                        </FormGroup>
                                    </div>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Whats up Number</label><br />
                                        <FormGroup>
                                            <div className="d-flex gap-2">
                                                <Input type='select' className={`${Style1.inputrestmobile} w-25`} country={"in"}>
                                                    {countryData.data.map((item: Country, index: number) => (
                                                        <option key={index}>
                                                            <Row>
                                                                <Col md={6}><span>{item.isd_code}</span></Col>
                                                                <Col md={18} className='px-4'><span className='ms-3'>{item.name}</span></Col>
                                                            </Row>
                                                        </option>
                                                    ))}
                                                </Input>
                                                <Input
                                                    className={Style1.inputrest}
                                                    type="number"
                                                    name={REGISTRATION_FIELDS.WHATSAPPNUMBER}
                                                    onChange={handleChange}
                                                    value={personalInfo.WhatsupNumber}
                                                    invalid={errorMessage.WhatsupNumber !== ''}
                                                />
                                            </div>
                                            {renderErrorMessage('WhatsupNumber')}
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Mobile number</label><br />
                                        <FormGroup>
                                            <div className="d-flex gap-2">
                                                <Input type='select' className={`${Style1.inputrestmobile} w-25`} country={"in"}>
                                                    {countryData.data.map((item: Country, index: number) => (
                                                        <option key={index}>
                                                            <Row>
                                                                <Col md={6}><span>{item.isd_code}</span></Col>
                                                                <Col md={18} className='px-4'><span className='ms-3'>{item.name}</span></Col>
                                                            </Row>
                                                        </option>
                                                    ))}
                                                </Input>
                                                <Input
                                                    className={Style1.inputrest}
                                                    type="number"
                                                    name={REGISTRATION_FIELDS.MOBILE_NUMBER}
                                                    onChange={handleChange}
                                                    value={personalInfo.Mobile_number}
                                                    invalid={errorMessage.Mobile_number !== ''}
                                                />
                                            </div>
                                            {renderErrorMessage('Mobile_number')}
                                        </FormGroup>
                                    </div>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>City</label><br />
                                        <FormGroup>
                                            <Input
                                                className={Style1.inputrest}
                                                type="text"
                                                name={REGISTRATION_FIELDS.CITY}
                                                onChange={handleChange}
                                                value={personalInfo.City}
                                                invalid={errorMessage.City !== ''}
                                            />
                                            {renderErrorMessage('City')}
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Mail ID</label><br />
                                        <FormGroup>
                                            <Input
                                                className={Style1.inputrest}
                                                type="text"
                                                name={REGISTRATION_FIELDS.MAIL_ID}
                                                onChange={handleChange}
                                                value={personalInfo.Mail_Id}
                                                invalid={errorMessage.Mail_Id !== ''}
                                            />
                                            {renderErrorMessage('Mail_Id')}
                                        </FormGroup>
                                    </div>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Pincode</label><br />
                                        <FormGroup>
                                            <Input
                                                className={Style1.inputrest}
                                                type="number"
                                                name={REGISTRATION_FIELDS.PINCODE}
                                                onChange={handleChange}
                                                value={personalInfo.Pincode}
                                                invalid={errorMessage.Pincode !== ''}
                                            />
                                            {renderErrorMessage('Pincode')}
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={24} className={Style1.padingcolrest}>
                                    <div className='py-2'>
                                        <label className={Style1.labelfontrest}>Address</label><br />
                                        <FormGroup>
                                            <Input
                                                className={Style1.inputrestAddressowner}
                                                type="textarea"
                                                name={REGISTRATION_FIELDS.ADDRESS}
                                                onChange={handleChange}
                                                value={personalInfo.Address}
                                                invalid={errorMessage.Address !== ''}
                                            />
                                            {renderErrorMessage('Address')}
                                        </FormGroup>
                                    </div>
                                </Col>
                            </Row>
                            <div className={`${Style1.onerfontstyle} pb-4 pt-3`}>Profile Photo</div>
                            <Row className="mx-2 mt-1 mb-4">
                                <Col md={8} className='w-100'>
                                    <div className="d-flex justify-content-center">
                                        <div className={`${Style1.browscard} py-5`}>
                                            <div className="d-flex justify-content-center">
                                                <div className={Style1.Uploadfont}>
                                                    {previewImage ? (
                                                        <div>
                                                            <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                                            <button onClick={handleImageRemove} className='text-center'>Remove</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <FiUploadCloud className="fs-1 ms-4" />
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={handleImageChange}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="pointer">Upload Image</div>
                                                        </>
                                                    )}
                                                </div>

                                            </div>
                                            <div className={`${Style1.dargfont} py-1 text-center`} onClick={onButtonClick} style={{ cursor: "pointer" }}>
                                                Drag & Drop to upload or{" "}
                                                <span className={Style1.brosefont}>Browse</span>
                                            </div>
                                        </div>

                                    </div>
                                    {loading && previewImage && (
                                        <div className="d-flex justify-content-center">
                                            <div className={`${Style1.Uploadingstyle} d-flex justify-content-between my-2`}>
                                                <div className='d-flex gap-2'>
                                                    <div className='py-1'><Image src={previewImage} alt="Preview" width={"50"} height={"50"} /></div>
                                                    <div className='py-1'>
                                                        <div className='fs-6 fw-bold'>Uploading...</div>
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
                                                    {/* {loading && <button onClick={handlePause}><BsPauseCircle className='CheckCircleuplode' size={30} /></button>} */}
                                                    <button onClick={cancelUpload}><RiCloseCircleFill className='CheckCirclecloseuplode' size={30} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <div className="text-end w-100 px-3">
                                <button className={`${Style1.Submitbtnreat} px-4 mt-4 mb-3 py-1`} type='submit'>Submit</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default Ownerprofile;
