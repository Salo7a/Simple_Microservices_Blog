const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsWithComments = {};

const handleEvent = (eventType, data) => {
    if (eventType === "PostCreated") {
        postsWithComments[data.id] = {
            id: data.id,
            title: data.title,
            content: data.content,
            comments: []
        }
    } else if (eventType === "CommentCreated") {
        postsWithComments[data.postID]?.comments.push({
            id: data.id,
            content: data.content,
            status: data.status
        })
    } else if (eventType === "CommentUpdated") {
        const {id, postID, content, status} = data;
        const postComments = postsWithComments[postID].comments;
        const comment = postComments.find(com => {
            return com.id == id;
        });
        comment.status = status;
        comment.content = content;
    }
}
app.get('/posts', (req, res, next) => {
    res.send(postsWithComments);
})

app.post('/events', (req, res, next) => {
    const {type, data} = req.body.type;
    handleEvent(type, data);
    res.send({});
})


app.listen(4002, async () => {
    console.log("Listening on port 4002");
    try {
        const res = await axios.get("http://localhost:4005/events")
        for (let event of res.data.events) {
            console.log(`Processing event ${event.type}`);
            handleEvent(event.type, event.data);
        }
    } catch (e) {
        console.log("error");
    }
})