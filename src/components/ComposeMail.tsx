import React, { useRef } from 'react';
import './ComposeMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
//import { closeSendMessage } from './features/mailSlice';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import { useActions } from '../hooks/use-actions';
import { ContactsOutlined } from '@material-ui/icons';



const ComposeMail = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const [html1, setHtml1] = React.useState("");
    const html = useRef('');
    const {closeComposeMail} = useActions();
    
    
    
    const {sendMail} = useActions();
    


    const onSubmit = (data:any) => {
       data.to = [data.to];
       data.html = html.current;
       sendMail(data);
     
       //closeComposeMail();
    };

    const onC = (data:any) => {
      html.current = data;
     // setHtml1(data); 
   };

   

  

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