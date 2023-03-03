import { loginreq, req, reqA,formreq } from './axiosFun';

export const searchMovie = (params) => {
  console.log("search: ", params)
  return req("post", "api/user/logout", params)
};

export const getMovie = (params,params2) => {
  // console.log("search: ")
  return formreq("get", "api/movies/info/",params,params2)
};

export const getAdminInfo = () => {
  return req("get", "api/adminInfo/adminInfo/")
};

// getPageInfo
export const getAllMovie = () => {
  // console.log("search: ")
  return req("get", "api/movies/page/")
};

export const getComment = (params,params2)=>{
  return formreq("get", "api/reviewlogs/page/", params, params2)
}

export const addComment = (params)=>{
  return req("post", "api/reviewlogs/add/", params)
}
