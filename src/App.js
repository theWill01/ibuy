import React, {useCallback, useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";

import "./App.scss";


import Navbar from "./components/navbar/Navbar";

import Footer from "./components/footer/Footer";
import SideBar from "./components/sidebar/Sidebar";
import {useSelector} from "react-redux";
import {cartItems} from "./features/cart/CartSlice";

function App() {
    const ref = useRef(null);

    const cart = useSelector(cartItems);
    const [menu, setMenu] = useState(false);
    const [onScroll, setOnScroll] = useState(false);

    const toggle = () => setMenu((prevMenu) => !prevMenu);

    const outsideClick = useCallback(
        (e) => {
            if (ref.current && menu && !ref.current.contains(e.target)) {
                setMenu(false);
            }
        },
        [menu]
    );

    useEffect(() => {
        const scroll = () => {
            if (window.scrollY > 5) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
        };
        document.addEventListener("scroll", scroll);
        localStorage.setItem("cart", JSON.stringify(cart)); //***********here we are sending cart array to local storage

        document.addEventListener("mousedown", outsideClick);
        return () => {
            document.removeEventListener("mousedown", outsideClick);
            document.removeEventListener("scroll", scroll);
        };
    }, [cart, outsideClick]);

    return (
        <div className="App">
            <section className={!onScroll ? "scrolled current " : "scrolled"}>
                <Navbar/>

                <article className="bg-[#709ad2]  h-[30px] text-[#E4F2EE] text-[0.45rem] md:text-[0.7rem] ">
                    <ul
                        className="border border-black w-[100%] flex justify-evenly"
                        style={{alignItems: "center"}}
                    >
                        <li
                            className="flex sm:hidden cursor-pointer relative w-[40px] h-[24px] justify-between border border-black "
                            style={{alignItems: "center"}}
                            onClick={() => toggle()}
                        >
                            <div className=" w-[23px] h-[26px] flex flex-col justify-evenly relative">
                                <div className="w-[95%] h-[3px] bg-[#e4f2ee]"></div>
                                <div className="w-[95%] h-[3px] bg-[#e4f2ee]"></div>
                                <div className="w-[95%] h-[3px] bg-[#e4f2ee]"></div>
                            </div>
                            <p className="text-[0.6rem] mt-[3px]">
                                <strong>ALL</strong>
                            </p>
                        </li>
                        <li className="text-[0.6rem]">Today's Deals</li>
                        <li className="text-[0.6rem]">Customer Service</li>

                        <li className="text-[0.6rem]">Sell</li>
                        <li className="text-[0.6rem]">Shop Great Deals Now</li>
                    </ul>
                </article>
            </section>
            <section className="border border-blue-500 relative w-full h-full">
                <article
                    className={
                        !menu
                            ? "hidden"
                            : "flex h-full w-full border absolute top-0 border-black"
                    }
                >
                    <div className={!menu ? "close" : "open"}>
                        <div
                            ref={ref}
                            className={
                                !menu
                                    ? "opacity-0"
                                    : "border border-black w-[70%] h-full bg-[#e4f2ee]"
                            }
                        >
                            <ul>
                                <li>Accounts</li>
                                <li>Orders</li>
                                <li>Today's Deals</li>
                                <li>Customer Service</li>
                                <li>Registry</li>
                                <li>Gift Cards</li>
                                <li>Sell</li>
                                <li>Shop Great Deals Now</li>
                            </ul>
                            <SideBar/>
                        </div>
                    </div>
                    <article className="w-[97%] relative"></article>
                </article>
                <article>
                    <Outlet/>
                </article>
            </section>
            <section>
                <article className="footer-box">
                    <div className="top-btn cursor-pointer">
                        <span>Back To Top</span>
                    </div>
                    <Footer/>
                    <article className="w-[100%] h-[60px] bg-[#4467c9]"></article>
                </article>
            </section>
        </div>
    );
}

export default App;
