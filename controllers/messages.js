const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    res.json({msg: 'mensajes'})
}

const himessage = (req = request, res = response) => {
    res.json({msg: 'Hola mundo'})
}

const byeMessage = (req= request, res = response) => {
    res.json({msg: 'Adios mundo'})
}



const postMessage = (req= request, res = response) => {
    res.json({msg:'Mensaje post'})
}

const putMessage = (req = request, res = response) => {
    res.json({msg:'Mensaje put'})
}

const deleteMessage = (req= request, res = response) => {
    res.json({msg:'Mensaje delete'})
}



module.exports = {
    rootMessage, himessage, byeMessage, postMessage, putMessage, deleteMessage}