import React from "react";
import { Outlet } from "react-router-dom";

const All = () => {
  return (
    <div>
      All <Outlet />
    </div>
  );
};

export default All;
