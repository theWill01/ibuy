import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, Link } from "react-router-dom";
import {
  allImages,
  productsStatus,
  updateProduct,
} from "../../features/posts/PostsSlice";
import { addToCart } from "../../features/cart/CartSlice";
import Rating from "../../components/rating/Rating";
import "../../styles/SinglePost.scss";
import { MemoisedSimilarProducts } from "../../features/similarItem/SimilarProducts";
import { MemoisedSameBrand } from "../../features/similarBrand/SameBrand";
import axiosInstance from "../../services/Axios";

export default function SinglePost() {
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const product = loaderData[0];
  const thumbNails = JSON.parse(loaderData[0].images);
  const [dp, setDp] = useState(thumbNails[0].image);
  const status = useSelector(productsStatus);

  const itemImages = thumbNails.map((item, idx) => {
    return (
      <figure
        key={idx}
        className={"image-box w-[30%] h-[99%] overflow-hidden cursor-pointer"}
        onClick={(c) => setDp(item.image)}
      >
        <img
          src={item.image}
          alt={"#"}
          className={"w-[100px] h-[100px] object-contain my-2 mx-auto"}
        />
      </figure>
    );
  });

  //____________________________USE EFFECT_______________________________
  useEffect(() => {
    localStorage.setItem("updated post", JSON.stringify(product));
  }, [status, product, dispatch]);

  const color = (product) => (
    <div className="flex align-[center] relative">
      <h5>color :</h5>
      <div
        className={" h-[15px] w-[15px] absolute left-[50px] top-[6px]"}
        style={{ backgroundColor: `${product.color}`, borderRadius: "50%" }}
      ></div>{" "}
    </div>
  );

  const rating = <Rating rate={product.stars} />;

  return (
    <section className=" h-[2580px] w-full min-[600px]:h-full md:h-full lg:h-full lg:w-[90%] xl:w-[80%] my-0 mx-auto xl:h-[1500px] overflow-hidden relative ">
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
            <Link to={`/update/${product.id}/${product.title}`}>
              Edit posts
            </Link>
          </li>
        </ul>
      </span>
      {/*single item container */}
      <article className="w-[100%] h-[670px] md:h-[380px] lg:h-[350px] xl:h-[400px] min-[600px]:h-[680px] overflow-hidden flex flex-col sm:flex-row ">
        <figure className="relative top-0 w-[90%] h-full sm:w-[44%] overflow-hidden">
          <img
            className="preview-img h-[300px] w-[300px] md:h-full min-[600px]:w-full min-[600px]:h-[330px] lg:h-[300px] lg:w-[300px] xl:h-[390px] relative my-0 mx-auto object-contain lg:my-4"
            src={dp}
            alt={product.title}
          />
        </figure>
        <div
          className={
            "h-full w-[100%] overflow-hidden"
          }
        >
          <div className={"item-images"}>{itemImages}</div>
          <ul className={"item-details"}>
            <li className="flex product-details md:text-[red]">
              Rating :{rating}
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
            <li className="product-details">Condition: {product.condition}</li>
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
      </article>
      <span className="flex align-middle justify-center h-[30px] min-[600px]:h-[35px]">
        <button
          className="h-[98%] w-[99%] text-center bg-[#709ad2] text-[#E4F2EE] text-[0.8rem] lg:text-[0.8rem] xl:text-[0.9rem] px-[0.6rem] my-0 mx-auto"
          onClick={() => dispatch(addToCart(product))}
        >
          add {product.brand} {product.title} to cart
        </button>
      </span>
      {/*PRODUCTS CONTAINER */}
      <div className="bg-blue-100 w-full h-full min-[600px]:h-[60%] overflow-hidden relative bottom-0">
        <div className="min-[600px]:h-[30px] w-full bg-[#CECDCD]">
          <h1 className="text-[0.7rem] px-[0.2rem] min-[600px]:text-[0.8rem] lg:text-[0.9rem] xl:text-[1.2rem]">
            <strong>
              Maybe you would like to see devices similar to {product.brand}
              {product.title}? check these out...
            </strong>
          </h1>
        </div>
        {/*SIMILAR PRODUCTS CONTAINER*/}
        <article className="w-full min-[600px]:h-[830px] md:h-[856px] lg:h-[470px] xl:h-[450px] min-[810px]:justify-between  block md:flex">
          {/*similar items */} <MemoisedSimilarProducts />
        </article>

        {/*SIMILAR BRAND CONTAINER */}
        <article className="sm:h-[1110px] md:h-[400px] lg:h-[490px] xl:h-[450px]">
          <span className="flex w-full min-[600px]:h-[30px]  justify-between bg-[#CECDCD]">
            <h1 className="text-[0.7rem] px-[0.2rem] min-[600px]:text-[0.85rem] lg:text-[0.9rem] xl:text-[1.2rem]">
              <strong>
                {" "}
                Or you like {product.brand} devices and would like to see what
                else they have in store ?
              </strong>
            </h1>

            <Link to={`/products/${product.brand}`}>
              <h1 className="text-[0.7rem] px-[0.2rem] lg:text-[0.9rem] xl:text-[1.2rem]">
                <strong> see all >></strong>
              </h1>
            </Link>
          </span>
          <MemoisedSameBrand />
        </article>
      </div>
    </section>
  );
}

export const checkForPost = async (val) => {
  const response = await axiosInstance.get(`products?id=${val}`);
  return response.data;
};
