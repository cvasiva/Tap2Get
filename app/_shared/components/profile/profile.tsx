"use client";
import { useEffect, useState } from 'react';
import React, { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import style from '../../../../styles/home.module.scss';
import Style1 from '../menu/menupage.module.scss';
import { Col, Row } from 'antd';
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'
import { FormGroup, FormFeedback, Input, Label, Form } from 'reactstrap';
import { HttpService } from '@/lib/http.service';
interface Country {
    isd_code: string | number;
    name: string;
    code:string | number;
  }
interface Menu {
    title: string;
    url: string;
}
interface FormData {
    isValidationFailed: boolean;
    Restaurant_Name: string;
    Mobile_number: string;
    Landline_number: string;
    Address: string;
    City: string;
    Longitude: string;
    Pincode: string;
    Latitude: string;
    Open_time: string;
    Close_Time: string;
    Day: string;
}
interface ErrorMessage {
    isValidationFailed: boolean;
    Restaurant_Name: string;
    Mobile_number: string;
    Landline_number: string;
    Address: string;
    City: string;
    Longitude: string;
    Pincode: string;
    Latitude: string;
    Open_time: string;
    Close_Time: string;
    Day: string;
}
interface RegistrationFields {
    RESTAURANT_NAME: string;
    MOBILE_NUMBER: string;
    LANDLINE_NUMBER: string;
    ADDRESS: string;
    CITY: string;
    LONGITUDE: string;
    PINCODE: string;
    LATITUDE: string;
    OPEN_TIME: string;
    CLOSE_TIME: string;
    DAY: string;
}
const Profile: React.FC = () => {
    const menu: Menu[] = [
        { title: 'Restaurant Information', url: '/profile' },
        { title: 'Restaurant Owner Information', url: '/ownerprofile' },
    ];
    const DEFAULT_REG_FORM: FormData = {
        Restaurant_Name: '',
        Mobile_number: '',
        Landline_number: '',
        Address: '',
        City: '',
        Longitude: '',
        Pincode: '',
        Latitude: '',
        Open_time: '',
        Close_Time: '',
        Day: '',
        isValidationFailed: false
    };
    const REGISTRATION_FIELDS: RegistrationFields = {
        RESTAURANT_NAME: 'Restaurant_Name',
        MOBILE_NUMBER: 'Mobile_number',
        LANDLINE_NUMBER: 'Landline_number',
        ADDRESS: 'Address',
        CITY: 'City',
        LONGITUDE: 'Longitude',
        PINCODE: 'Pincode',
        LATITUDE: 'Latitude',
        OPEN_TIME: 'Open_time',
        CLOSE_TIME: 'Close_Time',
        DAY: 'Day'
    };
    const pathname = usePathname()
    const address: string = "basavanagudi, Bengaluru,  Karnataka, M4";
    const search: string = `https://maps.google.com/maps?q=${address}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    const [personalInfo, setPersonalInfo] = useState<FormData>(DEFAULT_REG_FORM);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(DEFAULT_REG_FORM);
    const renderErrorMessage = (field: keyof typeof DEFAULT_REG_FORM) => {
        return (
            errorMessage.isValidationFailed && errorMessage[field] !== '' && (
                <span className='text-danger'>
                    {errorMessage[field]}
                </span>
            )
        );
    };
    const validateRegistrationForm = () => {
        let formData = personalInfo;
        let errorMessage = { ...DEFAULT_REG_FORM, isValidationFailed: false };
        if (formData.Restaurant_Name.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Restaurant_Name: 'Please enter the Restaurant Name',
                isValidationFailed: true
            }
        }
        if (formData.Landline_number.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Landline_number: 'Please Enter the Landline number',
                isValidationFailed: true
            }
        } else if (!/^\d{10}$/.test(formData.Landline_number.trim())) {
            errorMessage = {
                ...errorMessage,
                Landline_number: 'Please enter a valid 10-digit Mobile number',
                isValidationFailed: true
            }
        }
        if (formData.Mobile_number.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Mobile_number: 'Please fill the Mobile number',
                isValidationFailed: true
            }
        } else if (!/^\d{10}$/.test(formData.Mobile_number.trim())) {
            errorMessage = {
                ...errorMessage,
                Mobile_number: 'Please enter a valid 10-digit Mobile number',
                isValidationFailed: true
            }
        }
        if (formData.Address.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Address: 'Please Enter The Address',
                isValidationFailed: true
            }
        }
        if (formData.City.trim() === '') {
            errorMessage = {
                ...errorMessage,
                City: 'Please Enter City',
                isValidationFailed: true
            }
        }
        if (formData.Pincode.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Pincode: 'Please Enter the Pin Code',
                isValidationFailed: true
            }
        } else if (!/^\d{6}$/.test(formData.Pincode.trim())) {
            errorMessage = {
                ...errorMessage,
                Pincode: 'Please enter a valid 6-digit Pin Code',
                isValidationFailed: true
            }
        }
        if (formData.Longitude.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Longitude: 'Please Enter the Longitude',
                isValidationFailed: true
            }
        }
        if (formData.Latitude.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Latitude: 'Please Enter the Latitude',
                isValidationFailed: true
            }
        }
        if (formData.Open_time.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Open_time: 'Please Enter Open time',
                isValidationFailed: true
            }
        }
        if (formData.Close_Time.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Close_Time: 'Please Enter Close Time',
                isValidationFailed: true
            }
        }
        if (formData.Day.trim() === '') {
            errorMessage = {
                ...errorMessage,
                Day: 'Please Enter Day',
                isValidationFailed: true
            }
        }
        return errorMessage;
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === REGISTRATION_FIELDS.PINCODE) {
            matchLength(name, value, 6)
        } else {
            setPersonalInfo({
                ...personalInfo,
                [name]: value
            });
        }
    }
    const matchLength = (name: string, value: string, length: number) => {
        if (value.length <= length) {
            setPersonalInfo({
                ...personalInfo,
                [name]: value
            });
        }
    }
    const router = useRouter()
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validateForm = validateRegistrationForm();
        if (validateForm.isValidationFailed === true) {
            setErrorMessage(validateForm);
        } else {
            router.push('/ownerprofile')
        }
    }

    const [countryData, setCountryData] = useState<{ data: Country[] }>({ data: [] });
    const _httpService = new HttpService();
  
    useEffect(() => {
      _httpService.get<{ data: Country[] }>("https://ums-prod-api-gateway.mangodune-0ce75861.centralindia.azurecontainerapps.io/countries?limit=0&offset=0", { limit: 0, offset: 0 })
        .then((response) => setCountryData(response))
        .catch((error: Error) => console.error("Error fetching countries:", error));
    }, []);

    const [phone, setphone] = useState<string>(personalInfo.Mobile_number);
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
                <div className={Style1.cardrest}>
                    <div className={Style1.itemcentermenu}>
                        <div className={`${Style1.toprestRestaurant} py-1`}>Restaurant Information</div>
                    </div>
                    <div className={Style1.overflowprofile}>
                        {/* <div className='text-end'>
                <button className={`${Style1.Savebtnrest} px-2 mx-2`}>Save</button>
              </div> */}
                        <div className={`${Style1.onerfontstyle} pb-4 pt-2`}>Restaurant Contact & Address</div>
                        <Form onSubmit={(e) => submitForm(e)}>
                            <Row className={`${Style1.margirowrest} mt-1`}>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Restaurant Name</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="text"
                                            name={REGISTRATION_FIELDS.RESTAURANT_NAME}
                                            onChange={handleChange}
                                            value={personalInfo.Restaurant_Name}
                                            invalid={errorMessage.Restaurant_Name !== '' ? true : false}
                                        />
                                        {renderErrorMessage('Restaurant_Name')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Mobile number</Label><br />
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
                                                className={`${Style1.inputrestmobile} w-75`}
                                                style={{ borderRadius: "10px" }}
                                                type="number"
                                                name={REGISTRATION_FIELDS.MOBILE_NUMBER}
                                                onChange={handleChange}
                                                value={personalInfo.Mobile_number}
                                                invalid={errorMessage.Mobile_number !== '' ? true : false}
                                            />
                                        </div>
                                        {renderErrorMessage('Mobile_number')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Landline number</Label><br />
                                        <div className="d-flex gap-1">
                                            <Input type='select' className={`${Style1.inputrestmobile} w-25`} country={"in"}>
                                                {countryData.data.map((item: Country, index: number) => (
                                                    <option key={index}>
                                                        <Row>
                                                            <Col md={6}><span>{item.code}</span></Col>
                                                            <Col md={18} className='px-4'><span className='ms-3'>{item.name}</span></Col>
                                                        </Row>
                                                    </option>
                                                ))}
                                            </Input>
                                            <Input
                                                className={Style1.inputrest}
                                                type="number"
                                                name={REGISTRATION_FIELDS.LANDLINE_NUMBER}
                                                onChange={handleChange}
                                                value={personalInfo.Landline_number}
                                                invalid={errorMessage.Landline_number !== '' ? true : false}
                                            />
                                        </div>
                                        {renderErrorMessage('Landline_number')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Address</Label><br />
                                        <Input
                                            className={Style1.inputrestaddress}
                                            type='textarea'
                                            name={REGISTRATION_FIELDS.ADDRESS}
                                            onChange={handleChange}
                                            value={personalInfo.Address}
                                            invalid={errorMessage.Address !== '' ? true : false}
                                        />
                                        {renderErrorMessage('Address')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>City</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="text"
                                            name={REGISTRATION_FIELDS.CITY}
                                            onChange={handleChange}
                                            value={personalInfo.City}
                                            invalid={errorMessage.City !== '' ? true : false}
                                        />
                                        {renderErrorMessage('City')}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Pincode</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="number"
                                            name={REGISTRATION_FIELDS.PINCODE}
                                            onChange={handleChange}
                                            value={personalInfo.Pincode}
                                            invalid={errorMessage.Pincode !== '' ? true : false}
                                        />
                                        {renderErrorMessage('Pincode')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Longitude</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="number"
                                            name={REGISTRATION_FIELDS.LONGITUDE}
                                            onChange={handleChange}
                                            value={personalInfo.Longitude}
                                            invalid={errorMessage.Longitude !== '' ? true : false}
                                        />
                                        {renderErrorMessage('Longitude')}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Latitude</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="number"
                                            name={REGISTRATION_FIELDS.LATITUDE}
                                            onChange={handleChange}
                                            value={personalInfo.Latitude}
                                            invalid={errorMessage.Latitude !== '' ? true : false}
                                        />
                                        {renderErrorMessage('Latitude')}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className={`${Style1.mapcard} my-2`}>
                                <iframe
                                    // title={address}
                                    src={search}
                                    className='rounded-[15px]'
                                    width="100%"
                                    height="100%"
                                    id="gmap_canvas"
                                />
                            </div>
                            <div className={`${Style1.onerfontstyle} pb-4 pt-3`}>Restaurant Timing & Type</div>
                            <Row className="mx-2 mt-1 mb-4">
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Open time</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="time"
                                            name={REGISTRATION_FIELDS.OPEN_TIME}
                                            onChange={handleChange}
                                            value={personalInfo.Open_time}
                                            invalid={errorMessage.Open_time !== '' ? true : false}
                                            style={{ cursor: "pointer" }}
                                        />
                                        {renderErrorMessage('Open_time')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <FormGroup>
                                        <Label className={Style1.labelfontrest}>Close Time</Label><br />
                                        <Input
                                            className={Style1.inputrest}
                                            type="time"
                                            name={REGISTRATION_FIELDS.CLOSE_TIME}
                                            onChange={handleChange}
                                            value={personalInfo.Close_Time}
                                            invalid={errorMessage.Close_Time !== '' ? true : false}
                                            style={{ cursor: "pointer" }}
                                        />
                                        {renderErrorMessage('Close_Time')}
                                    </FormGroup>
                                </Col>
                                <Col md={8} className={Style1.padingcolrest}>
                                    <Label className={Style1.labelfontrest}>Day</Label><br />
                                    <Input
                                        type='select'
                                        className={Style1.inputrest}
                                        name={REGISTRATION_FIELDS.DAY}
                                        onChange={handleChange}
                                        value={personalInfo.Day}
                                    >
                                        <option>Day</option>
                                        <option>Sunday</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                    </Input>
                                    {renderErrorMessage('Day')}
                                </Col>
                            </Row>
                            <div className="text-end w-100 px-3">
                                <button className={`${Style1.Submitbtnreat} px-4 mt-4 mb-3 py-1`} type='submit'>Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
