import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  json,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/ErrorPage";
import SinglePost, { testing } from "./pages/posts/SinglePost";
import Paginate from "./routes/Paginate";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Home from "./routes/home/Home";
import Search, { searchProducts } from "./routes/Search";
import UpdatePost from "./features/posts/UpdatePost";
import { getAllPosts } from "./pages/posts/PostsList";
import PriceLayout from "./layouts/PriceLayout";
import BrandLayout from "./layouts/BrandLayout";
import PostsLayout from "./pages/posts/PostsLayout";
import { checkForBrand } from "./components/brand/BrandList";
import { getPostByYear } from "./routes/Year";
import { priceRange } from "./components/brand/Price";
import { checkSoftware } from "./components/software/Software";
import { checkForPost } from "./pages/posts/SinglePost";



const LazyPostsList = React.lazy(() => import("./pages/posts/PostsList"));
const LazyBrandList = React.lazy(() => import("./components/brand/BrandList"));
const LazyPrice = React.lazy(() => import("./components/brand/Price"));
const LazySoftware = React.lazy(() => import("./components/software/Software"));
//const LazySingleProductsPage = React.lazy(() =>
// import("./features/products/SingleProductsPage")
//);
const LazyYear = React.lazy(() => import("./routes/Year"));
const LazyUploadService = React.lazy(() => import("./services/UploadService"));
const fb = () => {
  return (
    <>
      <span>....hello</span>
    </>
  );
};

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="update/:postId/:postTitle" element={<UpdatePost />} />
      <Route path="search/:search" element={<PostsLayout />}>
        <Route
          index
          element={
            <Suspense>
              <Search />
            </Suspense>
          }
          loader={({ params }) => {
            return searchProducts(params.search);
          }}
        />
      </Route>
      <Route path="software/:software" element={<PostsLayout />}>
        <Route
          index
          element={
            <Suspense>
              <LazySoftware />
            </Suspense>
          }
          loader={({ params }) => {
            return checkSoftware(params.software);
          }}
        />
      </Route>

      <Route path="year/:year" element={<PostsLayout />}>
        <Route
          index
          element={
            <Suspense>
              <LazyYear />
            </Suspense>
          }
          loader={({ params }) => {
            return getPostByYear({ params });
          }}
        />
      </Route>
      <Route path="upload" element={<LazyUploadService />} />
      <Route path="paginate" element={<Paginate />} />

      <Route path="price/:minPrice/:maxPrice" element={<PostsLayout />}>
        <Route
          index
          element={
            <Suspense>
              <LazyPrice />
            </Suspense>
          }
          loader={({ params }) => {
            return priceRange({ params });
          }}
        />
      </Route>

      <Route path="products" element={<PostsLayout />}>
        <Route
          index
          element={
            <Suspense fallback={fb}>
              <LazyPostsList />
            </Suspense>
          }
          loader={getAllPosts}
        />

        <Route path="/products/:brand" element={<BrandLayout />}>
          <Route
            index
            element={
              <Suspense fallback={fb}>
                <LazyBrandList />
              </Suspense>
            }
            loader={({ params }) => {
              return checkForBrand(params.brand);
            }}
          />
        </Route>
      </Route>
      <Route path="products/:brand/:title/:id">
        <Route
          index
          element={<SinglePost />}
          loader={({ params }) => checkForPost(params.id)}
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
