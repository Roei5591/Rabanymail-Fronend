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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MailList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const [mailList, setMailList] = React.useState<any[]>([]);

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

  useEffect(() => {
    fetch("http://localhost:7777/messages/inbox/")
    .then(response => response.json())
    .then(data => {setMailList([...data , ...data , ...data , ...data])});
   // console.log(mailList[0]);
}, []);

  const mailList2 = [{
    id: 1,
    to: "test",
    title: "test",
    subject: "test",
    message: "test",
    time: "test"
} , {
  id: 2,
  to: "test",
  title: "test",
  subject: "test",
  message: "test",
  time: "test"
}]

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

        <div className="emailList_sections">
        </div>
        <div className="emailList_list">
            {mailList.map(mail => (
                <MailListItem key={mail.id} id={mail.id} title={mail.from} subject={mail.subject} description={mail.text} time={mail?.created} />
            ))}
        </div>
    </div>
);
}
