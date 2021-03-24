import Axios, { AxiosPromise } from 'axios';
import { Mail } from '../state/Mail';

export const fetchInboxFromServer : () => AxiosPromise<Mail[]> = () => {
 return Axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:7777/messages/inbox/",
})
}

export const toggleStarOnServer  = (mailId: string) => {
    return Axios({
       method: "POST",
       data: { mailId},
       withCredentials: true,
       url: "http://localhost:7777/messages/starred/",
   })
}

export const sendEmail = (data: any) => {
    const msg = {
        ...data,
        to: [data.to],
    }
  
    Axios({
        method: "POST",
        data: msg,
        withCredentials: true,
        url: "http://localhost:7777/messages/",
    }).then();
}