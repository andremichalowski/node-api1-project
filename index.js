const { response } = require('express');
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
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({errorMessage: "The users information could not be retrieved."}) // error
    })
})

// GET specific user by ID
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  Users.findById(id)
    .then(user => {
      console.log(user.id)
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(404).json({message: "The user with the specified ID does not exist."})
    })
})

// PUT request by ID
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  if(userData.name && userData.bio) {
    Users.update(id, userData)
      .then(user => {
        res.status(200).json(userData);
      })
      .catch(error => { 
        console.log(error)
        res.status(500).json
        ({errorMessage: "The user information could not be modified."}) // error w/server
      })
  } else if ( id !== Users.id ) {
    res.status(404).send({ message: "The user with the specified ID does not exist."})
  } else { // missing name or bio
    res.status(400).send({ errorMessage: "Please provide name and bio for the user."})
  } // missing name or bio
})

// DELETE request by ID
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      if(user !== 0) {
        res.status(204).send({message: `User id#: ${id} has been deleted`})
      } else {
        res.status(404).send({message: "The user with the specified ID does not exist."})}
    })
    .catch(error => {
      console.log(error)
      res.status(500).json
      ({errorMessage: "The user could not be removed"})
    })
})


const port = 3000
server.listen(port, ()=> console.log(`Now listening on port ${port}`)); 

// console.log(Users)
