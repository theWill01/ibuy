import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ibuy-data.onrender.com",
  //  baseURL: "http://localhost:3001/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
