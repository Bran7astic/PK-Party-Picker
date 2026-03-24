import express from 'express'
// import controller for custom items


const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/', (req, res) => {
    res.status(200).send(`
            <h1>
                No pkmn yet!!
            </h1>
        `)
})


export default router