import React from "react";
import { Outlet } from "react-router-dom";

const PostsLayout = () => {
  return (
    <div>
      All <Outlet />
    </div>
  );
};

export default PostsLayout;
