import React, { useState } from "react";
import "../styles/PopularBrands.scss";
import { data } from "../assets/helpers/Data";
const brands = data.popularBrands;

export const popularBrands2 = brands[4].items.map((brand, idx) => {
  return (
    <figure className="brand-item-box2" key={idx}>
      <img className={brand.className} src={brand.image} alt={brand.label} />
      <figcaption className="brand-label h-[30px]">
        <h4 className="mx-4">{brand.label}</h4>
      </figcaption>
    </figure>
  );
});

export default function PopularBrands() {
  return (
    <article className="main">
      {brands.slice(0, 4).map((item, idx) => (
        <div className="brand-item-box" key={idx}>
          <div className="badge">renew</div>
          <figure className="overflow-hidden">
            <img className={item.className} src={item.image} alt={item.label} />
            <span className="absolute w-full h-[30px] border border-black  z-10 bottom-0 text-[0.85rem] text-[#E4F2EE] font-[600]">
              <p>{item.label}</p>
            </span>
          </figure>
        </div>
      ))}
    </article>
  );
}
