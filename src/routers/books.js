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
  existingbook.title = req.body.title
  existingbook.author = req.body.author
  res.json({book: existingbook})
})

module.exports = router