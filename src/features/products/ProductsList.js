import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allProducts, fetchPosts, productsStatus} from "./ProductsSlice";
import PaginationItems from "../../components/pagination/PaginationItems";
import SideBar from "../../components/sidebar/Sidebar";
import ReactPaginate from "react-paginate";
import "../../styles/Pagination.scss";
import {useLoaderData} from "react-router-dom";
import axiosInstance from "../../services/Axios";

export default function ProductsList() {
    const allPosts = useLoaderData();
  


    const itemsPerPage = 12;

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = allPosts.slice(itemOffset, endOffset);
    useEffect(() => {
        setPageCount(Math.ceil(allPosts.length / itemsPerPage));
     
    }, [ itemOffset, allPosts]);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % allPosts.length;
        console.log(`user requested page number ${e.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

         const content = currentItems && currentItems.map((item, index) => {
             const filterKey = item.brand;
             
                return (<PaginationItems item={item} key={index} filterKey={filterKey}/>);
            });
 

    return (<section className=" h-[100%] border border-green-500 flex w-full p-0">
        {/*OUR PAGE SIDE NAVIGATION */}
        <article className="w-[40%] md:w-[30%] lg:w-[24%] xl:w-[22%] hidden sm:block border border-black">
            <SideBar/>
        </article>
        {/*OUR PAGE CONTENT */}
        <article
            className="w-[99%] md:w-[70%] lg:w-[76%] xl:w-[78%] h-full border border-red-500 flex flex-col lg:px-1">
            <h1 className="font-bold  xl:text-[1.7rem] border border-green-500">
                ALL Brands
            </h1>
            {/* OUR PRODUCTS LIST*/}
            <article
                className="flex relative flex-col md:flex-row top-0 flex-wrap justify-start md:justify-evenly w-[100%] h-[99%] md:h-[95%] border border-black">
                {content}
            </article>
            {/* PAGINATION BUTTONS*/}
            <article className="relative bottom-[0] my-0 mx-auto border-t-[#EAE6E6] w-[100%] h-[50px] p-[2px]">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next "
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    activeLinkClassName="active"
                    activeClassName="active"
                    pageClassName="page-num-box"
                    previousClassName="prev"
                    nextClassName="next"
                />
            </article>
        </article>
    </section>);
}


export const getAllPosts = async () => {
    const response = await axiosInstance.get("products");
    return response.data
}