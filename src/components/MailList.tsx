import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MailList( { type , location} :any) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const mailList = useTypedSelector((state) => {
    console.log("fs")
    if(type === "inbox") return state.mail?.mail.filter(mail => !mail.isOutbound && !mail.isTrash).reverse();
    if(type === "starred") return state.mail?.mail.filter(mail => mail.isStarred && !mail.isTrash).reverse();
    if(type === "sent") return state.mail?.mail.filter(mail => mail.isOutbound && !mail.isTrash).reverse();
    if(type === "allmail") return state.mail?.mail.filter(mail => !mail.isTrash).reverse();
    if(type === "trash"){
      console.log(state.mail?.mail.filter(mail => mail.isTrash).reverse())
      return state.mail?.mail.filter(mail => mail.isTrash).reverse();
    }
    return [];
  }) || [];


  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

 

  const {setLocation ,fetchAllMail} = useActions();
  useEffect(() => {
    setLocation(type);
    if(type === "inbox" || type === "trash")
    fetchAllMail();
    
},[] );






  return (
    <div className="emailList">
        <div className="emailList_settings">
            <div className="emailList_settingsLeft">
                <Checkbox />
                <IconButton>
                    <ArrowDropDownIcon />
                </IconButton>
                <IconButton>
                    <RedoIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div className="emailList_settingsRight">
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
                <IconButton>
                    <KeyboardIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
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
