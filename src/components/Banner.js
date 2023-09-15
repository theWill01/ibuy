import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Banner.scss";
import { bannerIcons } from "../assets/BannerImg";

export default function Banner() {
  const bgText = <h1>IBUY</h1>;

  return (
    <section>
      <div className="flex align-middle justify-center h-[315px] w-[100%] relative">
        <div className="bg">
          <div className="blue-ball"></div>
          <div className="red-ball"></div>
        </div>
        <div className="bg2">
          <p className="introducing text-[#709ad2] font-semibold text-[0.9rem">
            INTRODUCING
          </p>
          {bgText}
          <span>
            <p>Expertly refurbished</p>
            <p> products at great prices</p>
            <p>all backed by our 90-days renewal guarantee</p>
          </span>
        </div>
      </div>
      <div
        className="w-[99%] h-[50%] flex flex-col  md:w-full md:h-[30%] 2xl:text-[red] justify-center md:flex-row"
        style={{ alignItems: "center" }}
      >
        {bannerIcons.map((items) => {
          return (
            <figure
              key={items.id}
              className=" h-[140px] w-[250px] min-[360px]:h-[120px]"
            >
              <img src={items.image} alt="" className="my-2 mx-auto h-[70%] md:h-[60px] md:mt-5 lg:h-[90px] min-[360px]:w-[80px] min-[360px]:h-[70px]" />
              <figcaption className="text-[0.9rem] w-full text-center">{items.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
