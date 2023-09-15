import React from "react";
import { Outlet } from "react-router-dom";

const SinglePostLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default SinglePostLayout;
