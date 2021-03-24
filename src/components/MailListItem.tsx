import React, { useEffect } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import './MailListItem.css';
import moment from 'moment';
import { Link ,useLocation } from 'react-router-dom';
import { useActions } from "../hooks/use-actions";


function MailListItem({mail}: any){

    const location = useLocation();
    const {toggleStar} = useActions();
    

    const handleClickStar = () => {
        toggleStar(mail._id);
    }

  return (
    <div className="emailRow">
        <div className="emailRow_options">
            <Checkbox />
            <IconButton onClick = {handleClickStar}>
                { mail.isStarred 
                ? <StarRoundedIcon fontSize = "large"/>
                : <StarBorderRoundedIcon fontSize = "large"/>}
            </IconButton>
            <IconButton>
                <LabelImportantOutlinedIcon />
            </IconButton>
        </div>
        
        
       <Link className="clickable" to={`${location}/${mail._id}`} style={{ textDecoration: 'none' , color: "inherit" }}>
        <div className="emailRow_title">
        <h3>
            {mail.from}
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

        <div className="emailRow_time">
          <h4>  {moment(mail.created).format('MM/DD/YYYY')}</h4>
        </div>
        </Link>
       
       
    </div>
)
}

export default MailListItem;