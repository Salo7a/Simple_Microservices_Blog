import React from 'react';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList({posts, onCreate}) {
    const renderedPosts = Object.values(posts)?.map((post) => {
        return (
            <div className={'card'} style={{width: '33%', marginBottom: '25px'}} key={post.id}>
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-text">{post.content}</p>
                    <div className={'container'}>
                        <CommentList comments={post.comments}/>
                        <CommentCreate postId={post.id} onCreate={onCreate}/>
                    </div>
                </div>
            </div>)
    })
    return <div className={'d-flex flex-row flex-wrap justify-content-between'}>
        {renderedPosts}
    </div>
}