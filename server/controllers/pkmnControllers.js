import { pool } from "../config/database.js";

// Add CRUD functions here

const addPkmn = async(req, res) => {
    

    try {
        const {nickname, image, nature, ability, stats} = req.body
        
        const insertQuery = `
        INSERT INTO pkmn (nickname, image, nature, ability, stats)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `
        
        const results = await pool.query(insertQuery, [nickname, image, nature, ability, stats])
        
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
        const {nickname, image, nature, ability, stats} = req.body

        const updateQuery = `
            UPDATE pkmn
            SET 
                nickname = $1, 
                image = $2,
                nature = $3,
                ability = $4
                stats = $5
            WHERE id = $6
        `

        const results = await pool.query(updateQuery, [nickname, image, nature, ability, stats, id])
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