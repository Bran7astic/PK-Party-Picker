import { pool } from "../config/database.js";

// Add CRUD functions here

const addPkmn = async(req, res) => {
    

    try {
        const { dexNo, nickname, image, shiny, nature, ability, stats } = req.body
        
        const insertQuery = `
        INSERT INTO pkmn (dexNo, nickname, image, shiny, nature, ability, stats)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `
        
        const results = await pool.query(insertQuery, [dexNo, nickname, image, shiny, nature, ability, stats])
        
        res.status(201).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }

}

const getAllPkmn = async (req, res) => {
    try {
        
        const readQuery = `
            SELECT * FROM pkmn ORDER BY id ASC;
        `

        const results = await pool.query(readQuery)
        res.status(200).json(results.rows)

    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const getPkmnById = async (req, res) => {
    try {
        const id = req.params.id
        const readQuery = `
            SELECT * FROM pkmn WHERE id = $1;
        `

        const results = await pool.query(readQuery, [id])
        res.status(200).json(results.rows[0])
        
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const updatePkmn = async (req, res) => {
    try {
        const id = req.params.id
        const { dexNo, nickname, image, shiny, nature, ability, stats } = req.body

        const updateQuery = `
            UPDATE pkmn
            SET 
                dexNo = $1,
                nickname = $2, 
                image = $3,
                shiny = $4,
                nature = $5,
                ability = $6,
                stats = $7
            WHERE id = $8
            RETURNING *
        `

        const results = await pool.query(updateQuery, [dexNo, nickname, image, shiny, nature, ability, stats, id])
        res.status(200).json(results.rows[0])

    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const deletePkmnById = async(req, res) => {
    try {

        const id = req.params.id 
        const deleteQuery = `
            DELETE FROM pkmn
            WHERE id=$1
        `

        const results = await pool.query(deleteQuery, [id])
        res.status(200).json(results.rows[0])

    } catch (err) {

    }
}
 
const clearPkmn = async(req, res) => {

    try {
        const deleteQuery = `
            TRUNCATE TABLE pkmn;
        `

        const results = await pool.query(deleteQuery)
        res.status(200).json(results.rows[0])

    } catch (err) {
        res.status(409).json({error: err.message})
    }

}


export default {
    addPkmn,
    getAllPkmn,
    getPkmnById,
    updatePkmn,
    deletePkmnById,
    clearPkmn
}