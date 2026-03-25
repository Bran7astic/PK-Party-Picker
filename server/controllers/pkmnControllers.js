import { pool } from "../config/database.js";

// Add CRUD functions here

const addPkmn = async(req, res) => {
    

    try {
        const {nickname, nature, ability, moves} = req.body
        
        const insertQuery = `
        INSERT INTO pkmn (nickname, nature, ability, moves)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `
        
        const results = await pool.query(insertQuery, [nickname, nature, ability, moves])
        
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
        const {nickname, nature, ability, moves} = req.body

        const updateQuery = `
            UPDATE pkmn
            SET 
                nickname = $1, 
                nature = $2,
                ability = $3,
                moves = $4
            WHERE id = $5
        `

        const results = await pool.query(updateQuery, [nickname, nature, ability, moves, id])
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