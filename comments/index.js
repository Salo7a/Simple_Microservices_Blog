const {request} = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPost = {};

app.get('/posts/:id/comments', (req, res, next) => {
    let {id} = req.params
    res.send(commentsByPost[id]);
})

app.post('/posts/:id/comments', async (req, res, next) => {
    const commentID = randomBytes(5).toString('hex');
    const postID = req.params.id;
    let {content} = req.body;
    if (!commentsByPost[postID]) commentsByPost[postID] = [];
    commentsByPost[postID].push({id: commentID, content, status: 'pending'});
    try {
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentCreated",
            data: {postID, id: commentID, content, status: "pending"}
        })
    } catch (e) {
        console.log(e);
    }

    res.status(201).json(commentsByPost[postID]);
})

app.post('/events', async (req, res, next) => {
    console.log(`${req.body.type} Event Received`);
    const {type, data} = req.body;
    if (type === "CommentModerated") {
        const {postID, id, status, content} = data;
        const postComments = commentsByPost[postID];
        const comment = postComments.find(comment => {
            return comment.id = id;
        });
        comment.status = status;
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id, postID, content, status
            }
        })
    }
    res.send({});
})

app.listen(4001, () => {
    console.log("Listening on port 4001")
})