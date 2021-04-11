
import  { useEffect} from 'react';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import './MailList.css';
import MailListItem from './MailListItem';
import TrashIcons from './TrashIcons';
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import {Mail} from "../state/Mail";






export default function MailList( {match }: any) {


  const location = match.params.location;

  const {setLocation ,fetchAllMail , toggleAllMailCheckbox , toggleIsTrash , deleteMail , markAsRead} = useActions();

  const mailList = useTypedSelector((state) => {
    if(state.control?.location === "inbox") return state.mail?.mail.filter(mail => !mail.isOutbound && !mail.isTrash).reverse();
    if(state.control?.location === "starred") return state.mail?.mail.filter(mail => mail.isStarred && !mail.isTrash).reverse();
    if(state.control?.location === "sent") return state.mail?.mail.filter(mail => mail.isOutbound && !mail.isTrash).reverse();
    if(state.control?.location === "allmail") return state.mail?.mail.filter(mail => !mail.isTrash).reverse();
    if(state.control?.location === "trash") return state.mail?.mail.filter(mail => mail.isTrash).reverse();    
    return [];
  }) as Mail[];


  const checkAll = useTypedSelector((state) => {
    return state.mail?.checked;
   }) || new Set();


useEffect(() => {
  setLocation(location);
  toggleAllMailCheckbox(mailList ,true);
  if(location === "inbox")
  fetchAllMail();
  },[setLocation, toggleAllMailCheckbox, fetchAllMail, location ] );

  const refresh = () => {
    fetchAllMail();
  }

  const handleCheckAll =  () => {
    toggleAllMailCheckbox(mailList);
  };

  const handleClickTrash = () => {
    toggleAllMailCheckbox(mailList,true);
    toggleIsTrash(Array.from(checkAll));
    } 

  const handleClickDelete = () => {
  toggleAllMailCheckbox(mailList,true);
  deleteMail(Array.from(checkAll));
  
  }

  const handleClickRead = () => {
  markAsRead(Array.from(checkAll) , true);
  }

  const handleClickUnRead = () => {
  markAsRead(Array.from(checkAll) , false);
  }

  const RefreshIconTooltip = () =>
  <Tooltip title="Refresh" aria-label="Refresh"> 
    <IconButton onClick = {refresh}>
      <RefreshIcon />
    </IconButton>
  </Tooltip> 



  return (
    <div className="emailList">
        <div className="emailList_settings">
            <div className="emailList_settingsLeft">
                <Checkbox  checked={checkAll.size !== 0} onClick = {handleCheckAll}/>
                {!checkAll.size 
                ?
                <RefreshIconTooltip/>
                :
                 <>
      
                <TrashIcons
                isTrash = {location === "trash"}
                onClickTrash = {handleClickTrash}
                onClickDelete = {handleClickDelete}
                />
                 
                <Tooltip title="Mark as read" aria-label="Mark as read">
                  <IconButton onClick = {handleClickRead}>
                    <DraftsIcon  />
                  </IconButton>
                </Tooltip>  
        
                <Tooltip title="Mark as unread" aria-label="Mark as unread">
                  <IconButton onClick = {handleClickUnRead}>
                      <EmailIcon />
                   </IconButton>
                </Tooltip> 
                </>
              }

            </div>
         
        </div>

        <div className="emailList_list">
            {mailList.map( (mail:any) => (
                <MailListItem key={mail._id} mail={mail} location={location}/>
            ))}
        </div>
    </div>
);
}
