const express = require('express')
const messagesRouter = require('./routes/messages')
const UsuariosRouter = require('./routes/Usuarios')
const PlantsRouter = require('./routes/plants')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            messages: "/api/v1/messages",
            Usuarios: "/api/v1/Usuarios",
            plants: "/api/v1/plants"
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.messages, messagesRouter)
       this.app.use(this.paths.Usuarios, UsuariosRouter)
       this.app.use(this.paths.plants, PlantsRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server



