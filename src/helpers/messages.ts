import Axios, { AxiosPromise } from 'axios';
import { Mail } from '../state/Mail';
import {htmlToText} from 'html-to-text';


const localUrl = "http://localhost:7777"
const serverUrl = "https://rabany-mail.herokuapp.com"

const url = serverUrl;

export const fetchInboxFromServer : () => AxiosPromise<Mail[]> = () => {
 return Axios({
    method: "GET",
    withCredentials: true,
    url: url + "/messages/inbox",
})
}

export const fetchAllMailFromServer : (mailSize : number) => AxiosPromise<{allMail : Mail[] , needToUpdate : boolean} > = (mailSize : number) => {
    return Axios({
       method: "POST",
       data: {mailSize} ,
       withCredentials: true,
       url: url + "/messages/allmail",
   })
   }

export const toggleStarOnServer  = (mailId: string) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: url + "/messages/starred",
   })
}

export const toggleIsTrashOnServer  = (mailId: string[]) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: url + "/messages/istrash",
   })
}

export const deleteMailOnServer  = (mailId: string[]) => {
    return Axios({
       method: "POST",
       data: { mailId : mailId},
       withCredentials: true,
       url: url + "/messages/deleteMessages",
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
        url: url + "/messages",
    });
}

export const markAsReadOnServer  = (mailId: string[] , isRead : boolean) => {
    
    return Axios({
       method: "POST",
       data: { mailId , isRead},
       withCredentials: true,
       url: url + "/messages/markasread",
   })
}