import { req,formreq } from './axiosFun';

export const searchMovie = (params,params2) => {
  // console.log("search: ", params)
  return formreq("get", "api/movies/contain", params,params2)
};

export const getMovie = (params,params2) => {
  // console.log("search: ")
  return formreq("get", "api/movies/info/",params,params2)
};

export const getAdminInfo = () => {
  return req("get", "api/admins/page/")
};

// getPageInfo
export const getAllMovie = (params, params2) => {
  // console.log("search: ")
  return formreq("get", "api/movies/newest/", params, params2)
};

export const getComment = (params,params2)=>{
  return formreq("get", "api/reviewlogs/page/", params, params2)
}

export const addComment = (params)=>{
  return req("post", "api/reviewlogs/add/", params)
}
