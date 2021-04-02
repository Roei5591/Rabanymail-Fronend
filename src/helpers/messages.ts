import Axios, { AxiosPromise } from 'axios';
import { Mail } from '../state/Mail';
import {htmlToText} from 'html-to-text';

export const fetchInboxFromServer : () => AxiosPromise<Mail[]> = () => {
 return Axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:7777/messages/inbox/",
})
}

export const fetchAllMailFromServer : (mailSize : number) => AxiosPromise<{allMail : Mail[] , needToUpdate : boolean} > = (mailSize : number) => {
    return Axios({
       method: "POST",
       data: {mailSize} ,
       withCredentials: true,
       url: "http://localhost:7777/messages/allmail/",
   })
   }

export const toggleStarOnServer  = (mailId: string) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: "http://localhost:7777/messages/starred/",
   })
}

export const toggleIsTrashOnServer  = (mailId: string[]) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: "http://localhost:7777/messages/istrash/",
   })
}

export const deleteMailOnServer  = (mailId: string[]) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: "http://localhost:7777/messages/deleteMessages/",
   })
}

export const sendMailFromServer = (msg: {
    to: string[],
    subject: string,
    html: string
    text: string | undefined
  }) => {
    
   
    
    msg.text = htmlToText(msg.html) 
    return Axios({
        method: "POST",
        data: msg,
        withCredentials: true,
        url: "http://localhost:7777/messages/",
    });
}

export const markAsReadOnServer  = (mailId: string[] , isRead : boolean) => {
    
    return Axios({
       method: "POST",
       data: { mailId , isRead},
       withCredentials: true,
       url: "http://localhost:7777/messages/markasread/",
   })
}