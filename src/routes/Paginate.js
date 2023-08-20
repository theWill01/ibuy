import React from "react";
import axiosInstance from "../services/Axios";
import Data from "../data.json";

export default function Paginate() {
  return (
    <div>
      {Data.posts.map((item, idx) => {
        return (
          <div key={idx}>
                <p>{item.brand}</p>
                <img src={item.files} alt="$" />
          </div>
        );
      })}
    </div>
  );
}
