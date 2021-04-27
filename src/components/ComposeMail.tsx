import { useEffect, useRef, useState } from 'react';
import './ComposeMail.css';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import { useActions } from '../hooks/use-actions';
import { Editor } from '@tinymce/tinymce-react';
import { useTypedSelector } from '../hooks/use-typed-selector';

const ComposeForm = ({refs} : {refs: any}) => {

    const { register, handleSubmit } = useForm();
    

    const {closeComposeMail , sendMail, setDraft} = useActions();
    

    const onSubmit = (data:any) => {
        data.to = [data.to];
        data.html = refs.message.current;
        sendMail(data);
        
        const draft = {...data , flag: false}
        setDraft(draft);
        closeComposeMail();
     };
 
     const handleEditorChange = (data:any) => { 
       refs.message.current = data;
    };

    return (<form onSubmit={handleSubmit(onSubmit)} >

    <input name="to" 
        type="email" placeholder="To" ref={register({required: true})}
        onChange = {(e) => refs.to.current = e.target.value}
        defaultValue = {refs.to.current}
         />
    <input name="subject" type="text" placeholder="Subject" ref={register()} 
        onChange = {(e) => refs.subject.current = e.target.value}
        defaultValue = {refs.subject.current}
    />
      

    <Editor
    initialValue={refs.message.current}
    
    init={{
        resize: false,
        min_height: 100,
        
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }}
    onEditorChange={handleEditorChange}
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
)
}


const ComposeMail = () => {

    const[minimize , setMinimize] = useState(false);

    const {closeComposeMail , openComposeMail , setDraft } = useActions();

    const refs = {
        to: useRef(''),
        subject: useRef(''),
        message: useRef(''),
       }

    
    const flag = useTypedSelector((state) => {
        const draft = state.mail?.draft
         if(draft?.flag){
             refs.to.current = draft.to[0];
             refs.subject.current = draft.subject;
             refs.message.current = draft.html;   
         }

         return draft?.flag
    });

    console.log(flag);
    useEffect(()=>{
        if(flag){
            setDraft(null);
            openComposeMail();
        }
    },[flag,setDraft, openComposeMail])
    
   const handleEditorMinimize = () => {
    setMinimize(prev => !prev);
    };

   

    const  composeForm = <ComposeForm refs={refs}/>
   
    return (
        <div className={minimize ? "sendMail minimize" : "sendMail"} >
            <div className="sendMail_header">
                <h3>New Message</h3>
                <div className = "BN">
                <IconButton className="my" size={"small"} onClick={handleEditorMinimize}> 
                    <MinimizeIcon className="sendMail_close" />
                 </IconButton>
                <IconButton size={"small"}  onClick={closeComposeMail}> 
                    <CloseIcon className="sendMail_close" /> 
                </IconButton>
                
                </div>
            </div>
            
            { !minimize && composeForm}
        </div>
    )
}



export default ComposeMail;