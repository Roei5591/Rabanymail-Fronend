import React, { useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import PrintIcon from '@material-ui/icons/Print';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Mail.css';
import moment from 'moment';


function Mail( { match} : any){
    console.log(match.params)
    const history = useHistory();

    const [mail, setMail] = React.useState<any>({});

    useEffect(() => {
        fetch("http://localhost:7777/messages/inbox/")
        .then(response => response.json())
        .then(data => {setMail(data.find((m:any) => m.id === match.params.id))});
    }, []);

    return (
        <div className="mail">
            <div className="mail_tools">
                <div className="mail_toolsLeft">
                    <IconButton>
                        <ArrowBackIcon onClick = {() => history.push("/inbox")} />
                    </IconButton>
                    
                    <IconButton>
                        <MoveToInboxIcon />
                    </IconButton>

                    <IconButton>
                        <ErrorIcon />
                    </IconButton>

                    <IconButton>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton>
                        <EmailIcon />
                    </IconButton>

                    <IconButton>
                        <WatchLaterIcon />
                    </IconButton>

                    <IconButton>
                        <CheckCircleIcon />
                    </IconButton>

                    <IconButton>
                        <LabelImportantIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

                <div className="mail_toolsRight">
                    <IconButton>
                        <UnfoldMoreIcon />
                    </IconButton>
                    <IconButton>
                        <PrintIcon />
                    </IconButton>
                    <IconButton>
                        <ExitToAppIcon />
                    </IconButton>
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
                    <p>{mail.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Mail;