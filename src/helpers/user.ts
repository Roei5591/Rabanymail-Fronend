import Axios from 'axios';

const localUrl = "http://localhost:7777"
const serverUrl = "https://rabany-mail.herokuapp.com"

const url = localUrl;

export const loginSever = (username: string , password: string) => {
  return Axios({
   method: "POST",
   data: {
     username,
     password,
   },
   withCredentials: true,
   url: url + "/login",
});
}

export const logoutServer = () => {
 return Axios({
   method: "GET",
   withCredentials: true,
   url: url + "/logout",
});
}

export const getUserFromServer = () => {
return Axios({
   method: "GET",
   withCredentials: true,
   url: url + "/user",
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
   url: url + "/register",
});
}