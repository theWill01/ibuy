import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./routes/ErrorPage";
import SinglePost, { testing } from "./pages/posts/SinglePost";
import Paginate from "./routes/Paginate";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Home from "./routes/home/Home";
import Search from "./routes/Search";
import UpdatePost from "./features/posts/UpdatePost";
import { getAllPosts } from "./pages/posts/PostsList";
import { HashRouter } from "react-router-dom";
import PostsLayout from "./pages/posts/PostsLayout";
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
      <Route path="search/:search" element={<Search />} />
      <Route path="products/:brand" element={<LazyBrandList />} />
      <Route path="price/:minPrice/:maxPrice" element={<LazyPrice />} />
      <Route path="software/:software" element={<LazySoftware />} />
      <Route path="year/:year" element={<LazyYear />} />
      <Route path="upload" element={<LazyUploadService />} />
      <Route path="paginate" element={<Paginate />} />

      <Route path="products">
        <Route
          index
          element={
            <Suspense>
              <LazyPostsList />
            </Suspense>
          }
          loader={getAllPosts}
        />
      </Route>
      <Route path="products/:brand/:title/:id">
        <Route
          index
          element={<SinglePost />}
          loader={({ params }) => {
            return testing(params.id);
          }}
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
