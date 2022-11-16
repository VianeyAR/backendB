const{response, request} = require("express")
const pool = require("../db/connection")

const modelsPlants = require("../models/plants")
const {queryPlantsExists} = require("../models/plants")


const addplant = async (req = request, res = response) => {
    const {Name,
          Ability,
          Recharge, 
          Price, 
          Utilization, 
          plant_in,
          Active } = req.body//URI params

    if(!Name || !Ability || !Recharge || !Price || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [plantExist] = await conn.query(modelsPlants.queryPlantsExists,[Name])
        
        if(plantExist){
            res.status(400).json({msg: `La planta '${Name}' ya se encuentra registrada`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsPlants.queryAddPlant,
                            [
                            Name,
                            Ability,
                            Recharge, 
                            Price, 
                            Utilization, 
                            plant_in,
                            Active 
                            ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar la planta con el Nombre ${Name}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente la planta con Nombre ${Name}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}


const updatePlants = async (req = request, res = response) => {
    //const {id} = req.params
    const {Name,
        Ability,
        Recharge, 
        Price, 
        Utilization, 
        plant_in,
        Active } = req.body//URI params

        if(!Name || !Ability || !Recharge || !Price || !Active){
            res.status(400).json({msg: "Faltan Datos"})
            return
        }
    
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [plantExist] = await conn.query(modelsPlants.queryPlantsExists,[Name])
        
        if(!plantExist){
            res.status(400).json({msg: `La planta '${Name}' no existe`})
            return
        }
                    const result = await conn.query(`UPDATE Plants SET 
                    Name = '${Name}',
                    Ability = '${Ability}',
                    Recharge = '${Recharge}',
                    Price = '${Price}',
                    Utilization = '${Utilization}',
                    plant_in = '${plant_in}',
                    Active = '${Active}'
                    WHERE Name = '${Name}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar la planta`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente la planta '${Name}'`})//Se manda la lista de usuarios
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}



const getPlants = async (req = reques, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelsPlants.queryGetPlants, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen plantas registradas"})
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


const getPlantsByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelsPlants.queryGetPlantsByID, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen la planta registradas con el ID ${id}`})
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



const deletePlantsByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsPlants.queryDeletePlantsByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen plantas registradas con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino la planta con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = {addplant, updatePlants, getPlants, getPlantsByID, deletePlantsByID}
