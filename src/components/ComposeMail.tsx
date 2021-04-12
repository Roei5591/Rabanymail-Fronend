import { useRef } from 'react';
import './ComposeMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useActions } from '../hooks/use-actions';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';



const ComposeMail = () => {

    const { register, handleSubmit } = useForm();

    const {closeComposeMail , sendMail} = useActions();
    const html = useRef('');

    const onSubmit = (data:any) => {
       data.to = [data.to];
       data.html = html.current;
       sendMail(data);
       closeComposeMail();
    };

    const onChange = (data:any) => {
      html.current = data;
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
                    onModelChange={onChange}
                /> 
                
                <div className="sendMail_options">
                    <Button 
                        type="submit"
                        className="sendMail_send" 
                        variant="contained" 
                        color="primary">
                    Send
                    </Button>
                </div>
            </form> 
        </div>
    )
}

export default ComposeMail;