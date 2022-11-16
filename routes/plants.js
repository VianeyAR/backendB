const{Router} = require("express")
const {addplant, updatePlants, getPlants, getPlantsByID, deletePlantsByID} = require("../controllers/Plants")

const router = Router()

//http://localhost:4000/api/v1/users/
//get

router.get("/", getPlants)

router.get("/id/:id", getPlantsByID)

//delete
router.delete("/id/:id", deletePlantsByID)

//use
router.post("/", addplant)

//update
router.put("/", updatePlants)

module.exports = router