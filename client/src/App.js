import React, {useState, useEffect} from 'react';
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

export default function App() {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get("http://simpleblog.com/posts");
        setPosts(res.data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    return <div className="container">
        <h1>Create Post</h1>
        <PostCreate onCreate={fetchPosts}/>
        <hr/>
        <h1>All Posts</h1>
        <PostList posts={posts} onCreate={fetchPosts}/>
    </div>;
}