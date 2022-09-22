const rootMessage = (req, res) => {
    res.send('mensajes')
}

const himessage = (req, res) => {
    res.send('Hola mundo')
}

const byeMessage = (req, res) => {
    res.send('Adios mundo')
}

module.exports = {
    rootMessage, himessage, byeMessage}