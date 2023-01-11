import React from 'react';

export default function CommentList({comments}) {
    // const [comments, setComments] = useState({});

    const renderedComments = Object.values(comments)?.map((comment) => {
        if (comment.status === 'pending') return (
            <li key={comment.id} style={{fontStyle: 'italic'}}>Comment is awaiting moderation</li>)
        if (comment.status === 'approved') return (<li key={comment.id}>{comment.content}</li>)
        if (comment.status === 'rejected') return (
            <li key={comment.id} style={{fontStyle: 'italic'}}>This comment was rejected</li>)
    })
    return <div>
        <ul>
            {renderedComments}
        </ul>
    </div>
}
