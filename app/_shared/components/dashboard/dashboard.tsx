"use client";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Col, Row } from "reactstrap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Image from "next/image";
import { VscGraphLine } from "react-icons/vsc";
import { SlWallet } from "react-icons/sl";
import { TbMoneybag } from "react-icons/tb";

import cooking from "../../../_assets/images/cooking.png";
import chart from "../../../_assets/images/chart.png"
import chart2 from "../../../_assets/images/chart2.png"
import chart3 from "../../../_assets/images/chart3.png"
import itesmfood from "../../../_assets/images/itesmfood.png"
import profilelogo1 from "../../../_assets/images/profilelogo1.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./dashboard.module.scss";
// import Header from "@/app/_shared/components/header/Header";



export const Dashboard = () => {
  const data = [
    { label: "Jan", sales: 21, leads: 41 },
    { label: "Feb", sales: 35, leads: 79 },
    { label: "Mar", sales: 75, leads: 57 },
    { label: "Apr", sales: 51, leads: 47 },
    { label: "May", sales: 41, leads: 63 },
    { label: "Jun", sales: 47, leads: 71 },
    { label: "jul", sales: 47, leads: 71 },
  ];
  return (
    <>
      <div className={`${style.dashbordflex}`}>
        <div className={`${style.contentPart} ${style.layoutwidth}`}>
          <div className="mx-2">
            <div className={`${style.overprifle} pb-2`}>
              Analytics Overview
            </div>
            <div>
              <Row className={style.flexcss}>
                <Col className={style.overcard}>
                  <div className="flex justify-between gap-2 mx-2 my-2">
                    <div
                      className={`${style.borderci} flex justify-center py-2`}
                    >
                      <VscGraphLine className={`text-2xl ${style.clasciwal}`} />
                    </div>
                    <div className="w-75">
                      <Image
                        src={chart}
                        alt="chart"
                      />{" "}
                    </div>
                  </div>
                  <div className={`${style.topro} ms-2`} >Total Sales</div>
                  <div className="flex justify-between mx-2">
                    <div className={style.font18}>₹ 18,545</div>
                    <button className={`${style.btn15} px-2`}>+15%</button>
                  </div>
                </Col>
                <Col className={style.overcard}>
                  <div className="">
                    <div className="flex justify-between gap-2 mx-3 my-2">
                      <div
                        className={`${style.borderci} flex justify-center pt-2`}
                      >
                        <SlWallet className={`text-2xl ${style.clasciwal}`} />
                      </div>
                      <div className="w-75">
                        <Image
                          src={chart2}
                          alt="chart"
                        />{" "}
                      </div>
                    </div>
                    <div className={`${style.topro} ms-2`} >Expense</div>
                    <div className="flex justify-between mx-2">
                      <div className={style.font18}>₹ 18,545</div>
                      <button className={`${style.btn15} px-2`}>+15%</button>
                    </div>
                  </div>
                </Col>
                <Col className={style.overcard}>
                  <div className="">
                    <div className="flex justify-between gap-2 mx-3 my-2">
                      <div
                        className={`${style.borderci} flex justify-center pt-2`}
                      >
                        <TbMoneybag className={`text-2xl ${style.clasciwal}`} />
                      </div>
                      <div className="w-75">
                        <Image
                          src={chart3}
                          alt="chart"
                        />{" "}
                      </div>
                    </div>
                    <div className={`${style.topro} ms-2`} >Revenue</div>
                    <div className="flex justify-between mx-2">
                      <div className={style.font18}>₹ 18,545</div>
                      <button className={`${style.btn15} px-2`}>+15%</button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row className={style.flexcss1}>
              <Col md={7} sm={6}>
                <div className={style.colwidth}>
                  <div className={`${style.anafont} py-1`}>
                    Analytics Overview
                  </div>
                  <div className="text-end pb-2" style={{ marginTop: "-1rem" }}>
                    <select className={`${style.slctstyle} px-2`}>
                      <option>Year 2023</option>
                    </select>
                  </div>
                  <div className={style.overviewcard}>
                    <div className={`${style.section} `}>
                      <div className={style.weeklycard}>
                        <ResponsiveContainer width={"100%"} height={150}>
                          <LineChart
                            data={data}
                            margin={{ top: 15, right: 25, bottom: 15, left: -15 }}
                          >
                            <Tooltip />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="sales" stroke="#FB8833" />
                            <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5} sm={6}>
                <div className={style.colwidth1}>
                  <div className={`${style.anafont} py-1`}>
                    Customer Stats
                  </div>
                  <div className="text-end pb-2" style={{ marginTop: "-1rem" }}>
                    <select className={`${style.slctstyle} px-2`}>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div className={style.weeklycard}>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart
                        data={data}
                        margin={{ top: 15, right: 25, bottom: 15, left: -15 }}
                      >
                        <Tooltip />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="sales" stroke="#FB8833" />
                        <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
            </Row>
            <div className={`${style.anafont} py-1 mt-3`}>More Item Sale</div>
            <div className="text-end pb-2" style={{ marginTop: "-1rem" }}>
              <select className={`${style.slctstyle} px-2`}>
                <option>Year 2023</option>
              </select>
            </div>
            <div className={style.foodcard}>
              <table style={{ width: "100%" }}>
                <thead className="text-center">
                  <tr className={`${style.cardheader} my-2`}>
                    <th scope="col" className="px-3 py-2">
                      Food name
                    </th>
                    <th scope="col" className="px-3">
                      Item Price
                    </th>
                    <th scope="col" className="px-3">
                      Item Percentage
                    </th>
                    <th scope="col" className="px-3">
                      Total sale
                    </th>
                    <th scope="col" className="px-3">
                      Sale Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className={style.bodytfont}>
                  <tr className="mt-2">
                    <th className="text-start ms-2 py-1 d-flex gap-1 mt-3"><Image src={itesmfood} alt="itesmfood" width={20} />Chicken tikka</th>
                    <td className="text-center py-1 mt-3">250</td>
                    <td className="text-center py-1 mt-3">20%</td>
                    <td className="text-center py-1 mt-3">12 K</td>
                    <td className="text-center py-1 mt-3">90%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Pizza</th>
                    <td className="text-center py-1">200</td>
                    <td className="text-center py-1">19%</td>
                    <td className="text-center py-1">11.5 K</td>
                    <td className="text-center py-1">89%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Grill</th>
                    <td className="text-center py-1">190</td>
                    <td className="text-center py-1">18%</td>
                    <td className="text-center py-1">11 K</td>
                    <td className="text-center py-1">80%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Burgur</th>
                    <td className="text-center py-1">160</td>
                    <td className="text-center py-1">15%</td>
                    <td className="text-center py-1">10 K</td>
                    <td className="text-center py-1">90%</td>
                  </tr>
                  <tr className="mt-2">
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Chicken tikka</th>
                    <td className="text-center py-1 mt-3">250</td>
                    <td className="text-center py-1 mt-3">20%</td>
                    <td className="text-center py-1 mt-3">12 K</td>
                    <td className="text-center py-1 mt-3">90%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Pizza</th>
                    <td className="text-center py-1">200</td>
                    <td className="text-center py-1">19%</td>
                    <td className="text-center py-1">11.5 K</td>
                    <td className="text-center py-1">89%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Grill</th>
                    <td className="text-center py-1">190</td>
                    <td className="text-center py-1">18%</td>
                    <td className="text-center py-1">11 K</td>
                    <td className="text-center py-1">80%</td>
                  </tr>
                  <tr>
                    <th className="text-start ms-2 py-1 d-flex gap-1"><Image src={itesmfood} alt="itesmfood" width={20} />Burgur</th>
                    <td className="text-center py-1">160</td>
                    <td className="text-center py-1">15%</td>
                    <td className="text-center py-1">10 K</td>
                    <td className="text-center py-1">90%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`${style.contentPart} bg-[#E9FCDB] border-[#D1D1D1] border-[1.5px] ${style.layoutwidth1}`}>
          <div>
            <div className="flex justify-center">
              <Image
                src={cooking}
                width={170}
                height={124}
                alt="Picture of the author"
              />
            </div>
            <div className="rounded-[30px] px-6 py-3 bg-[#588A7A] border-[#ABD28E] border-[1px] w-5/5" style={{ marginTop: "-1rem" }}>
              <div className="flex justify-between">
                <div>
                  <div className="text-[#FFF] text-sm font-bold pt-1">
                    Try Premium Version
                  </div>
                  <div className={style.getfont}>
                    You will get more features here
                  </div>
                </div>
                <div>
                  <button className={`${style.rigtbtnbg} px-4 mt-2`}>
                    <FaLongArrowAltRight style={{ fontSize: "1.5rem" }} />
                  </button>
                </div>
              </div>
            </div>
            <div className={`${style.defont} py-1 mt-3`}>Delivery Employee</div>
            <div className="my-2">
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1 mt-2">
                    <div>
                      <Image
                        src={profilelogo1}
                        alt="profilelogo1"
                        className={style.profilelogostyle}
                      />
                    </div>
                    <div className={style.padingravi}>
                      <div className={style.nameravifont}>Ravi Kumar</div>
                      <div className={style.m5font}>5m away</div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={`${style.Assbtn} px-3 py-1 my-3`}>
                    Assign
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1 mt-2">
                    <div>
                      <Image
                        src={profilelogo1}
                        alt="profilelogo1"
                        className={style.profilelogostyle}
                      />
                    </div>
                    <div className={style.padingravi}>
                      <div className={style.nameravifont}>Ravi Kumar</div>
                      <div className={style.m5font}>5m away</div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={`${style.Assbtn} px-3 py-1 my-3`}>
                    Assign
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1 mt-2">
                    <div>
                      <Image
                        src={profilelogo1}
                        alt="profilelogo1"
                        className={style.profilelogostyle}
                      />
                    </div>
                    <div className={style.padingravi}>
                      <div className={style.nameravifont}>Ravi Kumar</div>
                      <div className={style.m5font}>5m away</div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={`${style.Assbtn} px-3 py-1 my-3`}>
                    Assign
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-1 mt-2">
                    <div>
                      <Image
                        src={profilelogo1}
                        alt="profilelogo1"
                        className={style.profilelogostyle}
                      />
                    </div>
                    <div className={style.padingravi}>
                      <div className={style.nameravifont}>Ravi Kumar</div>
                      <div className={style.m5font}>5m away</div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className={`${style.Assbtn} px-3 py-1 my-3`}>
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

