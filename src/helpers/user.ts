import Axios from 'axios';

export const loginSever = (username: string , password: string) => {
  return Axios({
   method: "POST",
   data: {
     username,
     password,
   },
   withCredentials: true,
   url: "http://localhost:7777/login",
});
}

export const logoutServer = () => {
 return Axios({
   method: "GET",
   withCredentials: true,
   url: "http://localhost:7777/logout",
});
}

export const getUserFromServer = () => {
return Axios({
   method: "GET",
   withCredentials: true,
   url: "http://localhost:7777/user",
 });
}

export const registerServer = (username: string , password: string , passwordConfirm:string) => {
  return Axios({
   method: "POST",
   data: {
     username,
     password,
     passwordConfirm,
   },
   withCredentials: true,
   url: "http://localhost:7777/register",
});
}