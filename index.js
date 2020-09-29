// implement your API here
const express = require('express');
const Users = require('./data/db.js');
const server = express();
server.use(express.json());


// POST new user ID
server.post('/api/users', (request, response) => {
  const userData = request.body;
  if(userData.name && userData.bio){ //if information about user is valid
  Users.insert(userData) //save new user in the database
    .then(user => {
      response.status(201).send(userData); //respond status + return newly created "user document"
    })
    .catch(error => {
      console.log(error);
      // error handling
      res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    })} else {
      response.status(400).send({ errorMessage: "Please provide name and bio for the user."})
    } // missing "name + bio" error + error saving to database
})

// GET request
server.get('/api/users', (request, response) => {
  Users.find()
    .then(users => {
      response.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({errorMessage: "The users information could not be retrieved."}) // error
    })
})

// GET specific user by ID
server.get('/api/users/:id', (request, response) => {
  const id = request.params.id
  Users.findById(id)
    .then(user => {
      console.log(user.id)
      response.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      response.status(404).json({message: "The user with the specified ID does not exist."})
    })
})

const port = 3000
server.listen(port, ()=> console.log(`Now listening on port ${port}`)); 