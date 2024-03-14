const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());


const commentsById = {}

app.use(express.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsById[req.params.id] || []);
});

// POST /posts/:id/comments 
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;

  const comments = commentsById[req.params.id] || [];
  comments.push({id: commentId, content, status: 'pending' });

  commentsById[req.params.id] = comments;

  try {
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: 'pending'
      }
    });
  } catch (error) {
    console.log(error);
    res.send(500).send('Something went wrong')
  }
  res.status(201).send(comments);
});


app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);
  
  const {type, data} = req.body;
  if(type === 'CommentModerated') {
    const {postId, id, status, content} = data;
    const comments = commentsById[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;
    try {
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          status,
          postId,
          content
        }
      });
      
    } catch (error) {
      res.send(500).send('Something went wrong')
    }
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('Example app listening on port 4001!');
});