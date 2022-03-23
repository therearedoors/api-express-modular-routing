//https://expressjs.com/en/guide/routing.html

//require express
const express = require('express')

//Creating an express Router
const router = express.Router()

//Change the path to include data.js! It's now 2 directories up
const data = require('../../data.js')

//We add our routes to the router rather than the app!
//But everything else is the same. We don't need the /users 
//prefix since that will be added in index.js

//GET all users
router.get("/", (req, res) => {
  res.json({users: data.users})
})

router.get("/:id", (req, res) => {
    const user = data.users.find(user => user.id == req.params.id)
    if (!user){
        res.status(404)
        res.json({error:"user with this id does not exist"})
        return
    }
    res.json({user: user})
  })

router.delete( "/:id", (req, res) => {
    const userToDelete = data.users.find(user => user.id == req.params.id)
    if (!userToDelete) {
        res.status(404)
        res.json({error:"user does not exist"})
        return
    }
    data.users = data.users.filter( user => user.id !== userToDelete.id)
    res.json({user: userToDelete})
  })

//PUT a user (update)
router.put("/:id", (req, res) => {
  const existingUser = data.users.find(user => user.id == req.params.id)
  if(!existingUser) {
    res.status(404)
    res.json({error: 'user with this id does not exist'})
    return
  }
  if(!req.body.email) {
    res.status(400)
    res.json({error: 'email required'})
    return
  }
  existingUser.email = req.body.email
  res.json({user: existingUser})
})

//Export the routes!
module.exports = router