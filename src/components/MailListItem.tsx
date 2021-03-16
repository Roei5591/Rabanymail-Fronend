import React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import './MailListItem.css';
import moment from 'moment';


function MailListItem({mail}: any){

  return (
    <div className="emailRow">
        <div className="emailRow_options">
            <Checkbox />
            <IconButton>
                <StarBorderOutlinedIcon />
            </IconButton>
            <IconButton>
                <LabelImportantOutlinedIcon />
            </IconButton>
        </div>

        <h3 className="emailRow_title">
            {mail.from}
        </h3>

        <div className="emailRow_message">
            <h4>
                {mail.subject}
                <span className="emailRow_description"> - {" "}
                    {mail.text}
                </span>
            </h4>
        </div>

        <div className="emailRow_time">
            {moment(mail.created).format('MM/DD/YYYY')}
        </div>
    </div>
)
}

export default MailListItem;