const{reques, response} = require("express")


const getUsers = (req= reques, res = response) => {
    console.log("Funcion getUsers")
    res.json({msg: "Funcion getUsers"})
}

module.exports = {getUsers}