
import { Mail } from '../state/Mail';
import { useTypedSelector } from './use-typed-selector';


const filterMail = (mailList: Mail[] , filter : (mail: Mail) => boolean , searchTerm: string ) => {
  
  if(searchTerm){
    return mailList.filter(mail => filter(mail) && (mail.text.includes(searchTerm) || mail.subject.includes(searchTerm)));
  }

  return mailList.filter(mail => filter(mail));
  
}

const useMailBox = () => {
  return useTypedSelector((state) => {
    const location = state.control?.location;
    let mailList = (state.mail?.mail || []) as Mail[];
    const searchTerm = state.control?.searchTerm || "";
   
    switch (location) {

      case "inbox": 
        mailList = filterMail(mailList, (mail: Mail) => !mail.isOutbound && !mail.isTrash , searchTerm );
        break

      case "starred": 
       
        mailList = filterMail(mailList, (mail: Mail) => mail.isStarred && !mail.isTrash , searchTerm );
        break
    

      case "sent": 
        mailList = filterMail(mailList, (mail: Mail) => mail.isOutbound && !mail.isTrash , searchTerm );
        break

      case "allmail": 
      mailList = filterMail(mailList, (mail: Mail) => !mail.isTrash , searchTerm );
      break

      case "trash": 
      mailList = filterMail(mailList, (mail: Mail) => mail.isTrash , searchTerm );
      break

      default:
        return mailList;
    }
    return mailList.reverse();
  }) || [] as Mail[];
}


export default useMailBox;