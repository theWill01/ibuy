import React from "react";
import "./Certified.scss";
import { data } from "../../db/data";

export default function Certified() {
  const files = data[0].files;

  const renderImages = files.map((file, idx) => {
    return (
      <figure className={file.class} key={idx}>
        <img src={file.image} alt={""} />
      </figure>
    );
  });
  return (
    <div className={"certified"}>
      <span>
        <p>Pre-Owned Certified</p>
        <p>Buying Pre-Owned Extends a products Life</p>
        <p>Reducing e-waste and raw material extraction.</p>
        <p>Learn More</p>
      </span>
      <article className={"render"}>{renderImages}</article>
    </div>
  );
}
