import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import CartItems from "../cart/CartItems";
import { cartItems } from "../../features/cart/CartSlice";
import Search from "../../assets/images/search.svg";
import Close from "../../assets/images/close.png";
import Cart from "../../assets/images/cart.png";

export default function Navbar() {
  // const cart = useCart();

  const [search, setSearch] = useState("");
  const [displayCart, setDisplayCart] = useState(false);
  const ref = React.useRef(null);
  const cart = useSelector(cartItems);
  const navigate = useNavigate();
  const canSave = [search].every(Boolean);

  const toggle = (e) => {
    setDisplayCart(true);
    e.stopPropagation();
  };

  const totalItemsInCart = () => {
    return cart.reduce((sum, { count }) => sum + count, 0);
  };

  const startSearch = () => {
    if (!canSave) return;

    navigate(`/search/${search}`);
    setSearch("");
  };
  const handleOutsideClick = useCallback(
    (e) => {
      if (ref.current && displayCart && !ref.current.contains(e.target)) {
        setDisplayCart(false);
      }
    },
    [displayCart]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <section className="top-nav w-full relative z-[20]">
      <article
        className="flex w-full h-[45px] bg-[#709ad2] px-[1rem]"
        style={{ alignItems: "center" }}
      >
        <Link
          to={"/"}
          className="w-[66px] flex"
          style={{ alignItems: "center" }}
        >
          <h1 className="text-[#E4F2EE]">
            <strong>iBUY</strong>
          </h1>
          <p className="text-[0.5rem]">renew</p>
        </Link>
        <article className=" w-[220px] min-[600px]:w-[450px] h-[27px]  flex overflow-hidden rounded-[5px] md:w-[450px] xl:w-[700px] md:relative md:left-[20px]">
          <form onSubmit={startSearch} className={"flex w-[100%]"}>
            <input
              name="search"
              type={"text"}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={" search by brand, name"}
              value={search}
              className={"w-[98%] text-[0.75rem]"}
            />
            <button
              className="w-[20%] md:w-[50px] xl:w-[50px] bg-[#e4f2ee]"
              type="submit"
              disabled={!canSave}
            >
              <figure className="flex align-middle justify-center">
                <img src={Search} alt={"#"} className={"w-[20px] h-[20px]"} />
              </figure>
            </button>
          </form>
        </article>
        <ul
          className="flex justify-evenly w-[45px] sm:w-[135px] md:w-[130px] absolute right-[4px] text-[#E4F2EE] text-[0.55rem] h-[30px]"
          style={{ alignItems: "center" }}
        >
          <li className="hidden sm:block">Accounts</li>
          <li className="hidden sm:block">Orders</li>
          <li>
            <button onClick={toggle} className={"h-[30px]  relative"}>
              <figure className="  h-[99%] relative flex align-middle justify-center">
                <img
                  src={Cart}
                  alt="*"
                  className="w-[30px] h-[30px] relative "
                />
                <figcaption
                  className={
                    cart.length < 1
                      ? "hidden"
                      : "absolute text-center w-[100%] h-[100%]  flex align-middle justify-center"
                  }
                >
                  <span className="rounded-[50%] bg-red-400 w-[9px] h-[9px]  relative left-[3px] top-[9.1px]">
                    <p className="absolute my-[-2.9px] left-[0.1rem] text-[0.45rem]">
                      {" "}
                      {totalItemsInCart()}
                    </p>
                  </span>
                </figcaption>
              </figure>
            </button>
          </li>
        </ul>
      </article>
      {/*CART CONTAINER */}
      <article
        ref={ref}
        className={
          !displayCart
            ? "hidden"
            : "w-[280px] h-[370px] border border-black absolute right-[10px] top-[80px] overflow-scroll bg-[snow] rounded flex flex-col "
        }
      >
        <div className="w-[100%] h-[25px] flex  justify-between px-1 border border-red-700">
          {/*CART HEADER TEXT*/}
          <p className="text-[0.75rem]">
            {cart.length <= 0
              ? "your cart is currently empty"
              : ` you have ${totalItemsInCart()} items in the cart `}
          </p>

          {/*CLOSE CART BUTTON*/}
          <button
            className="h-[99%] border border-black rounded align-end"
            onClick={(c) => setDisplayCart(false)}
          >
            <figure>
              <img
                className="w-[22px] h-[22px] object-contain"
                src={Close}
                alt="X"
              />
            </figure>
          </button>
        </div>
        <hr />
        {cart.length > 0 ? (
          //CART CONTENTS
          <>
            <CartItems />
          </>
        ) : (
          //CART PLACEHOLDER TEXTS
          <div className=" w-[80%] h-[30px] rounded my-[130px] mx-auto text-[0.9rem] bg-red-400 text-stone-100">
            <p className="text-center">add item to cart....</p>
          </div>
        )}
      </article>
    </section>
  );
}
