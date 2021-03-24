import React from 'react';
import './ComposeMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../helpers/messages';
//import { closeSendMessage } from './features/mailSlice';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import { useActions } from '../hooks/use-actions';
import {htmlToText} from 'html-to-text';

const ComposeMail = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [html, setHtml] = React.useState([0]);

    const onSubmit = (data:any) => {
       console.log(data);
       data = {
            ...data,
            html,
            text: htmlToText(data)
       }
       console.log(data);
       sendEmail(data);
       if(!errors.to)
       closeComposeMail();
    };

    const onC = (data:any) => {
      setHtml(data);   
   };

   const {closeComposeMail} = useActions();

  

    return (
        <div className="sendMail">
            <div className="sendMail_header">
                <h3>New Message</h3>
                <CloseIcon className="sendMail_close" onClick={closeComposeMail} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="to" type="email" placeholder="To" ref={register({required: true})} />

                <input name="subject" type="text" placeholder="Subject" ref={register()} />
               
                
                <FroalaEditor
              
              
              config={{
                attribution: false,
                height: 300,
                quickInsertTags: ['p', 'div'],
                listAdvancedTypes: true
              }}
             // model={}
              onModelChange={onC}
/>
                

                <div className="sendMail_options">
                    <Button type="submit" className="sendMail_send" variant="contained" color="primary">Send</Button>
                </div>
            </form>

          
        </div>
    )
}

export default ComposeMail;