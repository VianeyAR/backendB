const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    res.status(404).json({msg: 'mensajes'})
}

const himessage = (req = request, res = response) => {
    res.status(400).json({msg: 'Hola mundo'})
}

const byeMessage = (req= request, res = response) => {
    res.status(401).json({msg: 'Adios mundo'})
}



const postMessage = (req= request, res = response) => {
    res.status(405).json({msg:'Mensaje post'})
}

const putMessage = (req = request, res = response) => {
    res.status(409).json({msg:'Mensaje put'})
}

const deleteMessage = (req= request, res = response) => {
    res.status(414).json({msg:'Mensaje delete'})
}



module.exports = {
    rootMessage, himessage, byeMessage, postMessage, putMessage, deleteMessage}