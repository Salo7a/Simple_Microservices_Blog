import React, {useState} from 'react';
import axios from 'axios';

export default function CommentCreate({postId, onCreate}) {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://simpleblog.com/posts/${postId}/comments`, {
            content
        })
        setContent('')
        onCreate();
    }
    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="commentContent">Comment</label>
                <input type="text"
                       id="commentContent"
                       className="form-control"
                       value={content}
                       onChange={(e) => {
                           setContent(e.target.value)
                       }}
                />
            </div>
            <button className="btn btn-secondary" style={{marginTop: '5px'}}>Submit</button>
        </form>
    </div>
}