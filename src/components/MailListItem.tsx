import  {  useState } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import './MailListItem.css';
import moment from 'moment';
import { Link  } from 'react-router-dom';
import { useActions } from "../hooks/use-actions";
import Tooltip from '@material-ui/core/Tooltip';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import clsx from "clsx";
import { useTypedSelector } from '../hooks/use-typed-selector';
import TrashIcons from './TrashIcons';



const MailListItem = ({mail ,  location }: any) => {

   
const {toggleStar ,markAsRead , toggleIsTrash , deleteMail} = useActions();
const [hover, setHover] = useState(false);

 const { toggleMailCheckbox} = useActions();


  const checked = useTypedSelector((state) => {
   return state.mail?.checked.has(mail._id);
  }) || false;

  const handleCheck =  () => {
    toggleMailCheckbox(mail._id);
  };

    const handleClickStar = () => {
        toggleStar(mail._id);
        
    }

    const handleClickTrash = () => {
        toggleIsTrash([mail._id]);
        
    }

    const handleClickDelete = () => {
        deleteMail([mail._id]);
        
    }

    const handleClickIsRead = () => {
        markAsRead([mail._id] , !mail.isRead);
        
    }

    const handleClickIsMail = () => {
        if(!mail.isRead)
        markAsRead([mail._id] , true);
        
    }

    const MarkAsReadOrUnreadIcon = () => (
        !mail.isRead 
        ?
        <Tooltip title="Mark as read" aria-label="Mark as read">
            <IconButton onClick = {handleClickIsRead}>
                <DraftsIcon  />
            </IconButton>
        </Tooltip>  
        :
        <Tooltip title="Mark as unread" aria-label="Mark as unread">
            <IconButton onClick = {handleClickIsRead}>
                <EmailIcon  />
            </IconButton>
        </Tooltip> 
        
        )


  return (
    <div className={clsx("emailRow", {
        "readMark": mail.isRead,
      })}>
        <div className="emailRow_options">
            <Checkbox checked = {checked} onClick={handleCheck}/>
            <IconButton onClick = {handleClickStar}>
            { mail.isStarred 
                ? <StarRoundedIcon fontSize = "large"/>
                : <StarBorderRoundedIcon fontSize = "large"/>}
            </IconButton>

        </div>
        
        
       <Link onClick={handleClickIsMail} className="clickable" to={`/mail/${location}/${mail._id}`} style={{ textDecoration: 'none' , color: "inherit" }}
           onMouseEnter = {() => {setHover(true)}}
           onMouseLeave={() => {setHover(false)}}>

        
        <div className="emailRow_title" >
        <h3>
            {mail.isOutbound ? `To:${mail.to[0]}` : mail.from }
        </h3>
        </div>
        <div className="emailRow_message">
            <h4>
                {mail.subject}
                <span className="emailRow_description"> - {" "}
                    {mail.text}
                </span>
            </h4>
        </div>

        </Link>
            <div onMouseEnter = {() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
                <div className="emailRow_time">
        
            {!hover 
                ?
                    <h4>  {moment(mail.created).format("MMM Do") }</h4>
                :
                <>
                < TrashIcons
                    isTrash = {mail.isTrash}
                    fontSize = {"large"}
                    onClickTrash = {handleClickTrash}
                    onClickDelete = {handleClickDelete}
                />
                    
                    <MarkAsReadOrUnreadIcon/>   
                </>
        }

            </div>
        </div>
       
       
    </div>
)
}

export default MailListItem;