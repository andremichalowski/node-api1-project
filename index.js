// implement your API here

const express = require("express");

const server = express();

const { insert, findById, find } = require("./data/db");

//BASIC GET REQUEST
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Node 34" });
});

//GET REQEUST (LESSONS)
const lessons = [
  { id: 1, name: "introduction to node" },
  { id: 2, name: "introduction to express" },
];

server.get("/lessons", (req, res) => {
  res.status(200).json({ data: lessons });
});

//POST REQUEST ()
server.post("/api/users", (req, res) => {
  const body = req.body;

  if (body.name || body.bio) {
    const newUser = {
      id: 1, // TODO generate ID
      name: body.name,
      bio: body.bio,
    };

    insert(newUser)
      .then(() => res.status(201).json(newUser))
      .catch(() =>
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database",
        })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }
});

const port = 3000;
server.listen(port, () => console.log("server running..."));

// server.post("/api/users", (req, res) => {
//   res.status(200).json({ hello: "Users"})
//   res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
// })
