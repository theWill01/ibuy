import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar/Sidebar";
const PostsLayout = () => {
  return (
    <div className="flex h-full">
      {/*OUR PAGE SIDE NAVIGATION */}
      <article className="w-[40%] md:w-[35%] lg:w-[24%] xl:w-[22%] hidden sm:block border border-blue-500">
        <SideBar />
      </article>

   
        <Outlet />
     
    </div>
  );
};

export default PostsLayout;
