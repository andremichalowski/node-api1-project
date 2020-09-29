// implement your API here

const express = require('express');

const server = express();

//BASIC GET REQUEST
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Node 34"})
})

//GET REQEUST (LESSONS)
const lessons = [
  { id: 1, name: "introduction to node" },
  { id: 2, name: "introduction to express" },
];

server.get("/lessons", (req, res) => {
  res.status(200).json({ data: lessons });
});



const port = 3000;
server.listen(port, () => console.log("server running..."));









// server.post("/api/users", (req, res) => {
//   res.status(200).json({ hello: "Users"})
//   res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
// })
