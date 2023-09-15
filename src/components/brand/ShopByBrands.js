import React, { useEffect } from "react";
import "./ShopByBrands.scss";
import { data } from "../../assets/helpers/Data";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const brands = data.brands;

export default function ShopByBrands() {
  const links =
    brands &&
    brands.map((link, index) => (
      <Link to={`/products/${link.label.toLowerCase()}`} key={index}>
        <figure>
          <img className="object-contain" src={link.file} alt={link.label} />
          <figcaption className="text-center left-0 w-full">
            <h1>
              <strong>{link.label}</strong>
            </h1>
          </figcaption>
        </figure>
      </Link>
    ));
  return (
    <section className="w-full">
      <div
        className="flex h-[40px] px-3 w-full justify-between border border-[rgba(234, 230, 230, 1)]  "
        style={{ alignItems: "center" }}
      >
        {" "}
        <h1 className="text-[0.95rem]">
          <strong>Shop by Brands</strong>{" "}
        </h1>{" "}
        <Link to={"/products"} className="text-[0.95rem]">
          <strong>See All Brands</strong>
        </Link>
      </div>
      <div className={"category-links overflow-hidden mb-5"}>{links}</div>
    </section>
  );
}
