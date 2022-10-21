const{Router} = require("express")
const { getUsers, getUserByID, deleteUserByID, addUser } = require("../controllers/Usuarios")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getUsers)

router.get("/id/:id", getUserByID)

//delete
router.delete("/id/:id", deleteUserByID)

//use
router.post("/", addUser)

module.exports = router