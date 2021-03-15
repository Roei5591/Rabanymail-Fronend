import React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import './MailListItem.css';

function MailListItem({id, title, subject, description, time}: any){

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
            {title}
        </h3>

        <div className="emailRow_message">
            <h4>
                {subject}
                <span className="emailRow_description"> - {" "}
                    {description}
                </span>
            </h4>
        </div>

        <div className="emailRow_time">
            {time}
        </div>
    </div>
)
}

export default MailListItem;