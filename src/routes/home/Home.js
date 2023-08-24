import React from "react";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import "./Home.scss";
import PopularBrands from "../../components/PopularBrands";
import samsung from "../../assets/images/image4.png";
import samsung2 from "../../assets/images/image6.png";
import BannerImg from "../../assets/images/banner-img.jpeg";
import BannerImg2 from "../../assets/images/banner-img2.jpeg";
import { popularBrands2 } from "../../components/PopularBrands";
import Certified from "../../components/certified/Certified";
import Conditions from "../../components/conditions/Conditions";
import { data } from "../../assets/db/data";
import ShopByBrands from "../../components/brand/ShopByBrands";

const certified = <Certified />;
const conditions = <Conditions />;
const shopByBrands = <ShopByBrands />;

export default function Home() {
  const promise = data.promise;
  const question = data.questions;

  const promises = promise.map((result, idx) => (
    <figure
      key={idx}
      className="w-[99%] border border-blue-300 sm-[600px]:h-[140px] md:w-[240px] md:h-[180px] lg:w-[180px] xl:h-[230px] xl:w-[230px]"
      style={{ borderRadius: "5px" }}
    >
      <img
        src={result.image}
        alt={result.header}
        className={
          "w-[80px] h-[70px] lg:w-[60px] lg:h-[50px] xl:w-[80px] xl:h-[70px]"
        }
        style={{ margin: "10px auto" }}
      />

      <figcaption className="px-[0.5rem]">
        <h1 className="text-[0.95rem] lg:text-[0.85rem] xl:text-[1rem] text-start">
          {result.header}
        </h1>
        <p className="text-[0.7rem] xl:text-[0.8rem] text-left">
          {result.body}
        </p>
        <Link to={""}>
          <p className="text-left relative top-1 text-[#4467c9] text-[0.55rem]xl:text-[0.7rem]">
            {result.extra}
          </p>
        </Link>
      </figcaption>
    </figure>
  ));

  const questions = question.map((que, idx) => (
    <div key={idx} className="que">
      <h1 className="text-[0.95rem]">{que.header}</h1>
      <p className="text-[0.65rem]">{que.body}</p>
    </div>
  ));

  return (
    <div className="home">
      {/*BANNER HEADER*/}
      <section className="banner mb-5">
        <Banner />
      </section>
      {/*-------------------------------------------------------------------------------*/}

      <article className="banner-2 hidden sm:flex align-middle justify-center overflow-hidden w-full h-[220px] md:h-[190px] lg:h-[210px] xl:h-[250px]">
        <figure>
          <img src={BannerImg} alt="placeholder" />
        </figure>
        <span className="info">
          <h1 className="text-[1.6rem] relative ">SHOP MORE.</h1>
          <br />
          <h1 className="text-[1.6rem] relative top-[-40px]">WORRY LESS.</h1>
          <p>Every Renewed purchase is backed by</p>
          <p>The 90-Day Satisfaction Guarantee</p>
          <p>Learn More...</p>
        </span>
        <span className="before"></span>
      </article>
      <h1 className="article-head">Explore Official Brand Stores</h1>

      <article className="h-[62.5em] md:h-[499px] xl:h-[565px] border border-black">
        <PopularBrands />
      </article>
      <article className="gift flex-col ">
        <div className="img-box flex-col">
          <span>
            <h5>ibuy renew</h5>
            <br />
            <h1>
              FIND THE <br /> PERFECT GIFT
            </h1>
            <h4 className="shop-samsung">Shop Samsung</h4>
          </span>{" "}
          <img className="top-img" src={samsung2} alt="$" />{" "}
          <img className="btm-img" src={samsung} alt="$" />
        </div>

        <article className="gift-right-side">{popularBrands2}</article>
      </article>
      <article className={"certified-box"}>{certified}</article>
      <article className="border border-black">
        <h2 className="article-head">Shop by Condition</h2>
        {conditions}
      </article>
      <article className="w-[100%] bg-[#CECDCD]" style={{ margin: "0px auto" }}>
        {shopByBrands}
      </article>
      <article className={"banner-3"}>
        <span className={"info-2"}>
          <h1>HIGH STANDARDS.</h1>
          <h1>HIGH QUALITY.</h1>
          <p>We vet and qualify all our refurbished product</p>
          <p>so you are guaranteed top quality.</p>
          <p>Learn more.....</p>
        </span>
        <span className={"text-2"}></span>
        <figure className={"banner-img2"}>
          <img src={BannerImg2} alt={""} />
        </figure>
      </article>
      <span>
        <h1 className="article-head">The Renewed promise</h1>
      </span>
      <article className={"promise"} style={{ alignItems: "center" }}>
        {promises}
      </article>
      <hr />
      <h1 className="article-head">Frequently asked questions</h1>
      <article className={"questions"}>
        {questions}
        <p>Other questions?</p>
        <p>Visit Our Help Center</p>
      </article>
    </div>
  );
}
