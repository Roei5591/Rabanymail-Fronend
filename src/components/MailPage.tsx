
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { IconButton, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './MailPage.css';
import moment from 'moment';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import TrashIcons from './TrashIcons';
import parse from '../helpers/search';
import { useRef } from 'react';

interface MailPageProps {
  match: {
    params: {
      mailId: string
      location: string
    }
  }
}




const MailPage = ({match} : MailPageProps) => {
    
    const { toggleIsTrash , deleteMail , markAsRead ,setLocation} = useActions();
    const history = useHistory();

    const {params:{mailId , location}} = match;
    
  

    const mail = useTypedSelector((state) => {
      return state.mail?.mail.find( mail => mail._id === mailId);
    });

    const searchTermReg = useTypedSelector((state) => {
      return state.control?.searchTermRegExp 
    }) || null;


    const restoreLocation = useRef((() =>{
      if(location !== "trash") return location;
      if(mail?.isOutbound) return "sent"
      else return "inbox";
    })()
    )

 

      const handleClickTrash = () => {
        if(!mail) return;
        toggleIsTrash([mail._id]);
        
        if(location !== "trash") {
        setLocation("trash");
        history.push(`/mail/trash/${mail._id}`);
        } else {
         setLocation(restoreLocation.current);
          history.push(`/mail/${restoreLocation.current}/${mail._id}`);
        }
        
      }
     
      
      const handleClickDelete = () => {
        if(mail) {
          deleteMail([mail._id]);
          history.push(`/mail/trash`);
        }
      }
      
     
      const handleClickUnRead = () => {
        if(mail)
        markAsRead([mail._id] , false);
        history.push(`/mail/${location}`);

      }

   

    if(!mail) return <></>;

  const momentTime = moment(mail.created)
   const time = `${momentTime.format('dddd, D MMM YYYY, HH:MM')} (${momentTime.fromNow()})`

    return (
      <div className="mail">
        <div className="mail_tools">
          <div className="mail_toolsLeft">
            <IconButton onClick = {() => history.push(`/mail/${location}`)}>
              <ArrowBackIcon />
            </IconButton>
                    
            < TrashIcons
              isTrash = {mail.isTrash}
              onClickTrash = {handleClickTrash}
              onClickDelete = {handleClickDelete}
            />

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
            <h2>{ parse(mail.subject, searchTermReg)}</h2> 
            <LabelImportantIcon className="mail_important" />
            <p>{mail.from}</p>
            <p className="mail_time">{time}</p>
          </div>

          <div className="mail_message">
             {parse(mail.html , searchTermReg)}
          </div>
      </div>
    </div>
    )
}

export default MailPage;