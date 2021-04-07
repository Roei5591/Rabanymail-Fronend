import React, { useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { IconButton, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './MailPage.css';
import moment from 'moment';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';

import parse from 'html-react-parser';



const MailPage =( { match} : any) => {
    
    const { toggleIsTrash , deleteMail , markAsRead} = useActions();
    const history = useHistory();

   // const [mail, setMail] = React.useState<any>({});

    const mail = useTypedSelector((state) => {
        return state.mail?.mail.find( mail => mail._id === match.params.mailID);
      });

      const goBack = () => history.goBack()

      const handleClickTrash = () => {
        if(mail)
        toggleIsTrash([mail._id]);
        
      }
      
      const handleClickDelete = () => {
        if(mail)
        deleteMail([mail._id]);
        history.goBack();
        
      }
      
     
      const handleClickUnRead = () => {
        if(mail)
        markAsRead([mail._id] , false);
        history.goBack();

      }


    if(!mail) return <div></div>;
    return (
        <div className="mail">
            <div className="mail_tools">
                <div className="mail_toolsLeft">
                    <IconButton onClick = {goBack}>
                        <ArrowBackIcon  />
                    </IconButton>
                    
                {!mail.isTrash
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
           
                <Tooltip title="Mark as unread" aria-label="Mark as unread">
                  <IconButton onClick = {handleClickUnRead}>
                      <EmailIcon />
                   </IconButton>
                </Tooltip> 
               
              
                </div>

                <div className="mail_toolsRight">
              
                </div>
            </div>
            <div className="mail_body">
                <div className="mail_bodyHeader">
                    <h2>{mail.subject}</h2> 
                    <LabelImportantIcon className="mail_important" />
                    <p>{mail.from}</p>
                    <p className="mail_time">{moment(mail.created).format('MM/DD/YYYY')}</p>
                </div>

                <div className="mail_message">
                    {parse(mail.html)}
            </div>
        </div>
        </div>
    )
}

export default MailPage;