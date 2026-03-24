import { pool } from "../config/database.js";

// Add CRUD functions here

const addPkmn = async(req, res) => {
    const insertQuery = `
        INSERT INTO pkmn (nickname, nature, ability, moves)
        VALUES ()
    `
}