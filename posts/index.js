const {request} = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res, next) => {
    res.send(posts);
})

app.post('/posts', async (req, res, next) => {
    console.log(req.body)
    const id = randomBytes(5).toString('hex');
    let {title, content} = req.body;
    posts[id] = {id, title, content};
    try {
        await axios.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: {id, title, content}
        })
    } catch (e) {
        console.log(e);
    }
    res.status(201).json(posts[id]);
})

app.post('/events', (req, res, next) => {
    console.log(`${req.body.type} Event Received`);
    res.send({});
})

app.listen(4000, () => {
    console.log("Listening on port 4000")
})