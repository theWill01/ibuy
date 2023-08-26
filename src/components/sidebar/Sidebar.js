import { setMinutes } from "date-fns";
import { Children, useState } from "react";
import { useDispatch } from "react-redux";
import { data } from "../../assets/helpers/Data";
import axiosInstance from "../../services/Axios";
import { Link } from "react-router-dom";
const years = [
  { year: 2019 },
  { year: 2020 },
  { year: 2021 },
  { year: 2022 },
  { year: 2023 },
];

export default function SideBar() {
  const brands = data.brands;
  const [values, setValues] = useState({ min: "", max: "" });
  const inputChange = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  //CATEGORY LINK COMPONENTS
  const CategoryLinks = ({ category, children }) => (
    <span>
      {" "}
      <hr />
      <li className="text-[1rem] h-[25pz] md:h-[30px] xl:h-[30px] md:text-[0.65rem] xl:text-[1.1rem] bg-[#709ad2] border">
        {category}
      </li>
      {children}
    </span>
  );

  const brand = brands.map((item) => (
    <label key={item.id}>
      <hr />
      <li
        className={
          "text-[0.85rem] md:text-[0.65rem] xl:text-[0.9rem] h-[25px] md:h-[30px] xl:h-[30px]"
        }
      >
        <input type={"radio"} name={"brands"} value={item.key} />{" "}
        <Link to={`/products/${item.key}`}>{item.label.toLowerCase()}</Link>
      </li>
    </label>
  ));

  const Prices = ({ minPrice, maxPrice }) => {
    return (
      <li className="text-[0.85rem] md:text-[0.65rem] xl:text-[0.85rem] h-[25px] md:h-[30px] xl:h-[30px]">
        <label>
          <input type={"radio"} name={"price"} />
          <Link to={`/price/${minPrice}/${maxPrice}`}>
            {" "}
            from ${minPrice} to ${maxPrice}
          </Link>
        </label>
        <hr />
      </li>
    );
  };

  const Cat = ({ route, routeItem, content }) => {
    return (
      <li className="text-[0.85rem] h-[25px] md:h-[30px] xl:h-[30px] md:text-[0.65rem] xl:text-[0.9rem] border">
        <label>
          <hr />
          <input type={"radio"} name={"system"} />
          <a href={`/${route}/${routeItem}`}>{content}</a>
        </label>
      </li>
    );
  };

  const year = years.map((product, index) => (
    <li
      key={index}
      className="text-[0.85rem] md:text-[0.65rem] xl:text-[0.9rem] h-[25px] md:h-[30px] xl:h-[30px]"
    >
      <a href={`/year/${product.year}`}>{product.year}</a>
      <hr />
    </li>
  ));

  //THE SIDEBAR DISPLAY SCRIPT
  return (
    <section className="w-[100%] h-[100%] px-[10px] text-[0.9rem] md:text-[0.75rem] xl:text-[1rem] border">
     
      <h1>
        <strong>Featured Brands</strong>
      </h1>
      <hr />
      {/*CATEGORY LINK FORM */}
      <form>
        {/*BRAND CATEGORY LINK */}
        <Link to={"/products"}>
          <h3 className="border w-[100%] h-[25px] md:h-[30px] xl:h-[30px] bg-[#709ad2] text-[1rem]">
            <strong>All Brands</strong>
          </h3>
        </Link>
        {brand}
        <hr />

        <ul>
          {/*PRICES CATEGORY LINK */}
          <CategoryLinks category={"Prices"}>
            <Prices minPrice={200} maxPrice={350} />

            <Prices minPrice={350} maxPrice={450} />

            <Prices minPrice={450} maxPrice={950} />

            <li
              className="flex h-[25px] justify-around w-[98%] overflow-hidden md:w-[30%] xl:h-[40px]"
              style={{ alignItems: "center" }}
            >
              <label className="flex">
                <input
                  className="border border-back w-[27px] md:w-[40px] h-[20px] text-[0.4rem]"
                  placeholder={"$Min"}
                  name={"min"}
                  value={values.min}
                  onChange={inputChange}
                />
              </label>

              <label className="flex">
                <input
                  className="border border-back w-[27px] md:w-[40px] h-[20px] text-[0.4rem] md:text-[0.65rem]"
                  placeholder={"$Max"}
                  onChange={inputChange}
                  name={"max"}
                  value={values.max}
                />
              </label>
              <label>
                <a href={`/price/${values.min}/${values.max}`}>
                  <button>go</button>
                </a>
              </label>
            </li>
          </CategoryLinks>
          {/*SOFTWARE CATEGORY LINK */}
          <CategoryLinks category={"software"}>
            <Cat route={"software"} routeItem={"android"} content={"android"} />
            <Cat route={"software"} routeItem={"ios"} content={"apple"} />
          </CategoryLinks>
          {/*YEAR CATEGORY LINK */}
          <CategoryLinks category={"Model Year"}>{year}</CategoryLinks>
        </ul>
      </form>
    </section>
  );
}
