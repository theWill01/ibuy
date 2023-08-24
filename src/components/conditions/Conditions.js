import React from "react";
import { data } from "../../assets/helpers/Data";

export default function Conditions() {
  const texts = data.texts;

  const deviceConditions = texts.map((text) => (
    <span
      key={text.id}
      className={
        "w-[99%] h-[12em] sm:h-[10em] border border-black px-2 lg:h-[99%] text-[0.6rem]  md:text-[0.75rem] lg:text-[0.7rem] relative "
      }
    >
      <h1 className="text-[1rem] text-start">{text.head}</h1>
      <ul>
        <li>{text.condition}</li>
        <li>{text.battery}</li>
        <li>{text.warranty}</li>
      </ul>
      <p className=" text-[#709ad2] xl:absolute xl:top-[9.8rem] cursor-pointer">
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
