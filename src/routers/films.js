//https://expressjs.com/en/guide/routing.html

//require express
const express = require('express')

//Creating an express Router
const router = express.Router()

//Change the path to include data.js! It's now 2 directories up
const data = require('../../data.js')

//We add our routes to the router rather than the app!
//But everything else is the same. We don't need the /films 
//prefix since that will be added in index.js

//GET all films
router.get("/", (req, res) => {
  res.json({films: data.films})
})

router.get("/:id", (req, res) => {
    const film = data.films.find(film => film.id == req.params.id)
    if (!film){
        res.status(404)
        res.json({error:"film with this id does not exist"})
        return
    }
    res.json({film: film})
  })

router.post("/", (req,res) => {
const film = {
    id: data.films.length+1,
    title: req.body.title,
    director: req.body.director
}
data.films.push(film)
res.json({film:film})
})

router.delete("/:id", (req, res) => {
    const filmToDelete = data.films.find(film => film.id == req.params.id)
    if (!filmToDelete) {
        res.status(404)
        res.json({error:"film does not exist"})
        return
    }
    data.films = data.films.filter( film => film.id !== filmToDelete.id)
    res.json({film: filmToDelete})
  })

  router.patch("/:id",(req,res) => {
    const film = data.films.find(film => film.id == req.params.id)
    if (!film){
        res.status(404)
        res.json({error:"film does not exist"})
        return
    }
    if (req.body.title){
        film.title = req.body.title
    }
    if (req.body.director){
        film.director = req.body.director
    }
    res.json({film:film})
})

//PUT a film (update)
router.put("/:id", (req, res) => {
  const existingfilm = data.films.find(film => film.id == req.params.id)
  if(!existingfilm) {
    res.status(404)
    res.json({error: 'film with this id does not exist'})
    return
  }
  if(!req.body.title) {
    res.status(400)
    res.json({error: 'title required'})
    return
  }
  if(!req.body.director) {
    res.status(400)
    res.json({error: 'director required'})
    return
  }
  existingfilm.title = req.body.title
  existingfilm.director = req.body.director
  res.json({film: existingfilm})
})

//Export the routes!
module.exports = router