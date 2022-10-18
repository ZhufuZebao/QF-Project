import React, {useState} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState ,convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from './ContentForm.module.css'

interface ContentFormProps {
    setContent:(data:string)=>void
}

function ContentForm({setContent}:any) {
    const [editorState,setEditorState] = useState<any>(EditorState.createEmpty())
    const onEditorStateChange = (value:any) => {
        setEditorState(value)
    }
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName={style.editorClassName}
                onEditorStateChange={onEditorStateChange}
                onBlur={() => setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            />
        </div>
    );
}

export default ContentForm;