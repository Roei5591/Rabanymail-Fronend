import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SettingsIcon from '@material-ui/icons/Settings';
import './MailList.css';
import MailListItem from './MailListItem';


import Axios from 'axios';
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { ContactlessOutlined } from "@material-ui/icons";
import {Mail} from "../state/Mail";
import { stat } from "node:fs";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));



export default function MailList( {match }: any) {
  const classes = useStyles();

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
},[] );

useEffect(() => {
  toggleAllMailCheckbox(mailList ,true);
  if(location === "inbox")
  fetchAllMail();
},[location] );

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



  return (
    <div className="emailList">
        <div className="emailList_settings">
            <div className="emailList_settingsLeft">
                <Checkbox  checked={checkAll.size !== 0} onClick = {handleCheckAll}/>
                {!checkAll.size 
                ?
                <Tooltip title="Refresh" aria-label="Refresh"> 
                    <IconButton onClick = {refresh}>
                      <RefreshIcon />
                    </IconButton>
                </Tooltip>
                :
                 <>
                 {(location !== "trash")
                  ?
                  <Tooltip title="move to trash" aria-label="move to trash">
                    <IconButton onClick = {handleClickTrash}>
                      <DeleteIcon />
                   </IconButton>
                  </Tooltip>
                  :
                  <>
                   <Tooltip title="Restore" aria-label="Restore">
                    <IconButton onClick = {handleClickTrash}>
                      <RestoreFromTrashIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" aria-label="Delete">
                    <IconButton onClick = {handleClickDelete}>
                      <DeleteForeverIcon />
                   </IconButton>
                  </Tooltip>
                  </>
                }
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
