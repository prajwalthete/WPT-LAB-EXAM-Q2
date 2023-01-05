import axios from "axios";

const authFetch = axios.create({
  baseURL: "http://localhost:4000",
});

authFetch.interceptors.request.use(
  (request) => {
    console.log("request");
    let phn = sessionStorage.getItem("Phone number");

    if (phn) {
      request.headers["auth"] = phn;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    console.log("response");
   
    return response;
  },
  (error,response) => {
    console.log(error.response);
    response.json({error:"data can't be processed"})
  }
);

export default authFetch;
