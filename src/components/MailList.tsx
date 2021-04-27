
import  { useEffect } from 'react';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import './MailList.css';
import MailListItem from './MailListItem';
import TrashIcons from './TrashIcons';
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import  useMailBox  from "../hooks/use-mail-box";


interface MailListProps {
  match: {
    params: {
      location: string
    }
  }
}

const MailList = ( {match }: MailListProps) => {


  const location = match.params.location;

  const {setLocation ,fetchAllMail , toggleAllMailCheckbox , toggleIsTrash , deleteMail , markAsRead} = useActions();

  const mailList = useMailBox()

  const mailListId = mailList.map(mail => mail._id);


  const checkAll = useTypedSelector((state) => {
    return state.mail?.checked;
   }) || new Set();


useEffect(() => {
  setLocation(location);
  toggleAllMailCheckbox(null ,true);
  if(location === "inbox")
  fetchAllMail();
  },[setLocation, toggleAllMailCheckbox, fetchAllMail, location ] );

  const refresh = () => {
    fetchAllMail();
  }

  const handleCheckAll =  () => {
    toggleAllMailCheckbox(mailListId);
  };

  const handleClickTrash = () => {
    toggleAllMailCheckbox(null,true);
    toggleIsTrash(Array.from(checkAll));
    } 

  const handleClickDelete = () => {
  toggleAllMailCheckbox(null,true);
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
            {mailList.map((mail) => (
                <MailListItem key={mail._id} mail={mail} location={location}/>
            ))}
        </div>
    </div>
);
}

export default MailList;