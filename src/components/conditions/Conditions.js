import React from "react";
import { data } from "../../assets/helpers/Data";

export default function Conditions() {
  const texts = data.texts;

  const deviceConditions = texts.map((text) => (
    <span
      key={text.id}
      className={
        "w-[99%] h-[12em] min-[600px]:h-[10em] border-t border-[#CECDCD] px-2 lg:h-[99%] text-[0.6rem]  md:text-[0.75rem] lg:text-[0.7rem] relative "
      }
    >
      <h1 className="text-[1rem] text-start ">{text.head}</h1>
      <ul className="min-[600px]:text-[0.65rem]">
        <li>{text.condition}</li>
        <li>{text.battery}</li>
        <li>{text.warranty}</li>
      </ul>
      <p className="min-[600px]:text-[0.8rem] text-[#709ad2] absolute bottom-[0.1rem] lg:bottom-[0.9rem] xl:top-[9.8rem] cursor-pointer">
        {text.link}
      </p>
    </span>
  ));
  return (
    <div
      className={
        "flex flex-col w-[100%] justify-evenly lg:flex-row lg:h-[12.5em] gap-y-2"
      }
    >
      {deviceConditions}
    </div>
  );
}
