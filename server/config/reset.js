import './dotenv.js'
import { pool } from './database.js'

const createPkmnTable = async () => {
    const createQuery = `

        DROP TABLE IF EXISTS pkmn;

        CREATE TABLE IF NOT EXISTS pkmn (
            id SERIAL PRIMARY KEY, 
            dexNo INTEGER NOT NULL,
            nickname VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            shiny BOOLEAN NOT NULL DEFAULT FALSE,
            nature VARCHAR(255) NOT NULL,
            ability VARCHAR(255) NOT NULL,
            stats VARCHAR(255) [] NOT NULL
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