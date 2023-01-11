import React, {useState} from 'react';
import axios from 'axios';

export default function PostCreate({onCreate}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:4000/posts", {
            title, content
        })
        setTitle('')
        setContent('')
        onCreate()
    }
    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="postTitle">Title</label>
                <input type="text"
                       id="postTitle"
                       className="form-control"
                       name="postTitle"
                       value={title}
                       onChange={(e) => {
                           setTitle(e.target.value)
                       }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="postContent">Content</label>
                <textarea id="postContent"
                          className="form-control"
                          name="postContent"
                          onChange={e => setContent(e.target.value)}
                          value={content}
                />
            </div>
            <button className="btn btn-primary" style={{marginTop: '5px'}}>Submit</button>
        </form>
    </div>
}