const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//const data = require("./data")

// REQUIRE ROUTERS
const usersRoutes = require("./src/routers/users");
const filmsRoutes = require("./src/routers/films");
const booksRoutes = require("./src/routers/books");
const { application } = require("express");

// ADD ROUTERS TO APP

//app.get("/users/", (req,res) => {
//  res.json(data.users)
//})
/*
app.delete( "/:id", (req, res) => {
  let deletedUser = null
  data.users.find(user => user.id == req.params.id)
  data.users = data.users.filter( user => {
    if (user.id !== parseInt(req.params.id)) return true
    deletedUser = user
  })
  res.json({user: deletedUser})
})

//PUT is used to UPDATE a record
app.put("/:id", (req, res) => {
  //update the user record with that ID
  const existingUser = data.users.find(user=> {
    return user.id === parseInt(req.params.id)
  })

  console.log("Headers:", req.headers)
  console.log("Body:", req.body)

  //Update the user object based on the data from the PUT request
  existingUser.email = req.body.email

  res.json({user: existingUser})
})
*/

app.use("/users", usersRoutes)
app.use("/films", filmsRoutes)
app.use("/books", booksRoutes)

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
