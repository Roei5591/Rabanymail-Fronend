import { Mail } from '../state/Mail';
import { useTypedSelector } from './use-typed-selector';

const useMailBox = () => {
  return useTypedSelector((state) => {
    if(state.control?.location === "inbox") return state.mail?.mail.filter(mail => !mail.isOutbound && !mail.isTrash).reverse();
    if(state.control?.location === "starred") return state.mail?.mail.filter(mail => mail.isStarred && !mail.isTrash).reverse();
    if(state.control?.location === "sent") return state.mail?.mail.filter(mail => mail.isOutbound && !mail.isTrash).reverse();
    if(state.control?.location === "allmail") return state.mail?.mail.filter(mail => !mail.isTrash).reverse();
    if(state.control?.location === "trash") return state.mail?.mail.filter(mail => mail.isTrash).reverse();    
    return [];
  }) as Mail[];
}

export default useMailBox;