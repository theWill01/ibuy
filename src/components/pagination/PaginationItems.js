import React from "react";
import { useDispatch } from "react-redux";
import Rating from "../rating/Rating";
import "./Paginate.scss";
import { addToCart } from "../../features/cart/CartSlice";
import {Link} from "react-router-dom";

const PaginationItems = ({ item }) => {
  const dispatch = useDispatch();
  const imageArr = JSON.parse(item.images)
 // console.log(imageArr)
  //border-[#eae6e6]

  return (
    //THE PAGINATION ITEM CONTAINER CONTAINER
    <div className="border relative  border-[#eae6e6]  h-[215px] w-[100%] flex flex-row md:flex-col min-[600px]:h-[240px] min-[600px]:w-[99%] md:w-[220px] md:h-[380px] lg:w-[25em] lg:h-[380px] xl:w-[230px] xl:h-[370px] overflow-hidden mt-[5px]  rounded-md text-[0.8rem] min-[600px]:text-[0.4rem] md:text-[0.48rem] lg:text-[0.55rem]">
      {/*THE PRODUCT IMAGE CONTAINER*/}
      <article className="w-[38%] sm:w-[55%] sm:h-[99%] md:w-full md:h-[44%] border border-black">
        <Link to={`/products/${item.brand}/${item.title}/${item.id}`}>
          <figure
            className="h-[99%] border border-blue-500 overflow-hidden flex align-middle justify-center bg-[#e4f2ee] object-contain"
            style={{
              alignItems: "center",
            }}
          >
            <img src={imageArr[0].image} alt={item.title} className={"image"} />
          </figure>
        </Link>
      </article>
      {/*THE PRODUCT DETAILS CONTAINER */}
      <ul className=" border border-green-500  w-[62%]  sm:w-full sm:h-[99%] md:h-[56%]">
        <li className="product-detail text-[0.7rem] xl:text-[0.73rem] border border-red-500 ">
          <strong>{item.brand}</strong> {item.title}, {item.ram}GB, {item.rom}
          GB
        </li>
        {/*THE PRODUCT RATINGS */}
        <li className="product-detail flex text-[0.8rem] lg:text-[0.5rem] xl:text-[0.7rem] relative bg-[#e4f2ee]">
          ({item.rating})-
          <Rating rate={item.rating} />
        </li>
        {/*THE PRODUCT PRICE */}
        <li className="price flex align-middle justify-start w-100 border border-gray text-[1.3rem] lg:text-[1rem] sm:text-[1.3rem] xl:text-[1.2rem] text-[#0572af]  text-center ">
          <h1 className="font-[400]">${item.price}</h1>
        </li>
        {/*THE PRODUCT COLOR */}
        <li className="product-detail flex bg-[#e4f2ee]">
          <h5>Color :</h5>
          <div
            className="w-[30px] h-[5px] xl:h-[15px] rounded-sm"
            style={{ backgroundColor: item.color }}
          ></div>
        </li>

        {/*THE PRODUCT CONDITION */}
        <li className="product-detail  xl:text-[0.73rem] border ">
          <p>Condition - ({item.condition})</p>
        </li>
        {/*THE YEAR THE PRODUCT WAS RELEASED */}
        <li className="product-detail text-[0.75rem] bg-[#e4f2ee] ">
          <p>
            {item.title} was released on {item.year}
          </p>
        </li>
        {/*THE QUANITY OF PRODUCTS CURRENTLY IN STORE */}
        <li className="product-detail  ">
          {" "}
          {item.quantity - 1 <= 0 ? (
            <h4 className={"[color:red] text-[0.7rem] xl:text-[0.73rem]"}>
              {" "}
              this is the last item in store order soon
            </h4>
          ) : (
            <p className="[color:green] text-[0.7rem] xl:text-[0.73rem]">
              we have <strong>{item.quantity - 1}</strong> left in stock order
              soon
            </p>
          )}
        </li>
        {/*ADD TO CART BUTTON*/}
        <li className="w-full h-[40px] border border-red-500 md:h-[30px] xl:h-[30px] relative  sm:bottom-0">
          <button
            className=" w-full h-[99%] bg-[#94c4ec] text-[#e4f2ee] text-[0.95rem] md:text-[0.85rem] lg:text-[0.85rem] xl:text-[0.85rem] min-[1348px]:text-[0.95rem] rounded-sm"
            onClick={() => dispatch(addToCart(item))}
          >
            Add to cart{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationItems;
