import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLoaderData} from "react-router-dom";
import {
    allImages,
    productsStatus,
    singlePost,
    updateProduct,
} from "./PostsSlice";
import {addToCart} from "../cart/CartSlice";
import Rating from "../../components/rating/Rating";
import "../../assets/singleProductsPage.scss";
import {MemoisedSimilarProducts} from "../similarItem/SimilarProducts";
import {MemoisedSameBrand} from "../similarBrand/SameBrand";
import axiosInstance from "../../services/Axios";

export default function SinglePost() {
    const loaderData = useLoaderData();
    const dispatch = useDispatch();
    const product = useSelector(singlePost);
    const thumbNails = JSON.parse(loaderData[0].images);
    const [dp, setDp] = useState(thumbNails[0].image);
    //console.log(product);
    const status = useSelector(productsStatus);


    const itemImages = thumbNails.map((item, idx) => {
        return (
            <figure
                key={idx}
                className={
                    "border border-black w-[30%] h-[99%] overflow-hidden cursor-pointer"
                }
                onClick={(c) => setDp(item.image)}
            >
                <img
                    src={item.image}
                    alt={"#"}
                    className={"w-[150px] h-[150px] object-contain"}
                />
            </figure>
        );
    });

    //____________________________USE EFFECT_______________________________
    useEffect(() => {
        dispatch(updateProduct(loaderData));
        localStorage.setItem("updated post", JSON.stringify(product));
    }, [status, product, dispatch, loaderData]);

    const color = (product) => (
        <div className="flex border border-black align-[center] relative">
            <h5>color :</h5>
            <div
                className={
                    " h-[15px] w-[15px] border border-black absolute left-[50px] top-[6px]"
                }
                style={{backgroundColor: `${product.color}`, borderRadius: "50%"}}
            ></div>
            {" "}
        </div>
    );

    const stars = <Rating rate={product.rating}/>;

    return (
        <section
            className="flex h-[2660px] w-full sm:h-[2790px] md:h-[1450px] lg:h-full xl:h-[1500px] overflow-hidden align-[center] justify-center relative">
            <article className="w-full h-full block">
        <span>
          <ul>
            <li>
              <h1 className="text-[1.4rem] lg:text-[1.6rem] xl:text-[2.4rem] font-light px-1">
                <strong>
                  {product.brand} {product.title}
                </strong>
              </h1>
            </li>
            <li className="w-full border flex">
              <h1 className="sm:w-[44%] border text-[1.8rem] lg:text-[1.9rem] xl:text-[1.9rem] font-light ">
                {" "}
                  ${product.price}
              </h1>
              <h1 className="hidden sm:block font-light text-[1.8rem] px-1">
                {product.title} Details
              </h1>
            </li>
            <li>
              <a href={`/update/${product.id}/${product.title}`}>Edit posts</a>
            </li>
          </ul>
        </span>
                {/*single item container */}
                <div
                    className="w-[100%] h-[500px] sm:h-[400px] md:h-[380px] lg:h-[440px] xl:h-[400px] flex flex-col sm:flex-row border border-black">
                    <figure
                        className="relative top-0 w-[90%] sm:w-[44%] h-[99%] xl:h-[99%] border border-red-500 overflow-hidden">
                        <img
                            className="preview-img h-full w-full md:h-full sm:w-full sm:h-[400px] lg:h-[400px] xl:h-[390px] relative my-0 mx-auto object-contain"
                            src={dp}
                            alt={product.title}
                        />
                    </figure>
                    <div className={"w-[100%]"}>
                        <div className={"item-images"}>{itemImages}</div>
                        <ul className={"item-details"}>
                            <li className="flex product-details md:text-[red]">
                                Rating :{stars}
                            </li>
                            <li className="product-details">brand : {product.brand}</li>
                            <li className="product-details">name : {product.title}</li>
                            <li className="product-details">Ram Memory : {product.ram}GB</li>
                            <li className="product-details">
                                Internal Storage : {product.rom}GB
                            </li>
                            <li className="product-details">{color(product)}</li>
                            <li className="product-details">
                                year : {product.brand} {product.title} was released on{" "}
                                {product.year}
                            </li>
                            <li className="product-details">software : {product.software}</li>
                            <li className="product-details">
                                Condition: {product.condition}
                            </li>
                            <li
                                className={
                                    product.quantity - 1 <= 1
                                        ? "text-[red] product-details"
                                        : "text-[green] product-details"
                                }
                            >
                                {product.quantity - 1 <= 0
                                    ? "this is the last one in store"
                                    : `we have only ${product.quantity - 1} ${
                                        product.title
                                    } left in stock-order soon`}
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="flex align-middle justify-center border border-red-400 h-[30px]">
          <button
              className="h-[22px] w-[99%] border border-black text-center bg-[#709ad2] text-[#E4F2EE] text-[0.8rem] lg:text-[0.8rem] xl:text-[0.9rem] px-[0.6rem] my-0 mx-auto"
              onClick={() => dispatch(addToCart(product))}
          >
            add {product.brand} {product.title} to cart
          </button>
        </span>
                {/*PRODUCTS CONTAINER */}
                <div className="bg-blue-100 border border-red-600 w-full h-full overflow-hidden relative bottom-0">
                    <h1 className="px-[0.2rem] text-[0.7rem] lg:text-[0.9rem] xl:text-[1.2rem]">
                        <strong>
                            {" "}
                            Maybe you would like to see devices similar to {
                            product.brand
                        }{" "}
                            {product.title}? check these out...{" "}
                        </strong>
                    </h1>
                    {/*SIMILAR PRODUCTS CONTAINER*/}
                    <div
                        className="sm:h-[1100px] md:h-[440px] lg:h-[470px] xl:h-[450px] border border-black block md:flex">
                        {/*similar items */} <MemoisedSimilarProducts/>
                    </div>

                    {/*SIMILAR BRAND CONTAINER */}
                    <div className="sm:h-[1110px] md:h-[440px] lg:h-[490px] xl:h-[450px] border border-black ">
                        <h1 className="text-[0.7rem] px-[0.2rem] lg:text-[0.9rem] xl:text-[1.2rem]">
                            <strong>
                                {" "}
                                Or you like {product.brand} devices and would like to see what
                                else they have to offer
                            </strong>
                        </h1>
                        <MemoisedSameBrand/>
                    </div>
                </div>
            </article>
        </section>
    );
}

export const testing = async (val) => {
    const response = await axiosInstance.get(`products?id=${val}`);
    console.log(val);
    console.log(response);
    return response.data;
};
