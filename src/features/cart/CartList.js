import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  reduceQuantity,
  setQuantity,
  addQuantity,
  removeSingleProduct,
  clearCart,
} from "./CartSlice";
import Plus from "../../assets/images/plus.png";
import Minus from "../../assets/images/minus.png";
import Arrow from "../../assets/images/right-arrow.png";
import Remove from "../../assets/images/remove.png";

const CartList = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartItems);

  const itemUpdatedPrice = (products) => {
    return products.count * products.price;
  };

  const total = () =>
    cart.reduce((sum, { price, count }) => sum + price * count, 0);

  const cartItem =
    cart &&
    cart.map((products, index) => {
      return (
        //CART ITEM CONTAINER

        <div className=" h-[35px] w-[99%] flex border-b text-[0.8rem]" key={index}>
          {/*ITEM IMAGE AND NAME*/}
          <figure className="flex align-[center] border-r  w-[40%] px-[2px]">
            <img
              src={products.displayImage}
              alt={products.brand}
              className={"w-[30px] h-[30px] object-contain"}
            />
            <figcaption className="h-[100%] text-center">
              <h1>
             {products.title}
              </h1>
            </figcaption>
          </figure>

          {/*ITEM PRICE INPUT AND MANIPULATION*/}

          <div className="border-r flex align-middle justify-evenly w-[130px]">
            <button
              className="w-[30px]"
              onClick={() => dispatch(reduceQuantity(products))}
            >
              <figure>
                <img className="w-[25px]" src={Minus} alt="-" />
              </figure>
            </button>
            <label>
              <input
                className="w-[30px] h-[25px] my-[4px] mx-auto"
                value={products.count}
                onChange={(e) =>
                  dispatch(
                    setQuantity({
                      products,
                      test: parseInt("0" + e.target.value),
                    })
                  )
                }
              />
            </label>
            <button
              className="w-[25px]"
              onClick={() => dispatch(addQuantity(products))}
            >
              <figure>
                <img src={Plus} alt="+" />
              </figure>
            </button>
            <p className="text-[0.9rem] my-2">
              ${itemUpdatedPrice(products)}
            </p>
          </div>
          <label>
            <button onClick={() => dispatch(removeSingleProduct(products))}>
              <figure>
                <img src={Remove} alt="X" className="w-[30px]" />
              </figure>
            </button>
          </label>
        </div>
      );
    });
  return (
    <>
      <div className="h-[75%] overflow-scroll">{cartItem} </div>
      <div className="border border-black w-full relative bottom-0 flex flex-col justify-around h-[25%] py-[0.2rem]">
        <span className="w-full flex justify-between px-5 text-[0.9rem]">
          {" "}
          <p>your total bill is</p> <p>: ${total()}</p>
        </span>
        <label className="w-full flex align-middle justify-center">
          <button className="w-[98%] text-slate-50 rounded-md bg-green-400">
            proceed to checkout
          </button>
        </label>
        <label className="w-full flex align-middle justify-center">
          <button
            className="w-[98%] text-slate-50 rounded-md bg-[#ff845f]"
            onClick={() => dispatch(clearCart())}
          >
            clear cart
          </button>
        </label>
      </div>
    </>
  );
};

export default CartList;
