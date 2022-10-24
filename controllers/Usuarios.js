const{reques, response, request} = require("express")
const pool = require("../db/connection")


const getUsers = async (req = reques, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query("SELECT * FROM Usuarios", (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen usuarios registrados"})
            return
        }
        res.json({users})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getUserByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }
        res.json({user})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}



const deleteUserByID = async (req = request, res = response) =>{
        const {id} = req.params
        let conn
        try{
            conn = await pool.getConnection() //realizamos la conexion
            
            //generamos la consulta
            const result = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => {if (error) throw error})
            console.log(result.affectedRows)

            if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
                res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
                return
            }

            res.json({msg:`Se elemino el usuario con el ID ${id}`})
        }catch (error){
    
            console.log(error)
            res.status(500).json({msg: error}) //informamos del error
        } finally{
            if (conn) conn.end() //termina la conexion
    
        }
    

}


const addUser = async (req = request, res = response) => {
    const {Nombre, Apellidos, Edad, Genero, Usuario, Contrasena, Fecha_Nacimiento, Activo} = req.body//URI params

    if(!Nombre || !Apellidos || !Edad || !Usuario || !Contrasena || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)
        
        if(userExist){
            res.status(400).json({msg: `El usuario '${Usuario}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(`INSERT INTO Usuarios(Nombre, Apellidos, Edad, Genero, Usuario, Contrasena, Fecha_Nacimiento, Activo) VALUES ('${Nombre}', '${Apellidos}', ${Edad}, '${Genero}', '${Usuario}', '${Contrasena}', '${Fecha_Nacimiento}', '${Activo}')`, (error) => {if(error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Nombre}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Nombre}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}




const updateUser = async (req = request, res = response) => {
    const {id} = req.params
    const {Nombre, Apellidos, Edad, Genero, Usuario, Contrasena, Fecha_Nacimiento, Activo} = req.body//URI params

    if(!Nombre || !Apellidos || !Edad || !Usuario || !Contrasena || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        
                 //generamos la consulta
                 const result = await conn.query(`UPDATE Usuarios SET 
                 Nombre = '${Nombre}',
                 Apellidos = '${Apellidos}',
                 Edad = ${Edad},
                 Genero = '${Genero}',
                 Contrasena = '${Contrasena}',
                 Fecha_Nacimiento = '${Fecha_Nacimiento}',
                 Activo = '${Activo}' 
                 WHERE id = ${id}`, (error) => {if (error) throw error})
                 console.log(result.affectedRows)

                    res.json({msg:`Se actualizo satisfactoriamente el usuario con Id '${id}'`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}




//End point para actualizar datos









module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUser}