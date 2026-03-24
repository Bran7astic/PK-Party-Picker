import './dotenv.js'
import { pool } from './database.js'

const createPkmnTable = async () => {
    const createQuery = `

        DROP TABLE IF EXISTS pkmn;

        CREATE TABLE IF NOT EXISTS pkmn (
            id SERIAL PRIMARY KEY, 
            nickname VARCHAR(255) NOT NULL,
            nature VARCHAR(255) NOT NULL,
            ability VARCHAR(255) NOT NULL,
            moves VARCHAR(255) [] NOT NULL
        )
    `

    try {
        const response = await pool.query(createQuery)
        console.log("🎉 pkmn table created successfully!")
    } catch (err) {
        console.error(`⚠️ Error creating pkmn table: ${err}`)
    }
}

createPkmnTable()