import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-jtvi.onrender.com",
});

export default API;