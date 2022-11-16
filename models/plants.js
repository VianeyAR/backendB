const modelsPlants = {
    queryGetPlants: "SELECT * FROM Plants",
    queryGetPlantsByID:`SELECT * FROM Plants WHERE ID = ?`,
    queryDeletePlantsByID: `UPDATE Plants SET Active = 'N' WHERE ID = ?`,
    queryPlantsExists: `SELECT Name FROM Plants WHERE Name = ?`,
    queryAddPlant:
    `INSERT INTO Plants
        (Name,
        Ability,
        Recharge, 
        Price,  
        Utilization, 
        plant_in,
        Active )
        VALUES (
        ?, ?, ?, ?, ?, ?, ?)`,
    
    }
    
    
    module.exports = modelsPlants