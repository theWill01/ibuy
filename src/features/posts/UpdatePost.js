import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updatePost,
  filterById,
  posts,
  singleItem,
  editPost,
  productsStatus,
  updateProduct,
} from "./PostsSlice";

function UpdatePost() {
  const params = useParams();
  const postId = Number(params.postId);
  const title = params.postTitle;
  const dispatch = useDispatch();
  const post = useSelector(posts);
  const status = useSelector(productsStatus);

  const [requestStatus, setRequestStatus] = useState("idle");
  const [details, setDetails] = useState({
    displayImages: post.displayImages,
    brand: post.brand,
    title: post.title,
    color: post.color,
    software: post.software,
    year: post.year,
    rom: post.rom,
    ram: post.ram,
    condition: post.condition,
    rating: post.rating,
    price: post.price,
    quantity: post.quantity,
  });
  console.log(post);
  const handleInfo = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const canSave = [details].every(Boolean) && requestStatus === "idle";
  const submit = (e) => {
    e.preventDefault();

    if (!canSave) return <>failed</>;
    try {
      dispatch(updatePost({ ...details, id: postId }));
      setDetails({ ...details });
    } catch (error) {
      console.log(error);
    } finally {
      setRequestStatus("idle");
    }
    dispatch(editPost(post));
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="w-full h-full">
      <header>Edit {title} </header>
      <div>
        <form onSubmit={submit} className="flex flex-col">
          <label>
            <span>brand :</span>
            <input name="brand" value={details.brand} onChange={handleInfo} />
          </label>
          <label>
            <span>name :</span>
            <input name="title" value={details.title} onChange={handleInfo} />
          </label>

          <label>
            <span>Color :</span>
            <input name="color" value={details.color} onChange={handleInfo} />
          </label>
          <label>
            <span>Software :</span>
            <input
              name="software"
              value={details.software}
              onChange={handleInfo}
            />
          </label>
          <label>
            <span>Year :</span>
            <input name="year" value={details.year} onChange={handleInfo} />
          </label>
          <label>
            <span>Rom :</span>
            <input name="rom" value={details.rom} onChange={handleInfo} />
          </label>
          <label>
            <span>Ram :</span>
            <input name="ram" value={details.ram} onChange={handleInfo} />
          </label>
          <label>
            <span>Condition :</span>
            <input
              name="condition"
              value={details.condition}
              onChange={handleInfo}
            />
          </label>
          <label>
            <span>Rating :</span>
            <input name="rating" value={details.rating} onChange={handleInfo} />
          </label>
          <label>
            <span>Price :</span>
            <input name="price" value={details.price} onChange={handleInfo} />
          </label>
          <label>
            <span>Quantity :</span>
            <input
              name="quantity"
              value={details.quantity}
              onChange={handleInfo}
            />
          </label>

          <button type="submit">update</button>
        </form>
      </div>

      <div className="bg-red-500 w-[61em] h-[300px] flex mx-auto justify-start relative gap-x-2">
        <div className="w-[20em] bg-blue-500 h-[90%]"></div>
        <div className="w-[20em] bg-blue-500 h-[90%]"></div>
        <div className="w-[20em] bg-blue-500 h-[90%]"></div>
      </div>
    </div>
  );
}

export default UpdatePost;
