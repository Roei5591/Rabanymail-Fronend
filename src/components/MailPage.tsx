
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
import parse from 'html-react-parser';

interface MailPageProps {
  match: {
    params: {
      mailID: string
    }
  }
}

const MailPage = ({match} : MailPageProps) => {
    
    const { toggleIsTrash , deleteMail , markAsRead ,setLocation} = useActions();
    const history = useHistory();

    const mail = useTypedSelector((state) => {
        return state.mail?.mail.find( mail => mail._id === match.params.mailID);
      });

      const handleClickTrash = () => {
        if(mail) {
        toggleIsTrash([mail._id]);
        setLocation("trash");
        history.push(`/mail/trash/${mail._id}`);
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
        history.goBack();

      }


    if(!mail) return <></>;
    return (
      <div className="mail">
        <div className="mail_tools">
          <div className="mail_toolsLeft">
            <IconButton onClick = {history.goBack}>
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