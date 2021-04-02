import React, { useEffect } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import './MailListItem.css';
import moment from 'moment';
import { Link ,useLocation } from 'react-router-dom';
import { useActions } from "../hooks/use-actions";
import DeleteIcon from '@material-ui/icons/Delete';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import clsx from "clsx";



function MailListItem({mail ,  location}: any){

    //const location = useLocation();
    const {toggleStar ,markAsRead , toggleIsTrash , deleteMail} = useActions();
    const [hover, setHover] = React.useState(false);
    

    const handleClickStar = () => {
        toggleStar(mail._id);
        //console.log(location.pathname)
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


    const M = () => (!mail.isRead 
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
            <Checkbox />
            <IconButton onClick = {handleClickStar}>
            { mail.isStarred 
                ? <StarRoundedIcon fontSize = "large"/>
                : <StarBorderRoundedIcon fontSize = "large"/>}
            </IconButton>

        </div>
        
        
       <Link onClick={() => {
           if (!mail.isRead) 
           markAsRead(mail._id, true)}} className="clickable" to={`/mail/${location}/${mail._id}`} style={{ textDecoration: 'none' , color: "inherit" }}
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
        <div onMouseEnter = {() => {setHover(true)}}
           onMouseLeave={() => {setHover(false)}}>
        { !hover ?
            <div className="emailRow_time">
                <h4>  {moment(mail.created).format('MMMM Do YYYY, h:mm:ss a')}</h4>
            </div>
        :
            <div className="emailRow_time">
            {!mail.isTrash 
            ? <div>
                <Tooltip title="move to trash" aria-label="move to trash">
                    <IconButton onClick = {handleClickTrash}>
                        <DeleteIcon fontSize = "large"/>
                    </IconButton>
                </Tooltip>
                
                <M/>
            </div>
            :

            <div>

            <Tooltip title="Delete" aria-label="Delete">
                <IconButton onClick = {handleClickDelete}>
                    <DeleteForeverIcon fontSize = "large"/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Restore" aria-label="Restore">
                <IconButton onClick = {handleClickTrash}>
                    <RestoreFromTrashIcon fontSize = "large"/>
                </IconButton>
            </Tooltip>
            
           <M/>

            </div>
                
            }

  
    </div>
       
        }
       </div>
       
       
    </div>
)
}

export default MailListItem;