import React, { useEffect } from "react";
import "./ShopByBrands.scss";
import { data } from "../../db/data";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const brands = data[0].brands;

export default function ShopByBrands() {
  const links =
    brands &&
    brands.map((link, index) => (
      <a href={`/products/${link.label.toLowerCase()}`} key={index}>
        <figure>
          <img className="object-contain" src={link.file} alt={link.label} />
          <figcaption className="text-center left-0 w-full">
            <h1>
              <strong>{link.label}</strong>
            </h1>
          </figcaption>
        </figure>
      </a>
    ));
  return (
    <>
      <div
        className="flex h-[40px] px-3 w-full justify-between border border-black "
        style={{ alignItems: "center" }}
      >
        {" "}
        <h1 className="text-[0.95rem]">
          <strong>Shop by Brands</strong>{" "}
        </h1>{" "}
        <a
          href={"/products/all"}
          className="text-[0.95rem]"
        >
          <strong>See All Brands</strong>
        </a>
      </div>
      <div className={"category-links border border-black overflow-hidden mb-5"}>
        {links}
      </div>
    </>
  );
}
