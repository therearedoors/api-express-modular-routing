const express = require('express')

const router = express.Router()

const data = require('../../data.js')

router.get("/", (req, res) => {
  res.json({books: data.books})
})

router.get("/:id", (req, res) => {
    const book = data.books.find(book => book.id == req.params.id)
    if (!book){
        res.status(404)
        res.json({error:"book with this id does not exist"})
        return
    }
    res.json({book: book})
  })

  router.patch("/:id",(req,res) => {
    const book = data.books.find(book => book.id == req.params.id)
    if (!book){
        res.status(404)
        res.json({error:"book does not exist"})
        return
    }
    if (req.body.title){
        book.title = req.body.title
    }
    if (req.body.author){
        book.director = req.body.director
    }
    if (req.body.type){
        book.type = req.body.type
    }
    res.json({book:book})
})

router.post("/", (req,res) => {
if (data.books.find(book => book.title == req.body.title)){
    res.status(400)
    res.json({error:"book already in database"})
    return
}
const book = {
    id: data.books.length+1,
    title: req.body.title,
    type: req.body.type,
    author: req.body.author
}
data.books.push(book)
res.json({book:book})
})

router.delete( "/:id", (req, res) => {
    const bookToDelete = data.books.find(book => book.id == req.params.id)
    if (!bookToDelete) {
        res.status(404)
        res.json({error:"book does not exist"})
        return
    }
    data.books = data.books.filter( book => book.id !== bookToDelete.id)
    res.json({book: bookToDelete})
  })

router.put("/:id", (req, res) => {
  const existingbook = data.books.find(book => book.id == req.params.id)
  if(!existingbook) {
    res.status(404)
    res.json({error: 'book with this id does not exist'})
    return
  }
  if(!req.body.title) {
    res.status(400)
    res.json({error: 'title required'})
    return
  }
  if(!req.body.author) {
    res.status(400)
    res.json({error: 'author required'})
    return
  }
  if(!req.body.genre) {
    res.status(400)
    res.json({error: 'genre required'})
    return
  }
  existingbook.title = req.body.title
  existingbook.author = req.body.author
  existingbook.genre = req.body.genre
  res.json({book: existingbook})
})

module.exports = router